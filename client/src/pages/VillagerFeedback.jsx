import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/feedback.css';

const RATING_EMOJIS  = ['😡', '😕', '😐', '😊', '😍'];
const RATING_LABELS  = ['Poor', 'Fair', 'Average', 'Good', 'Excellent'];
const RATING_COLORS  = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];

const CATEGORIES = [
  { id: 'response',      icon: '⚡', label: 'Response Time'   },
  { id: 'quality',       icon: '🏆', label: 'Work Quality'    },
  { id: 'behavior',      icon: '🤝', label: 'Staff Behavior'  },
  { id: 'communication', icon: '💬', label: 'Communication'   },
  { id: 'resolution',    icon: '✅', label: 'Issue Resolution' },
  { id: 'other',         icon: '📋', label: 'Other'           },
];

const VillagerFeedback = () => {
  const navigate  = useNavigate();
  const userName  = localStorage.getItem('userName') || 'Villager';

  const [rating,        setRating]        = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category,      setCategory]      = useState('');
  const [message,       setMessage]       = useState('');
  const [isSubmitting,  setIsSubmitting]  = useState(false);
  const [isSuccess,     setIsSuccess]     = useState(false);
  const [clickedStar,   setClickedStar]   = useState(null);

  const displayRating = hoveredRating || rating;

  const handleStarClick = (star) => {
    setRating(star);
    setClickedStar(star);
    setTimeout(() => setClickedStar(null), 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !category) return;
    setIsSubmitting(true);

    try {
      const now = new Date();
      const payload = {
        userName,
        rating,
        category,
        message,
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().split(' ')[0],
      };

      const response = await fetch('/api/feedbacks', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert('Failed to submit feedback. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      alert('Network Error: Could not connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Success Screen ── */
  if (isSuccess) {
    return (
      <div className="fb-page">
        <div className="fb-card fb-success-card">
          <div className="fb-success-ring">
            <div className="fb-success-icon">✓</div>
          </div>
          <h2 className="fb-success-title">Thank You! 🎉</h2>
          <p className="fb-success-sub">Your feedback helps us improve village services for everyone.</p>
          <button className="fb-return-btn" onClick={() => navigate('/villager')}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  /* ── Main Form ── */
  return (
    <div className="fb-page">
      {/* Decorative blobs */}
      <div className="fb-blob fb-blob-1" />
      <div className="fb-blob fb-blob-2" />

      <div className="fb-card">

        {/* ── Header ── */}
        <div className="fb-header">
          <div className="fb-back-btn" onClick={() => navigate('/villager')}>
            ← Dashboard
          </div>
          <div className="fb-title-wrap">
            <h1 className="fb-title">Share Feedback</h1>
            <p className="fb-subtitle">Help us make your village better</p>
          </div>
          <div className="fb-user-chip">
            <span className="fb-user-avatar">👤</span>
            <span className="fb-user-name">{userName}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="fb-form">

          {/* ── Star Rating ── */}
          <div className="fb-section">
            <p className="fb-section-label">Rate your experience</p>
            <div className="fb-stars">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive  = displayRating >= star;
                const isClicked = clickedStar === star;
                return (
                  <button
                    key={star}
                    type="button"
                    className={`fb-star ${isActive ? 'fb-star-active' : ''} ${isClicked ? 'fb-star-bounce' : ''}`}
                    style={isActive ? { color: RATING_COLORS[displayRating - 1] } : {}}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    aria-label={`Rate ${star} star`}
                  >
                    ★
                  </button>
                );
              })}
            </div>
            <div className="fb-rating-label">
              {displayRating > 0 ? (
                <>
                  <span className="fb-rating-emoji">{RATING_EMOJIS[displayRating - 1]}</span>
                  <span className="fb-rating-text" style={{ color: RATING_COLORS[displayRating - 1] }}>
                    {RATING_LABELS[displayRating - 1]}
                  </span>
                </>
              ) : (
                <span className="fb-rating-placeholder">Tap a star to rate</span>
              )}
            </div>
          </div>

          {/* ── Category Chips ── */}
          <div className="fb-section">
            <p className="fb-section-label">What is your feedback about?</p>
            <div className="fb-chips">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`fb-chip ${category === cat.label ? 'fb-chip-active' : ''}`}
                  onClick={() => setCategory(cat.label)}
                >
                  <span className="fb-chip-icon">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Textarea ── */}
          <div className="fb-section">
            <p className="fb-section-label">Additional Comments <span className="fb-optional">(optional)</span></p>
            <textarea
              className="fb-textarea"
              placeholder="Tell us your experience in detail…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          {/* ── Actions ── */}
          <div className="fb-actions">
            <button
              type="submit"
              className="fb-submit-btn"
              disabled={!rating || !category || isSubmitting}
            >
              {isSubmitting ? (
                <span className="fb-spinner" />
              ) : (
                <>⭐ Submit Feedback</>
              )}
            </button>
            <button
              type="button"
              className="fb-cancel-btn"
              onClick={() => navigate('/villager')}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default VillagerFeedback;
