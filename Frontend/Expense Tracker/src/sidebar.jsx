import {
  faCaretUp,
  faChartLine,
  faFire,
  faGem,
  faHeart,
  faImages,
  faMagic,
  faPalette,
  faThumbtack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./assets/sidebar.css";

const Sidebar = () => {
  return (
    <div id="nav-bar">
      <input id="nav-toggle" type="checkbox" defaultChecked="true" />
      <div id="nav-header">
        <a id="nav-title" target="_blank">
          FINTRACK
        </a>
        <label htmlFor="nav-toggle">
          <span id="nav-toggle-burger"></span>
        </label>
        <hr />
      </div>
      <div id="nav-content">
        <div className="nav-button">
          <FontAwesomeIcon icon={faPalette} />
          <span>Dashboard</span>
        </div>
        <div className="nav-button">
          <FontAwesomeIcon icon={faImages} />
          <span>Expenses</span>
        </div>
        <div className="nav-button">
          <FontAwesomeIcon icon={faThumbtack} />
          <span>Categories</span>
        </div>
        <hr />
        <div className="nav-button">
          <FontAwesomeIcon icon={faHeart} />
          <span>Income</span>
        </div>
        <div className="nav-button">
          <FontAwesomeIcon icon={faChartLine} />
          <span>Reports</span>
        </div>
        <div className="nav-button">
          <FontAwesomeIcon icon={faFire} />
          <span>Budget</span>
        </div>
        <div className="nav-button">
          <FontAwesomeIcon icon={faMagic} />
          <span>Goals</span>
        </div>
        <hr />
        <div className="nav-button">
          <FontAwesomeIcon icon={faGem} />
          <span>Settings</span>
        </div>
        <div id="nav-content-highlight"></div>
      </div>
      <input id="nav-footer-toggle" type="checkbox" />
      <div id="nav-footer">
        <div id="nav-footer-heading">
          <div id="nav-footer-avatar">
            <img
              src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547"
              alt="Avatar"
            />
          </div>
          <div id="nav-footer-titlebox">
            <a id="nav-footer-title" target="_blank">
              Username
            </a>
            <span id="nav-footer-subtitle">User</span>
          </div>
          <label htmlFor="nav-footer-toggle">
            <FontAwesomeIcon icon={faCaretUp} />
          </label>
        </div>
        <div id="nav-footer-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
