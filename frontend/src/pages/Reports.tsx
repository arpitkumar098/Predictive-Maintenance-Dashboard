import { FileText, Download, Calendar, Eye, FileBarChart, FilePieChart } from 'lucide-react';

const reportsData = [
  { id: 1, title: 'Monthly Maintenance Report', description: 'Complete breakdown of maintenance tasks for January 2026', date: 'Jan 15, 2026', type: 'Maintenance', size: '2.4 MB' },
  { id: 2, title: 'Sensor Performance Analysis', description: 'Analysis of sensor readings and accuracy metrics', date: 'Jan 12, 2026', type: 'Analytics', size: '1.8 MB' },
  { id: 3, title: 'Machine Efficiency Report', description: 'Uptime and efficiency statistics for all machines', date: 'Jan 10, 2026', type: 'Performance', size: '3.1 MB' },
  { id: 4, title: 'Predictive Analysis Summary', description: 'AI predictions and recommendations overview', date: 'Jan 8, 2026', type: 'AI Report', size: '1.2 MB' },
  { id: 5, title: 'Alert History Report', description: 'Historical data of all system alerts', date: 'Jan 5, 2026', type: 'Alerts', size: '0.9 MB' },
];

export default function ReportsPage() {
  const getTypeStyles = (type: string) => {
    const styles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
      'Maintenance': { bg: 'bg-cyan-500/20', text: 'text-cyan-400', icon: <FileText className="w-5 h-5" /> },
      'Analytics': { bg: 'bg-purple-500/20', text: 'text-purple-400', icon: <FileBarChart className="w-5 h-5" /> },
      'Performance': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', icon: <FilePieChart className="w-5 h-5" /> },
      'AI Report': { bg: 'bg-pink-500/20', text: 'text-pink-400', icon: <FileText className="w-5 h-5" /> },
      'Alerts': { bg: 'bg-amber-500/20', text: 'text-amber-400', icon: <FileText className="w-5 h-5" /> },
    };
    return styles[type] || styles['Maintenance'];
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Reports</h1>
        <p className="text-slate-400 mt-1">Download and review system reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/20"><FileText className="w-6 h-6 text-cyan-400" /></div>
          <div><p className="text-2xl font-bold text-white">{reportsData.length}</p><p className="text-sm text-slate-400">Total Reports</p></div>
        </div>
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/20"><Download className="w-6 h-6 text-emerald-400" /></div>
          <div><p className="text-2xl font-bold text-white">9.4 MB</p><p className="text-sm text-slate-400">Total Size</p></div>
        </div>
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/20"><Calendar className="w-6 h-6 text-purple-400" /></div>
          <div><p className="text-2xl font-bold text-white">Jan 2026</p><p className="text-sm text-slate-400">Current Period</p></div>
        </div>
      </div>

      <div className="space-y-4">
        {reportsData.map((report, idx) => {
          const styles = getTypeStyles(report.type);
          return (
            <div key={report.id} className="glass-card p-5 card-hover animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex items-center gap-5">
                <div className={`p-4 rounded-xl ${styles.bg}`}>{styles.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-white">{report.title}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium ${styles.text} ${styles.bg} rounded`}>{report.type}</span>
                  </div>
                  <p className="text-sm text-slate-400">{report.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{report.date}</span>
                    <span>{report.size}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-slate-800/50 text-slate-400 rounded-xl hover:bg-slate-700/50 hover:text-slate-200 transition-all">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-all text-sm font-medium">
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
