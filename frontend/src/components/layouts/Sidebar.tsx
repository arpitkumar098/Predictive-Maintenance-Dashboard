import { useLocation, Link } from 'wouter';
import {
    LayoutDashboard,
    Cpu,
    AlertTriangle,
    Wrench,
    Brain,
    FileText,
    Activity,
    Settings,
    HelpCircle
} from 'lucide-react';

const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/machines', label: 'Machines', icon: Cpu },
    { path: '/alerts', label: 'Alerts', icon: AlertTriangle },
    { path: '/maintenance', label: 'Maintenance', icon: Wrench },
    { path: '/predictions', label: 'Predictions', icon: Brain },
    { path: '/reports', label: 'Reports', icon: FileText },
];

const bottomNavItems = [
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/help', label: 'Help Center', icon: HelpCircle },
];

export default function Sidebar() {
    const [location] = useLocation();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 glass border-r border-slate-700/50 flex flex-col z-50">
            {/* Logo Section */}
            <div className="h-20 flex items-center gap-4 px-5 border-b border-slate-700/50">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center animate-glow-pulse shadow-lg shadow-cyan-500/30">
                    <Activity className="w-7 h-7 text-white" />
                </div>
                <div>
                    <h1 className="text-base font-bold text-white">Predictive</h1>
                    <p className="text-sm font-medium text-cyan-400">Maintenance Dashboard</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                <p className="px-3 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Main Menu
                </p>
                {navItems.map((item) => {
                    const isActive = location === item.path;
                    const Icon = item.icon;

                    return (
                        <Link key={item.path} href={item.path}>
                            <a
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                    }`}
                            >
                                <div className={`p-1.5 rounded-lg transition-all ${isActive
                                    ? 'bg-cyan-500/20'
                                    : 'bg-slate-800/50 group-hover:bg-slate-700/50'
                                    }`}>
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : ''}`} />
                                </div>
                                <span className="font-medium">{item.label}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                )}
                            </a>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section - Settings & Help */}
            <div className="mt-auto py-4 px-3 border-t border-slate-700/50 space-y-1">
                {bottomNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link key={item.path} href={item.path}>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-200">
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </a>
                        </Link>
                    );
                })}
            </div>

            {/* System Status */}
            <div className="m-3 p-4 glass-card">
                <div className="flex items-center gap-2 mb-2">
                    <div className="status-dot status-dot-healthy" />
                    <span className="text-sm font-medium text-slate-300">System Online</span>
                </div>
                <p className="text-xs text-slate-500">All systems operational</p>
                <div className="mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
                </div>
                <p className="mt-1 text-xs text-slate-500">85% uptime this month</p>
            </div>
        </aside>
    );
}
