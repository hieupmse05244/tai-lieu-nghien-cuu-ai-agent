import React from 'react';
import { LayoutDashboard, Users, Calendar, Settings, LogOut } from 'lucide-react';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen bg-slate-950 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 flex flex-col shrink-0 bg-slate-950">
        <div className="p-8">
          <h1 className="text-2xl font-black bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent">
            DRS v3.6
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<Users size={20}/>} label="Groups" />
          <NavItem icon={<Calendar size={20}/>} label="Tasks" />
          <NavItem icon={<Settings size={20}/>} label="Settings" />
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all">
            <LogOut size={20}/>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950">
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-xl">
          <div className="text-slate-400 font-medium">System Status: Active</div>
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">A</div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
      active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
    }`}>
      {icon}
      <span className="font-semibold">{label}</span>
    </a>
  );
}
