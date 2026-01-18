import { useState } from 'react';
import { Settings, User, Bell, Shield, Palette, Database, Mail, Smartphone, Globe, Moon, Sun, Volume2, Save, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
    const [darkMode, setDarkMode] = useState(true);
    const [notifications, setNotifications] = useState({ email: true, push: true, sms: false, critical: true, warnings: true, maintenance: true });
    const [saved, setSaved] = useState(false);

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    return (
        <div className="p-6 space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-slate-400 mt-1">Manage your dashboard preferences</p>
            </div>

            {/* Profile Settings */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-cyan-500/20"><User className="w-5 h-5 text-cyan-400" /></div>
                    <h2 className="text-lg font-semibold text-white">Profile Settings</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                        <input type="text" defaultValue="Admin User" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                        <input type="email" defaultValue="admin@predictive.io" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                        <select className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50">
                            <option>System Manager</option>
                            <option>Operator</option>
                            <option>Technician</option>
                            <option>Viewer</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Timezone</label>
                        <select className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50">
                            <option>Asia/Kolkata (IST)</option>
                            <option>America/New_York (EST)</option>
                            <option>Europe/London (GMT)</option>
                            <option>Asia/Tokyo (JST)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-amber-500/20"><Bell className="w-5 h-5 text-amber-400" /></div>
                    <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl">
                        <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-slate-400" /><div><p className="text-white font-medium">Email Notifications</p><p className="text-sm text-slate-500">Receive alerts via email</p></div></div>
                        <button onClick={() => setNotifications({ ...notifications, email: !notifications.email })} className={`w-12 h-6 rounded-full transition-all ${notifications.email ? 'bg-cyan-500' : 'bg-slate-700'}`}><div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-0.5'}`} /></button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl">
                        <div className="flex items-center gap-3"><Smartphone className="w-5 h-5 text-slate-400" /><div><p className="text-white font-medium">Push Notifications</p><p className="text-sm text-slate-500">Browser push notifications</p></div></div>
                        <button onClick={() => setNotifications({ ...notifications, push: !notifications.push })} className={`w-12 h-6 rounded-full transition-all ${notifications.push ? 'bg-cyan-500' : 'bg-slate-700'}`}><div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.push ? 'translate-x-6' : 'translate-x-0.5'}`} /></button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl">
                        <div className="flex items-center gap-3"><Volume2 className="w-5 h-5 text-slate-400" /><div><p className="text-white font-medium">SMS Alerts</p><p className="text-sm text-slate-500">Critical alerts via SMS</p></div></div>
                        <button onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })} className={`w-12 h-6 rounded-full transition-all ${notifications.sms ? 'bg-cyan-500' : 'bg-slate-700'}`}><div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.sms ? 'translate-x-6' : 'translate-x-0.5'}`} /></button>
                    </div>
                </div>
            </div>

            {/* Alert Types */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-rose-500/20"><Shield className="w-5 h-5 text-rose-400" /></div>
                    <h2 className="text-lg font-semibold text-white">Alert Types</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-xl border cursor-pointer transition-all ${notifications.critical ? 'bg-rose-500/10 border-rose-500/30' : 'bg-slate-800/30 border-slate-700/50'}`} onClick={() => setNotifications({ ...notifications, critical: !notifications.critical })}>
                        <div className="flex items-center justify-between mb-2"><span className="px-2 py-0.5 text-xs font-bold bg-rose-500 text-white rounded">CRITICAL</span>{notifications.critical && <CheckCircle className="w-4 h-4 text-rose-400" />}</div>
                        <p className="text-sm text-slate-400">Temperature exceeds threshold, system failures</p>
                    </div>
                    <div className={`p-4 rounded-xl border cursor-pointer transition-all ${notifications.warnings ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-800/30 border-slate-700/50'}`} onClick={() => setNotifications({ ...notifications, warnings: !notifications.warnings })}>
                        <div className="flex items-center justify-between mb-2"><span className="px-2 py-0.5 text-xs font-bold bg-amber-500 text-white rounded">WARNING</span>{notifications.warnings && <CheckCircle className="w-4 h-4 text-amber-400" />}</div>
                        <p className="text-sm text-slate-400">Approaching limits, performance degradation</p>
                    </div>
                    <div className={`p-4 rounded-xl border cursor-pointer transition-all ${notifications.maintenance ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-slate-800/30 border-slate-700/50'}`} onClick={() => setNotifications({ ...notifications, maintenance: !notifications.maintenance })}>
                        <div className="flex items-center justify-between mb-2"><span className="px-2 py-0.5 text-xs font-bold bg-cyan-500 text-white rounded">MAINTENANCE</span>{notifications.maintenance && <CheckCircle className="w-4 h-4 text-cyan-400" />}</div>
                        <p className="text-sm text-slate-400">Scheduled maintenance, routine reminders</p>
                    </div>
                </div>
            </div>

            {/* Appearance */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-purple-500/20"><Palette className="w-5 h-5 text-purple-400" /></div>
                    <h2 className="text-lg font-semibold text-white">Appearance</h2>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl">
                    <div className="flex items-center gap-3">{darkMode ? <Moon className="w-5 h-5 text-slate-400" /> : <Sun className="w-5 h-5 text-amber-400" />}<div><p className="text-white font-medium">Dark Mode</p><p className="text-sm text-slate-500">Use dark theme for the dashboard</p></div></div>
                    <button onClick={() => setDarkMode(!darkMode)} className={`w-12 h-6 rounded-full transition-all ${darkMode ? 'bg-cyan-500' : 'bg-slate-700'}`}><div className={`w-5 h-5 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} /></button>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                    {saved ? <><CheckCircle className="w-5 h-5" />Saved!</> : <><Save className="w-5 h-5" />Save Changes</>}
                </button>
            </div>
        </div>
    );
}
