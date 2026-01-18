import { useState } from 'react';
import { AlertTriangle, Bell, CheckCircle, Clock, Filter, X, ChevronRight } from 'lucide-react';

const alertsData = [
  { id: 1, type: 'Critical', title: 'Temperature Spike', machine: 'CNC-001', message: 'Temperature exceeded 100°C (100.4°C)', time: '17 hours ago', acknowledged: false },
  { id: 2, type: 'Critical', title: 'Overheating Alert', machine: 'FAN-004', message: 'Temperature exceeded 110°C threshold', time: '18 hours ago', acknowledged: false },
  { id: 3, type: 'Critical', title: 'High Temperature', machine: 'CONV-005', message: 'Temperature exceeded 100°C (100.2°C)', time: '19 hours ago', acknowledged: true },
  { id: 4, type: 'Warning', title: 'Vibration Anomaly', machine: 'PUMP-003', message: 'Unusual vibration pattern detected', time: '1 day ago', acknowledged: true },
  { id: 5, type: 'Warning', title: 'RPM Fluctuation', machine: 'DRILL-006', message: 'RPM readings outside normal range', time: '2 days ago', acknowledged: true },
  { id: 6, type: 'Info', title: 'Maintenance Due', machine: 'PRESS-002', message: 'Scheduled maintenance in 3 days', time: '3 days ago', acknowledged: true },
];

export default function AlertsPage() {
  const [filter, setFilter] = useState('All');
  const [alerts, setAlerts] = useState(alertsData);

  const filteredAlerts = alerts.filter(alert =>
    filter === 'All' || alert.type === filter
  );

  const acknowledgeAlert = (id: number) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'Critical':
        return {
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/30',
          icon: 'text-rose-400',
          iconBg: 'bg-rose-500/20',
          badge: 'bg-rose-500',
        };
      case 'Warning':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          icon: 'text-amber-400',
          iconBg: 'bg-amber-500/20',
          badge: 'bg-amber-500',
        };
      default:
        return {
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-500/30',
          icon: 'text-cyan-400',
          iconBg: 'bg-cyan-500/20',
          badge: 'bg-cyan-500',
        };
    }
  };

  const criticalCount = alerts.filter(a => a.type === 'Critical' && !a.acknowledged).length;
  const warningCount = alerts.filter(a => a.type === 'Warning' && !a.acknowledged).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Alerts Center</h1>
          <p className="text-slate-400 mt-1">Monitor and manage system alerts</p>
        </div>
        <div className="flex items-center gap-3">
          {criticalCount > 0 && (
            <div className="glass-card px-4 py-2 text-sm flex items-center gap-2 border border-rose-500/30 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span className="text-rose-400 font-medium">{criticalCount} Critical</span>
            </div>
          )}
          {warningCount > 0 && (
            <div className="glass-card px-4 py-2 text-sm flex items-center gap-2 border border-amber-500/30">
              <Bell className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 font-medium">{warningCount} Warning</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Filter className="w-5 h-5 text-slate-400" />
        {['All', 'Critical', 'Warning', 'Info'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === type
                ? type === 'Critical'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : type === 'Warning'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-slate-800/50 text-slate-400 border border-transparent hover:bg-slate-700/50 hover:text-slate-200'
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert, idx) => {
          const styles = getAlertStyles(alert.type);
          return (
            <div
              key={alert.id}
              className={`glass-card p-5 border ${styles.border} ${alert.acknowledged ? 'opacity-60' : ''} animate-slide-up card-hover`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-xl ${styles.iconBg} ${!alert.acknowledged && alert.type === 'Critical' ? 'animate-pulse' : ''}`}>
                  <AlertTriangle className={`w-6 h-6 ${styles.icon}`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-white">{alert.title}</h3>
                        <span className={`px-2 py-0.5 text-xs font-bold text-white ${styles.badge} rounded`}>
                          {alert.type.toUpperCase()}
                        </span>
                        {alert.acknowledged && (
                          <span className="flex items-center gap-1 text-xs text-emerald-400">
                            <CheckCircle className="w-3 h-3" />
                            Acknowledged
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-cyan-400 font-medium mt-1">{alert.machine}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {alert.time}
                    </div>
                  </div>
                  <p className="text-slate-300">{alert.message}</p>
                </div>

                {/* Actions */}
                {!alert.acknowledged && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500/30 transition-all text-sm font-medium flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Acknowledge
                    </button>
                    <button className="p-2 bg-slate-800/50 text-slate-400 rounded-xl hover:bg-slate-700/50 hover:text-slate-200 transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="glass-card p-12 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">All Clear!</h3>
          <p className="text-slate-400">No alerts matching your filter criteria.</p>
        </div>
      )}
    </div>
  );
}
