import { useState } from 'react';
import { Wrench, Calendar, Clock, Plus, Filter, CheckCircle, X, User } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { maintenanceApi, machinesApi } from '@/services/api';
import { LoadingSpinner, LoadingError } from '@/components/LoadingSpinner';
import type { MaintenanceCreate } from '@/types';

// Zod schema for form validation
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  machine_id: z.string().min(1, 'Machine is required'),
  technician: z.string().min(1, 'Technician is required'),
  scheduled_date: z.string().min(1, 'Date is required'),
  scheduled_time: z.string().min(1, 'Time is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function MaintenancePage() {
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<TaskFormData>({
    defaultValues: { priority: 'MEDIUM', title: '', machine_id: '', technician: '', scheduled_date: '', scheduled_time: '' },
  });
  const selectedPriority = watch('priority');

  const { data: tasks, isLoading, error, refetch } = useQuery({
    queryKey: ['maintenance', filter],
    queryFn: () => maintenanceApi.getAll(filter),
  });

  const { data: stats } = useQuery({
    queryKey: ['maintenance-stats'],
    queryFn: maintenanceApi.getStats,
  });

  const { data: machines } = useQuery({
    queryKey: ['machines'],
    queryFn: machinesApi.getAll,
  });

  const { data: technicians } = useQuery({
    queryKey: ['technicians'],
    queryFn: maintenanceApi.getTechnicians,
  });

  const createMutation = useMutation({
    mutationFn: (data: MaintenanceCreate) => maintenanceApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
      queryClient.invalidateQueries({ queryKey: ['maintenance-stats'] });
      setShowModal(false);
      reset();
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => maintenanceApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
      queryClient.invalidateQueries({ queryKey: ['maintenance-stats'] });
    },
  });

  const onSubmit = (data: TaskFormData) => {
    createMutation.mutate(data);
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'HIGH': return { badge: 'bg-rose-500', text: 'text-rose-400' };
      case 'MEDIUM': return { badge: 'bg-amber-500', text: 'text-amber-400' };
      default: return { badge: 'bg-emerald-500', text: 'text-emerald-400' };
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'In Progress': return { badge: 'bg-cyan-500' };
      case 'Completed': return { badge: 'bg-emerald-500' };
      default: return { badge: 'bg-slate-500' };
    }
  };

  if (isLoading) return <LoadingSpinner size="lg" />;
  if (error) return <LoadingError message="Failed to load tasks" onRetry={() => refetch()} />;

  return (
    <div className="p-6 space-y-6">
      {/* Schedule Task Modal with react-hook-form + zod */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200]">
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-lg shadow-2xl animate-slide-up">
            <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Schedule New Task</h2>
                <p className="text-sm text-slate-400">Fill in the maintenance task details</p>
              </div>
              <button onClick={() => { setShowModal(false); reset(); }} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Task Title</label>
                  <input {...register('title')} type="text" placeholder="e.g., Filter Replacement" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50" />
                  {errors.title && <p className="text-rose-400 text-xs mt-1">{errors.title.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Machine</label>
                    <select {...register('machine_id')} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50">
                      <option value="">Select Machine</option>
                      {(machines || []).map(m => <option key={m.id} value={m.id}>{m.id} - {m.name}</option>)}
                    </select>
                    {errors.machine_id && <p className="text-rose-400 text-xs mt-1">{errors.machine_id.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Technician</label>
                    <select {...register('technician')} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50">
                      <option value="">Select Technician</option>
                      {(technicians || []).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.technician && <p className="text-rose-400 text-xs mt-1">{errors.technician.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                    <input {...register('scheduled_date')} type="date" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50" />
                    {errors.scheduled_date && <p className="text-rose-400 text-xs mt-1">{errors.scheduled_date.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Time</label>
                    <input {...register('scheduled_time')} type="time" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50" />
                    {errors.scheduled_time && <p className="text-rose-400 text-xs mt-1">{errors.scheduled_time.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
                  <div className="flex gap-3">
                    {(['LOW', 'MEDIUM', 'HIGH'] as const).map(p => (
                      <button key={p} type="button" onClick={() => setValue('priority', p)} className={`flex-1 py-2 rounded-xl font-medium text-sm transition-all ${selectedPriority === p ? (p === 'HIGH' ? 'bg-rose-500 text-white' : p === 'MEDIUM' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white') : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-slate-700/50 flex gap-3">
                <button type="button" onClick={() => { setShowModal(false); reset(); }} className="flex-1 py-3 bg-slate-800/50 text-slate-300 rounded-xl hover:bg-slate-700/50 transition-all font-medium">Cancel</button>
                <button type="submit" disabled={createMutation.isPending} className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all font-medium disabled:opacity-50">
                  {createMutation.isPending ? 'Creating...' : 'Schedule Task'}
                </button>
              </div>
              {createMutation.isError && (
                <p className="px-6 pb-4 text-rose-400 text-sm">Failed to create task. Please try again.</p>
              )}
            </form>
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
          <Plus className="w-5 h-5" /> Schedule Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/20"><Calendar className="w-6 h-6 text-cyan-400" /></div>
          <div><p className="text-2xl font-bold text-white">{stats?.scheduled ?? 0}</p><p className="text-sm text-slate-400">Scheduled</p></div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/20"><Wrench className="w-6 h-6 text-amber-400" /></div>
          <div><p className="text-2xl font-bold text-white">{stats?.in_progress ?? 0}</p><p className="text-sm text-slate-400">In Progress</p></div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/20"><CheckCircle className="w-6 h-6 text-emerald-400" /></div>
          <div><p className="text-2xl font-bold text-white">{stats?.completed ?? 0}</p><p className="text-sm text-slate-400">Completed</p></div>
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
              <th className="text-left p-4 text-sm font-semibold text-slate-400 w-40">Status</th>
            </tr>
          </thead>
          <tbody>
            {(tasks || []).map((task, idx) => {
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
                  <td className="p-4"><span className="text-cyan-400 font-medium">{task.machine_id}</span></td>
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
                      <span>{task.scheduled_date}</span>
                      <span className="text-slate-500">•</span>
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span>{task.scheduled_time}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-bold text-white ${priorityStyles.badge} rounded`}>{task.priority}</span>
                  </td>
                  <td className="p-4">
                    {task.status !== 'Completed' ? (
                      <select
                        value={task.status}
                        onChange={(e) => statusMutation.mutate({ id: task.id, status: e.target.value })}
                        className={`px-3 py-1 text-xs font-bold text-white ${statusStyles.badge} rounded cursor-pointer border-none`}
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    ) : (
                      <span className={`inline-block px-3 py-1 text-xs font-bold text-white ${statusStyles.badge} rounded`}>{task.status}</span>
                    )}
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
