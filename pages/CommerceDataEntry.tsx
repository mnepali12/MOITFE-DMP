
import React, { useState } from 'react';
import { CommerceRecord, User } from '../types';
import { Save, FileCheck, Trash2, ShoppingBag, Calendar, Calculator, TrendingUp } from 'lucide-react';

interface CommerceDataEntryProps {
  onSave: (record: CommerceRecord) => void;
  user: User;
}

export const CommerceDataEntry: React.FC<CommerceDataEntryProps> = ({ onSave, user }) => {
  const [formData, setFormData] = useState<Partial<CommerceRecord>>({
    office: '', month: '', 
    comm_reg: 0, renewal: 0, cap_increase: 0, copy: 0, owner_transfer: 0, 
    loc_transfer: 0, amendment: 0, cancellation: 0, details: '',
    cap_increase_amt: 0, other: 0, reg_rev: 0, other_rev: 0, 
    total_rev: 0, total_comm_reg: 0
  });

  const months = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कात्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'];

  const handleNumberChange = (field: keyof CommerceRecord, value: string) => {
    setFormData(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const handleSubmit = (status: CommerceRecord['status']) => {
    if (!formData.office || !formData.month) {
      alert('कार्यालय र महिना अनिवार्य छ।');
      return;
    }

    const record: CommerceRecord = {
      ...formData as CommerceRecord,
      id: `C-${Date.now()}`,
      status,
      createdBy: user.id
    };

    onSave(record);
    alert('वाणिज्य तथ्याङ्क सुरक्षित भयो।');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-orange-600"></div>
        
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-50 text-orange-700 rounded-xl">
              <ShoppingBag size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">वाणिज्य तथ्याङ्क संकलन फारम</h2>
              <p className="text-slate-500 text-sm">Commerce Data Collection Form</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs px-3 py-1 bg-orange-100 text-orange-700 font-bold rounded-full border border-orange-200 uppercase tracking-wider">Commerce Report</span>
          </div>
        </div>

        <form className="space-y-10">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1 lg:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase">कार्यालय *</label>
              <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 ring-orange-500 outline-none" value={formData.office} onChange={e => setFormData({...formData, office: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">महिना *</label>
              <select className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 ring-orange-500 outline-none" value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})}>
                <option value="">महिना चयन गर्नुहोस्</option>
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">जम्मा वाणिज्य दर्ता</label>
              <input type="number" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" value={formData.total_comm_reg} onChange={e => handleNumberChange('total_comm_reg', e.target.value)} />
            </div>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { label: 'वाणिज्य दर्ता', field: 'comm_reg' },
              { label: 'नविकरण', field: 'renewal' },
              { label: 'पूँजीवृद्धी', field: 'cap_increase' },
              { label: 'प्रतिलिपी', field: 'copy' },
              { label: 'नामसारी', field: 'owner_transfer' },
              { label: 'ठाउँसारी', field: 'loc_transfer' },
              { label: 'संशोधन', field: 'amendment' },
              { label: 'खारेज', field: 'cancellation' },
              { label: 'अन्य क्रियाकलाप', field: 'other' },
            ].map(item => (
              <div key={item.field} className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase truncate" title={item.label}>{item.label}</label>
                <input type="number" className="w-full p-2.5 rounded-lg border border-slate-300" value={(formData as any)[item.field]} onChange={e => handleNumberChange(item.field as any, e.target.value)} />
              </div>
            ))}
          </div>

          {/* Detailed Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">पूँजिवृद्धी भएको रु हजारमा</label>
                <input type="number" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" value={formData.cap_increase_amt} onChange={e => handleNumberChange('cap_increase_amt', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">विवरण (Description)</label>
                <textarea className="w-full p-2.5 rounded-lg border border-slate-300 bg-white min-h-[100px]" value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} placeholder="थप विवरण लेख्नुहोस्..." />
              </div>
            </div>

            <div className="space-y-4 p-6 bg-orange-50 rounded-xl border border-orange-100">
               <h3 className="text-sm font-bold text-orange-800 uppercase flex items-center gap-2 mb-2">
                 <Calculator size={16} /> राजश्व विवरण (Revenue Details)
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-orange-600 uppercase">दर्ता राजश्व</label>
                    <input type="number" className="w-full p-2.5 rounded-lg border border-orange-200 focus:ring-2 ring-orange-500" value={formData.reg_rev} onChange={e => handleNumberChange('reg_rev', e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-orange-600 uppercase">अन्य राजश्व</label>
                    <input type="number" className="w-full p-2.5 rounded-lg border border-orange-200 focus:ring-2 ring-orange-500" value={formData.other_rev} onChange={e => handleNumberChange('other_rev', e.target.value)} />
                  </div>
                  <div className="space-y-1 col-span-2 pt-2 border-t border-orange-200 mt-2">
                    <label className="text-[10px] font-bold text-orange-800 uppercase">जम्मा राजश्व (Total)</label>
                    <input type="number" className="w-full p-3 rounded-lg border border-orange-300 bg-white font-bold text-lg text-orange-900" value={formData.total_rev} onChange={e => handleNumberChange('total_rev', e.target.value)} />
                  </div>
               </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-10 border-t border-slate-100">
            <button 
              type="button"
              className="flex items-center gap-2 px-8 py-3 rounded-xl text-slate-500 hover:bg-slate-100 font-bold transition-all"
              onClick={() => { if(confirm('परिवर्तनहरू खारेज गर्ने?')) window.history.back() }}
            >
              <Trash2 size={18} /> रद्द गर्नुहोस्
            </button>
            <div className="flex gap-4">
              <button 
                type="button"
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold transition-all"
                onClick={() => handleSubmit('Pending')}
              >
                <Save size={18} /> ड्राफ्ट
              </button>
              <button 
                type="button"
                className="flex items-center gap-2 px-10 py-3 rounded-xl bg-orange-600 text-white hover:bg-orange-700 font-bold shadow-xl shadow-orange-200 transition-all scale-105 active:scale-100"
                onClick={() => handleSubmit('Pending')}
              >
                <FileCheck size={18} /> पेश गर्नुहोस्
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
