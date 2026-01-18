import { Brain, TrendingUp, AlertTriangle, CheckCircle, Clock, Cpu } from 'lucide-react';

const predictionsData = [
  { id: 'CNC-001', name: 'CNC Lathe #1', prediction: 'Continue normal operation', risk: 'LOW', confidence: 87, daysToFailure: 45 },
  { id: 'PRESS-002', name: 'Hydraulic Press #2', prediction: 'Schedule immediate inspection', risk: 'HIGH', confidence: 89, daysToFailure: 8 },
  { id: 'PUMP-003', name: 'Water Pump #3', prediction: 'Monitor closely', risk: 'MEDIUM', confidence: 72, daysToFailure: 21 },
  { id: 'FAN-004', name: 'Cooling Fan #4', prediction: 'Critical: Immediate maintenance required', risk: 'HIGH', confidence: 94, daysToFailure: 3 },
  { id: 'CONV-005', name: 'Conveyor Belt #5', prediction: 'Operating within optimal parameters', risk: 'LOW', confidence: 91, daysToFailure: 60 },
];

export default function PredictionsPage() {
  const getRiskStyles = (risk: string) => {
    switch (risk) {
      case 'HIGH': return { bg: 'bg-rose-500/10', border: 'border-rose-500/30', badge: 'bg-rose-500', text: 'text-rose-400' };
      case 'MEDIUM': return { bg: 'bg-amber-500/10', border: 'border-amber-500/30', badge: 'bg-amber-500', text: 'text-amber-400' };
      default: return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', badge: 'bg-emerald-500', text: 'text-emerald-400' };
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 animate-glow-pulse">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Predictive Analysis</h1>
          <p className="text-slate-400 mt-1">AI-powered failure predictions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 border border-rose-500/30">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-400">High Risk</p><p className="text-3xl font-bold text-rose-400">2</p></div>
            <AlertTriangle className="w-10 h-10 text-rose-400 opacity-50" />
          </div>
        </div>
        <div className="glass-card p-5 border border-amber-500/30">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-400">Medium Risk</p><p className="text-3xl font-bold text-amber-400">1</p></div>
            <Clock className="w-10 h-10 text-amber-400 opacity-50" />
          </div>
        </div>
        <div className="glass-card p-5 border border-emerald-500/30">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-400">Low Risk</p><p className="text-3xl font-bold text-emerald-400">2</p></div>
            <CheckCircle className="w-10 h-10 text-emerald-400 opacity-50" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {predictionsData.map((p, idx) => {
          const styles = getRiskStyles(p.risk);
          return (
            <div key={p.id} className={`glass-card p-6 border ${styles.border} card-hover animate-slide-up`} style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-4 min-w-[180px]">
                  <div className={`p-3 rounded-xl ${styles.bg}`}><Cpu className={`w-6 h-6 ${styles.text}`} /></div>
                  <div><h3 className="font-bold text-white">{p.name}</h3><p className="text-sm text-slate-500">{p.id}</p></div>
                </div>
                <div className={`w-16 h-16 rounded-full border-4 ${styles.border} flex items-center justify-center ${styles.bg}`}>
                  <p className={`text-xl font-bold ${styles.text}`}>{p.confidence}%</p>
                </div>
                <div className={`px-4 py-2 rounded-xl ${styles.bg} border ${styles.border} text-center`}>
                  <p className={`text-xl font-bold ${styles.text}`}>{p.daysToFailure}</p>
                  <p className="text-xs text-slate-500">Days</p>
                </div>
                <div className="flex-1">
                  <span className={`px-3 py-1 text-xs font-bold text-white ${styles.badge} rounded-lg`}>{p.risk} RISK</span>
                  <p className="text-slate-300 mt-2">{p.prediction}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
