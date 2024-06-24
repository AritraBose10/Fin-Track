import "./assets/card.css";

const NeomorphicCard = ({ left, top, children }) => {
  return (
    <div className="card-container" style={{ left, top }}>
      <div className="neomorphic-card">{children}</div>
    </div>
  );
};

export default NeomorphicCard;
