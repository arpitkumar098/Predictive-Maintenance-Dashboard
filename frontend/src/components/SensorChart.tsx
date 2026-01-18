import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SensorChartProps {
    title: string;
    data: { time: string; value: number }[];
    color: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: { value: number }[];
    label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        return (
            <div className="glass-card p-3 border border-slate-600/50">
                <p className="text-slate-400 text-xs mb-1">{label}</p>
                <p className="text-white font-bold text-lg">{payload[0].value}</p>
            </div>
        );
    }
    return null;
}

export default function SensorChart({ title, data, color }: SensorChartProps) {
    const gradientId = `gradient-${color.replace('#', '')}`;

    return (
        <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                            <stop offset="50%" stopColor={color} stopOpacity={0.1} />
                            <stop offset="100%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(148, 163, 184, 0.1)"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={3}
                        fill={`url(#${gradientId})`}
                        filter="url(#glow)"
                        dot={{
                            fill: color,
                            stroke: '#0f172a',
                            strokeWidth: 2,
                            r: 4,
                        }}
                        activeDot={{
                            fill: color,
                            stroke: '#fff',
                            strokeWidth: 2,
                            r: 6,
                            filter: 'url(#glow)',
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
