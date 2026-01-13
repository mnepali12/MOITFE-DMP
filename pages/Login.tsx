
import React from 'react';
import { User, Role } from '../types';
import { USERS } from '../mockData';
import { TreePine, Lock, Mail, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (u: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Branding Side */}
        <div className="bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full -ml-32 -mb-32"></div>
          
          <div className="relative">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-green-900/50">
              <TreePine size={36} />
            </div>
            <h1 className="text-3xl font-bold leading-tight">Ministry Data Management Portal</h1>
            <p className="mt-4 text-slate-400 text-lg">Integrated system for Forest and Industry statistical tracking and reporting.</p>
          </div>

          <div className="relative pt-12">
            <div className="flex -space-x-3 mb-4">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://picsum.photos/100/100?random=${i}`} className="w-10 h-10 rounded-full border-2 border-slate-900" alt="User" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-green-600 flex items-center justify-center text-xs font-bold">+50</div>
            </div>
            <p className="text-sm text-slate-400">Join over 50 field officers reporting data daily across all districts.</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-slate-500 mb-8">Login with your official credentials to access the portal.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="name@mitfe.gov.np"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 ring-green-500 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 ring-green-500 outline-none transition-all"
                />
              </div>
            </div>
            
            <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-200 mt-4 flex items-center justify-center gap-2">
              Sign In <ArrowRight size={18} />
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold">Quick Access (Dev Mode)</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {USERS.map(u => (
                <button 
                  key={u.id}
                  onClick={() => onLogin(u)}
                  className="p-3 text-left border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <p className="text-xs font-bold text-slate-800">{u.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{u.role.replace('_', ' ')}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
