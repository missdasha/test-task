import { NavLink } from 'react-router-dom';
import { COCKTAILS } from '../../constants';
import { capitalize } from '../../utils';

import './Sidebar.scss';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar__items">
        {COCKTAILS.map((menuItem) => (
          <li key={menuItem} className="menu-item">
            <NavLink
              to={`/${menuItem}`}
              className={({ isActive }) =>
                `menu-item__link ${isActive ? 'menu-item__link_active' : ''}`
              }
            >
              {capitalize(menuItem)}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
