
import React, { useState } from 'react';
import { IndustryRecord, User } from '../types';
import { Save, FileCheck, Trash2, Factory, Calendar, Calculator, Users, TrendingUp } from 'lucide-react';

interface IndustryDataEntryProps {
  onSave: (record: IndustryRecord) => void;
  user: User;
}

export const IndustryDataEntry: React.FC<IndustryDataEntryProps> = ({ onSave, user }) => {
  const [formData, setFormData] = useState<Partial<IndustryRecord>>({
    office: '', month: '', 
    current_allocation: 0, capital_allocation: 0, current_expenditure: 0, capital_expenditure: 0, financial_progress_pct: 0,
    reg_count: 0, renewal_count: 0, loc_transfer_count: 0, name_change_count: 0, copy_count: 0, amend_count: 0, cancel_count: 0, owner_transfer_count: 0, cap_increase_count: 0, other_count: 0,
    micro_count: 0, cottage_count: 0, small_count: 0, medium_count: 0, large_count: 0,
    energy_count: 0, production_count: 0, agro_forest_count: 0, service_count: 0, tourism_count: 0, mineral_count: 0, infra_count: 0, it_count: 0,
    female_emp: 0, male_emp: 0,
    reg_rev: 0, renewal_rev: 0, loc_transfer_rev: 0, name_change_rev: 0, copy_rev: 0, amend_rev: 0, cancel_rev: 0, owner_transfer_rev: 0, cap_increase_rev: 0, other_rev: 0, total_rev: 0,
    approved_pos: 0, filled_pos: 0, total_industries: 0
  });

  const months = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कात्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'];

  const handleNumberChange = (field: keyof IndustryRecord, value: string) => {
    setFormData(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const handleSubmit = (status: IndustryRecord['verificationStatus']) => {
    if (!formData.office || !formData.month) {
      alert('कार्यालय र महिना अनिवार्य छ।');
      return;
    }

    const record: IndustryRecord = {
      ...formData as IndustryRecord,
      id: `I-${Date.now()}`,
      verificationStatus: status,
      createdBy: user.id
    };

    onSave(record);
    alert('उद्योग तथ्याङ्क सुरक्षित भयो।');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
        
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
              <Factory size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">उद्योग तथ्याङ्क संकलन फारम</h2>
              <p className="text-slate-500 text-sm">Industry Statistics Collection Form</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-full border border-blue-200 uppercase tracking-wider">Statistical Report</span>
          </div>
        </div>

        <form className="space-y-10">
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">कार्यालय *</label>
              <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 ring-blue-500 outline-none" value={formData.office} onChange={e => setFormData({...formData, office: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">महिना *</label>
              <select className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 ring-blue-500 outline-none" value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})}>
                <option value="">महिना चयन गर्नुहोस्</option>
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">जम्मा उद्योग संख्या</label>
              <input type="number" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" value={formData.total_industries} onChange={e => handleNumberChange('total_industries', e.target.value)} />
            </div>
          </div>

          {/* Financials */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-md font-bold text-slate-800 border-b pb-2">
              <Calculator size={18} className="text-slate-400" /> वित्तीय विवरण (Financials)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'चालु विनियोजन', field: 'current_allocation' },
                { label: 'पूंजिगत विनियोजन', field: 'capital_allocation' },
                { label: 'चालु खर्च', field: 'current_expenditure' },
                { label: 'पुंजिगत खर्च', field: 'capital_expenditure' },
                { label: 'वित्तिय प्रगति %', field: 'financial_progress_pct' },
              ].map(item => (
                <div key={item.field} className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase truncate">{item.label}</label>
                  <input type="number" className="w-full p-2.5 rounded-lg border border-slate-300" value={(formData as any)[item.field]} onChange={e => handleNumberChange(item.field as any, e.target.value)} />
                </div>
              ))}
            </div>
          </section>

          {/* Activities */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-md font-bold text-slate-800 border-b pb-2">
              <TrendingUp size={18} className="text-slate-400" /> प्रशासनिक क्रियाकलाप (Activities)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'उद्योग दर्ता', field: 'reg_count' },
                { label: 'नविकरण', field: 'renewal_count' },
                { label: 'ठाउँ सारी', field: 'loc_transfer_count' },
                { label: 'नाम परिवर्तन', field: 'name_change_count' },
                { label: 'प्रतिलिपी', field: 'copy_count' },
                { label: 'संशोधन', field: 'amend_count' },
                { label: 'खारेज', field: 'cancel_count' },
                { label: 'नामसारी', field: 'owner_transfer_count' },
                { label: 'पूँजीवृद्धी', field: 'cap_increase_count' },
                { label: 'अन्य', field: 'other_count' },
              ].map(item => (
                <div key={item.field} className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase truncate">{item.label}</label>
                  <input type="number" className="w-full p-2.5 rounded-lg border border-slate-300" value={(formData as any)[item.field]} onChange={e => handleNumberChange(item.field as any, e.target.value)} />
                </div>
              ))}
            </div>
          </section>

          {/* Classification (Scale & Sector) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="space-y-4">
              <h3 className="text-md font-bold text-slate-800 border-b pb-2">उद्योगको प्रकृति (By Scale)</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'लघु', field: 'micro_count' },
                  { label: 'घरेलु', field: 'cottage_count' },
                  { label: 'साना', field: 'small_count' },
                  { label: 'मझौला', field: 'medium_count' },
                  { label: 'ठुला', field: 'large_count' },
                ].map(item => (
                  <div key={item.field} className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">{item.label}</label>
                    <input type="number" className="w-full p-2.5 rounded-lg border border-slate-300" value={(formData as any)[item.field]} onChange={e => handleNumberChange(item.field as any, e.target.value)} />
                  </div>
                ))}
              </div>
            </section>
            <section className="space-y-4">
              <h3 className="text-md font-bold text-slate-800 border-b pb-2">क्षेत्रगत विवरण (By Sector)</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'उर्जामुलक', field: 'energy_count' },
                  { label: 'उत्पादन मुलक', field: 'production_count' },
                  { label: 'कृर्षि/वन', field: 'agro_forest_count' },
                  { label: 'सेवा मुलक', field: 'service_count' },
                  { label: 'पर्यटन', field: 'tourism_count' },
                  { label: 'अन्य (Sector)', field: 'infra_count' },
                ].map(item => (
                  <div key={item.field} className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">{item.label}</label>
                    <input type="number" className="w-full p-2.5 rounded-lg border border-slate-300" value={(formData as any)[item.field]} onChange={e => handleNumberChange(item.field as any, e.target.value)} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Revenue Detailed Breakdown */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-md font-bold text-slate-800 border-b pb-2">
              <TrendingUp size={18} className="text-blue-500" /> राजश्व विवरण (Revenue Breakdown)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { label: 'दर्ता राजश्व', field: 'reg_rev' },
                { label: 'नविकरण राजश्व', field: 'renewal_rev' },
                { label: 'ठाउँ सारी राजश्व', field: 'loc_transfer_rev' },
                { label: 'नाम परिवर्तन राजश्व', field: 'name_change_rev' },
                { label: 'प्रतिलिपी राजश्व', field: 'copy_rev' },
                { label: 'संशोधन राजश्व', field: 'amend_rev' },
                { label: 'खारेज राजश्व', field: 'cancel_rev' },
                { label: 'नामसारी राजश्व', field: 'owner_transfer_rev' },
                { label: 'पूँजीवृद्धी राजश्व', field: 'cap_increase_rev' },
                { label: 'अन्य राजश्व', field: 'other_rev' },
                { label: 'जम्मा राजश्व', field: 'total_rev', className: 'bg-blue-50 border-blue-200' },
              ].map(item => (
                <div key={item.field} className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase truncate">{item.label}</label>
                  <input type="number" className={`w-full p-2.5 rounded-lg border border-slate-300 ${item.className || ''}`} value={(formData as any)[item.field]} onChange={e => handleNumberChange(item.field as any, e.target.value)} />
                </div>
              ))}
            </div>
          </section>

          {/* Personnel and Employment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="space-y-4">
              <h3 className="flex items-center gap-2 text-md font-bold text-slate-800 border-b pb-2">
                <Users size={18} className="text-slate-400" /> रोजगार र दरबन्दी (Employment & Personnel)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'महिला रोजगार', field: 'female_emp' },
                  { label: 'पुरुष रोजगार', field: 'male_emp' },
                  { label: 'स्विकृत दरवन्दी', field: 'approved_pos' },
                  { label: 'पदपु्र्ति संख्या', field: 'filled_pos' },
                ].map(item => (
                  <div key={item.field} className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">{item.label}</label>
                    <input type="number" className="w-full p-2.5 rounded-lg border border-slate-300" value={(formData as any)[item.field]} onChange={e => handleNumberChange(item.field as any, e.target.value)} />
                  </div>
                ))}
              </div>
            </section>
            
            <section className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-center items-center text-center">
               <p className="text-sm font-bold text-slate-500 uppercase mb-2">महत्वपूर्ण सूचना</p>
               <p className="text-slate-600 text-sm">कृपया फारम बुझाउनु अघि सबै तथ्याङ्कहरू पुन: जाँच गर्नुहोस्। गलत तथ्याङ्कले विभागको मासिक रिपोर्टमा असर पार्न सक्छ।</p>
            </section>
          </div>

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
                className="flex items-center gap-2 px-10 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-xl shadow-blue-200 transition-all scale-105 active:scale-100"
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
