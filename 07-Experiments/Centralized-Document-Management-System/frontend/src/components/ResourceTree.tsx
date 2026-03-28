'use client';

import React, { useState, useEffect } from 'react';
import { Folder, File, ChevronRight, ChevronDown, Plus, Upload } from 'lucide-react';
import api from '@/lib/api';
import { Resource } from '@/types/resource';

interface ResourceTreeProps {
  parentId?: string;
  onSelect: (resource: Resource) => void;
}

export const ResourceTree: React.FC<ResourceTreeProps> = ({ parentId, onSelect }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const fetchResources = async (pId: string | null) => {
    setLoading(true);
    try {
      const response = await api.get('/resources', { params: { parentId: pId } });
      setResources(response.data);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources(parentId || null);
  }, [parentId]);

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-4 bg-gray-900 border-r border-gray-800 h-full w-72 overflow-y-auto text-gray-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Documents</h2>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-gray-800 rounded"><Plus size={18} /></button>
          <button className="p-1 hover:bg-gray-800 rounded"><Upload size={18} /></button>
        </div>
      </div>
      
      <div className="space-y-1">
        {resources.map((item) => (
          <div key={item.id}>
            <div 
              className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-800 rounded cursor-pointer group"
              onClick={() => {
                if (item.type === 'FOLDER') toggleExpand(item.id);
                onSelect(item);
              }}
            >
              {item.type === 'FOLDER' ? (
                <>
                  {expanded[item.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <Folder className="text-blue-400" size={18} />
                </>
              ) : (
                <>
                  <div className="w-3.5" />
                  <File className="text-gray-400" size={18} />
                </>
              )}
              <span className="truncate flex-1">{item.name}</span>
            </div>
            
            {item.type === 'FOLDER' && expanded[item.id] && (
              <div className="ml-4 border-l border-gray-800">
                <ResourceTree parentId={item.id} onSelect={onSelect} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
