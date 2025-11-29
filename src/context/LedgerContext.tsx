import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useReports } from './ReportContext';
import { useAuth } from './AuthContext';

export interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  isOriginal: boolean;
}

export interface TamperLog {
  id: string;
  entryId: string;
  userId: string;
  userName: string;
  timestamp: string;
  originalValue: string;
  newValue: string;
  field: string;
}

interface LedgerContextType {
  entries: LedgerEntry[];
  tamperLogs: TamperLog[];
  updateEntry: (id: string, field: keyof LedgerEntry, value: string | number) => void;
  addEntry: (entry: Omit<LedgerEntry, 'id' | 'isOriginal'>) => void;
  deleteEntry: (id: string) => void;
}

const LedgerContext = createContext<LedgerContextType | undefined>(undefined);

// Initial mock ledger data
const initialLedgerEntries: LedgerEntry[] = [
  {
    id: 'LED-001',
    date: '2025-01-15',
    description: 'Office Supplies Purchase',
    amount: 245.50,
    category: 'Operations',
    isOriginal: true,
  },
  {
    id: 'LED-002',
    date: '2025-01-18',
    description: 'Client Lunch Meeting',
    amount: 125.00,
    category: 'Entertainment',
    isOriginal: true,
  },
  {
    id: 'LED-003',
    date: '2025-01-22',
    description: 'Software Subscription',
    amount: 599.99,
    category: 'Technology',
    isOriginal: true,
  },
  {
    id: 'LED-004',
    date: '2025-01-25',
    description: 'Travel Reimbursement',
    amount: 450.00,
    category: 'Travel',
    isOriginal: true,
  },
  {
    id: 'LED-005',
    date: '2025-01-28',
    description: 'Training Materials',
    amount: 175.25,
    category: 'Education',
    isOriginal: true,
  },
];

export function LedgerProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<LedgerEntry[]>(initialLedgerEntries);
  const [tamperLogs, setTamperLogs] = useState<TamperLog[]>([]);
  const { addReport } = useReports();
  const { user } = useAuth();

  const reportTamperToModerator = useCallback((
    entryId: string,
    field: string,
    originalValue: string,
    newValue: string
  ) => {
    if (!user) return;

    const tamperLog: TamperLog = {
      id: `TAMP-${Date.now()}`,
      entryId,
      userId: user.id,
      userName: user.name,
      timestamp: new Date().toISOString(),
      originalValue,
      newValue,
      field,
    };

    setTamperLogs(prev => [...prev, tamperLog]);

    // Create a report for the moderator (marked as automated flag)
    addReport({
      title: `Ledger Tampering Detected - Entry ${entryId}`,
      description: `User "${user.name}" (ID: ${user.id}) has modified the ledger entry ${entryId}.\n\nField Modified: ${field}\nOriginal Value: ${originalValue}\nNew Value: ${newValue}\nTimestamp: ${new Date().toLocaleString()}\n\nThis modification was automatically detected and reported for review.`,
      category: 'fraud',
      severity: 'high',
      submittedBy: 'JJF - Automated Detection',
      submitterId: 'system',
      date: new Date().toISOString().split('T')[0],
      anonymous: false,
      involvedParties: user.name,
      isAutomatedFlag: true,
    });
  }, [user, addReport]);

  const updateEntry = useCallback((id: string, field: keyof LedgerEntry, value: string | number) => {
    setEntries(prev => {
      const entry = prev.find(e => e.id === id);
      if (!entry) return prev;

      const originalValue = String(entry[field]);
      const newValue = String(value);

      // Report any value change to the moderator
      if (originalValue !== newValue) {
        reportTamperToModerator(id, field, originalValue, newValue);
      }

      return prev.map(e =>
        e.id === id ? { ...e, [field]: value, isOriginal: false } : e
      );
    });
  }, [reportTamperToModerator]);

  const addEntry = useCallback((entryData: Omit<LedgerEntry, 'id' | 'isOriginal'>) => {
    const newEntry: LedgerEntry = {
      ...entryData,
      id: `LED-${String(Date.now()).slice(-6)}`,
      isOriginal: false,
    };
    setEntries(prev => [...prev, newEntry]);
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries(prev => {
      const entry = prev.find(e => e.id === id);
      if (entry && user) {
        reportTamperToModerator(id, 'entry', JSON.stringify(entry), 'DELETED');
      }
      return prev.filter(e => e.id !== id);
    });
  }, [user, reportTamperToModerator]);

  return (
    <LedgerContext.Provider
      value={{
        entries,
        tamperLogs,
        updateEntry,
        addEntry,
        deleteEntry,
      }}
    >
      {children}
    </LedgerContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLedger() {
  const context = useContext(LedgerContext);
  if (context === undefined) {
    throw new Error('useLedger must be used within a LedgerProvider');
  }
  return context;
}
