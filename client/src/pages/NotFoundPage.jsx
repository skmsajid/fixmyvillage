import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-background">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="not-found-card">
        <div className="icon-wrapper">
          <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="nf-title">404 – Page Not Found</h1>
        <p className="nf-subtitle">Oops! The page you are looking for doesn’t exist or may have been moved.</p>
        <p className="nf-support">Let’s get you back to the main dashboard.</p>

        <div className="nf-actions">
          <button className="btn-primary" onClick={() => navigate("/")}>
            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Go to Home
          </button>
          <button className="btn-secondary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>

      <style>{`
        /* NotFound Typography & Layout */
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        .not-found-container {
          position: relative;
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f1f5f9;
          font-family: 'Poppins', sans-serif;
          overflow: hidden;
          padding: 20px;
        }

        /* Animated Background Shapes */
        .not-found-background {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          overflow: hidden;
          z-index: 0;
        }
        .shape {
          position: absolute;
          filter: blur(80px);
          opacity: 0.6;
          animation: float 10s infinite ease-in-out alternate;
        }
        .shape-1 {
          top: -10%; left: -10%;
          width: 50vw; height: 50vw;
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
        }
        .shape-2 {
          bottom: -20%; right: -10%;
          width: 60vw; height: 60vw;
          background: linear-gradient(135deg, #10b981, #059669);
          animation-delay: -5s;
        }
        .shape-3 {
          top: 40%; left: 60%;
          width: 30vw; height: 30vw;
          background: linear-gradient(135deg, #2dd4bf, #0d9488);
          animation-delay: -2s;
        }

        @keyframes float {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(30px) scale(1.1); }
        }

        /* Glassmorphism Card */
        .not-found-card {
          position: relative;
          z-index: 10;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255,255,255,0.4);
          border-radius: 30px;
          padding: 50px 40px;
          max-width: 540px;
          width: 100%;
          text-align: center;
          animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          background: linear-gradient(135deg, #ecfdf5, #d1fae5);
          border-radius: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #059669;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.2);
        }
        .alert-icon {
          width: 40px; height: 40px;
        }

        .nf-title {
          font-size: 32px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
        }
        
        .nf-subtitle {
          font-size: 16px;
          color: #475569;
          margin: 0 0 12px 0;
          line-height: 1.6;
          font-weight: 500;
        }

        .nf-support {
          font-size: 15px;
          color: #64748b;
          margin: 0 0 32px 0;
        }

        /* Buttons */
        .nf-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .btn-primary, .btn-secondary {
          padding: 14px 28px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: none;
        }

        .btn-icon { width: 20px; height: 20px; }

        .btn-primary {
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          color: white;
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.25);
        }
        .btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 25px rgba(14, 165, 233, 0.4);
        }

        .btn-secondary {
          background: #f1f5f9;
          color: #334155;
          border: 1px solid #e2e8f0;
        }
        .btn-secondary:hover {
          background: #e2e8f0;
          transform: translateY(-4px);
          box-shadow: 0 8px 15px rgba(0,0,0,0.05);
        }

        @media (max-width: 500px) {
          .not-found-card { padding: 40px 25px; }
          .nf-title { font-size: 26px; }
          .nf-actions { flex-direction: column; }
          .btn-primary, .btn-secondary { width: 100%; }
        }
      `}</style>
    </div>
  );
}
