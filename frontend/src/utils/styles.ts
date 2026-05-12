/**
 * Shared style utilities extracted from duplicated code across pages.
 * Single source of truth for risk/status styling.
 */
import type { RiskLevel, MachineStatus, AlertType } from '@/types';

interface StatusStyles {
  dot: string;
  text: string;
  bg: string;
  border: string;
  badge: string;
}

/** Get consistent styles for machine status across all pages. */
export function getStatusStyles(status: MachineStatus | string): StatusStyles {
  switch (status) {
    case 'Critical':
      return {
        dot: 'status-dot-critical',
        text: 'text-rose-400',
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/30',
        badge: 'bg-rose-500',
      };
    case 'Warning':
      return {
        dot: 'status-dot-warning',
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        badge: 'bg-amber-500',
      };
    default:
      return {
        dot: 'status-dot-healthy',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        badge: 'bg-emerald-500',
      };
  }
}

/** Get consistent styles for risk levels across all pages. */
export function getRiskStyles(risk: RiskLevel | string): StatusStyles {
  switch (risk) {
    case 'HIGH':
      return {
        dot: 'status-dot-critical',
        text: 'text-rose-400',
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/30',
        badge: 'bg-rose-500',
      };
    case 'MEDIUM':
      return {
        dot: 'status-dot-warning',
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        badge: 'bg-amber-500',
      };
    default:
      return {
        dot: 'status-dot-healthy',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        badge: 'bg-emerald-500',
      };
  }
}

/** Get styles for alert types. */
export function getAlertStyles(type: AlertType | string) {
  switch (type) {
    case 'Critical':
      return {
        bg: 'bg-rose-500/10', border: 'border-rose-500/30',
        icon: 'text-rose-400', iconBg: 'bg-rose-500/20', badge: 'bg-rose-500',
      };
    case 'Warning':
      return {
        bg: 'bg-amber-500/10', border: 'border-amber-500/30',
        icon: 'text-amber-400', iconBg: 'bg-amber-500/20', badge: 'bg-amber-500',
      };
    default:
      return {
        bg: 'bg-cyan-500/10', border: 'border-cyan-500/30',
        icon: 'text-cyan-400', iconBg: 'bg-cyan-500/20', badge: 'bg-cyan-500',
      };
  }
}
