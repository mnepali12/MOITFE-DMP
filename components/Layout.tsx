
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TreePine, 
  Factory, 
  ShoppingBag,
  Table, 
  Users, 
  LogOut, 
  Menu, 
  X,
  User as UserIcon,
  ChevronRight,
  Bell,
  CloudCheck,
  Database
} from 'lucide-react';
import { User, Role } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard, roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.ENUMERATOR, Role.VIEWER] },
    { name: 'Forest Entry', path: '/forest-entry', icon: TreePine, roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.ENUMERATOR] },
    { name: 'Industry Entry', path: '/industry-entry', icon: Factory, roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.ENUMERATOR] },
    { name: 'Commerce Entry', path: '/commerce-entry', icon: ShoppingBag, roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.ENUMERATOR] },
    { name: 'Data Tables', path: '/data-tables', icon: Table, roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.ENUMERATOR, Role.VIEWER] },
    { name: 'User Management', path: '/users', icon: Users, roles: [Role.SUPER_ADMIN] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <TreePine size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-tight">MOITFE DMP</h1>
              <p className="text-[10px] text-slate-400">Industry, Tourism, Forest & Environment</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-green-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                >
                  <Icon size={20} />
                  <span className="font-medium text-sm">{item.name}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto" />}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-600" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
              <Database size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Google DB: Connected</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold text-slate-800">
              {menuItems.find(m => m.path === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-none">{user.name}</p>
                <p className="text-[11px] text-slate-500 font-medium mt-1">{user.role.replace('_', ' ')}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
                <UserIcon size={20} />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
