'use client';

import React, { useState, useEffect } from 'react';
import { X, UserPlus, Users, Trash2, Shield } from 'lucide-react';
import api from '@/lib/api';
import { Resource } from '@/types/resource';

interface PermissionModalProps {
  resource: Resource;
  onClose: () => void;
}

export const PermissionModal: React.FC<PermissionModalProps> = ({ resource, onClose }) => {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [inheritance, setInheritance] = useState(resource.inheritanceEnabled);

  const fetchPermissions = async () => {
    // API endpoint to be implemented in BE
    // const res = await api.get(`/resources/${resource.id}/permissions`);
    // setPermissions(res.data);
  };

  useEffect(() => {
    fetchPermissions();
  }, [resource.id]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Shield className="text-blue-500" size={20} />
            <h2 className="font-bold text-lg">Manage Access</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Inheritance Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-800">
            <div>
              <p className="font-medium">Inherit permissions</p>
              <p className="text-sm text-gray-400">Apply settings from parent folder</p>
            </div>
            <button 
              className={`w-12 h-6 rounded-full transition-colors relative ${inheritance ? 'bg-blue-600' : 'bg-gray-700'}`}
              onClick={() => setInheritance(!inheritance)}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${inheritance ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          {/* Current Permissions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Who has access</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 font-bold">A</div>
                  <div>
                    <p className="text-sm font-medium">admin@docmgmt.com</p>
                    <p className="text-xs text-blue-400">Owner</p>
                  </div>
                </div>
              </div>
              {/* Other permissions will map here */}
            </div>
          </div>

          {/* Add Permission */}
          <div className="pt-4 border-t border-gray-800 flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700">
              <UserPlus size={18} /> Add User
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700">
              <Users size={18} /> Add Group
            </button>
          </div>
        </div>

        <div className="bg-gray-950 p-4 border-t border-gray-800 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-shadow hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
