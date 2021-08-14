import { Link } from 'react-router-dom';
import './MainNavigationButton.css';

export default function MainNavigationButton({ link }) {
  const { path, text, action, icon } = link;
  return path ? (
    <li className="mainNavigationButton ">
      <Link to={path}>
        <img src={icon} alt="Icon" className="mainNavigationButtonIcon" />
      </Link>
    </li>
  ) : (
    <li className="mainNavigationButton">
      <button onClick={action}>
        <img src={icon} alt="Icon" className="mainNavigationButtonIcon" />
      </button>
    </li>
  );
}
