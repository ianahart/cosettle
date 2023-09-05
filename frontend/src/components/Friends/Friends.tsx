import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { IFriend, IPagination, IUserContext } from '../../interfaces';
import { useRef, useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/user';
import { Client } from '../../util/client';
import Friend from './Friend';

interface IFriendsProps {
  handleSetFriendRequestAccepted: (accepted: boolean) => void;
  friendRequestAccepted: boolean;
}

const Friends = ({
  handleSetFriendRequestAccepted,
  friendRequestAccepted,
}: IFriendsProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);
  const [message, setMessage] = useState('');
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    direction: 'next',
    totalPages: 0,
    pageSize: 5,
  });

  const handleRemoveFriend = (id: number) =>
    setFriends((prevState) => prevState.filter((f) => f.id !== id));

  const getFriends = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    setMessage('');
    Client.getFriends(user.id, pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { page, pageSize, direction, totalPages, friends } = res.data.data;
        if (!paginate && friends.length === 0) {
          setMessage('You currently have no friends');
        }
        setPagination({ ...pagination, page, pageSize, direction, totalPages });
        if (paginate) {
          setFriends((prevState) => [...prevState, ...friends]);
        } else {
          setFriends(friends);
        }
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getFriends(false);
    }
  }, [shouldRun.current, getFriends]);

  useEffect(() => {
    if (friendRequestAccepted) {
      handleSetFriendRequestAccepted(false);
      getFriends(false);
    }
  }, [friendRequestAccepted, handleSetFriendRequestAccepted]);

  return (
    <Box p="1rem">
      {friends.map((f) => {
        return (
          <Friend
            messages={false}
            handleRemoveFriend={handleRemoveFriend}
            getFriends={getFriends}
            key={f.id}
            friend={f}
          />
        );
      })}
      {message.length > 0 && (
        <Text textAlign="center" fontSize="0.9rem" color="text.primary">
          You currentlly do not have any friends
        </Text>
      )}
      {pagination.page < pagination.totalPages && (
        <Flex justify="center" my="2rem">
          <Button onClick={() => getFriends(true)}>See more...</Button>
        </Flex>
      )}
    </Box>
  );
};

export default Friends;
