import { useEffect, useState } from 'react';
import { Cpu, AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: number;
    suffix?: string;
    trend?: number;
    trendLabel?: string;
    icon: React.ReactNode;
    gradient: string;
    delay: number;
}

function StatCard({ title, value, suffix = '', trend, trendLabel, icon, gradient, delay }: StatCardProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay * 100);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 1500;
        const steps = 60;
        const stepValue = value / steps;
        let current = 0;

        const interval = setInterval(() => {
            current += stepValue;
            if (current >= value) {
                setDisplayValue(value);
                clearInterval(interval);
            } else {
                setDisplayValue(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(interval);
    }, [value, isVisible]);

    const isPositiveTrend = trend && trend > 0;

    return (
        <div
            className={`glass-card p-6 card-hover opacity-0 ${isVisible ? 'animate-slide-up' : ''}`}
            style={{ animationDelay: `${delay * 0.1}s` }}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${gradient}`}>
                    {icon}
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${isPositiveTrend ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                        {isPositiveTrend ? (
                            <TrendingUp className="w-4 h-4" />
                        ) : (
                            <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <p className="text-slate-400 text-sm font-medium">{title}</p>
                <p className="text-3xl font-bold text-white">
                    {displayValue.toLocaleString()}{suffix}
                </p>
                {trendLabel && (
                    <p className="text-xs text-slate-500">{trendLabel}</p>
                )}
            </div>
        </div>
    );
}

export default function DashboardStats() {
    const stats = [
        {
            title: 'Active Machines',
            value: 24,
            trend: 8,
            trendLabel: 'vs last month',
            icon: <Cpu className="w-6 h-6 text-white" />,
            gradient: 'bg-gradient-primary',
        },
        {
            title: 'Critical Alerts',
            value: 3,
            trend: -25,
            trendLabel: 'vs last week',
            icon: <AlertTriangle className="w-6 h-6 text-white" />,
            gradient: 'bg-gradient-danger',
        },
        {
            title: 'Healthy Systems',
            value: 87,
            suffix: '%',
            trend: 5,
            trendLabel: 'improvement',
            icon: <CheckCircle className="w-6 h-6 text-white" />,
            gradient: 'bg-gradient-success',
        },
        {
            title: 'Pending Tasks',
            value: 12,
            trend: -10,
            trendLabel: 'completing soon',
            icon: <Clock className="w-6 h-6 text-white" />,
            gradient: 'bg-gradient-warning',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <StatCard
                    key={stat.title}
                    {...stat}
                    delay={index + 1}
                />
            ))}
        </div>
    );
}
