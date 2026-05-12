/**
 * Centralized mock data — Single source of truth.
 * All pages pull from here. No more contradictory data across pages.
 */
import type { Machine, Alert, Prediction, MaintenanceTask, SensorReading, DashboardStats } from '@/types';

export const mockMachines: Machine[] = [
  {
    id: 'CNC-001', name: 'CNC Lathe #1', type: 'CNC', location: 'Line A',
    status: 'Warning', health_score: 72, temperature: 78, vibration: 0.045,
    rpm: 1520, operating_hours: 8500, days_since_maintenance: 12,
    last_maintenance_date: '2026-05-01T10:00:00Z', next_maintenance_date: '2026-05-20T10:00:00Z',
    uptime: 94.2, machine_age_days: 1200,
    issues: ['Elevated temperature: 78.0°C'],
  },
  {
    id: 'PRESS-002', name: 'Hydraulic Press #2', type: 'Press', location: 'Line B',
    status: 'Healthy', health_score: 95, temperature: 64, vibration: 0.028,
    rpm: 1480, operating_hours: 3200, days_since_maintenance: 5,
    last_maintenance_date: '2026-05-08T10:00:00Z', next_maintenance_date: '2026-06-05T10:00:00Z',
    uptime: 99.1, machine_age_days: 450, issues: [],
  },
  {
    id: 'PUMP-003', name: 'Water Pump #3', type: 'Pump', location: 'Water Treatment',
    status: 'Healthy', health_score: 82, temperature: 74, vibration: 0.052,
    rpm: 1500, operating_hours: 5600, days_since_maintenance: 8,
    last_maintenance_date: '2026-05-05T10:00:00Z', next_maintenance_date: '2026-05-28T10:00:00Z',
    uptime: 97.3, machine_age_days: 800, issues: [],
  },
  {
    id: 'FAN-004', name: 'Cooling Fan #4', type: 'Fan', location: 'Cooling System',
    status: 'Critical', health_score: 38, temperature: 98, vibration: 0.082,
    rpm: 2100, operating_hours: 7800, days_since_maintenance: 45,
    last_maintenance_date: '2026-03-29T10:00:00Z', next_maintenance_date: '2026-05-15T10:00:00Z',
    uptime: 88.5, machine_age_days: 1500,
    issues: ['Critical temperature: 98.0°C', 'Excessive vibration: 0.0820 mm/s', 'Overdue for maintenance'],
  },
  {
    id: 'CONV-005', name: 'Conveyor Belt #5', type: 'Conveyor', location: 'Line C',
    status: 'Healthy', health_score: 97, temperature: 48, vibration: 0.022,
    rpm: 800, operating_hours: 2100, days_since_maintenance: 3,
    last_maintenance_date: '2026-05-10T10:00:00Z', next_maintenance_date: '2026-06-15T10:00:00Z',
    uptime: 99.8, machine_age_days: 300, issues: [],
  },
  {
    id: 'DRILL-006', name: 'Drill Press #6', type: 'Drill', location: 'Line A',
    status: 'Healthy', health_score: 91, temperature: 58, vibration: 0.035,
    rpm: 1200, operating_hours: 4500, days_since_maintenance: 7,
    last_maintenance_date: '2026-05-06T10:00:00Z', next_maintenance_date: '2026-06-01T10:00:00Z',
    uptime: 98.2, machine_age_days: 600, issues: [],
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 1, machine_id: 'FAN-004', type: 'Critical', title: 'High Temperature Alert',
    message: 'Temperature exceeded 95°C threshold (98.0°C)',
    acknowledged: false, created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: 2, machine_id: 'FAN-004', type: 'Critical', title: 'Vibration Alert',
    message: 'Vibration exceeded safe threshold (0.0820 mm/s)',
    acknowledged: false, created_at: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
  {
    id: 3, machine_id: 'FAN-004', type: 'Warning', title: 'Maintenance Overdue',
    message: '45 days since last maintenance — immediate service recommended',
    acknowledged: false, created_at: new Date(Date.now() - 8 * 3600000).toISOString(),
  },
  {
    id: 4, machine_id: 'CNC-001', type: 'Warning', title: 'Temperature Warning',
    message: 'Temperature slightly elevated (78°C)',
    acknowledged: true, created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    id: 5, machine_id: 'PUMP-003', type: 'Info', title: 'Maintenance Scheduled',
    message: 'Routine maintenance scheduled in 20 days',
    acknowledged: true, created_at: new Date(Date.now() - 48 * 3600000).toISOString(),
  },
];

export const mockPredictions: Prediction[] = [
  {
    id: 1, machine_id: 'CNC-001', risk_level: 'HIGH', confidence: 74.8,
    prediction_text: 'CRITICAL: Immediate maintenance required due to multiple risk factors. Estimated 45 days to potential failure.',
    days_to_failure: 45, failure_probability: 0.748,
    feature_importance: JSON.stringify({ days_since_maintenance: 0.493, operating_hours: 0.136, vibration: 0.135, temperature: 0.115, machine_age_days: 0.072, rpm: 0.049 }),
    created_at: new Date().toISOString(),
  },
  {
    id: 2, machine_id: 'PRESS-002', risk_level: 'LOW', confidence: 97.7,
    prediction_text: 'Operating within normal parameters. Continue routine monitoring. Next maintenance recommended in ~64 days.',
    days_to_failure: 64, failure_probability: 0.023,
    feature_importance: JSON.stringify({ days_since_maintenance: 0.493, operating_hours: 0.136, vibration: 0.135, temperature: 0.115, machine_age_days: 0.072, rpm: 0.049 }),
    created_at: new Date().toISOString(),
  },
  {
    id: 3, machine_id: 'PUMP-003', risk_level: 'LOW', confidence: 85.7,
    prediction_text: 'Operating within normal parameters. Continue routine monitoring. Next maintenance recommended in ~54 days.',
    days_to_failure: 54, failure_probability: 0.143,
    feature_importance: JSON.stringify({ days_since_maintenance: 0.493, operating_hours: 0.136, vibration: 0.135, temperature: 0.115, machine_age_days: 0.072, rpm: 0.049 }),
    created_at: new Date().toISOString(),
  },
  {
    id: 4, machine_id: 'FAN-004', risk_level: 'HIGH', confidence: 97.9,
    prediction_text: 'CRITICAL: Immediate maintenance required due to critical temperature levels and excessive vibration. Estimated 27 days to potential failure.',
    days_to_failure: 27, failure_probability: 0.979,
    feature_importance: JSON.stringify({ days_since_maintenance: 0.493, operating_hours: 0.136, vibration: 0.135, temperature: 0.115, machine_age_days: 0.072, rpm: 0.049 }),
    created_at: new Date().toISOString(),
  },
  {
    id: 5, machine_id: 'CONV-005', risk_level: 'MEDIUM', confidence: 53.8,
    prediction_text: 'Monitor closely and schedule preventive maintenance within 48 days. Early intervention recommended.',
    days_to_failure: 48, failure_probability: 0.462,
    feature_importance: JSON.stringify({ days_since_maintenance: 0.493, operating_hours: 0.136, vibration: 0.135, temperature: 0.115, machine_age_days: 0.072, rpm: 0.049 }),
    created_at: new Date().toISOString(),
  },
  {
    id: 6, machine_id: 'DRILL-006', risk_level: 'MEDIUM', confidence: 57.9,
    prediction_text: 'Monitor closely and schedule preventive maintenance within 50 days. Early intervention recommended.',
    days_to_failure: 50, failure_probability: 0.579,
    feature_importance: JSON.stringify({ days_since_maintenance: 0.493, operating_hours: 0.136, vibration: 0.135, temperature: 0.115, machine_age_days: 0.072, rpm: 0.049 }),
    created_at: new Date().toISOString(),
  },
];

export let mockMaintenanceTasks: MaintenanceTask[] = [
  { id: 1, machine_id: 'PUMP-003', title: 'Filter Replacement', technician: 'Sarah Lewis', scheduled_date: '2026-05-14', scheduled_time: '10:00', priority: 'LOW', status: 'Scheduled', created_at: new Date().toISOString() },
  { id: 2, machine_id: 'PRESS-002', title: 'Emergency Bearing Check', technician: 'Tom Rodriguez', scheduled_date: '2026-05-13', scheduled_time: '14:00', priority: 'HIGH', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 3, machine_id: 'CNC-001', title: 'Oil Change & Lubrication', technician: 'Mike Thompson', scheduled_date: '2026-05-15', scheduled_time: '09:00', priority: 'MEDIUM', status: 'Scheduled', created_at: new Date().toISOString() },
  { id: 4, machine_id: 'CONV-005', title: 'Belt Tension Adjustment', technician: 'Emily Chen', scheduled_date: '2026-05-17', scheduled_time: '11:00', priority: 'LOW', status: 'Scheduled', created_at: new Date().toISOString() },
  { id: 5, machine_id: 'FAN-004', title: 'Motor Inspection', technician: 'David Park', scheduled_date: '2026-05-18', scheduled_time: '15:00', priority: 'HIGH', status: 'Scheduled', created_at: new Date().toISOString() },
  { id: 6, machine_id: 'DRILL-006', title: 'Calibration Check', technician: 'Sarah Lewis', scheduled_date: '2026-05-10', scheduled_time: '10:00', priority: 'LOW', status: 'Completed', created_at: new Date().toISOString() },
];

/** Generate mock sensor readings for charts */
export function generateSensorReadings(machineId: string, count = 20): SensorReading[] {
  const machine = mockMachines.find(m => m.id === machineId) || mockMachines[0];
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    machine_id: machineId,
    temperature: machine.temperature + (Math.random() - 0.5) * 6,
    vibration: machine.vibration + (Math.random() - 0.5) * 0.01,
    rpm: machine.rpm + (Math.random() - 0.5) * 40,
    timestamp: new Date(now - (count - i) * 5 * 60000).toISOString(),
  }));
}

export const mockDashboardStats: DashboardStats = {
  total_machines: mockMachines.length,
  critical_alerts: mockAlerts.filter(a => a.type === 'Critical' && !a.acknowledged).length,
  healthy_percentage: Math.round((mockMachines.filter(m => m.status === 'Healthy').length / mockMachines.length) * 100),
  pending_tasks: mockMaintenanceTasks.filter(t => t.status !== 'Completed').length,
  machines_trend: 8, alerts_trend: -25, health_trend: 5, tasks_trend: -10,
};

export const mockTechnicians = ['Sarah Lewis', 'Tom Rodriguez', 'Mike Thompson', 'Emily Chen', 'David Park'];

let nextTaskId = 7;
let nextAlertId = 6;

/** Mutable operations (so UI interactions actually work) */
export const mockOps = {
  acknowledgeAlert: (id: number) => {
    const alert = mockAlerts.find(a => a.id === id);
    if (alert) alert.acknowledged = true;
  },
  createTask: (task: Omit<MaintenanceTask, 'id' | 'status' | 'created_at'>) => {
    const newTask: MaintenanceTask = { ...task, id: nextTaskId++, status: 'Scheduled', created_at: new Date().toISOString() };
    mockMaintenanceTasks = [newTask, ...mockMaintenanceTasks];
    return newTask;
  },
  updateTaskStatus: (id: number, status: MaintenanceTask['status']) => {
    const task = mockMaintenanceTasks.find(t => t.id === id);
    if (task) task.status = status;
  },
};
