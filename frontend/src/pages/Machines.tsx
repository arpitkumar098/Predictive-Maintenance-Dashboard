import { useState } from 'react';
import { Cpu, Thermometer, Activity, Wrench, Search, Filter, ChevronRight, X, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { machinesApi } from '@/services/api';
import { getStatusStyles } from '@/utils/styles';
import { formatDate } from '@/utils/formatters';
import { LoadingSpinner, LoadingError } from '@/components/LoadingSpinner';
import type { Machine } from '@/types';

export default function MachinesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const { data: machines, isLoading, error, refetch } = useQuery({
    queryKey: ['machines'],
    queryFn: machinesApi.getAll,
  });

  const filteredMachines = (machines || []).filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) || machine.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || machine.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleMaintenance = (machine: Machine) => { setSelectedMachine(machine); setShowMaintenanceModal(true); };
  const handleDetails = (machine: Machine) => { setSelectedMachine(machine); setShowDetailsModal(true); };

  if (isLoading) return <LoadingSpinner size="lg" />;
  if (error) return <LoadingError message="Failed to load machines" onRetry={() => refetch()} />;

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
                <p className="text-white font-medium">{formatDate(selectedMachine.last_maintenance_date)}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <p className="text-sm text-slate-400 mb-1">Next Scheduled</p>
                <p className="text-cyan-400 font-medium">{formatDate(selectedMachine.next_maintenance_date)}</p>
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
              <button onClick={() => { setShowMaintenanceModal(false); window.location.href = '/maintenance'; }} className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all font-medium">Schedule Now</button>
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
                  <p className="text-sm text-slate-400">{selectedMachine.id} • {selectedMachine.location}</p>
                </div>
              </div>
              <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-slate-800 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                <span className="text-slate-400">Health Score</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${selectedMachine.health_score >= 75 ? 'bg-emerald-500' : selectedMachine.health_score >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${selectedMachine.health_score}%` }} />
                  </div>
                  <span className={`font-bold ${selectedMachine.health_score >= 75 ? 'text-emerald-400' : selectedMachine.health_score >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>{selectedMachine.health_score.toFixed(1)}%</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-slate-800/50 rounded-xl text-center">
                  <Thermometer className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{selectedMachine.temperature.toFixed(1)}°C</p>
                  <p className="text-xs text-slate-500">Temperature</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl text-center">
                  <Activity className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{selectedMachine.vibration.toFixed(4)}</p>
                  <p className="text-xs text-slate-500">Vibration</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl text-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{Math.round(selectedMachine.rpm)}</p>
                  <p className="text-xs text-slate-500">RPM</p>
                </div>
              </div>
              {selectedMachine.issues.length > 0 && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                  <p className="text-sm font-medium text-rose-400 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />Active Issues</p>
                  <ul className="space-y-1">
                    {selectedMachine.issues.map((issue, i) => <li key={i} className="text-sm text-slate-300">• {issue}</li>)}
                  </ul>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Days Since Maintenance</p>
                  <p className="text-white font-medium">{selectedMachine.days_since_maintenance} days</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Uptime</p>
                  <p className="text-emerald-400 font-medium">{selectedMachine.uptime.toFixed(1)}%</p>
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
            <span className="text-white font-semibold ml-2">{machines?.length || 0}</span>
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
                  <p className="text-lg font-bold text-white">{machine.temperature.toFixed(1)}°C</p>
                  <p className="text-xs text-slate-500">Temp</p>
                </div>
                <div className="text-center p-3 bg-slate-800/30 rounded-xl">
                  <Activity className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">{machine.vibration.toFixed(3)}</p>
                  <p className="text-xs text-slate-500">Vibration</p>
                </div>
                <div className="text-center p-3 bg-slate-800/30 rounded-xl">
                  <Activity className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">{Math.round(machine.rpm)}</p>
                  <p className="text-xs text-slate-500">RPM</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Location</span><span className="text-slate-300">{machine.location}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Days Since Maintenance</span><span className="text-slate-300">{machine.days_since_maintenance} days</span></div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Uptime</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${machine.uptime >= 95 ? 'bg-emerald-500' : machine.uptime >= 90 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${machine.uptime}%` }} />
                    </div>
                    <span className="text-slate-300">{machine.uptime.toFixed(1)}%</span>
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
