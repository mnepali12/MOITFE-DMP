
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
import { googleDb } from './db';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [forestRecords, setForestRecords] = useState<ForestRecord[]>([]);
  const [industryRecords, setIndustryRecords] = useState<IndustryRecord[]>([]);
  const [commerceRecords, setCommerceRecords] = useState<CommerceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('mitfe_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const initDb = async () => {
      setIsLoading(true);
      await googleDb.init();
      const forest = await googleDb.getForestRecords();
      const industry = await googleDb.getIndustryRecords();
      const commerce = await googleDb.getCommerceRecords();
      setForestRecords(forest);
      setIndustryRecords(industry);
      setCommerceRecords(commerce);
      setIsLoading(false);
    };

    initDb();
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('mitfe_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mitfe_user');
  };

  const addForestRecord = async (record: ForestRecord) => {
    await googleDb.saveForestRecord(record);
    const updated = await googleDb.getForestRecords();
    setForestRecords(updated);
  };

  const addIndustryRecord = async (record: IndustryRecord) => {
    await googleDb.saveIndustryRecord(record);
    const updated = await googleDb.getIndustryRecords();
    setIndustryRecords(updated);
  };

  const addCommerceRecord = async (record: CommerceRecord) => {
    await googleDb.saveCommerceRecord(record);
    const updated = await googleDb.getCommerceRecords();
    setCommerceRecords(updated);
  };

  const updateForestStatus = async (id: string, status: ForestRecord['status']) => {
    await googleDb.updateForestStatus(id, status);
    const updated = await googleDb.getForestRecords();
    setForestRecords(updated);
  };

  const updateIndustryStatus = async (id: string, status: IndustryRecord['verificationStatus']) => {
    await googleDb.updateIndustryStatus(id, status);
    const updated = await googleDb.getIndustryRecords();
    setIndustryRecords(updated);
  };

  const updateCommerceStatus = async (id: string, status: CommerceRecord['status']) => {
    await googleDb.updateCommerceStatus(id, status);
    const updated = await googleDb.getCommerceRecords();
    setCommerceRecords(updated);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 font-medium animate-pulse">Syncing with Google Database...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
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
