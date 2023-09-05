import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { IFriend, IPagination, IUserContext } from '../../interfaces';
import { UserContext } from '../../context/user';
import { Client } from '../../util/client';
import { BsFillChatRightTextFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdSettings } from 'react-icons/md';
import Friend from '../Friends/Friend';

interface IFriendListProps {
  handleSwitchChat: (userId: number) => void;
}

const FriendList = ({ handleSwitchChat }: IFriendListProps) => {
  const shouldRun = useRef(true);
  const { user } = useContext(UserContext) as IUserContext;
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [message, setMessage] = useState('');
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    direction: 'next',
    totalPages: 0,
    pageSize: 5,
  });

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

  const handleRemoveFriend = (id: number) =>
    setFriends((prevState) => prevState.filter((f) => f.id !== id));

  return (
    <Box>
      <Box mt="5rem" borderBottom="1px solid" borderColor="text.secondary">
        <Flex justify="space-between" p="0.5rem">
          <Flex align="center">
            <Box color="text.primary" mx="0.25rem">
              <BsFillChatRightTextFill />
            </Box>
            <Text color="text.primary">New Chat</Text>
          </Flex>
          <Flex align="center">
            <Box color="text.primary" mx="0.25rem">
              <AiOutlineSearch />
            </Box>
            <Box color="text.primary" mx="0.25rem">
              <MdSettings />
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Box p="1rem">
        {friends.map((f) => {
          return (
            <Friend
              messages={true}
              handleRemoveFriend={handleRemoveFriend}
              handleSwitchChat={handleSwitchChat}
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
    </Box>
  );
};

export default FriendList;
