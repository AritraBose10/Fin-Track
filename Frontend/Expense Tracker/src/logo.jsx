import "./assets/logo.css";

function Logo() {
  return (
    <>
      <div className="logo-container">
        <div className="wrapper">
          <div className="top">Fin-Track</div>
          <div className="bottom" aria-hidden="true">
            Fin-Track
          </div>
        </div>
      </div>
      <div className="sub">
        <p className="subtitle">A Modern Age Expense Tracker powered by AI</p>
      </div>
    </>
  );
}

export default Logo;
