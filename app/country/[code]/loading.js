export default function Loading() {
  return (
    <div className="container">
      <div className="skeleton-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton-card"></div>
        ))}
      </div>
    </div>
  );
}