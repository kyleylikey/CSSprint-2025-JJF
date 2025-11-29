import { useState } from 'react';
import { useLedger } from '../../context/LedgerContext';
import type { LedgerEntry } from '../../context/LedgerContext';
import './Ledger.css';

export default function Ledger() {
  const { entries, updateEntry, addEntry, deleteEntry, tamperLogs } = useLedger();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<LedgerEntry>>({});
  const [showTamperLogs, setShowTamperLogs] = useState(false);
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
    <div className="ledger-page">
      <div className="page-header">
        <div className="header-content">
          <h1>📒 Expense Ledger</h1>
          <p>Experimental Feature - Editable financial ledger for testing</p>
        </div>
        <div className="header-actions">
          <button 
            className={`btn-toggle ${showTamperLogs ? 'active' : ''}`}
            onClick={() => setShowTamperLogs(!showTamperLogs)}
          >
            🔍 {showTamperLogs ? 'Hide' : 'Show'} Audit Log ({tamperLogs.length})
          </button>
          <button 
            className="btn-add"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            ➕ Add Entry
          </button>
        </div>
      </div>

      {showTamperLogs && tamperLogs.length > 0 && (
        <div className="tamper-logs-section">
          <h3>⚠️ Modification Audit Log</h3>
          <p className="warning-text">
            All modifications to original entries are logged and reported to moderators.
          </p>
          <div className="tamper-logs-list">
            {tamperLogs.map(log => (
              <div key={log.id} className="tamper-log-item">
                <div className="log-header">
                  <span className="log-user">{log.userName}</span>
                  <span className="log-time">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <div className="log-details">
                  <span>Modified <strong>{log.field}</strong> in entry <strong>{log.entryId}</strong></span>
                  <div className="log-values">
                    <span className="old-value">Before: {log.originalValue}</span>
                    <span className="new-value">After: {log.newValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

      <div className="ledger-container">
        <div className="ledger-warning">
          ⚠️ <strong>Warning:</strong> This ledger is monitored. Any tampering with original entries 
          will be automatically detected and reported to the moderator for review.
        </div>

        <table className="ledger-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.id} className={!entry.isOriginal ? 'modified' : ''}>
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
                <td>
                  <span className={`status-badge ${entry.isOriginal ? 'original' : 'modified'}`}>
                    {entry.isOriginal ? '✓ Original' : '⚠ Modified'}
                  </span>
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
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
