import { ReactNode, useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Bell, Search, User, Clock, AlertTriangle, CheckCircle, LogOut, Settings, UserCircle, ChevronRight } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const notifications = [
  { id: 1, type: 'critical', title: 'High Temperature Alert', message: 'CNC-001 exceeded 100°C', time: '17 hours ago', read: false },
  { id: 2, type: 'critical', title: 'Overheating Alert', message: 'FAN-004 exceeded 110°C', time: '18 hours ago', read: false },
  { id: 3, type: 'warning', title: 'Maintenance Due', message: 'PRESS-002 needs inspection', time: '1 day ago', read: true },
];

export default function Layout({ children }: LayoutProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-950 bg-mesh flex">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-64">
        {/* Fixed Navbar with higher z-index */}
        <header className="h-16 bg-slate-950/95 backdrop-blur-xl border-b border-slate-700/50 flex items-center justify-between px-6 sticky top-0 z-50 shadow-lg shadow-slate-950/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search machines, alerts..."
              className="w-80 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
                className="relative p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-all group"
              >
                <Bell className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full text-xs flex items-center justify-center text-white font-medium animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl shadow-black/80 overflow-hidden animate-slide-up z-[100]">
                  <div className="p-4 border-b border-slate-700/50 bg-slate-800/50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      <span className="text-xs text-cyan-400">{unreadCount} unread</span>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors cursor-pointer ${!notif.read ? 'bg-slate-800/30' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${notif.type === 'critical' ? 'bg-rose-500/20' : 'bg-amber-500/20'}`}>
                            <AlertTriangle className={`w-4 h-4 ${notif.type === 'critical' ? 'text-rose-400' : 'text-amber-400'}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-white">{notif.title}</p>
                              {!notif.read && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{notif.message}</p>
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {notif.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-slate-700/50 bg-slate-800/30">
                    <a href="/alerts" className="flex items-center justify-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                      View all notifications <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
                className="flex items-center gap-3 pl-4 border-l border-slate-700/50 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-200">Admin User</p>
                  <p className="text-xs text-slate-500">System Manager</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-14 w-64 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl shadow-black/80 overflow-hidden animate-slide-up z-[100]">
                  <div className="p-4 border-b border-slate-700/50 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Admin User</p>
                        <p className="text-xs text-slate-400">admin@predictive.io</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-b border-slate-700/50">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-2 bg-slate-800/50 rounded-lg">
                        <p className="text-lg font-bold text-cyan-400">24</p>
                        <p className="text-xs text-slate-500">Machines</p>
                      </div>
                      <div className="p-2 bg-slate-800/50 rounded-lg">
                        <p className="text-lg font-bold text-emerald-400">87%</p>
                        <p className="text-xs text-slate-500">Uptime</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all">
                      <UserCircle className="w-4 h-4" />
                      <span className="text-sm">My Profile</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Activity Log</span>
                    </a>
                  </div>

                  <div className="p-2 border-t border-slate-700/50">
                    <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-all">
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
