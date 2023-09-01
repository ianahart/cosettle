import { useState, useRef, useContext } from 'react';
import ClickAwayMenu from '../Shared/ClickAwayMenu';
import { Box } from '@chakra-ui/react';
import Avatar from '../Shared/Avatar';
import Account from './Menu/Account';
import Spaces from './Menu/Spaces';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
const AccountMenu = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = (menuOpen: boolean) => {
    setMenuOpen(menuOpen);
  };

  return (
    <Box position="relative">
      <Box onClick={() => handleMenuOpen(true)} cursor="pointer" ref={triggerRef}>
        <Avatar
          firstName={user.firstName}
          lastName={user.lastName}
          width="45px"
          height="45px"
          url={user.avatarUrl}
        />
      </Box>
      {menuOpen && (
        <ClickAwayMenu
          handleMenuOpen={handleMenuOpen}
          triggerRef={triggerRef}
          menuRef={menuRef}
          right="5px"
          minH="400px"
          top="60px"
        >
          <Box p="0.5rem">
            <Spaces />
          </Box>
          <Box p="0.5rem">
            <Account />
          </Box>
        </ClickAwayMenu>
      )}
    </Box>
  );
};

export default AccountMenu;
