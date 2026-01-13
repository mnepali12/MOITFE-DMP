
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ForestDataEntry } from './pages/ForestDataEntry';
import { IndustryDataEntry } from './pages/IndustryDataEntry';
import { CommerceDataEntry } from './pages/CommerceDataEntry';
import { DataTablePage } from './pages/DataTablePage';
import { Login } from './pages/Login';
import { UserManagement } from './pages/UserManagement';
import { Role, User, ForestRecord, IndustryRecord, CommerceRecord } from './types';
import { mockForestData, mockIndustryData, mockCommerceData } from './mockData';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [forestRecords, setForestRecords] = useState<ForestRecord[]>(mockForestData);
  const [industryRecords, setIndustryRecords] = useState<IndustryRecord[]>(mockIndustryData);
  const [commerceRecords, setCommerceRecords] = useState<CommerceRecord[]>(mockCommerceData);

  useEffect(() => {
    const savedUser = localStorage.getItem('mitfe_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('mitfe_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mitfe_user');
  };

  const addForestRecord = (record: ForestRecord) => setForestRecords(prev => [record, ...prev]);
  const addIndustryRecord = (record: IndustryRecord) => setIndustryRecords(prev => [record, ...prev]);
  const addCommerceRecord = (record: CommerceRecord) => setCommerceRecords(prev => [record, ...prev]);

  const updateForestStatus = (id: string, status: ForestRecord['status']) => {
    setForestRecords(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const updateIndustryStatus = (id: string, status: IndustryRecord['verificationStatus']) => {
    setIndustryRecords(prev => prev.map(r => r.id === id ? { ...r, verificationStatus: status } : r));
  };

  const updateCommerceStatus = (id: string, status: CommerceRecord['status']) => {
    setCommerceRecords(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          {/* Fix: Added missing commerceRecords prop to Dashboard component */}
          <Route path="/" element={<Dashboard forestRecords={forestRecords} industryRecords={industryRecords} commerceRecords={commerceRecords} />} />
          <Route path="/forest-entry" element={<ForestDataEntry onSave={addForestRecord} user={user} />} />
          <Route path="/industry-entry" element={<IndustryDataEntry onSave={addIndustryRecord} user={user} />} />
          <Route path="/commerce-entry" element={<CommerceDataEntry onSave={addCommerceRecord} user={user} />} />
          <Route 
            path="/data-tables" 
            element={
              <DataTablePage 
                forestRecords={forestRecords} 
                industryRecords={industryRecords} 
                commerceRecords={commerceRecords}
                user={user}
                onUpdateForest={updateForestStatus}
                onUpdateIndustry={updateIndustryStatus}
                onUpdateCommerce={updateCommerceStatus}
              />
            } 
          />
          {user.role === Role.SUPER_ADMIN && (
            <Route path="/users" element={<UserManagement />} />
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
