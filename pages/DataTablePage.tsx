
import React, { useState } from 'react';
import { ForestRecord, IndustryRecord, CommerceRecord, User, Role } from '../types';
import { Download, Upload, Search, Filter, Check, X, Eye } from 'lucide-react';

interface DataTablePageProps {
  forestRecords: ForestRecord[];
  industryRecords: IndustryRecord[];
  commerceRecords: CommerceRecord[];
  user: User;
  onUpdateForest: (id: string, status: ForestRecord['status']) => void;
  onUpdateIndustry: (id: string, status: IndustryRecord['verificationStatus']) => void;
  onUpdateCommerce: (id: string, status: CommerceRecord['status']) => void;
}

export const DataTablePage: React.FC<DataTablePageProps> = ({ 
  forestRecords, 
  industryRecords, 
  commerceRecords,
  user,
  onUpdateForest,
  onUpdateIndustry,
  onUpdateCommerce
}) => {
  const [activeTab, setActiveTab] = useState<'Forest' | 'Industry' | 'Commerce'>('Forest');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredForest = forestRecords.filter(r => 
    r.office.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.sn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.date.includes(searchTerm)
  );

  const filteredIndustry = industryRecords.filter(r => 
    r.office.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.month.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCommerce = commerceRecords.filter(r => 
    r.office.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.month.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex bg-slate-200 p-1 rounded-lg">
          <button 
            className={`px-4 py-2 rounded-md font-bold text-xs transition-colors ${activeTab === 'Forest' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            onClick={() => setActiveTab('Forest')}
          >
            Forest
          </button>
          <button 
            className={`px-4 py-2 rounded-md font-bold text-xs transition-colors ${activeTab === 'Industry' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            onClick={() => setActiveTab('Industry')}
          >
            Industry
          </button>
          <button 
            className={`px-4 py-2 rounded-md font-bold text-xs transition-colors ${activeTab === 'Commerce' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            onClick={() => setActiveTab('Commerce')}
          >
            Commerce
          </button>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search records..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 ring-green-500 outline-none text-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg font-semibold text-xs hover:bg-slate-900 transition-colors">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {activeTab === 'Forest' && (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-6 py-4">सि.नं. / कार्यालय / मिति</th>
                  <th className="px-6 py-4">खर्च (चालु/पूंजिगत)</th>
                  <th className="px-6 py-4">वित्तीय प्रगति</th>
                  <th className="px-6 py-4">क्षेत्रफल (हा)</th>
                  <th className="px-6 py-4">राजश्व</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredForest.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors text-xs">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{r.office}</p>
                      <div className="flex gap-2 text-[10px] text-slate-500">
                        <span>SN: {r.sn}</span>
                        <span>|</span>
                        <span>Date: {r.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      <p>C: {r.current_expenditure.toLocaleString()}</p>
                      <p className="text-[10px] opacity-70">K: {r.capital_expenditure.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1 max-w-[80px]">
                        <div className="bg-green-500 h-full" style={{width: `${r.financial_progress_pct}%`}}></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-600">{r.financial_progress_pct}%</span>
                    </td>
                    <td className="px-6 py-4 font-mono font-medium text-slate-900">{r.total_forest_area.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-green-700">{r.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${
                        r.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                        r.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50" title="View"><Eye size={16} /></button>
                        {(user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN) && r.status === 'Pending' && (
                          <>
                            <button onClick={() => onUpdateForest(r.id, 'Approved')} className="p-1.5 text-slate-400 hover:text-green-600 rounded-md hover:bg-green-50" title="Approve"><Check size={16} /></button>
                            <button onClick={() => onUpdateForest(r.id, 'Rejected')} className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50" title="Reject"><X size={16} /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'Industry' && (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-6 py-4">कार्यालय / महिना</th>
                  <th className="px-6 py-4">खर्च (चालु/पूंजिगत)</th>
                  <th className="px-6 py-4">दर्ता संख्या</th>
                  <th className="px-6 py-4">रोजगार (म/पु)</th>
                  <th className="px-6 py-4">जम्मा राजश्व</th>
                  <th className="px-6 py-4">Verification</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredIndustry.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors text-xs">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{r.office}</p>
                      <p className="text-[10px] text-slate-500">Month: {r.month}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      <p>C: {r.current_expenditure.toLocaleString()}</p>
                      <p className="text-[10px] opacity-70">K: {r.capital_expenditure.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">{r.reg_count}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{r.female_emp} / {r.male_emp}</td>
                    <td className="px-6 py-4 font-bold text-blue-700">{r.total_rev.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${
                        r.verificationStatus === 'Approved' ? 'bg-blue-100 text-blue-700' : 
                        r.verificationStatus === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {r.verificationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50"><Eye size={16} /></button>
                        {(user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN) && r.verificationStatus === 'Pending' && (
                          <>
                            <button onClick={() => onUpdateIndustry(r.id, 'Approved')} className="p-1.5 text-slate-400 hover:text-green-600 rounded-md hover:bg-green-50"><Check size={16} /></button>
                            <button onClick={() => onUpdateIndustry(r.id, 'Rejected')} className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50"><X size={16} /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'Commerce' && (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-6 py-4">कार्यालय / महिना</th>
                  <th className="px-6 py-4">बाणिज्य दर्ता</th>
                  <th className="px-6 py-4">पूँजीवृद्धी (Amount)</th>
                  <th className="px-6 py-4">जम्मा राजश्व</th>
                  <th className="px-6 py-4">जम्मा दर्ता</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCommerce.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors text-xs">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{r.office}</p>
                      <p className="text-[10px] text-slate-500">Month: {r.month}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">{r.comm_reg}</td>
                    <td className="px-6 py-4 text-slate-700">Rs. {r.cap_increase_amt.toLocaleString()} K</td>
                    <td className="px-6 py-4 font-bold text-orange-700">{r.total_rev.toLocaleString()}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{r.total_comm_reg}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${
                        r.status === 'Approved' ? 'bg-orange-100 text-orange-700' : 
                        r.status === 'Pending' ? 'bg-slate-100 text-slate-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50"><Eye size={16} /></button>
                        {(user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN) && r.status === 'Pending' && (
                          <>
                            <button onClick={() => onUpdateCommerce(r.id, 'Approved')} className="p-1.5 text-slate-400 hover:text-green-600 rounded-md hover:bg-green-50"><Check size={16} /></button>
                            <button onClick={() => onUpdateCommerce(r.id, 'Rejected')} className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50"><X size={16} /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        { (activeTab === 'Forest' ? filteredForest : activeTab === 'Industry' ? filteredIndustry : filteredCommerce).length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search size={32} />
            </div>
            <p className="text-slate-500 font-medium">No records found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};
