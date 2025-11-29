import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLedger } from '../context/LedgerContext';
import type { LedgerEntry } from '../context/LedgerContext';
import './LedgerApp.css';

export default function LedgerApp() {
  const { entries, updateEntry, addEntry, deleteEntry } = useLedger();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<LedgerEntry>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
    category: 'Operations',
  });

  const categories = ['Operations', 'Entertainment', 'Technology', 'Travel', 'Education', 'Marketing', 'Other'];

  const handleEdit = (entry: LedgerEntry) => {
    setEditingId(entry.id);
    setEditValues({
      date: entry.date,
      description: entry.description,
      amount: entry.amount,
      category: entry.category,
    });
  };

  const handleSave = () => {
    if (editingId && editValues) {
      if (editValues.date !== undefined) updateEntry(editingId, 'date', editValues.date);
      if (editValues.description !== undefined) updateEntry(editingId, 'description', editValues.description);
      if (editValues.amount !== undefined) updateEntry(editingId, 'amount', editValues.amount);
      if (editValues.category !== undefined) updateEntry(editingId, 'category', editValues.category);
    }
    setEditingId(null);
    setEditValues({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const handleAddNewEntry = () => {
    if (newEntry.description.trim()) {
      addEntry({
        date: newEntry.date,
        description: newEntry.description,
        amount: newEntry.amount,
        category: newEntry.category,
      });
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: 0,
        category: 'Operations',
      });
      setShowAddForm(false);
    }
  };

  const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <div className="ledger-app">
      <header className="ledger-app-header">
        <div className="ledger-brand">
          <span className="ledger-icon">💰</span>
          <h1>QuickBooks Lite</h1>
          <span className="ledger-subtitle">Expense Management System</span>
        </div>
        <button className="exit-btn" onClick={() => navigate('/login')}>
          ✕ Exit
        </button>
      </header>

      <main className="ledger-app-main">
        <div className="ledger-toolbar">
          <h2>📊 Expense Ledger</h2>
          <button 
            className="btn-add-entry"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            ➕ Add Entry
          </button>
        </div>

        {showAddForm && (
          <div className="add-entry-form">
            <h3>Add New Entry</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Enter description..."
                  value={newEntry.description}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={newEntry.amount}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newEntry.category}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, category: e.target.value }))}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-save" onClick={handleAddNewEntry}>Add Entry</button>
              <button className="btn-cancel" onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div className="ledger-table-container">
          <table className="ledger-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(entry => (
                <tr key={entry.id}>
                  <td className="entry-id">{entry.id}</td>
                  <td>
                    {editingId === entry.id ? (
                      <input
                        type="date"
                        value={editValues.date || entry.date}
                        onChange={(e) => setEditValues(prev => ({ ...prev, date: e.target.value }))}
                      />
                    ) : (
                      entry.date
                    )}
                  </td>
                  <td>
                    {editingId === entry.id ? (
                      <input
                        type="text"
                        value={editValues.description || entry.description}
                        onChange={(e) => setEditValues(prev => ({ ...prev, description: e.target.value }))}
                      />
                    ) : (
                      entry.description
                    )}
                  </td>
                  <td>
                    {editingId === entry.id ? (
                      <select
                        value={editValues.category || entry.category}
                        onChange={(e) => setEditValues(prev => ({ ...prev, category: e.target.value }))}
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="category-tag">{entry.category}</span>
                    )}
                  </td>
                  <td className="amount">
                    {editingId === entry.id ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editValues.amount ?? entry.amount}
                        onChange={(e) => setEditValues(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                      />
                    ) : (
                      `$${entry.amount.toFixed(2)}`
                    )}
                  </td>
                  <td className="actions">
                    {editingId === entry.id ? (
                      <>
                        <button className="btn-icon save" onClick={handleSave} title="Save">
                          💾
                        </button>
                        <button className="btn-icon cancel" onClick={handleCancel} title="Cancel">
                          ✖
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="btn-icon edit" onClick={() => handleEdit(entry)} title="Edit">
                          ✏️
                        </button>
                        <button className="btn-icon delete" onClick={() => deleteEntry(entry.id)} title="Delete">
                          🗑️
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}><strong>Total</strong></td>
                <td className="amount"><strong>${totalAmount.toFixed(2)}</strong></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>

      <footer className="ledger-app-footer">
        <p>© 2025 QuickBooks Lite - Demo Accounting Software</p>
      </footer>
    </div>
  );
}
