import { Box, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../context/user';
import { IUserContext } from '../interfaces';
import FriendsList from '../components/Friends/FriendsList';
import SearchUsers from '../components/Friends/SearchUsers';

const FriendsRoute = () => {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <Box minH="100vh" mt="1rem" mx="0.5rem">
      <Flex flexDir={['column', 'column', 'row']}>
        <FriendsList />
        <Flex
          justifyContent="center"
          borderTopRightRadius={4}
          borderBottomRightRadius={4}
          flexGrow="2"
          width="95%"
          margin="0 auto"
          border="1px solid"
          borderColor={[
            'transparent',
            'transparent',
            `${user.theme === 'dark' ? 'text.secondary' : 'border.primary'}`,
          ]}
          minH="100vh"
        >
          <Box p="1rem" className="outlet-container">
            <SearchUsers />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default FriendsRoute;
