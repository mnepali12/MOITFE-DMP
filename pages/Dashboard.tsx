import React, { useMemo, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, ComposedChart, Area, AreaChart
} from 'recharts';
import { ForestRecord, IndustryRecord, CommerceRecord } from '../types';
import { 
  TreePine, Factory, ShoppingBag, Map as MapIcon, 
  TrendingUp, Landmark, ShieldAlert, CheckCircle2,
  ChevronRight, LayoutGrid, PieChart as PieChartIcon
} from 'lucide-react';

interface DashboardProps {
  forestRecords: ForestRecord[];
  industryRecords: IndustryRecord[];
  commerceRecords: CommerceRecord[];
}

const COLORS = {
  forest: ['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#e0f2fe', '#0284c7', '#0369a1', '#075985', '#0c4a6e'],
  industry: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'],
  commerce: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#fff1f2'],
  sector: ['#22c55e', '#fbbf24', '#f97316', '#a855f7', '#ec4899'],
  budget: {
    capital_bar: '#b91c1c',
    capital_line: '#3b82f6',
    current_bar: '#fbbf24',
    current_line: '#22c55e'
  }
};

export const Dashboard: React.FC<DashboardProps> = ({ forestRecords, industryRecords, commerceRecords }) => {
  const [activeTab, setActiveTab] = useState<'Forest' | 'Industry'>('Forest');
  const [selectedOffice, setSelectedOffice] = useState<string>('All');

  const offices = useMemo(() => {
    const set = new Set(activeTab === 'Forest' 
      ? forestRecords.map(r => r.office) 
      : [...industryRecords.map(r => r.office), ...commerceRecords.map(r => r.office)]
    );
    return Array.from(set);
  }, [activeTab, forestRecords, industryRecords, commerceRecords]);

  const filteredForest = useMemo(() => 
    selectedOffice === 'All' ? forestRecords : forestRecords.filter(r => r.office === selectedOffice)
  , [forestRecords, selectedOffice]);

  const filteredIndustry = useMemo(() => 
    selectedOffice === 'All' ? industryRecords : industryRecords.filter(r => r.office === selectedOffice)
  , [industryRecords, selectedOffice]);

  const filteredCommerce = useMemo(() => 
    selectedOffice === 'All' ? commerceRecords : commerceRecords.filter(r => r.office === selectedOffice)
  , [commerceRecords, selectedOffice]);

  // Financial Trend Mocker
  const financialTrend = useMemo(() => {
    const labels = ['Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush'];
    return labels.map((l) => ({
      name: l,
      capital_spent: 300000 + Math.random() * 200000,
      capital_budget: 600000,
      current_spent: 400000 + Math.random() * 100000,
      current_budget: 500000
    }));
  }, []);

  // Forest KPIs
  const forestKPIs = useMemo(() => ({
    cf: filteredForest.reduce((a, b) => a + b.community_forest_count, 0),
    rf: filteredForest.reduce((a, b) => a + b.religious_forest_count, 0),
    lf: filteredForest.reduce((a, b) => a + b.leasehold_forest_count, 0),
    timber: filteredForest.reduce((a, b) => a + b.timber_production, 0),
    resin: filteredForest.reduce((a, b) => a + b.resin, 0),
    herbs: filteredForest.reduce((a, b) => a + b.herbs, 0),
    cases: filteredForest.reduce((a, b) => a + b.cases_filed, 0),
    encroachment: filteredForest.reduce((a, b) => a + b.encroachment, 0),
    wp_reg: filteredForest.reduce((a, b) => a + b.workplan_registration, 0),
    wp_ren: filteredForest.reduce((a, b) => a + b.workplan_renewal, 0),
    saplings: filteredForest.reduce((a, b) => a + b.saplings, 0),
    plantation: filteredForest.reduce((a, b) => a + b.plantation, 0),
    arrears_reg: filteredForest.reduce((a, b) => a + b.arrears_regularizable, 0),
    arrears_rec: filteredForest.reduce((a, b) => a + b.arrears_recoverable, 0),
    advance: filteredForest.reduce((a, b) => a + b.advance_arrears, 0),
    audit: filteredForest.reduce((a, b) => a + b.audit_settlement, 0),
    revenue: filteredForest.reduce((a, b) => a + b.revenue, 0),
  }), [filteredForest]);

  // Revenue Pie Data
  const forestRevenueByOffice = useMemo(() => {
    const dataMap: Record<string, number> = {};
    filteredForest.forEach(r => {
      const officeName = r.office.replace('डिभिजन वन कार्यालय, ', '');
      dataMap[officeName] = (dataMap[officeName] || 0) + r.revenue;
    });
    return Object.entries(dataMap).map(([name, value]) => ({ name, value }));
  }, [filteredForest]);

  // Industry KPIs
  const indKPIs = useMemo(() => ({
    ind_reg: filteredIndustry.reduce((a, b) => a + b.reg_count, 0),
    ind_ren: filteredIndustry.reduce((a, b) => a + b.renewal_count, 0),
    comm_reg: filteredCommerce.reduce((a, b) => a + b.comm_reg, 0),
    comm_ren: filteredCommerce.reduce((a, b) => a + b.renewal, 0),
    micro: filteredIndustry.reduce((a, b) => a + b.micro_count, 0),
    cottage: filteredIndustry.reduce((a, b) => a + b.cottage_count, 0),
    small: filteredIndustry.reduce((a, b) => a + b.small_count, 0),
    medium: filteredIndustry.reduce((a, b) => a + b.medium_count, 0),
    large: filteredIndustry.reduce((a, b) => a + b.large_count, 0),
    agro: filteredIndustry.reduce((a, b) => a + b.agro_forest_count, 0),
    prod: filteredIndustry.reduce((a, b) => a + b.production_count, 0),
    service: filteredIndustry.reduce((a, b) => a + b.service_count, 0),
    tourism: filteredIndustry.reduce((a, b) => a + b.tourism_count, 0),
  }), [filteredIndustry, filteredCommerce]);

  // Industry/Commerce Revenue Pie Data
  const industryRevenueByOffice = useMemo(() => {
    const dataMap: Record<string, number> = {};
    filteredIndustry.forEach(r => {
      const officeName = r.office.replace('घरेलु तथा साना उद्योग कार्यालय, ', '');
      dataMap[officeName] = (dataMap[officeName] || 0) + r.total_rev;
    });
    return Object.entries(dataMap).map(([name, value]) => ({ name, value }));
  }, [filteredIndustry]);

  const commerceRevenueByOffice = useMemo(() => {
    const dataMap: Record<string, number> = {};
    filteredCommerce.forEach(r => {
      const officeName = r.office.replace('घरेलु तथा साना उद्योग कार्यालय, ', '');
      dataMap[officeName] = (dataMap[officeName] || 0) + r.total_rev;
    });
    return Object.entries(dataMap).map(([name, value]) => ({ name, value }));
  }, [filteredCommerce]);

  return (
    <div className="bg-[#1a1a20] min-h-screen text-slate-100 font-sans">
      {/* Header Container */}
      <div className="bg-[#24242d] border-b border-white/5 p-4 shadow-xl mb-6">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Emblem_of_Nepal.svg" className="h-16" alt="Nepal Emblem" />
            <div className="text-center md:text-left">
              <h1 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight leading-tight">
                उद्योग, पर्यटन, वन तथा वातावरण मन्त्रालय कर्णाली प्रदेशको
              </h1>
              <p className="text-sm md:text-lg font-bold text-sky-400">
                {activeTab === 'Forest' ? 'डिभिजन वन कार्यालय तर्फको प्रगती' : 'उद्योग तथा उपभोक्ता हित संरक्षण कार्यालय तर्फको प्रगती'}
              </p>
            </div>
          </div>
          
          <div className="flex bg-[#1a1a20] p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setActiveTab('Forest')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'Forest' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <TreePine size={18} /> Forest
            </button>
            <button 
              onClick={() => setActiveTab('Industry')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'Industry' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Factory size={18} /> Industry
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 pb-12 flex flex-col lg:flex-row gap-6">
        {/* Sidebar District List */}
        <aside className="w-full lg:w-56 bg-[#24242d] rounded-2xl border border-white/5 p-4 self-start shadow-xl">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <MapIcon size={12} /> {activeTab === 'Forest' ? 'डि.व.का. सूची' : 'कार्यालय सूची'}
          </h3>
          <div className="space-y-1">
            <button 
              onClick={() => setSelectedOffice('All')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${selectedOffice === 'All' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}
            >
              All Regions
            </button>
            {offices.map(o => (
              <button 
                key={o}
                onClick={() => setSelectedOffice(o)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-[11px] font-medium transition-all ${selectedOffice === o ? 'bg-sky-600 text-white' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}
              >
                {o.replace('डिभिजन वन कार्यालय, ', '').replace('घरेलु तथा साना उद्योग कार्यालय, ', '')}
              </button>
            ))}
          </div>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 space-y-6">
          {activeTab === 'Forest' ? (
            <>
              {/* Forest KPI Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {[
                  { label: 'सामुदायिक वन', val: forestKPIs.cf },
                  { label: 'धार्मिक वन', val: forestKPIs.rf },
                  { label: 'कबुलियती वन', val: forestKPIs.lf },
                  { label: 'काठ उत्पादन', val: forestKPIs.timber.toLocaleString() },
                  { label: 'खोटो (के.जी.)', val: forestKPIs.resin.toLocaleString() },
                  { label: 'जडिबुटी', val: forestKPIs.herbs.toLocaleString() },
                  { label: 'मुद्दा दायरा', val: forestKPIs.cases },
                  { label: 'अतिक्रमण(हे.)', val: forestKPIs.encroachment },
                ].map((kpi, idx) => (
                  <div key={idx} className="bg-[#24242d] p-3 rounded-xl border border-white/5 text-center shadow-inner hover:border-sky-500/30 transition-all group">
                    <p className="text-[9px] font-bold text-slate-500 mb-1 group-hover:text-slate-300 transition-colors uppercase tracking-tight">{kpi.label}</p>
                    <p className="text-xl font-black text-white">{kpi.val}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Financial Area */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-[#24242d] p-5 rounded-2xl border border-white/5 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-600"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">पूंजिगत विनियोजन/खर्च</span>
                      </div>
                      <div className="text-right">
                         <span className="text-xs font-black text-red-500">रू. 676,142.74</span>
                         <span className="mx-2 text-slate-700">|</span>
                         <span className="text-xs font-black text-sky-400">रू. 372,505.26</span>
                      </div>
                    </div>
                    <div className="h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={financialTrend}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3e3e46" opacity={0.3} />
                          <Bar dataKey="capital_budget" fill="#b91c1c" radius={[3, 3, 0, 0]} barSize={14} />
                          <Line type="monotone" dataKey="capital_spent" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-[#24242d] p-5 rounded-2xl border border-white/5 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">चालु विनियोजन/खर्च</span>
                      </div>
                      <div className="text-right">
                         <span className="text-xs font-black text-yellow-500">रू. 480,800.5</span>
                         <span className="mx-2 text-slate-700">|</span>
                         <span className="text-xs font-black text-green-400">रू. 414,414.86</span>
                      </div>
                    </div>
                    <div className="h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={financialTrend}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3e3e46" opacity={0.3} />
                          <Bar dataKey="current_budget" fill="#fbbf24" radius={[3, 3, 0, 0]} barSize={14} />
                          <Line type="monotone" dataKey="current_spent" stroke="#22c55e" strokeWidth={2} dot={false} />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Progress & Activities */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Activity Box */}
                    <div className="bg-[#24242d] p-8 rounded-2xl border border-white/5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                       <div className="space-y-6 text-center">
                         <div>
                           <p className="text-[10px] font-black text-slate-500 uppercase mb-1">कार्ययोजना दर्ता</p>
                           <p className="text-4xl font-black text-white">{forestKPIs.wp_reg}</p>
                         </div>
                         <div>
                           <p className="text-[10px] font-black text-slate-500 uppercase mb-1">कार्ययोजना नविकरण</p>
                           <p className="text-4xl font-black text-white">{forestKPIs.wp_ren}</p>
                         </div>
                         <div>
                           <p className="text-[10px] font-black text-slate-500 uppercase mb-1">वृक्षरोपण</p>
                           <p className="text-4xl font-black text-white">{forestKPIs.plantation}</p>
                         </div>
                       </div>
                    </div>

                    {/* Progress Gauge */}
                    <div className="bg-[#24242d] p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center shadow-2xl">
                       <div className="text-center mb-6">
                         <p className="text-xs font-black text-yellow-500 uppercase tracking-widest mb-1">विरुवा उत्पादन</p>
                         <p className="text-4xl font-black text-yellow-500">{forestKPIs.saplings.toLocaleString()}</p>
                       </div>
                       <div className="w-full aspect-square max-h-[220px] relative">
                         <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                             <Pie
                               data={[{v: 81.4}, {v: 18.6}]}
                               cx="50%" cy="100%"
                               startAngle={180} endAngle={0}
                               innerRadius={70} outerRadius={100}
                               dataKey="v" stroke="none"
                             >
                               <Cell fill="#0ea5e9" />
                               <Cell fill="#334155" />
                             </Pie>
                           </PieChart>
                         </ResponsiveContainer>
                         <div className="absolute bottom-2 inset-x-0 text-center">
                            <p className="text-[10px] font-black text-slate-500 uppercase">भौतिक प्रगती</p>
                            <p className="text-3xl font-black text-white">81.4%</p>
                         </div>
                       </div>
                    </div>
                  </div>

                  {/* Arrears & Revenue Column */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Revenue Pie Chart (Replacing Forest Type) */}
                    <div className="md:col-span-6 bg-[#24242d] p-6 rounded-2xl border border-white/5 shadow-2xl flex flex-col items-center">
                       <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                         <PieChartIcon size={14} className="text-emerald-400" /> राजश्व संकलन (Revenue)
                       </h4>
                       <div className="h-56 w-full relative">
                          <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                               <Pie
                                 data={forestRevenueByOffice}
                                 innerRadius={50} outerRadius={85}
                                 paddingAngle={2} dataKey="value"
                                 stroke="none"
                               >
                                 {forestRevenueByOffice.map((_, i) => <Cell key={i} fill={COLORS.forest[i % COLORS.forest.length]} />)}
                               </Pie>
                               <Tooltip 
                                 contentStyle={{ backgroundColor: '#1a1a20', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                 formatter={(val: number) => `रू. ${val.toLocaleString()}`}
                               />
                             </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                             <p className="text-[8px] font-black text-slate-500 uppercase mb-0.5">कुल संकलन</p>
                             <p className="text-xs font-black text-white">रू. {forestKPIs.revenue.toLocaleString()}</p>
                          </div>
                       </div>
                       <div className="w-full mt-4 grid grid-cols-2 gap-x-4 gap-y-1">
                          {forestRevenueByOffice.slice(0, 6).map((d, i) => (
                            <div key={i} className="flex items-center justify-between text-[10px]">
                               <span className="text-slate-500 truncate mr-2">{d.name}</span>
                               <span className="font-black text-white">{(d.value / 1000).toFixed(0)}K</span>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="md:col-span-6 space-y-4 flex flex-col justify-center">
                      {[
                        { label: 'नियमित गर्नुपर्ने वेरुजू', val: forestKPIs.arrears_reg.toLocaleString(), color: 'text-white' },
                        { label: 'असुल उपर गर्नुपर्ने वेरुजू', val: forestKPIs.arrears_rec.toLocaleString(), color: 'text-sky-400' },
                        { label: 'पेश्कि वेरुजु', val: forestKPIs.advance.toLocaleString(), color: 'text-slate-300' },
                        { label: 'सम्परिक्षण', val: forestKPIs.audit.toLocaleString(), color: 'text-slate-500' },
                      ].map((item, i) => (
                        <div key={i} className="text-right border-r-4 border-white/5 pr-4">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{item.label}</p>
                          <p className={`text-2xl font-black ${item.color}`}>{item.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Industry & Commerce Specialized Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                 <div className="bg-[#24242d] p-4 rounded-2xl border border-white/5 shadow-xl">
                    <h3 className="text-[10px] font-black text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                      <LayoutGrid size={12} className="text-sky-500" /> उद्योग प्रशासन (Industry Admin)
                    </h3>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                       {[
                         { label: 'उद्योग दर्ता', val: indKPIs.ind_reg },
                         { label: 'नविकरण', val: indKPIs.ind_ren },
                         { label: 'ठाउँ सारी', val: 70 },
                         { label: 'नाम परिवर्तन', val: 117 },
                         { label: 'प्रतिलिपी', val: 824 },
                         { label: 'संशोधन', val: 104 },
                         { label: 'खारेज', val: 521 },
                       ].map((k, i) => (
                         <div key={i} className="bg-[#1a1a20] p-3 rounded-xl border border-white/5 text-center">
                            <p className="text-[9px] font-black text-slate-500 mb-1 leading-tight">{k.label}</p>
                            <p className="text-lg font-black text-white">{k.val}</p>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="bg-[#24242d] p-4 rounded-2xl border border-white/5 shadow-xl">
                    <h3 className="text-[10px] font-black text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                      <ShoppingBag size={12} className="text-rose-500" /> वाणिज्य प्रशासन (Commerce Admin)
                    </h3>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                       {[
                         { label: 'वाणिज्य दर्ता', val: indKPIs.comm_reg },
                         { label: 'नविकरण', val: indKPIs.comm_ren },
                         { label: 'ठाउँ सारी', val: 51 },
                         { label: 'नामसारी', val: 42 },
                         { label: 'प्रतिलिपी', val: 243 },
                         { label: 'संशोधन', val: 134 },
                         { label: 'खारेज', val: 121 },
                       ].map((k, i) => (
                         <div key={i} className="bg-[#1a1a20] p-3 rounded-xl border border-white/5 text-center">
                            <p className="text-[9px] font-black text-slate-500 mb-1 leading-tight">{k.label}</p>
                            <p className="text-lg font-black text-white">{k.val}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-[#24242d] p-5 rounded-2xl border border-white/5 shadow-2xl">
                     <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">पूंजिगत विनियोजन/खर्च</span>
                        <p className="text-xs font-black text-red-500">रू. 676,142</p>
                     </div>
                     <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                           <ComposedChart data={financialTrend}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3e3e46" opacity={0.3} />
                              <Bar dataKey="capital_budget" fill="#b91c1c" radius={[3, 3, 0, 0]} barSize={20} />
                              <Line type="monotone" dataKey="capital_spent" stroke="#3b82f6" strokeWidth={3} dot={false} />
                           </ComposedChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
                  <div className="bg-[#24242d] p-5 rounded-2xl border border-white/5 shadow-2xl">
                     <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">चालु विनियोजन/खर्च</span>
                        <p className="text-xs font-black text-yellow-500">रू. 480,800</p>
                     </div>
                     <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                           <ComposedChart data={financialTrend}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3e3e46" opacity={0.3} />
                              <Bar dataKey="current_budget" fill="#fbbf24" radius={[3, 3, 0, 0]} barSize={20} />
                              <Line type="monotone" dataKey="current_spent" stroke="#22c55e" strokeWidth={3} dot={false} />
                           </ComposedChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#24242d] p-8 rounded-2xl border border-white/5 grid grid-cols-2 gap-x-12 gap-y-6 shadow-2xl">
                         <div className="text-center">
                            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">लघु</p>
                            <p className="text-3xl font-black text-white">{indKPIs.micro}</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">ठुला</p>
                            <p className="text-3xl font-black text-yellow-500">{indKPIs.large}</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">घरेलु</p>
                            <p className="text-3xl font-black text-white">{indKPIs.cottage}</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">साना</p>
                            <p className="text-3xl font-black text-white">{indKPIs.small}</p>
                         </div>
                      </div>

                      <div className="bg-[#24242d] p-8 rounded-2xl border border-white/5 grid grid-cols-2 gap-x-12 gap-y-6 shadow-2xl">
                         <div className="text-center">
                            <p className="text-[10px] font-black text-green-500 uppercase mb-1 leading-tight">कृषि तथा वन पैदावार</p>
                            <p className="text-2xl font-black text-green-500">{indKPIs.agro}</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">पर्यटन</p>
                            <p className="text-2xl font-black text-white">{indKPIs.tourism}</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] font-black text-green-500 uppercase mb-1">उत्पादन मुलक</p>
                            <p className="text-2xl font-black text-green-500">{indKPIs.prod}</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">सेवा मुलक</p>
                            <p className="text-2xl font-black text-white">{indKPIs.service}</p>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#24242d] p-6 rounded-2xl border border-white/5 shadow-2xl flex flex-col items-center">
                         <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">उद्योग तर्फ राजश्व संकलन</h4>
                         <div className="h-56 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                               <PieChart>
                                 <Pie
                                   data={industryRevenueByOffice}
                                   innerRadius={60} outerRadius={90}
                                   dataKey="value" stroke="none" paddingAngle={2}
                                 >
                                   {industryRevenueByOffice.map((_, i) => <Cell key={i} fill={COLORS.industry[i % COLORS.industry.length]} />)}
                                 </Pie>
                               </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                               <p className="text-[8px] font-black text-slate-500 uppercase mb-0.5">कुल</p>
                               <p className="text-sm font-black text-white">{(industryRevenueByOffice.reduce((a,b)=>a+b.value,0)/1000000).toFixed(1)}M</p>
                            </div>
                         </div>
                      </div>
                      <div className="bg-[#24242d] p-6 rounded-2xl border border-white/5 shadow-2xl flex flex-col items-center">
                         <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">वाणिज्य तर्फ राजश्व संकलन</h4>
                         <div className="h-56 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                               <PieChart>
                                 <Pie
                                   data={commerceRevenueByOffice}
                                   innerRadius={60} outerRadius={90}
                                   dataKey="value" stroke="none" paddingAngle={2}
                                 >
                                   {commerceRevenueByOffice.map((_, i) => <Cell key={i} fill={COLORS.commerce[i % COLORS.commerce.length]} />)}
                                 </Pie>
                               </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                               <p className="text-[8px] font-black text-slate-500 uppercase mb-0.5">कुल</p>
                               <p className="text-sm font-black text-white">{(commerceRevenueByOffice.reduce((a,b)=>a+b.value,0)/1000000).toFixed(1)}M</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <footer className="mt-12 border-t border-white/5 pt-8 pb-12">
         <div className="max-w-[1600px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
            <div className="flex items-center gap-6">
               <div className="p-3 bg-white/5 rounded-full"><ShieldAlert size={24} /></div>
               <div className="p-3 bg-white/5 rounded-full"><TrendingUp size={24} /></div>
               <div className="p-3 bg-white/5 rounded-full"><CheckCircle2 size={24} /></div>
               <div className="p-3 bg-white/5 rounded-full"><Landmark size={24} /></div>
            </div>
            <div className="text-center md:text-right">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Ministry of Industry, Tourism, Forest and Environment</p>
               <p className="text-[10px] font-medium text-slate-600">Karnali Province, Birendranagar, Surkhet</p>
            </div>
         </div>
      </footer>
    </div>
  );
};