import { Box } from '@chakra-ui/react';
import Logo from '../Shared/Logo';
import { Link as RouterLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import MainNavbarLinks from './MainNavbarLinks';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';

const MainNavbar = () => {
  const { user, nonAuthTheme } = useContext(UserContext) as IUserContext;
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleClickAway = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element;
      if (menuRef.current !== null && triggerRef !== null) {
        if (!menuRef.current.contains(target) && !triggerRef?.current?.contains(target)) {
          setShowMobileMenu(false);
        }
      }
    },
    [setShowMobileMenu]
  );

  const handleResize = useCallback(
    (event: Event) => {
      const target = event.target as Window;
      if (target.innerWidth > 768) {
        setShowMobileMenu(false);
      }
    },
    [setShowMobileMenu]
  );
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClickAway);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClickAway);
    };
  }, [handleClickAway]);

  return (
    <Box
      display="flex"
      bg={nonAuthTheme === 'dark' ? '#000' : 'primary.dark'}
      justifyContent="space-between"
      p="0.25rem"
    >
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <MainNavbarLinks
        isMobile={false}
        display={['none', 'none', 'flex']}
        alignItems="center"
        flexDir="row"
      />

      <Box
        ref={triggerRef}
        onClick={() => setShowMobileMenu(true)}
        p="0.25rem"
        cursor="pointer"
        color="text.primary"
        fontSize="1.3rem"
        display={['block', 'block', 'none']}
      >
        <RxHamburgerMenu />
      </Box>

      {showMobileMenu && (
        <Box
          display={['block', 'block', 'none']}
          className="box-shadow"
          ref={menuRef}
          bg={
            user.theme === 'dark' || nonAuthTheme === 'dark'
              ? 'cover.primary'
              : 'light.primary'
          }
          position="absolute"
          top="80px"
          borderRadius={8}
          minH="400px"
          maxWidth="250px"
          width="250px"
          right="0"
        >
          <Box minH="40px" borderTopRadius={8} bg="primary.dark"></Box>
          <MainNavbarLinks
            isMobile={true}
            display={['flex', 'flex', 'flex']}
            alignItems="unset"
            flexDir="column"
          />
        </Box>
      )}
    </Box>
  );
};

export default MainNavbar;
