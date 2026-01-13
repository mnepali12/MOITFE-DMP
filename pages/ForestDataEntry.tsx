
import React, { useState } from 'react';
import { ForestRecord, User } from '../types';
import { Save, FileCheck, Trash2, TreePine, Calendar } from 'lucide-react';

interface ForestDataEntryProps {
  onSave: (record: ForestRecord) => void;
  user: User;
}

export const ForestDataEntry: React.FC<ForestDataEntryProps> = ({ onSave, user }) => {
  const [formData, setFormData] = useState<Partial<ForestRecord>>({
    sn: '', office: '', date: new Date().toISOString().split('T')[0],
    current_allocation: 0, capital_allocation: 0, current_expenditure: 0, capital_expenditure: 0,
    financial_progress_pct: 0, community_forest_count: 0, religious_forest_count: 0, leasehold_forest_count: 0,
    total_forest_area: 0, revenue: 0, audit_settlement: 0, arrears_recoverable: 0, arrears_regularizable: 0,
    advance_arrears: 0, timber_production: 0, cases_filed: 0, workplan_renewal: 0, workplan_registration: 0,
    saplings: 0, herbs: 0, resin: 0, plantation: 0, approved_positions: 0, filled_positions: 0,
    physical_progress: '', cf_area: 0, lf_area: 0, rf_area: 0, cf_hh: 0, lf_hh: 0, rf_hh: 0,
    encroachment: 0, relief: 0
  });

  const handleNumberChange = (field: keyof ForestRecord, value: string) => {
    setFormData(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const handleSubmit = (status: ForestRecord['status']) => {
    if (!formData.office) {
      alert('कार्यालय अनिवार्य छ। (Office is required)');
      return;
    }
    
    const record: ForestRecord = {
      ...formData as ForestRecord,
      id: `F-${Date.now()}`,
      status,
      createdBy: user.id
    };

    onSave(record);
    alert('विवरण सुरक्षित भयो। (Record saved successfully)');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-green-600"></div>
        
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 text-green-700 rounded-xl">
              <TreePine size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">वन तथ्याङ्क संकलन फारम</h2>
              <p className="text-slate-500 text-sm">Forest Data Collection Form</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs px-3 py-1 bg-green-100 text-green-700 font-bold rounded-full border border-green-200 uppercase tracking-wider">Official Report</span>
          </div>
        </div>

        <form className="space-y-8">
          {/* Main Content Area without specific headings */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">सि.नं.</label>
              <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50" value={formData.sn} onChange={e => setFormData({...formData, sn: e.target.value})} />
            </div>
            <div className="space-y-1 md:col-span-2 lg:col-span-3">
              <label className="text-xs font-bold text-slate-500 uppercase">कार्यालय *</label>
              <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50" value={formData.office} onChange={e => setFormData({...formData, office: e.target.value})} />
            </div>
            <div className="space-y-1 md:col-span-1 lg:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase">मिति (Date)</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input type="date" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
            </div>

            {[
              { label: 'चालु विनियोजन', field: 'current_allocation' },
              { label: 'पूंजिगत विनियोजन', field: 'capital_allocation' },
              { label: 'चालु खर्च', field: 'current_expenditure' },
              { label: 'पुंजिगत खर्च', field: 'capital_expenditure' },
              { label: 'वित्तिय प्रगति %', field: 'financial_progress_pct' },
              { label: 'सामुदायिक वन', field: 'community_forest_count' },
              { label: 'धार्मिक वन', field: 'religious_forest_count' },
              { label: 'कबुलियती वन', field: 'leasehold_forest_count' },
              { label: 'वनको क्षेत्रफल', field: 'total_forest_area' },
              { label: 'राजश्व', field: 'revenue' },
              { label: 'सम्परिक्षण', field: 'audit_settlement' },
              { label: 'असुल उपर गर्नुपर्ने वेरुजू', field: 'arrears_recoverable' },
              { label: 'नियमित गर्नुपर्ने वेरुजू', field: 'arrears_regularizable' },
              { label: 'पेश्कि बेरुजु', field: 'advance_arrears' },
              { label: 'काठ उत्पादन', field: 'timber_production' },
              { label: 'मुद्दा दायरा', field: 'cases_filed' },
              { label: 'कार्ययोजना नविकरण', field: 'workplan_renewal' },
              { label: 'कार्ययोजना दर्ता', field: 'workplan_registration' },
              { label: 'विरुवा', field: 'saplings' },
              { label: 'जडिबुटी', field: 'herbs' },
              { label: 'खोटो', field: 'resin' },
              { label: 'वृक्षरोपण', field: 'plantation' },
              { label: 'स्विकृत दरवन्दी', field: 'approved_positions' },
              { label: 'पदपु्र्ति संख्या', field: 'filled_positions' },
              { label: 'भौतिक प्रगती', field: 'physical_progress', isString: true },
              { label: 'सा व क्षेत्रफल', field: 'cf_area' },
              { label: 'क व क्षेत्रफल', field: 'lf_area' },
              { label: 'धा क्षेत्रफल', field: 'rf_area' },
              { label: 'सा व HH', field: 'cf_hh' },
              { label: 'क व HH', field: 'lf_hh' },
              { label: 'धा HH', field: 'rf_hh' },
              { label: 'अतिक्रमण', field: 'encroachment' },
              { label: 'राहत', field: 'relief' },
            ].map(item => (
              <div key={item.field} className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase truncate" title={item.label}>{item.label}</label>
                {item.isString ? (
                  <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 ring-green-500 outline-none" value={(formData as any)[item.field]} onChange={e => setFormData({...formData, [item.field]: e.target.value})} />
                ) : (
                  <input type="number" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 ring-green-500 outline-none" value={(formData as any)[item.field]} onChange={e => handleNumberChange(item.field as any, e.target.value)} />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-10 border-t border-slate-100">
            <button 
              type="button"
              className="flex items-center gap-2 px-8 py-3 rounded-xl text-slate-500 hover:bg-slate-100 font-bold transition-all"
              onClick={() => { if(confirm('परिवर्तनहरू खारेज गर्ने?')) window.history.back() }}
            >
              <Trash2 size={18} /> रद्द गर्नुहोस् (Discard)
            </button>
            <div className="flex gap-4">
              <button 
                type="button"
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold transition-all"
                onClick={() => handleSubmit('Pending')}
              >
                <Save size={18} /> ड्राफ्ट (Save Draft)
              </button>
              <button 
                type="button"
                className="flex items-center gap-2 px-10 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 font-bold shadow-xl shadow-green-200 transition-all scale-105 active:scale-100"
                onClick={() => handleSubmit('Pending')}
              >
                <FileCheck size={18} /> पेश गर्नुहोस् (Submit)
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
