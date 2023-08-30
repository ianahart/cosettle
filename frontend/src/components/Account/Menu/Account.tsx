import { Box, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import HeadingStack from '../HeadingStack';
import MenuLink from './MenuLink';
import { FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import { AiOutlineMessage } from 'react-icons/ai';
import { useContext } from 'react';
import { UserContext } from '../../../context/user';
import { IUserContext } from '../../../interfaces';
import { slugify } from '../../../util';
import { Client } from '../../../util/client';

const Account = () => {
  const navigate = useNavigate();
  const { user, tokens, logout, setNonAuthTheme } = useContext(
    UserContext
  ) as IUserContext;
  const { firstName, lastName } = user;

  const handleLogout = () => {
    Client.logout(tokens.refreshToken)
      .then(() => {
        logout();
        localStorage.setItem('theme', 'dark');
        setNonAuthTheme('dark');
        navigate('/');
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box>
      <HeadingStack heading="Account" />
      <MenuLink
        to={`${slugify(firstName, lastName)}/groups`}
        text="Groups"
        icon={<FiUsers />}
      />
      <MenuLink
        to={`${slugify(firstName, lastName)}/messages`}
        text="Messages"
        icon={<AiOutlineMessage />}
      />
      <MenuLink
        to={`${slugify(firstName, lastName)}/settings/details`}
        text="Settings"
        icon={<FiSettings />}
      />
      <Flex alignItems="center" my="0.5rem">
        <Box mr="0.25rem">
          <FiLogOut />
        </Box>
        <Box
          onClick={handleLogout}
          _hover={{ opacity: 0.8 }}
          fontSize="0.9rem"
          role="button"
        >
          Logout
        </Box>
      </Flex>
    </Box>
  );
};

export default Account;
