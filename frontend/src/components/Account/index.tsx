import { useState, useRef } from 'react';
import ClickAwayMenu from '../Shared/ClickAwayMenu';
import { Box } from '@chakra-ui/react';
import Avatar from '../Shared/Avatar';
import Account from './Menu/Account';
const AccountMenu = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = (menuOpen: boolean) => {
    setMenuOpen(menuOpen);
  };

  return (
    <Box position="relative">
      <Box onClick={() => handleMenuOpen(true)} cursor="pointer" ref={triggerRef}>
        <Avatar width="45px" height="45px" backgroundColor="primary.dark" />
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
            <Account />
          </Box>
        </ClickAwayMenu>
      )}
    </Box>
  );
};

export default AccountMenu;
