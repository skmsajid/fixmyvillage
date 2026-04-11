import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin-feedback.css';

/* Star color scale by rating */
const BAR_COLORS = { 5: '#10b981', 4: '#34d399', 3: '#f59e0b', 2: '#f97316', 1: '#ef4444' };

const Stars = ({ rating }) => (
  <span className="af-stars">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'af-star-filled' : 'af-star-empty'}>★</span>
    ))}
  </span>
);

const Toast = ({ message }) => (
  <div className="af-toast">
    <span className="af-toast-icon">🗑️</span>
    {message}
  </div>
);

const AdminFeedback = () => {
  const navigate = useNavigate();

  const [feedbacks, setFeedbacks]         = useState([]);
  const [loading, setLoading]             = useState(true);
  const [search, setSearch]               = useState('');
  const [filterRating, setFilterRating]   = useState('all');
  const [deleteModalId, setDeleteModalId] = useState(null);
  const [toast, setToast]                 = useState(null);

  /* ── Fetch ── */
  useEffect(() => { fetchFeedbacks(); }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('/api/feedbacks');
      if (res.ok) {
        const json = await res.json();
        setFeedbacks(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Show Toast ── */
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2700);
  }, []);

  /* ── Delete ── */
  const handleDelete = async () => {
    if (!deleteModalId) return;
    try {
      const res = await fetch(`/api/feedbacks/${deleteModalId}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedbacks(prev => prev.filter(f => f._id !== deleteModalId));
        showToast('Feedback deleted successfully');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteModalId(null);
    }
  };

  /* ── Analytics ── */
  const analytics = useMemo(() => {
    if (!feedbacks.length) return { avg: '0.0', total: 0, counts: [0,0,0,0,0] };
    let sum = 0;
    const counts = [0,0,0,0,0];
    feedbacks.forEach(f => {
      sum += f.rating;
      if (f.rating >= 1 && f.rating <= 5) counts[f.rating - 1]++;
    });
    return { avg: (sum / feedbacks.length).toFixed(1), total: feedbacks.length, counts };
  }, [feedbacks]);

  /* ── Filter ── */
  const filtered = useMemo(() =>
    feedbacks.filter(f => {
      const matchS = f.userName.toLowerCase().includes(search.toLowerCase());
      const matchR = filterRating === 'all' || f.rating === parseInt(filterRating);
      return matchS && matchR;
    }),
  [feedbacks, search, filterRating]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="af-loading">
        <div className="af-spinner" />
        <span>Loading feedbacks…</span>
      </div>
    );
  }

  const RATING_OPTIONS = [
    { label: 'All', value: 'all' },
    { label: '⭐⭐⭐⭐⭐', value: '5' },
    { label: '⭐⭐⭐⭐', value: '4' },
    { label: '⭐⭐⭐', value: '3' },
    { label: '⭐⭐', value: '2' },
    { label: '⭐', value: '1' },
  ];

  return (
    <div className="af-page">

      {/* ── Topbar ── */}
      <div className="af-topbar">
        <div className="af-topbar-left">
          <h1>📊 <span className="af-title-text">Feedback Management</span></h1>
          <p>Review and manage villager feedback from one place.</p>
        </div>
        <button className="af-back-btn" onClick={() => navigate('/admin')}>
          ← Back to Dashboard
        </button>
      </div>

      {/* ── Analytics ── */}
      <div className="af-stats-row">

        <div className="af-stat avg">
          <div className="af-stat-label">⭐ Average Rating</div>
          <div className="af-stat-value">
            {analytics.avg}<sub>/ 5</sub>
          </div>
        </div>

        <div className="af-stat total">
          <div className="af-stat-label">📝 Total Feedbacks</div>
          <div className="af-stat-value">{analytics.total}</div>
        </div>

        <div className="af-stat dist">
          <div className="af-stat-label">📊 Distribution</div>
          <div className="af-dist">
            {[5, 4, 3, 2, 1].map(star => {
              const count = analytics.counts[star - 1];
              const perc  = analytics.total > 0 ? (count / analytics.total) * 100 : 0;
              return (
                <div key={star} className="af-dist-row">
                  <span className="af-dist-label">{star} ★</span>
                  <div className="af-dist-track">
                    <div className="af-dist-fill" style={{ width: `${perc}%`, background: BAR_COLORS[star] }} />
                  </div>
                  <span className="af-dist-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Controls ── */}
      <div className="af-controls">
        <div className="af-search-wrap">
          <span className="af-search-icon">🔍</span>
          <input
            type="text"
            className="af-search"
            placeholder="Search by user name…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="af-rating-filters">
          {RATING_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`af-pill ${filterRating === opt.value ? 'active' : ''}`}
              onClick={() => setFilterRating(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Count ── */}
      {!loading && (
        <div className="af-count-row">
          Showing <span>{filtered.length}</span> of <span>{feedbacks.length}</span> feedbacks
        </div>
      )}

      {/* ── Feedback Grid ── */}
      {filtered.length === 0 ? (
        <div className="af-empty">
          <span className="af-empty-icon">📭</span>
          <h2>No feedbacks found</h2>
          <p>Try adjusting your search or rating filter.</p>
        </div>
      ) : (
        <div className="af-grid">
          {filtered.map(fb => (
            <div
              key={fb._id}
              className={`af-card ${fb.rating <= 2 ? 'critical' : ''}`}
            >
              {fb.rating <= 2 && <div className="af-alert-badge">🚨 Needs Attention</div>}

              <div className="af-card-header">
                <div className="af-user-info">
                  <div className="af-avatar">{fb.userName.charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="af-username">{fb.userName}</div>
                    <div className="af-timestamp">📅 {fb.date} · {fb.time}</div>
                  </div>
                </div>
                <button
                  className="af-delete-btn"
                  title="Delete Feedback"
                  onClick={() => setDeleteModalId(fb._id)}
                >
                  🗑
                </button>
              </div>

              <div className="af-card-meta">
                <Stars rating={fb.rating} />
                <span className="af-cat-badge">{fb.category}</span>
              </div>

              {fb.message && (
                <div className="af-message">"{fb.message}"</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Delete Modal ── */}
      {deleteModalId && (
        <div className="af-modal-overlay" onClick={() => setDeleteModalId(null)}>
          <div className="af-modal" onClick={e => e.stopPropagation()}>
            <div className="af-modal-icon">🗑️</div>
            <h3>Delete Feedback?</h3>
            <p>This action cannot be undone. The feedback will be permanently removed from the database.</p>
            <div className="af-modal-actions">
              <button className="af-modal-btn af-btn-cancel" onClick={() => setDeleteModalId(null)}>
                Cancel
              </button>
              <button className="af-modal-btn af-btn-delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && <Toast message={toast} />}

    </div>
  );
};

export default AdminFeedback;
