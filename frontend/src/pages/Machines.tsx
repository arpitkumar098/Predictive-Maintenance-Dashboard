import { useState } from 'react';
import { Cpu, Thermometer, Activity, Wrench, Search, Filter, ChevronRight, X, Calendar, Clock, AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';

const machinesData = [
  { id: 'CNC-001', name: 'CNC Lathe #1', status: 'Critical', temp: 102, vibration: 0.08, rpm: 1520, line: 'Line A', lastMaintenance: '12 days ago', uptime: 94, nextMaintenance: 'Jan 20, 2026', healthScore: 62, issues: ['High temperature', 'Vibration above threshold'] },
  { id: 'PRESS-002', name: 'Hydraulic Press #2', status: 'Healthy', temp: 64, vibration: 0.03, rpm: 1480, line: 'Line B', lastMaintenance: '5 days ago', uptime: 99, nextMaintenance: 'Feb 5, 2026', healthScore: 95, issues: [] },
  { id: 'PUMP-003', name: 'Water Pump #3', status: 'Warning', temp: 78, vibration: 0.05, rpm: 1500, line: 'Water Treatment', lastMaintenance: '8 days ago', uptime: 97, nextMaintenance: 'Jan 25, 2026', healthScore: 78, issues: ['Slight temperature increase'] },
  { id: 'FAN-004', name: 'Cooling Fan #4', status: 'Critical', temp: 99, vibration: 0.09, rpm: 2100, line: 'Cooling System', lastMaintenance: '15 days ago', uptime: 88, nextMaintenance: 'Jan 18, 2026', healthScore: 55, issues: ['Overheating', 'High vibration', 'Overdue maintenance'] },
  { id: 'CONV-005', name: 'Conveyor Belt #5', status: 'Healthy', temp: 45, vibration: 0.02, rpm: 800, line: 'Line C', lastMaintenance: '3 days ago', uptime: 100, nextMaintenance: 'Feb 10, 2026', healthScore: 98, issues: [] },
  { id: 'DRILL-006', name: 'Drill Press #6', status: 'Healthy', temp: 58, vibration: 0.04, rpm: 1200, line: 'Line A', lastMaintenance: '7 days ago', uptime: 98, nextMaintenance: 'Feb 1, 2026', healthScore: 92, issues: [] },
];

type Machine = typeof machinesData[0];

export default function MachinesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredMachines = machinesData.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) || machine.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || machine.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Critical': return { dot: 'status-dot-critical', text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' };
      case 'Warning': return { dot: 'status-dot-warning', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' };
      default: return { dot: 'status-dot-healthy', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
    }
  };

  const handleMaintenance = (machine: Machine) => { setSelectedMachine(machine); setShowMaintenanceModal(true); };
  const handleDetails = (machine: Machine) => { setSelectedMachine(machine); setShowDetailsModal(true); };

  return (
    <div className="p-6 space-y-6">
      {/* Maintenance Modal */}
      {showMaintenanceModal && selectedMachine && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200]">
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-md shadow-2xl animate-slide-up">
            <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/20"><Wrench className="w-6 h-6 text-amber-400" /></div>
                <div>
                  <h2 className="text-lg font-bold text-white">Schedule Maintenance</h2>
                  <p className="text-sm text-slate-400">{selectedMachine.name}</p>
                </div>
              </div>
              <button onClick={() => setShowMaintenanceModal(false)} className="p-2 hover:bg-slate-800 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <p className="text-sm text-slate-400 mb-1">Last Maintenance</p>
                <p className="text-white font-medium">{selectedMachine.lastMaintenance}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <p className="text-sm text-slate-400 mb-1">Next Scheduled</p>
                <p className="text-cyan-400 font-medium">{selectedMachine.nextMaintenance}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <p className="text-sm text-slate-400 mb-2">Recommended Actions</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle className="w-4 h-4 text-emerald-400" />Routine inspection</li>
                  <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle className="w-4 h-4 text-emerald-400" />Lubrication check</li>
                  {selectedMachine.status === 'Critical' && <li className="flex items-center gap-2 text-sm text-rose-300"><AlertTriangle className="w-4 h-4 text-rose-400" />Emergency inspection required</li>}
                </ul>
              </div>
            </div>
            <div className="p-6 border-t border-slate-700/50 flex gap-3">
              <button onClick={() => setShowMaintenanceModal(false)} className="flex-1 py-3 bg-slate-800/50 text-slate-300 rounded-xl hover:bg-slate-700/50 transition-all font-medium">Close</button>
              <button onClick={() => setShowMaintenanceModal(false)} className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all font-medium">Schedule Now</button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedMachine && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200]">
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-lg shadow-2xl animate-slide-up">
            <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${getStatusStyles(selectedMachine.status).bg}`}><Cpu className={`w-6 h-6 ${getStatusStyles(selectedMachine.status).text}`} /></div>
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedMachine.name}</h2>
                  <p className="text-sm text-slate-400">{selectedMachine.id} • {selectedMachine.line}</p>
                </div>
              </div>
              <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-slate-800 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              {/* Health Score */}
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                <span className="text-slate-400">Health Score</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${selectedMachine.healthScore >= 80 ? 'bg-emerald-500' : selectedMachine.healthScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${selectedMachine.healthScore}%` }} />
                  </div>
                  <span className={`font-bold ${selectedMachine.healthScore >= 80 ? 'text-emerald-400' : selectedMachine.healthScore >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>{selectedMachine.healthScore}%</span>
                </div>
              </div>

              {/* Real-time Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-slate-800/50 rounded-xl text-center">
                  <Thermometer className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{selectedMachine.temp}°C</p>
                  <p className="text-xs text-slate-500">Temperature</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl text-center">
                  <Activity className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{selectedMachine.vibration}</p>
                  <p className="text-xs text-slate-500">Vibration</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl text-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{selectedMachine.rpm}</p>
                  <p className="text-xs text-slate-500">RPM</p>
                </div>
              </div>

              {/* Issues */}
              {selectedMachine.issues.length > 0 && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                  <p className="text-sm font-medium text-rose-400 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />Active Issues</p>
                  <ul className="space-y-1">
                    {selectedMachine.issues.map((issue, i) => <li key={i} className="text-sm text-slate-300">• {issue}</li>)}
                  </ul>
                </div>
              )}

              {/* Maintenance Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Last Maintenance</p>
                  <p className="text-white font-medium">{selectedMachine.lastMaintenance}</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Uptime</p>
                  <p className="text-emerald-400 font-medium">{selectedMachine.uptime}%</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-700/50">
              <button onClick={() => setShowDetailsModal(false)} className="w-full py-3 bg-slate-800/50 text-slate-300 rounded-xl hover:bg-slate-700/50 transition-all font-medium">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Machines Overview</h1>
          <p className="text-slate-400 mt-1">Monitor and manage all industrial machines</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 text-sm">
            <span className="text-slate-400">Total Machines:</span>
            <span className="text-white font-semibold ml-2">{machinesData.length}</span>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" placeholder="Search machines by name or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-400" />
          {['All', 'Healthy', 'Warning', 'Critical'].map((status) => (
            <button key={status} onClick={() => setStatusFilter(status)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === status ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-slate-800/50 text-slate-400 border border-transparent hover:bg-slate-700/50 hover:text-slate-200'}`}>
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Machines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMachines.map((machine, idx) => {
          const styles = getStatusStyles(machine.status);
          return (
            <div key={machine.id} className={`glass-card p-6 card-hover animate-slide-up border ${styles.border}`} style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${styles.bg}`}><Cpu className={`w-6 h-6 ${styles.text}`} /></div>
                  <div>
                    <h3 className="font-bold text-white">{machine.name}</h3>
                    <p className="text-sm text-slate-500">{machine.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`status-dot ${styles.dot}`} />
                  <span className={`text-sm font-medium ${styles.text}`}>{machine.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-800/30 rounded-xl">
                  <Thermometer className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">{machine.temp}°C</p>
                  <p className="text-xs text-slate-500">Temp</p>
                </div>
                <div className="text-center p-3 bg-slate-800/30 rounded-xl">
                  <Activity className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">{machine.vibration}</p>
                  <p className="text-xs text-slate-500">Vibration</p>
                </div>
                <div className="text-center p-3 bg-slate-800/30 rounded-xl">
                  <Activity className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">{machine.rpm}</p>
                  <p className="text-xs text-slate-500">RPM</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Location</span><span className="text-slate-300">{machine.line}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Last Maintenance</span><span className="text-slate-300">{machine.lastMaintenance}</span></div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Uptime</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${machine.uptime >= 95 ? 'bg-emerald-500' : machine.uptime >= 90 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${machine.uptime}%` }} />
                    </div>
                    <span className="text-slate-300">{machine.uptime}%</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-700/50">
                <button onClick={() => handleMaintenance(machine)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/50 text-slate-300 rounded-xl hover:bg-slate-700/50 hover:text-white transition-all text-sm">
                  <Wrench className="w-4 h-4" />Maintenance
                </button>
                <button onClick={() => handleDetails(machine)} className="flex items-center justify-center gap-1 px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-all text-sm">
                  Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
