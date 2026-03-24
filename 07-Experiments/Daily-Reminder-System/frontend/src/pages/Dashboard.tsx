import React, { useState } from 'react';
import { Bell, CheckCircle, Clock, Plus } from 'lucide-react';
import CreateTaskModal from '../components/CreateTaskModal';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-10 focus:outline-none">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black mb-2">Overview</h2>
          <p className="text-slate-400 font-medium">Automatic rotation & notification system.</p>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-bold flex items-center space-x-3 shadow-xl shadow-blue-600/20 transition-all active:scale-95"
        >
          <Plus size={24}/>
          <span>New Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard label="Active Tasks" value="12" icon={<Bell size={24}/>} color="text-blue-500" />
        <StatCard label="Notifications" value="1.2k" icon={<CheckCircle size={24}/>} color="text-green-500" />
        <StatCard label="Uptime" value="99.9%" icon={<Clock size={24}/>} color="text-amber-500" />
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800">
          <h3 className="text-xl font-bold">Active Rotation Loops</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950/50 text-slate-500 text-xs uppercase tracking-widest font-bold">
              <tr>
                <th className="px-8 py-4">Task Name</th>
                <th className="px-8 py-4">Assignee</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-900/50 transition-colors">
                <td className="px-8 py-6 font-bold text-lg">Daily Standup</td>
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">CD</div>
                    <span className="font-semibold">Chung Do</span>
                  </div>
                </td>
                <td className="px-8 py-6"><span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <CreateTaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 bg-slate-950 rounded-2xl ${color} group-hover:scale-110 transition-transform`}>{icon}</div>
        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-5xl font-black">{value}</div>
    </div>
  );
}
