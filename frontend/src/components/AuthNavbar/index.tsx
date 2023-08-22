import { Box, Flex } from '@chakra-ui/react';
import Logo from '../Shared/Logo';
import AccountMenu from '../Account';
import ThemeToggler from '../Shared/ThemeToggler';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';

const AuthNavbar = () => {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <Box bg={user.theme === 'dark' ? 'cover.primary' : 'primary.dark'} minH="40px" p="0.25rem">
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Logo />
        </Box>
        <Flex justifyContent="space-between" alignItems="center">
          <Box mr="2rem">
            <ThemeToggler />
          </Box>
          <AccountMenu />
        </Flex>
      </Flex>
    </Box>
  );
};

export default AuthNavbar;
