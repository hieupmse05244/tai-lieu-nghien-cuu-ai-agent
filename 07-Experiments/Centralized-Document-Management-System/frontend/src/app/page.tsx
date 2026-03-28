'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ResourceTree } from '@/components/ResourceTree';
import { Resource } from '@/types/resource';
import { FileText, Image as ImageIcon, Video, FolderOpen, LogOut, User as UserIcon } from 'lucide-react';

export default function Home() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token) {
      router.push('/login');
    } else if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null; // Prevent flicker before redirect

  return (
    <main className="flex h-screen bg-[#0f172a] text-white overflow-hidden">
      {/* Sidebar - Resource Tree */}
      <ResourceTree onSelect={(res) => setSelectedResource(res)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center px-6 justify-between bg-[#1e293b]/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {selectedResource ? (
              <>
                {selectedResource.type === 'FOLDER' ? (
                  <FolderOpen size={20} className="text-blue-400" />
                ) : (
                  <FileText size={20} className="text-slate-400" />
                )}
                <h1 className="text-lg font-medium tracking-tight">{selectedResource.name}</h1>
              </>
            ) : (
              <h1 className="text-lg font-medium text-slate-400">Select a document</h1>
            )}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-slate-700">
              <UserIcon size={14} className="text-blue-400" />
              <span className="text-xs font-medium text-slate-300">{user.email}</span>
              <span className="text-[10px] px-1.5 bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-md uppercase font-bold">
                {user.role}
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all text-slate-400"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Viewer / Editor */}
        <div className="flex-1 overflow-auto p-8 flex flex-col items-center justify-center text-slate-500 bg-[#0f172a]">
          {!selectedResource ? (
            <div className="text-center animate-pulse">
              <div className="w-24 h-24 bg-slate-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FileText size={48} className="opacity-20 text-slate-400" />
              </div>
              <p className="text-slate-400 font-medium">Select a file to view or edit</p>
            </div>
          ) : selectedResource.type === 'FOLDER' ? (
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-500/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-500/10">
                <FolderOpen size={48} className="text-blue-500/50" />
              </div>
              <p className="text-slate-300">Viewing Folder: <span className="text-blue-400">{selectedResource.name}</span></p>
              <p className="text-sm text-slate-500 mt-2">Browse the sub-folders and files in the sidebar.</p>
            </div>
          ) : (
            <div className="w-full max-w-5xl h-full bg-[#1e293b] rounded-2xl border border-slate-700 p-8 shadow-2xl text-slate-300">
              <div className="mb-6 flex items-center justify-between border-b border-slate-700 pb-4">
                 <div className="flex items-center gap-3">
                   <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 font-mono">
                     {selectedResource.name.split('.').pop()?.toUpperCase()}
                   </span>
                   <span className="text-xs text-slate-500">Last updated: Just now</span>
                 </div>
                 <button className="text-xs text-blue-400 hover:underline">Edit Document</button>
              </div>
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4 text-white">Document Content Preview</h2>
                <div className="bg-[#0f172a] rounded-xl p-6 border border-slate-700 font-mono text-sm leading-relaxed">
                  <span className="text-blue-400"># Resource:</span> {selectedResource.name}<br/>
                  <span className="text-blue-400">- ID:</span> {selectedResource.id}<br/>
                  <span className="text-blue-400">- Owner:</span> {selectedResource.ownerId}<br/>
                  <span className="text-purple-400">---</span><br/>
                  RBAC & ACL check active. <br/>
                  Permissions inherited from parent.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
