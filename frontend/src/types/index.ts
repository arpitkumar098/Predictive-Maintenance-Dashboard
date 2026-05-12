/**
 * TypeScript type definitions for the Predictive Maintenance Dashboard.
 * These mirror the backend Pydantic schemas to ensure type safety.
 */

export interface Machine {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'Healthy' | 'Warning' | 'Critical';
  health_score: number;
  temperature: number;
  vibration: number;
  rpm: number;
  operating_hours: number;
  days_since_maintenance: number;
  last_maintenance_date: string | null;
  next_maintenance_date: string | null;
  uptime: number;
  machine_age_days: number;
  issues: string[];
}

export interface Alert {
  id: number;
  machine_id: string;
  type: 'Critical' | 'Warning' | 'Info';
  title: string;
  message: string;
  acknowledged: boolean;
  created_at: string;
}

export interface MaintenanceTask {
  id: number;
  machine_id: string;
  title: string;
  technician: string;
  scheduled_date: string;
  scheduled_time: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  notes?: string;
  created_at: string;
}

export interface MaintenanceCreate {
  machine_id: string;
  title: string;
  technician: string;
  scheduled_date: string;
  scheduled_time: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  notes?: string;
}

export interface Prediction {
  id: number;
  machine_id: string;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  confidence: number;
  prediction_text: string;
  days_to_failure: number;
  failure_probability: number;
  feature_importance: string | null;
  created_at: string;
}

export interface SensorReading {
  id: number;
  machine_id: string;
  temperature: number;
  vibration: number;
  rpm: number;
  timestamp: string;
}

export interface DashboardStats {
  total_machines: number;
  critical_alerts: number;
  healthy_percentage: number;
  pending_tasks: number;
  machines_trend: number;
  alerts_trend: number;
  health_trend: number;
  tasks_trend: number;
}

export interface SensorUpdate {
  machine_id: string;
  temperature: number;
  vibration: number;
  rpm: number;
  status: string;
  health_score: number;
  timestamp: string;
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type AlertType = 'Critical' | 'Warning' | 'Info';
export type MachineStatus = 'Healthy' | 'Warning' | 'Critical';
export type TaskStatus = 'Scheduled' | 'In Progress' | 'Completed';
