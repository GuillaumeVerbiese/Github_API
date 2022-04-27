import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <Menu>
      <Menu.Item as={NavLink} to="/">
        Recherche
      </Menu.Item>
      <Menu.Item as={NavLink} to="/faq">
        FAQ
      </Menu.Item>
    </Menu>
  );
}

export default Nav;
