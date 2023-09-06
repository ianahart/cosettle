import { Box, Button, ButtonGroup, Flex, Input, Text } from '@chakra-ui/react';
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
  const [showSearch, setShowSearch] = useState(false);
  const [searchType, setSearchType] = useState('friends');
  const [searchTerm, setSearchTerm] = useState('');
  const [friendPagination, setFriendPagination] = useState<IPagination>({
    page: 0,
    direction: 'next',
    totalPages: 0,
    pageSize: 3,
  });
  const [searchPagination, setSearchPagination] = useState<IPagination>({
    page: 0,
    direction: 'next',
    totalPages: 0,
    pageSize: 3,
  });

  const getFriends = (paginate: boolean) => {
    const pageNum = paginate ? friendPagination.page : -1;
    setMessage('');
    Client.getFriends(
      user.id,
      pageNum,
      friendPagination.pageSize,
      friendPagination.direction
    )
      .then((res) => {
        const { page, pageSize, direction, totalPages, friends } = res.data.data;
        if (!paginate && friends.length === 0) {
          setMessage('You currently have no friends');
        }
        setFriendPagination({
          ...friendPagination,
          page,
          pageSize,
          direction,
          totalPages,
        });
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

  const handleSetShowSearch = (type: string) => {
    setShowSearch((prevState) => !prevState);
    setSearchType(type);
  };
  const getAllFriends = () => {
    setFriends([]);
    setShowSearch(false);
    setSearchPagination({
      page: 0,
      direction: 'next',
      totalPages: 0,
      pageSize: 3,
    });
    getFriends(false);
  };

  const searchFriends = (paginate: boolean) => {
    if (!paginate) {
      setFriends([]);
    }
    const pageNum = paginate ? searchPagination.page : -1;
    setMessage('');
    Client.searchFriends(
      user.id,
      searchTerm,
      pageNum,
      searchPagination.pageSize,
      searchPagination.direction
    )
      .then((res) => {
        const {
          page,
          pageSize,
          direction,
          totalPages,
          friends: friendsData,
        } = res.data.data;
        if (!paginate && friendsData.length === 0) {
          setMessage('No results found');
        }

        setSearchPagination({
          ...searchPagination,
          page,
          pageSize,
          direction,
          totalPages,
        });
        if (paginate) {
          setFriends((prevState) => [...prevState, ...friendsData]);
        } else {
          setFriends(friendsData);
        }
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const searchFriend = () => {
    setMessage('');
    Client.searchFriend(user.id, searchTerm)
      .then((res) => {
        if (res.data.id !== null) {
          handleSwitchChat(res.data.id);
        } else {
          setMessage(`Could not find ${searchTerm}`);
        }
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const delagateSearch = () => {
    searchType === 'chat' ? searchFriend() : searchFriends(false);
  };

  const hideSearch = () => {
    setShowSearch(false);
    setSearchTerm('');
  };

  return (
    <Box>
      <Box
        mt="5rem"
        borderBottom="1px solid"
        borderColor={user.theme === 'dark' ? 'text.secondary' : 'border.primary'}
      >
        <Flex justify="space-between" p="0.5rem">
          <Flex align="center">
            <Box color="text.primary" mx="0.25rem">
              <BsFillChatRightTextFill />
            </Box>
            <Text
              role="button"
              cursor="pointer"
              onClick={() => handleSetShowSearch('chat')}
              color="text.primary"
            >
              New Chat
            </Text>
          </Flex>
          <Flex align="center">
            <Box
              onClick={() => handleSetShowSearch('friends')}
              cursor="pointer"
              color="text.primary"
              mx="0.25rem"
            >
              <AiOutlineSearch />
            </Box>
            <Box color="text.primary" mx="0.25rem">
              <MdSettings />
            </Box>
          </Flex>
        </Flex>
        {showSearch && (
          <Box p="0.25rem">
            <Box>
              <Input
                value={searchTerm}
                fontSize="0.85rem"
                onChange={(e) => setSearchTerm(e.target.value)}
                color="text.primary"
                borderColor={user.theme === 'dark' ? 'text.secondary' : 'border.primary'}
                placeholder="Enter name..."
              />
            </Box>
            <ButtonGroup display="flex" flexDir="column">
              <Button onClick={delagateSearch} size="sm" m="0.25rem">
                Search
              </Button>
              <Button onClick={hideSearch} size="sm" m="0.25rem">
                Hide
              </Button>
            </ButtonGroup>
          </Box>
        )}
      </Box>
      <Flex justify="flex-end" p="0.5rem" cursor="pointer">
        <Button onClick={getAllFriends} size="sm" colorScheme="purple">
          All friends
        </Button>
      </Flex>
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
            {message}
          </Text>
        )}

        {showSearch && searchPagination.page < searchPagination.totalPages && (
          <Flex justify="center" my="2rem">
            <Button onClick={() => searchFriends(true)}>See more...</Button>
          </Flex>
        )}

        {!showSearch && friendPagination.page < friendPagination.totalPages && (
          <Flex justify="center" my="2rem">
            <Button onClick={() => getFriends(true)}>See more...</Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default FriendList;
