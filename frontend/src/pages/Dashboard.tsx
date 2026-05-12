import { useState } from 'react';
import { Bell, Thermometer, Vibrate, Gauge, ChevronRight, Clock, User, Plus, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import DashboardStats from '../components/Dashboard/DashboardStats';
import SensorChart from '@/components/SensorChart';
import { LoadingSpinner, LoadingError } from '@/components/LoadingSpinner';
import { machinesApi, alertsApi, predictionsApi, sensorsApi } from '@/services/api';
import { getRiskStyles } from '@/utils/styles';
import { timeAgo } from '@/utils/formatters';
import type { SensorReading } from '@/types';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Temperature');
  const [selectedMachineId] = useState('CNC-001');

  const { data: machines, isLoading: machinesLoading } = useQuery({
    queryKey: ['machines'],
    queryFn: machinesApi.getAll,
  });
  const { data: alerts } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => alertsApi.getAll('Critical'),
  });
  const { data: predictions } = useQuery({
    queryKey: ['predictions'],
    queryFn: predictionsApi.getAll,
  });
  const { data: sensorData } = useQuery({
    queryKey: ['sensors', selectedMachineId],
    queryFn: () => sensorsApi.getReadings(selectedMachineId, 20),
  });

  const sensorTabs = [
    { name: 'Temperature', icon: Thermometer, color: '#f97316' },
    { name: 'Vibration', icon: Vibrate, color: '#3b82f6' },
    { name: 'RPM', icon: Gauge, color: '#10b981' },
  ];

  const getChartData = () => {
    if (!sensorData || sensorData.length === 0) return { data: [], color: '#f97316' };
    const key = activeTab.toLowerCase() as keyof SensorReading;
    const tab = sensorTabs.find(t => t.name === activeTab);
    return {
      data: sensorData.map((r: SensorReading) => ({
        time: new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        value: Number(r[key]) || 0,
      })),
      color: tab?.color || '#f97316',
    };
  };

  if (machinesLoading) return <LoadingSpinner size="lg" />;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-slate-400 mt-1">Real-time monitoring and predictive insights</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock className="w-4 h-4" />
          <span>Live — Auto-refreshing</span>
        </div>
      </div>

      {/* Metrics from API */}
      <DashboardStats />

      {/* Sensor Chart + Machine Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 lg:col-span-2 animate-slide-up stagger-5">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Real-time Sensor Data</h2>
              <p className="text-sm text-slate-400">Live monitoring feed</p>
            </div>
            <div className="flex gap-2">
              {sensorTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.name;
                return (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${isActive
                        ? 'text-white'
                        : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                    style={isActive ? { backgroundColor: tab.color + '20', color: tab.color } : {}}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="h-64">
            <SensorChart
              title={activeTab}
              data={getChartData().data}
              color={getChartData().color}
            />
          </div>
        </div>

        {/* Machine Status — from API */}
        <div className="glass-card p-6 animate-slide-up stagger-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Machine Status</h2>
            <Link href="/machines" className="text-sm text-cyan-400 font-medium hover:text-cyan-300 flex items-center gap-1 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {(machines || []).slice(0, 5).map((m) => {
              const isCritical = m.status === 'Critical';
              const isWarning = m.status === 'Warning';
              return (
                <div
                  key={m.id}
                  className={`flex justify-between items-center p-3 rounded-xl transition-all duration-200 hover:bg-slate-700/30 ${isCritical ? 'bg-rose-500/5 border border-rose-500/20' : isWarning ? 'bg-amber-500/5 border border-amber-500/20' : 'bg-slate-800/30'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`status-dot ${isCritical ? 'status-dot-critical' : isWarning ? 'status-dot-warning' : 'status-dot-healthy'}`} />
                    <div>
                      <p className="font-medium text-white">{m.id}</p>
                      <p className="text-xs text-slate-500">{m.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${isCritical ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {m.status}
                    </p>
                    <p className="text-xs text-slate-500">{m.temperature.toFixed(1)}°C</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Alerts + Predictions — from API */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-rose-500/20">
                <Bell className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Recent Alerts</h2>
                <p className="text-sm text-slate-400">From live monitoring</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {(alerts || []).slice(0, 3).map((alert) => (
              <div key={alert.id} className="relative p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:border-rose-400/50 transition-all">
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 text-xs font-bold text-white bg-rose-500 rounded-lg animate-pulse">CRITICAL</span>
                </div>
                <p className="text-sm font-semibold text-rose-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  {alert.title}
                </p>
                <p className="text-sm text-slate-300 mt-1">{alert.machine_id}: {alert.message}</p>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {timeAgo(alert.created_at)}
                </p>
              </div>
            ))}
          </div>
          <Link href="/alerts" className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
            View All Alerts <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="glass-card p-6 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-purple-500/20">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Predictive Analysis</h2>
              <p className="text-sm text-slate-400">ML-powered maintenance insights</p>
            </div>
          </div>
          <div className="space-y-3">
            {(predictions || []).slice(0, 3).map((item) => {
              const styles = getRiskStyles(item.risk_level);
              return (
                <div key={item.id} className={`p-4 rounded-xl ${styles.bg} border ${styles.border} hover:border-opacity-60 transition-all`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-white">{item.machine_id}</p>
                    <span className={`px-2 py-1 text-xs font-bold text-white ${styles.badge} rounded-lg`}>
                      {item.risk_level} RISK
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">{item.prediction_text}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${styles.badge} rounded-full transition-all duration-1000`}
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-400">{item.confidence.toFixed(1)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/predictions" className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
            View All Predictions <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}