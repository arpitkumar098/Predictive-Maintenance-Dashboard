/**
 * API client — Mock implementation (frontend-only mode).
 *
 * Returns centralized mock data with simulated async delays.
 * Pages use this through react-query and don't know the data is local.
 * To connect a real backend later, just replace these functions with fetch() calls.
 */
import type { MaintenanceCreate, MaintenanceTask } from '@/types';
import {
  mockMachines, mockAlerts, mockPredictions, mockMaintenanceTasks,
  mockDashboardStats, mockTechnicians, generateSensorReadings, mockOps,
} from '@/data/mockData';

const delay = (ms = 200) => new Promise(r => setTimeout(r, ms));

// --- Machines ---
export const machinesApi = {
  getAll: async () => { await delay(300); return [...mockMachines]; },
  getById: async (id: string) => { await delay(200); return mockMachines.find(m => m.id === id)!; },
};

// --- Alerts ---
export const alertsApi = {
  getAll: async (type?: string) => {
    await delay(300);
    if (type && type !== 'All') return mockAlerts.filter(a => a.type === type);
    return [...mockAlerts];
  },
  acknowledge: async (id: number) => {
    await delay(200);
    mockOps.acknowledgeAlert(id);
    return mockAlerts.find(a => a.id === id)!;
  },
  getStats: async () => {
    await delay(100);
    return {
      critical_unread: mockAlerts.filter(a => a.type === 'Critical' && !a.acknowledged).length,
      warning_unread: mockAlerts.filter(a => a.type === 'Warning' && !a.acknowledged).length,
      total: mockAlerts.length,
    };
  },
};

// --- Predictions ---
export const predictionsApi = {
  getAll: async () => { await delay(400); return [...mockPredictions]; },
  predict: async (machineId: string) => {
    await delay(500);
    return mockPredictions.find(p => p.machine_id === machineId)!;
  },
  predictAll: async () => {
    await delay(800);
    return { predictions: mockPredictions, count: mockPredictions.length };
  },
  getStats: async () => {
    await delay(100);
    return {
      high: mockPredictions.filter(p => p.risk_level === 'HIGH').length,
      medium: mockPredictions.filter(p => p.risk_level === 'MEDIUM').length,
      low: mockPredictions.filter(p => p.risk_level === 'LOW').length,
    };
  },
};

// --- Maintenance ---
export const maintenanceApi = {
  getAll: async (status?: string) => {
    await delay(300);
    if (status && status !== 'All') return mockMaintenanceTasks.filter(t => t.status === status);
    return [...mockMaintenanceTasks];
  },
  create: async (task: MaintenanceCreate) => {
    await delay(300);
    return mockOps.createTask(task as unknown as Omit<MaintenanceTask, 'id' | 'status' | 'created_at'>);
  },
  updateStatus: async (id: number, status: string) => {
    await delay(200);
    mockOps.updateTaskStatus(id, status as MaintenanceTask['status']);
    return mockMaintenanceTasks.find(t => t.id === id)!;
  },
  getStats: async () => {
    await delay(100);
    return {
      scheduled: mockMaintenanceTasks.filter(t => t.status === 'Scheduled').length,
      in_progress: mockMaintenanceTasks.filter(t => t.status === 'In Progress').length,
      completed: mockMaintenanceTasks.filter(t => t.status === 'Completed').length,
    };
  },
  getTechnicians: async () => { await delay(100); return mockTechnicians; },
};

// --- Sensors ---
export const sensorsApi = {
  getReadings: async (machineId: string, limit = 20) => {
    await delay(300);
    return generateSensorReadings(machineId, limit);
  },
  getDashboardStats: async () => { await delay(200); return { ...mockDashboardStats }; },
};

// --- Health ---
export const healthApi = {
  check: async () => ({ status: 'healthy', ml_loaded: false, simulator_running: false }),
};
