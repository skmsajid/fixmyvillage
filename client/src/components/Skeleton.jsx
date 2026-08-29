import React from "react";
import "../styles/skeleton.css";

export function SkeletonBox({ width = "100%", height = 24, style = {}, className = "" }) {
  return (
    <div
      className={`skeleton-box ${className}`}
      style={{ width, height, ...style }}
    />
  );
}

export function SkeletonCircle({ size = 40, style = {}, className = "" }) {
  return (
    <div
      className={`skeleton-circle ${className}`}
      style={{ width: size, height: size, borderRadius: "50%", ...style }}
    />
  );
}

export function SkeletonText({ lines = 2, width = "100%", style = {} }) {
  return (
    <div style={{ width, ...style }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton-box" style={{ height: 14, marginBottom: 8 }} />
      ))}
    </div>
  );
}
