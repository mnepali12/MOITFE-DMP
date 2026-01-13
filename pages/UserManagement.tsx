
import React from 'react';
import { USERS } from '../mockData';
import { UserPlus, Shield, Mail, MapPin } from 'lucide-react';

export const UserManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-500">Manage portal access and user roles for Ministry staff.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-100">
          <UserPlus size={18} /> Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {USERS.map(user => (
          <div key={user.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                <Shield size={24} />
              </div>
              <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {user.role}
              </span>
            </div>
            
            <h3 className="font-bold text-slate-800 text-lg mb-1">{user.name}</h3>
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Mail size={16} /> {user.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={16} /> Department: {user.department}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 py-2 text-xs font-bold border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">Edit Permissions</button>
              <button className="flex-1 py-2 text-xs font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100">Suspend Access</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
