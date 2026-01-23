
import { ForestRecord, IndustryRecord, CommerceRecord } from './types';
import { mockForestData, mockIndustryData, mockCommerceData } from './mockData';

// Simulated Google Cloud Database Service (e.g., Firestore)
const DB_PREFIX = 'moitfe_db_';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const googleDb = {
  // Initialize DB with mock data if empty
  async init() {
    if (!localStorage.getItem(`${DB_PREFIX}forest`)) {
      localStorage.setItem(`${DB_PREFIX}forest`, JSON.stringify(mockForestData));
    }
    if (!localStorage.getItem(`${DB_PREFIX}industry`)) {
      localStorage.setItem(`${DB_PREFIX}industry`, JSON.stringify(mockIndustryData));
    }
    if (!localStorage.getItem(`${DB_PREFIX}commerce`)) {
      localStorage.setItem(`${DB_PREFIX}commerce`, JSON.stringify(mockCommerceData));
    }
    await delay(500); // Simulate network latency
  },

  async getForestRecords(): Promise<ForestRecord[]> {
    await delay(300);
    const data = localStorage.getItem(`${DB_PREFIX}forest`);
    return data ? JSON.parse(data) : [];
  },

  async saveForestRecord(record: ForestRecord): Promise<void> {
    await delay(800);
    const records = await this.getForestRecords();
    const updated = [record, ...records];
    localStorage.setItem(`${DB_PREFIX}forest`, JSON.stringify(updated));
  },

  async updateForestStatus(id: string, status: ForestRecord['status']): Promise<void> {
    await delay(400);
    const records = await this.getForestRecords();
    const updated = records.map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem(`${DB_PREFIX}forest`, JSON.stringify(updated));
  },

  async getIndustryRecords(): Promise<IndustryRecord[]> {
    await delay(300);
    const data = localStorage.getItem(`${DB_PREFIX}industry`);
    return data ? JSON.parse(data) : [];
  },

  async saveIndustryRecord(record: IndustryRecord): Promise<void> {
    await delay(800);
    const records = await this.getIndustryRecords();
    const updated = [record, ...records];
    localStorage.setItem(`${DB_PREFIX}industry`, JSON.stringify(updated));
  },

  async updateIndustryStatus(id: string, status: IndustryRecord['verificationStatus']): Promise<void> {
    await delay(400);
    const records = await this.getIndustryRecords();
    const updated = records.map(r => r.id === id ? { ...r, verificationStatus: status } : r);
    localStorage.setItem(`${DB_PREFIX}industry`, JSON.stringify(updated));
  },

  async getCommerceRecords(): Promise<CommerceRecord[]> {
    await delay(300);
    const data = localStorage.getItem(`${DB_PREFIX}commerce`);
    return data ? JSON.parse(data) : [];
  },

  async saveCommerceRecord(record: CommerceRecord): Promise<void> {
    await delay(800);
    const records = await this.getCommerceRecords();
    const updated = [record, ...records];
    localStorage.setItem(`${DB_PREFIX}commerce`, JSON.stringify(updated));
  },

  async updateCommerceStatus(id: string, status: CommerceRecord['status']): Promise<void> {
    await delay(400);
    const records = await this.getCommerceRecords();
    const updated = records.map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem(`${DB_PREFIX}commerce`, JSON.stringify(updated));
  }
};
