import { useState } from 'react';
import { Wrench, Calendar, User, Clock, Plus, Filter, CheckCircle, X, AlertTriangle } from 'lucide-react';

const maintenanceData = [
  { id: 1, title: 'Filter Replacement', machine: 'PUMP-003', technician: 'Sarah Lewis', date: 'Jan 18, 2026', time: '10:00 AM', status: 'Scheduled', priority: 'LOW' },
  { id: 2, title: 'Emergency Bearing Check', machine: 'PRESS-002', technician: 'Tom Rodriguez', date: 'Jan 18, 2026', time: '2:00 PM', status: 'In Progress', priority: 'HIGH' },
  { id: 3, title: 'Oil Change & Lubrication', machine: 'CNC-001', technician: 'Mike Thompson', date: 'Jan 20, 2026', time: '9:00 AM', status: 'Scheduled', priority: 'MEDIUM' },
  { id: 4, title: 'Belt Tension Adjustment', machine: 'CONV-005', technician: 'Emily Chen', date: 'Jan 22, 2026', time: '11:00 AM', status: 'Scheduled', priority: 'LOW' },
  { id: 5, title: 'Motor Inspection', machine: 'FAN-004', technician: 'David Park', date: 'Jan 25, 2026', time: '3:00 PM', status: 'Scheduled', priority: 'HIGH' },
  { id: 6, title: 'Calibration Check', machine: 'DRILL-006', technician: 'Sarah Lewis', date: 'Jan 15, 2026', time: '10:00 AM', status: 'Completed', priority: 'LOW' },
];

const technicians = ['Sarah Lewis', 'Tom Rodriguez', 'Mike Thompson', 'Emily Chen', 'David Park'];
const machines = ['CNC-001', 'PRESS-002', 'PUMP-003', 'FAN-004', 'CONV-005', 'DRILL-006'];

export default function MaintenancePage() {
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', machine: '', technician: '', date: '', time: '', priority: 'MEDIUM' });

  const filteredTasks = maintenanceData.filter(task => filter === 'All' || task.status === filter);

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'HIGH': return { badge: 'bg-rose-500', text: 'text-rose-400' };
      case 'MEDIUM': return { badge: 'bg-amber-500', text: 'text-amber-400' };
      default: return { badge: 'bg-emerald-500', text: 'text-emerald-400' };
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'In Progress': return { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', badge: 'bg-cyan-500' };
      case 'Completed': return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', badge: 'bg-emerald-500' };
      default: return { bg: 'bg-slate-800/30', border: 'border-slate-700/50', text: 'text-slate-400', badge: 'bg-slate-500' };
    }
  };

  const scheduledCount = maintenanceData.filter(t => t.status === 'Scheduled').length;
  const inProgressCount = maintenanceData.filter(t => t.status === 'In Progress').length;
  const completedCount = maintenanceData.filter(t => t.status === 'Completed').length;

  return (
    <div className="p-6 space-y-6">
      {/* Schedule Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200]">
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-lg shadow-2xl animate-slide-up">
            <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Schedule New Task</h2>
                <p className="text-sm text-slate-400">Fill in the maintenance task details</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Task Title</label>
                <input type="text" placeholder="e.g., Filter Replacement" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Machine</label>
                  <select value={formData.machine} onChange={(e) => setFormData({ ...formData, machine: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50">
                    <option value="">Select Machine</option>
                    {machines.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Technician</label>
                  <select value={formData.technician} onChange={(e) => setFormData({ ...formData, technician: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50">
                    <option value="">Select Technician</option>
                    {technicians.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                  <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Time</label>
                  <input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
                <div className="flex gap-3">
                  {['LOW', 'MEDIUM', 'HIGH'].map(p => (
                    <button key={p} onClick={() => setFormData({ ...formData, priority: p })} className={`flex-1 py-2 rounded-xl font-medium text-sm transition-all ${formData.priority === p ? (p === 'HIGH' ? 'bg-rose-500 text-white' : p === 'MEDIUM' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white') : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-700/50 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-slate-800/50 text-slate-300 rounded-xl hover:bg-slate-700/50 transition-all font-medium">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all font-medium">Schedule Task</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Maintenance Schedule</h1>
          <p className="text-slate-400 mt-1">Manage and track maintenance tasks</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
          <Plus className="w-5 h-5" />
          Schedule Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/20"><Calendar className="w-6 h-6 text-cyan-400" /></div>
          <div><p className="text-2xl font-bold text-white">{scheduledCount}</p><p className="text-sm text-slate-400">Scheduled</p></div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/20"><Wrench className="w-6 h-6 text-amber-400" /></div>
          <div><p className="text-2xl font-bold text-white">{inProgressCount}</p><p className="text-sm text-slate-400">In Progress</p></div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/20"><CheckCircle className="w-6 h-6 text-emerald-400" /></div>
          <div><p className="text-2xl font-bold text-white">{completedCount}</p><p className="text-sm text-slate-400">Completed</p></div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Filter className="w-5 h-5 text-slate-400" />
        {['All', 'Scheduled', 'In Progress', 'Completed'].map((status) => (
          <button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === status ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-slate-800/50 text-slate-400 border border-transparent hover:bg-slate-700/50 hover:text-slate-200'}`}>
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left p-4 text-sm font-semibold text-slate-400">Task</th>
              <th className="text-left p-4 text-sm font-semibold text-slate-400">Machine</th>
              <th className="text-left p-4 text-sm font-semibold text-slate-400">Technician</th>
              <th className="text-left p-4 text-sm font-semibold text-slate-400">Date & Time</th>
              <th className="text-left p-4 text-sm font-semibold text-slate-400 w-24">Priority</th>
              <th className="text-left p-4 text-sm font-semibold text-slate-400 w-32">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, idx) => {
              const priorityStyles = getPriorityStyles(task.priority);
              const statusStyles = getStatusStyles(task.status);
              return (
                <tr key={task.id} className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors animate-slide-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-800/50"><Wrench className="w-4 h-4 text-slate-400" /></div>
                      <span className="font-medium text-white">{task.title}</span>
                    </div>
                  </td>
                  <td className="p-4"><span className="text-cyan-400 font-medium">{task.machine}</span></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                        {task.technician.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-slate-300">{task.technician}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span>{task.date}</span>
                      <span className="text-slate-500">•</span>
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span>{task.time}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-bold text-white ${priorityStyles.badge} rounded`}>{task.priority}</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 text-xs font-bold text-white ${statusStyles.badge} rounded whitespace-nowrap`}>{task.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
