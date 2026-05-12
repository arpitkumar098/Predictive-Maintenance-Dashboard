import { Brain, AlertTriangle, CheckCircle, Clock, Cpu, RefreshCw } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { predictionsApi } from '@/services/api';
import { getRiskStyles } from '@/utils/styles';
import { LoadingSpinner, LoadingError } from '@/components/LoadingSpinner';

export default function PredictionsPage() {
  const queryClient = useQueryClient();

  const { data: predictions, isLoading, error, refetch } = useQuery({
    queryKey: ['predictions'],
    queryFn: predictionsApi.getAll,
  });

  const { data: stats } = useQuery({
    queryKey: ['prediction-stats'],
    queryFn: predictionsApi.getStats,
  });

  const refreshMutation = useMutation({
    mutationFn: predictionsApi.predictAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['predictions'] });
      queryClient.invalidateQueries({ queryKey: ['prediction-stats'] });
    },
  });

  if (isLoading) return <LoadingSpinner size="lg" />;
  if (error) return <LoadingError message="Failed to load predictions" onRetry={() => refetch()} />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 animate-glow-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Predictive Analysis</h1>
            <p className="text-slate-400 mt-1">ML-powered failure predictions (Random Forest + Gradient Boosting)</p>
          </div>
        </div>
        <button
          onClick={() => refreshMutation.mutate()}
          disabled={refreshMutation.isPending}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-medium disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
          {refreshMutation.isPending ? 'Running Inference...' : 'Re-run ML Predictions'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 border border-rose-500/30">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-400">High Risk</p><p className="text-3xl font-bold text-rose-400">{stats?.high ?? 0}</p></div>
            <AlertTriangle className="w-10 h-10 text-rose-400 opacity-50" />
          </div>
        </div>
        <div className="glass-card p-5 border border-amber-500/30">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-400">Medium Risk</p><p className="text-3xl font-bold text-amber-400">{stats?.medium ?? 0}</p></div>
            <Clock className="w-10 h-10 text-amber-400 opacity-50" />
          </div>
        </div>
        <div className="glass-card p-5 border border-emerald-500/30">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-400">Low Risk</p><p className="text-3xl font-bold text-emerald-400">{stats?.low ?? 0}</p></div>
            <CheckCircle className="w-10 h-10 text-emerald-400 opacity-50" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {(predictions || []).map((p, idx) => {
          const styles = getRiskStyles(p.risk_level);
          const featureImportance = p.feature_importance ? JSON.parse(p.feature_importance) : null;
          return (
            <div key={p.id} className={`glass-card p-6 border ${styles.border} card-hover animate-slide-up`} style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex flex-wrap items-start gap-6">
                <div className="flex items-center gap-4 min-w-[180px]">
                  <div className={`p-3 rounded-xl ${styles.bg}`}><Cpu className={`w-6 h-6 ${styles.text}`} /></div>
                  <div><h3 className="font-bold text-white">{p.machine_id}</h3><p className="text-sm text-slate-500">Confidence: {p.confidence.toFixed(1)}%</p></div>
                </div>
                <div className={`w-16 h-16 rounded-full border-4 ${styles.border} flex items-center justify-center ${styles.bg}`}>
                  <p className={`text-lg font-bold ${styles.text}`}>{p.days_to_failure}d</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 text-xs font-bold text-white ${styles.badge} rounded-lg`}>{p.risk_level} RISK</span>
                    <span className="text-xs text-slate-500">Failure prob: {(p.failure_probability * 100).toFixed(1)}%</span>
                  </div>
                  <p className="text-slate-300">{p.prediction_text}</p>
                </div>
              </div>
              {/* Feature Importance - real ML explainability */}
              {featureImportance && (
                <div className="mt-4 pt-4 border-t border-slate-700/30">
                  <p className="text-xs text-slate-500 mb-2 font-medium">Feature Importance (Model Explainability)</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.entries(featureImportance).slice(0, 6).map(([feature, importance]) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(importance as number) * 100}%` }} />
                        </div>
                        <span className="text-xs text-slate-500 w-24 truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
