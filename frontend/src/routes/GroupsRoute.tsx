import { Box, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../context/user';
import { IUserContext } from '../interfaces';
import Sidebar from '../components/Group/Sidebar';
import { Outlet } from 'react-router-dom';

const GroupsRoute = () => {
  const { user } = useContext(UserContext) as IUserContext;

  return (
    <Flex className="group-route-container">
      <Sidebar />
      <Box
        minH="100vh"
        width="100%"
        border="1px solid"
        borderColor={user.theme === 'dark' ? 'text.secondary' : 'border.primary'}
      >
        <Box className="group-outlet-container" mt="3rem">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default GroupsRoute;
