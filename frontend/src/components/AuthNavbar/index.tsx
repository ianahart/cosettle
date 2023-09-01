import { Box, Flex } from '@chakra-ui/react';
import Logo from '../Shared/Logo';
import Account from '../Account';
import { Link as RouterLink } from 'react-router-dom';
import ThemeToggler from '../Shared/ThemeToggler';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';

const AuthNavbar = () => {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <Box bg={user.theme === 'dark' ? '#161515' : 'primary.dark'} minH="40px" p="0.25rem">
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
        <Flex justifyContent="space-between" alignItems="center">
          <Box mr="2rem">
            <ThemeToggler />
          </Box>
          <Account />
        </Flex>
      </Flex>
    </Box>
  );
};

export default AuthNavbar;
