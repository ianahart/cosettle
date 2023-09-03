import { Box, Flex } from '@chakra-ui/react';
import { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '../context/user';
import { IFriendRequest, IPagination, IUserContext } from '../interfaces';
import FriendsList from '../components/Friends/FriendsList';
import SearchUsers from '../components/Friends/SearchUsers';
import { Client } from '../util/client';

const FriendsRoute = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);
  const [friendRequests, setFriendRequests] = useState<IFriendRequest[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    pageSize: 1,
    page: 0,
    direction: 'next',
    totalPages: 0,
  });

  const getFriendRequests = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;

    Client.getFriendRequests(user.id, pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { pageSize, page, direction, totalPages, friendRequests } = res.data.data;
        setPagination({ ...pagination, pageSize, page, direction, totalPages });
        if (paginate) {
          setFriendRequests((prevState) => [...prevState, ...friendRequests]);
        } else {
          setFriendRequests(friendRequests);
        }
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const handleIgnoreFriendRequest = (id: number) => {
    setFriendRequests((prevState) => prevState.filter((fr) => fr.id !== id));
    Client.removeFriendRequest(id)
      .then(() => {
        getFriendRequests(false);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const addFriendRequest = (friendRequest: any) => {
    console.log(friendRequest);
    setFriendRequests((prevState) => [friendRequest, ...prevState]);
    setPagination((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getFriendRequests(false);
    }
  }, [shouldRun.current, user.id]);

  return (
    <Box minH="100vh" mt="1rem" mx="0.5rem">
      <Flex flexDir={['column', 'column', 'row']}>
        <FriendsList
          friendRequests={friendRequests}
          getFriendRequests={getFriendRequests}
          pagination={pagination}
          handleIgnoreFriendRequest={handleIgnoreFriendRequest}
        />
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
            <SearchUsers addFriendRequest={addFriendRequest} />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default FriendsRoute;
