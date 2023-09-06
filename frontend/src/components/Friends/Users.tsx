import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { ISearchUser, IUserContext } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Shared/Avatar';
import { AiOutlinePlus } from 'react-icons/ai';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../context/user';

interface IUsersProps {
  users: ISearchUser[];
  addFriendRequest: (payload: any) => void;
}

let stompClient: any = null;
const Users = ({ users, addFriendRequest }: IUsersProps) => {
  const { user: currentUser } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);

  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  useEffect(() => {
    if (shouldRun.current && currentUser.id !== 0) {
      shouldRun.current = false;
      connect();
    }
  }, [shouldRun.current, connect]);

  useEffect(() => {
    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, []);

  const onConnected = () => {
    stompClient.subscribe(`/user/${currentUser.id}/friend-request`, onFriendRequest);
  };
  const onError = () => {};

  const onFriendRequest = (payload: any) => {
    addFriendRequest(JSON.parse(payload.body));
  };

  const sendFriendRequest = (friendId: number, userId: number) => {
    if (stompClient) {
      stompClient.send(
        '/api/v1/friend-request',
        {},
        JSON.stringify({ friendId, userId })
      );
    }
  };

  const navigate = useNavigate();
  const goToProfile = (profileId: number) => {
    navigate(`/profiles/${profileId}`);
  };

  return (
    <Box>
      {users.map((user) => {
        return (
          <Flex key={user.userId} my="1.5rem" justify="space-between" align="center">
            <Box p="0.5rem">
              <Flex
                cursor="pointer"
                onClick={() => goToProfile(user.profileId)}
                alignItems="center"
              >
                <Avatar
                  firstName={user.firstName}
                  lastName={user.lastName}
                  height="45px"
                  width="45px"
                  url={user.avatarUrl}
                />
                <Box>
                  <Text ml="0.5rem">
                    {user.firstName} {user.lastName}
                  </Text>
                </Box>
              </Flex>
            </Box>
            {user.userId !== currentUser.id && user.status === null && (
              <Button
                onClick={() => sendFriendRequest(user.userId, currentUser.id)}
                bg="transparent"
                border="1px solid"
                borderColor="text.primary"
                color="text.primary"
                _hover={{ bg: 'transparent' }}
              >
                <Box>
                  <AiOutlinePlus />
                </Box>
                Add as friend
              </Button>
            )}
            {user.userId !== currentUser.id && user.status !== null && (
              <Button
                bg="transparent"
                border="1px solid"
                borderColor="text.primary"
                color="text.primary"
                _hover={{ bg: 'transparent' }}
              >
                {user.status}
              </Button>
            )}
          </Flex>
        );
      })}
    </Box>
  );
};

export default Users;
