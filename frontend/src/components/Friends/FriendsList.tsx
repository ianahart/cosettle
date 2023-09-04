import { Box, Flex, Text, Button, ButtonGroup } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IFriendRequest, IPagination, IUserContext } from '../../interfaces';
import Avatar from '../Shared/Avatar';
import Header from './Header';
import Friends from './Friends';

interface IFriendsListProps {
  friendRequests: IFriendRequest[];
  getFriendRequests: (paginate: boolean) => void;
  page: number;
  totalPages: number;
  handleIgnoreFriendRequest: (id: number) => void;
  handleAcceptFriendRequest: (id: number, userId: number, friendId: number) => void;
}

const FriendsList = ({
  friendRequests,
  getFriendRequests,
  page,
  totalPages,
  handleIgnoreFriendRequest,
  handleAcceptFriendRequest,
}: IFriendsListProps) => {
  const { user } = useContext(UserContext) as IUserContext;

  const ignoreFriendRequest = (id: number) => {
    handleIgnoreFriendRequest(id);
  };

  const acceptFriendRequest = (id: number, userId: number, friendId: number) => {
    handleAcceptFriendRequest(id, userId, friendId);
  };

  return (
    <Box
      width={['95%', '95%', '250px']}
      maxW={['95%', '95%', '250px']}
      minW="250px"
      borderTopLeftRadius={4}
      borderBottomLeftRadius={4}
      margin="0 auto"
      flexGrow="1"
      border="1px solid"
      borderColor={[
        'transparent',
        'transparent',
        `${user.theme === 'dark' ? 'text.secondary' : 'border.primary'}`,
      ]}
      borderRight="none"
      minH="100vh"
      className="sidebar"
    >
      <Header heading="Friend Requests" />
      <Box p="1rem" mt="2rem" className="overflow-scroll" height="400px" overflowY="auto">
        {friendRequests.map((fr) => {
          return (
            <Box key={fr.id}>
              <Flex align="center">
                <Avatar
                  height="45px"
                  width="45px"
                  url={fr.avatarUrl}
                  firstName={fr.firstName}
                  lastName={fr.lastName}
                />
                <Text fontSize="0.9rem" ml="0.5rem" color="text.primary">
                  {fr.firstName} {fr.lastName}
                </Text>
              </Flex>
              <ButtonGroup m="1rem 0">
                <Button
                  onClick={() => acceptFriendRequest(fr.id, user.id, fr.senderId)}
                  colorScheme="purple"
                  size="sm"
                >
                  Accept
                </Button>
                <Button onClick={() => ignoreFriendRequest(fr.id)} size="sm">
                  Ignore
                </Button>
              </ButtonGroup>
            </Box>
          );
        })}
        {page < totalPages && (
          <Flex justify="center">
            <Button onClick={() => getFriendRequests(true)} size="sm">
              See more...
            </Button>
          </Flex>
        )}
      </Box>
      <Box height="400px" mt="2rem">
        <Header heading="Friends" />
        <Friends />
      </Box>
    </Box>
  );
};

export default FriendsList;
