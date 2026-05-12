import { useState } from 'react';
import { AlertTriangle, Bell, CheckCircle, Clock, Filter, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { alertsApi } from '@/services/api';
import { getAlertStyles } from '@/utils/styles';
import { timeAgo } from '@/utils/formatters';
import { LoadingSpinner, LoadingError } from '@/components/LoadingSpinner';

export default function AlertsPage() {
  const [filter, setFilter] = useState('All');
  const queryClient = useQueryClient();

  const { data: alerts, isLoading, error, refetch } = useQuery({
    queryKey: ['alerts', filter],
    queryFn: () => alertsApi.getAll(filter),
  });

  const { data: stats } = useQuery({
    queryKey: ['alert-stats'],
    queryFn: alertsApi.getStats,
  });

  const acknowledgeMutation = useMutation({
    mutationFn: alertsApi.acknowledge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      queryClient.invalidateQueries({ queryKey: ['alert-stats'] });
    },
  });

  if (isLoading) return <LoadingSpinner size="lg" />;
  if (error) return <LoadingError message="Failed to load alerts" onRetry={() => refetch()} />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Alerts Center</h1>
          <p className="text-slate-400 mt-1">Monitor and manage system alerts</p>
        </div>
        <div className="flex items-center gap-3">
          {(stats?.critical_unread ?? 0) > 0 && (
            <div className="glass-card px-4 py-2 text-sm flex items-center gap-2 border border-rose-500/30 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span className="text-rose-400 font-medium">{stats?.critical_unread} Critical</span>
            </div>
          )}
          {(stats?.warning_unread ?? 0) > 0 && (
            <div className="glass-card px-4 py-2 text-sm flex items-center gap-2 border border-amber-500/30">
              <Bell className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 font-medium">{stats?.warning_unread} Warning</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Filter className="w-5 h-5 text-slate-400" />
        {['All', 'Critical', 'Warning', 'Info'].map((type) => (
          <button key={type} onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === type
              ? type === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : type === 'Warning' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'bg-slate-800/50 text-slate-400 border border-transparent hover:bg-slate-700/50 hover:text-slate-200'}`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {(alerts || []).map((alert, idx) => {
          const styles = getAlertStyles(alert.type);
          return (
            <div key={alert.id}
              className={`glass-card p-5 border ${styles.border} ${alert.acknowledged ? 'opacity-60' : ''} animate-slide-up card-hover`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${styles.iconBg} ${!alert.acknowledged && alert.type === 'Critical' ? 'animate-pulse' : ''}`}>
                  <AlertTriangle className={`w-6 h-6 ${styles.icon}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-white">{alert.title}</h3>
                        <span className={`px-2 py-0.5 text-xs font-bold text-white ${styles.badge} rounded`}>{alert.type.toUpperCase()}</span>
                        {alert.acknowledged && (
                          <span className="flex items-center gap-1 text-xs text-emerald-400">
                            <CheckCircle className="w-3 h-3" /> Acknowledged
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-cyan-400 font-medium mt-1">{alert.machine_id}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {timeAgo(alert.created_at)}
                    </div>
                  </div>
                  <p className="text-slate-300">{alert.message}</p>
                </div>
                {!alert.acknowledged && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => acknowledgeMutation.mutate(alert.id)}
                      disabled={acknowledgeMutation.isPending}
                      className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500/30 transition-all text-sm font-medium flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" /> Acknowledge
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {(alerts || []).length === 0 && (
        <div className="glass-card p-12 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">All Clear!</h3>
          <p className="text-slate-400">No alerts matching your filter criteria.</p>
        </div>
      )}
    </div>
  );
}
