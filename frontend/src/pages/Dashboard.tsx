import { useState } from 'react';
import { Bell, Thermometer, Vibrate, Gauge, ChevronRight, Clock, User, Plus, Sparkles } from 'lucide-react';
import DashboardStats from '../components/Dashboard/DashboardStats';
import SensorChart from '@/components/SensorChart';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Temperature');

  const sensorTabs = [
    { name: 'Temperature', icon: Thermometer, color: '#f97316' },
    { name: 'Vibration', icon: Vibrate, color: '#3b82f6' },
    { name: 'RPM', icon: Gauge, color: '#10b981' },
  ];

  const machines = [
    { name: 'CNC-001', status: 'Critical', temp: 79, line: 'Line A' },
    { name: 'PRESS-002', status: 'Healthy', temp: 64, line: 'Line B' },
    { name: 'PUMP-003', status: 'Healthy', temp: 71, line: 'Water Treatment' },
    { name: 'FAN-004', status: 'Critical', temp: 99, line: 'Cooling System' },
    { name: 'CONV-005', status: 'Critical', temp: 104, line: 'Line C' },
  ];

  const alerts = [
    { machine: 'CNC-001', msg: 'Temperature exceeded 100°C (100.4°C)', time: '17 hours ago' },
    { machine: 'CONV-005', msg: 'Temperature exceeded 100°C (100.2°C)', time: '18 hours ago' },
    { machine: 'FAN-004', msg: 'Temperature exceeded 110°C threshold', time: '19 hours ago' },
  ];

  const predictions = [
    { id: 'CNC-001', msg: 'Continue normal operation, schedule routine maintenance', risk: 'LOW', confidence: 87 },
    { id: 'PRESS-002', msg: 'Schedule immediate inspection and maintenance', risk: 'HIGH', confidence: 89 },
    { id: 'PUMP-003', msg: 'Monitor closely, consider preventive maintenance', risk: 'MEDIUM', confidence: 72 },
  ];

  const maintenanceSchedule = [
    {
      label: 'Today',
      tasks: [
        { title: 'Filter Replacement', machine: 'PUMP-003', person: 'Sarah Lewis', risk: 'LOW' },
        { title: 'Emergency Check', machine: 'PRESS-002', person: 'Tom Rodriguez', risk: 'HIGH' },
      ],
    },
    { label: 'Tomorrow', tasks: [] },
    {
      label: 'This Week',
      tasks: [
        { title: 'Oil Change', machine: 'CNC-001', person: 'Mike Thompson', risk: 'MEDIUM' },
      ],
    },
    { label: 'Next Week', tasks: [] },
  ];

  const temperatureData = [
    { time: '10:00', value: 75 },
    { time: '10:10', value: 78 },
    { time: '10:20', value: 74 },
    { time: '10:30', value: 80 },
    { time: '10:40', value: 82 },
    { time: '10:50', value: 79 },
    { time: '11:00', value: 85 },
  ];
  const vibrationData = [
    { time: '10:00', value: 0.03 },
    { time: '10:10', value: 0.05 },
    { time: '10:20', value: 0.04 },
    { time: '10:30', value: 0.06 },
    { time: '10:40', value: 0.05 },
    { time: '10:50', value: 0.07 },
    { time: '11:00', value: 0.06 },
  ];
  const rpmData = [
    { time: '10:00', value: 1500 },
    { time: '10:10', value: 1520 },
    { time: '10:20', value: 1480 },
    { time: '10:30', value: 1510 },
    { time: '10:40', value: 1490 },
    { time: '10:50', value: 1530 },
    { time: '11:00', value: 1515 },
  ];

  const getChartData = () => {
    switch (activeTab) {
      case 'Temperature': return { data: temperatureData, color: '#f97316' };
      case 'Vibration': return { data: vibrationData, color: '#3b82f6' };
      case 'RPM': return { data: rpmData, color: '#10b981' };
      default: return { data: temperatureData, color: '#f97316' };
    }
  };

  const getRiskStyles = (risk: string) => {
    switch (risk) {
      case 'HIGH':
        return {
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/30',
          badge: 'bg-rose-500',
          text: 'text-rose-400',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          badge: 'bg-amber-500',
          text: 'text-amber-400',
        };
      default:
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          badge: 'bg-emerald-500',
          text: 'text-emerald-400',
        };
    }
  };

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
          <span>Last updated: Just now</span>
        </div>
      </div>

      {/* Metrics */}
      <DashboardStats />

      {/* Sensor Chart + Machine Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Sensor */}
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

        {/* Machine Status */}
        <div className="glass-card p-6 animate-slide-up stagger-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Machine Status</h2>
            <a href="/machines" className="text-sm text-cyan-400 font-medium hover:text-cyan-300 flex items-center gap-1 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="space-y-3">
            {machines.map((m, idx) => {
              const isCritical = m.status === 'Critical';
              return (
                <div
                  key={idx}
                  className={`flex justify-between items-center p-3 rounded-xl transition-all duration-200 hover:bg-slate-700/30 ${isCritical ? 'bg-rose-500/5 border border-rose-500/20' : 'bg-slate-800/30'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`status-dot ${isCritical ? 'status-dot-critical' : 'status-dot-healthy'}`} />
                    <div>
                      <p className="font-medium text-white">{m.name}</p>
                      <p className="text-xs text-slate-500">{m.line}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${isCritical ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {m.status}
                    </p>
                    <p className="text-xs text-slate-500">{m.temp}°C</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Alerts + Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <div className="glass-card p-6 animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-rose-500/20">
                <Bell className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Recent Alerts</h2>
                <p className="text-sm text-slate-400">Updated less than a minute ago</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className="relative p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:border-rose-400/50 transition-all"
              >
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 text-xs font-bold text-white bg-rose-500 rounded-lg animate-pulse">
                    CRITICAL
                  </span>
                </div>
                <p className="text-sm font-semibold text-rose-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  High Temperature Alert
                </p>
                <p className="text-sm text-slate-300 mt-1">{alert.machine}: {alert.msg}</p>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {alert.time}
                </p>
              </div>
            ))}
          </div>
          <a href="/alerts" className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
            View All Alerts <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Predictive Analysis */}
        <div className="glass-card p-6 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-purple-500/20">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Predictive Analysis</h2>
              <p className="text-sm text-slate-400">AI-powered maintenance insights</p>
            </div>
          </div>
          <div className="space-y-3">
            {predictions.map((item, idx) => {
              const styles = getRiskStyles(item.risk);
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl ${styles.bg} border ${styles.border} hover:border-opacity-60 transition-all`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-white">{item.id}</p>
                    <span className={`px-2 py-1 text-xs font-bold text-white ${styles.badge} rounded-lg`}>
                      {item.risk} RISK
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">{item.msg}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${styles.badge} rounded-full transition-all duration-1000`}
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-400">{item.confidence}%</span>
                  </div>
                </div>
              );
            })}
          </div>
          <a href="/predictions" className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
            View All Predictions <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Upcoming Maintenance */}
      <div className="glass-card p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Upcoming Maintenance</h2>
            <p className="text-sm text-slate-400">Scheduled tasks and assignments</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {maintenanceSchedule.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <p className="font-semibold text-white border-b border-slate-700 pb-2">{section.label}</p>
              {section.tasks.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-800/30 border border-dashed border-slate-700">
                  <p className="text-slate-500 text-sm text-center">No tasks scheduled</p>
                </div>
              ) : (
                section.tasks.map((task, tIdx) => {
                  const styles = getRiskStyles(task.risk);
                  return (
                    <div
                      key={tIdx}
                      className={`p-4 rounded-xl ${styles.bg} border ${styles.border} hover:border-opacity-60 transition-all cursor-pointer`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-white text-sm">{task.title}</p>
                        <span className={`px-2 py-0.5 text-xs font-bold text-white ${styles.badge} rounded`}>
                          {task.risk}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300">{task.machine}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                        <User className="w-3 h-3" />
                        {task.person}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}