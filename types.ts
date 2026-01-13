
export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  ENUMERATOR = 'ENUMERATOR',
  VIEWER = 'VIEWER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: 'Forest' | 'Industry' | 'General' | 'Commerce';
}

export interface ForestRecord {
  id: string;
  sn: string;                   // सि.नं.
  office: string;               // कार्यालय
  date: string;                 // मिति
  current_allocation: number;    // चालु विनियोजन
  capital_allocation: number;    // पूंजिगत विनियोजन
  current_expenditure: number;   // चालु खर्च
  capital_expenditure: number;   // पुंजिगत खर्च
  financial_progress_pct: number;// वित्तिय प्रगति %
  community_forest_count: number;// सामुदायिक वन
  religious_forest_count: number; // धार्मिक वन
  leasehold_forest_count: number; // कबुलियती वन
  total_forest_area: number;     // वनको क्षेत्रफल
  revenue: number;              // राजश्व
  audit_settlement: number;      // सम्परिक्षण
  arrears_recoverable: number;   // असुल उपर गर्नुपर्ने वेरुजू
  arrears_regularizable: number; // नियमित गर्नुपर्ने वेरुजू
  advance_arrears: number;      // पेश्कि बेरुजु
  timber_production: number;    // काठ उत्पादन
  cases_filed: number;          // मुद्दा दायरा
  workplan_renewal: number;     // कार्ययोजना नविकरण
  workplan_registration: number;// कार्ययोजना दर्ता
  saplings: number;             // विरुवा
  herbs: number;                // जडिबुटी
  resin: number;                // खोटो
  plantation: number;           // वृक्षरोपण
  approved_positions: number;    // स्विकृत दरवन्दी
  filled_positions: number;      // पदपु्र्ति संख्या
  physical_progress: string;     // भौतिक प्रगती
  cf_area: number;              // सा व क्षेत्रफल
  lf_area: number;              // क व क्षेत्रफल
  rf_area: number;              // धा क्षेत्रफल
  cf_hh: number;                // सा व HH
  lf_hh: number;                // क व HH
  rf_hh: number;                // धा HH
  encroachment: number;         // अतिक्रमण
  relief: number;               // राहत
  status: 'Pending' | 'Approved' | 'Rejected';
  createdBy: string;
  remarks?: string;
}

export interface IndustryRecord {
  id: string;
  office: string;               // कार्यालय
  current_allocation: number;    // चालु विनियोजन
  capital_allocation: number;    // पूंजिगत विनियोजन
  current_expenditure: number;   // चालु खर्च
  capital_expenditure: number;   // पुंजिगत खर्च
  financial_progress_pct: number;// वित्तिय प्रगति %
  month: string;                // महिना
  
  // Activities
  reg_count: number;            // उद्योग दर्ता
  renewal_count: number;        // नविकरण
  loc_transfer_count: number;   // ठाउँ सारी
  name_change_count: number;    // नाम परिवर्तन
  copy_count: number;           // प्रतिलिपी
  amend_count: number;          // संशोधन
  cancel_count: number;         // खारेज
  owner_transfer_count: number; // नामसारी
  cap_increase_count: number;   // पूँजीवृद्धी
  other_count: number;          // अन्य

  // Scale
  micro_count: number;          // लघु
  cottage_count: number;        // घरेलु
  small_count: number;          // साना
  medium_count: number;         // मझौला
  large_count: number;          // ठुला

  // Sector
  energy_count: number;         // उर्जामुलक
  production_count: number;     // उत्पादन मुलक
  agro_forest_count: number;    // कृर्षि तथा वन पैदावार
  service_count: number;        // सेवा मुलक
  tourism_count: number;        // पर्यटन
  mineral_count: number;        // खनिज
  infra_count: number;          // पुर्वाधार
  it_count: number;             // सुचना तथा प्रविधी

  // Employment
  female_emp: number;           // महिला रोजगार
  male_emp: number;             // पुरुष रोजगार

  // Revenue
  reg_rev: number;              // दर्ता राजश्व
  renewal_rev: number;          // नविकरण राजश्व
  loc_transfer_rev: number;     // ठाउँ सारी राजश्व
  name_change_rev: number;      // नाम परिवर्तन राजश्व
  copy_rev: number;             // प्रतिलिपी राजश्व
  amend_rev: number;            // संशोधन राजश्व
  cancel_rev: number;           // खारेज राजश्व
  owner_transfer_rev: number;   // नामसारी राजश्व
  cap_increase_rev: number;     // पूँजीवृद्धी राजश्व
  other_rev: number;            // अन्य राजश्व
  total_rev: number;            // जम्मा राजश्व

  // Personnel & Summary
  approved_pos: number;         // स्विकृत दरवन्दी
  filled_pos: number;           // पदपु्र्ति संख्या
  total_industries: number;     // जम्मा उद्योग

  verificationStatus: 'Pending' | 'Approved' | 'Rejected';
  createdBy: string;
  remarks?: string;
}

export interface CommerceRecord {
  id: string;
  office: string;               // कार्यालय
  month: string;                // महिना
  comm_reg: number;             // बाणिज्य दर्ता
  renewal: number;              // नविकरण
  cap_increase: number;         // पूँजीवृद्धी
  copy: number;                 // प्रतिलिपी
  owner_transfer: number;       // नामसारी
  loc_transfer: number;         // ठाउँसारी
  amendment: number;            // संशोधन
  cancellation: number;         // खारेज
  details: string;              // विवरण
  cap_increase_amt: number;     // पूँजिवृद्धी भएको रु हजारमा
  other: number;                // अन्य
  reg_rev: number;              // दर्ता राजश्व
  other_rev: number;            // अन्य राजश्व
  total_rev: number;            // जम्मा राजश्व
  total_comm_reg: number;       // जम्मा वाणिज्य दर्ता
  status: 'Pending' | 'Approved' | 'Rejected';
  createdBy: string;
}

export interface SystemStats {
  totalForestArea: number;
  activeIndustries: number;
  totalEmployment: number;
  pendingReviews: number;
}
