import { useState } from 'react';
import { HelpCircle, Book, MessageCircle, Video, FileText, ChevronDown, ChevronRight, Mail, Phone, Clock, ExternalLink, Search } from 'lucide-react';

const faqs = [
    { q: 'How do I add a new machine to the system?', a: 'Navigate to Machines → Click "Add Machine" → Fill in the machine details including ID, name, location, and sensor configurations → Click Save. The system will automatically start monitoring the new machine.' },
    { q: 'What do the different alert severity levels mean?', a: 'CRITICAL: Immediate action required - system failure or dangerous conditions. WARNING: Attention needed - approaching thresholds or degraded performance. INFO: Routine notifications about scheduled maintenance or system updates.' },
    { q: 'How does the predictive maintenance AI work?', a: 'Our AI analyzes historical sensor data, maintenance records, and real-time readings to predict potential failures. It uses machine learning models trained on industrial equipment data to provide confidence scores and estimated days until failure.' },
    { q: 'Can I customize notification schedules?', a: 'Yes! Go to Settings → Notification Preferences. You can enable/disable email, push, and SMS notifications. You can also choose which alert types you want to receive (Critical, Warning, Maintenance).' },
    { q: 'How often is sensor data updated?', a: 'Sensor data is collected every 10 seconds and displayed in real-time on the dashboard. Historical data is aggregated hourly for long-term analysis and reporting.' },
];

const guides = [
    { title: 'Getting Started Guide', desc: 'Learn the basics of the Predictive Maintenance Dashboard', icon: Book, link: '#' },
    { title: 'Video Tutorials', desc: 'Step-by-step video guides for common tasks', icon: Video, link: '#' },
    { title: 'API Documentation', desc: 'Technical docs for integrating with external systems', icon: FileText, link: '#' },
    { title: 'Best Practices', desc: 'Tips for maximizing equipment uptime', icon: HelpCircle, link: '#' },
];

export default function HelpCenterPage() {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFaqs = faqs.filter(faq =>
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-white">Help Center</h1>
                <p className="text-slate-400 mt-1">Find answers and get support</p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" placeholder="Search for help topics..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-lg" />
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {guides.map((guide, i) => (
                    <a key={i} href={guide.link} className="glass-card p-4 card-hover group">
                        <div className="p-3 rounded-xl bg-cyan-500/20 w-fit mb-3"><guide.icon className="w-5 h-5 text-cyan-400" /></div>
                        <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{guide.title}</h3>
                        <p className="text-sm text-slate-400 mt-1">{guide.desc}</p>
                        <div className="flex items-center gap-1 mt-3 text-sm text-cyan-400">View <ExternalLink className="w-3 h-3" /></div>
                    </a>
                ))}
            </div>

            {/* FAQs */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-amber-500/20"><MessageCircle className="w-5 h-5 text-amber-400" /></div>
                    <h2 className="text-lg font-semibold text-white">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-3">
                    {filteredFaqs.map((faq, i) => (
                        <div key={i} className="border border-slate-700/50 rounded-xl overflow-hidden">
                            <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/30 transition-colors">
                                <span className="font-medium text-white pr-4">{faq.q}</span>
                                {expandedFaq === i ? <ChevronDown className="w-5 h-5 text-cyan-400 flex-shrink-0" /> : <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                            </button>
                            {expandedFaq === i && (
                                <div className="px-4 pb-4 text-slate-300 text-sm leading-relaxed animate-slide-up">{faq.a}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Support */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-emerald-500/20"><HelpCircle className="w-5 h-5 text-emerald-400" /></div>
                    <h2 className="text-lg font-semibold text-white">Contact Support</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-800/30 rounded-xl">
                        <Mail className="w-6 h-6 text-cyan-400 mb-3" />
                        <h3 className="font-medium text-white">Email Support</h3>
                        <p className="text-sm text-slate-400 mt-1">support@predictive.io</p>
                        <p className="text-xs text-slate-500 mt-2">Response within 24 hours</p>
                    </div>
                    <div className="p-4 bg-slate-800/30 rounded-xl">
                        <Phone className="w-6 h-6 text-emerald-400 mb-3" />
                        <h3 className="font-medium text-white">Phone Support</h3>
                        <p className="text-sm text-slate-400 mt-1">+1 (800) 555-0199</p>
                        <p className="text-xs text-slate-500 mt-2">Mon-Fri, 9AM-6PM IST</p>
                    </div>
                    <div className="p-4 bg-slate-800/30 rounded-xl">
                        <Clock className="w-6 h-6 text-amber-400 mb-3" />
                        <h3 className="font-medium text-white">Live Chat</h3>
                        <p className="text-sm text-slate-400 mt-1">Available 24/7</p>
                        <button className="mt-3 px-4 py-2 bg-cyan-500/20 text-cyan-400 text-sm rounded-lg hover:bg-cyan-500/30 transition-all">Start Chat</button>
                    </div>
                </div>
            </div>

            {/* System Info */}
            <div className="glass-card p-6">
                <h3 className="font-semibold text-white mb-4">System Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><p className="text-slate-500">Version</p><p className="text-white font-medium">2.4.1</p></div>
                    <div><p className="text-slate-500">Last Updated</p><p className="text-white font-medium">Jan 15, 2026</p></div>
                    <div><p className="text-slate-500">License</p><p className="text-emerald-400 font-medium">Enterprise</p></div>
                    <div><p className="text-slate-500">Support Plan</p><p className="text-cyan-400 font-medium">Premium 24/7</p></div>
                </div>
            </div>
        </div>
    );
}
