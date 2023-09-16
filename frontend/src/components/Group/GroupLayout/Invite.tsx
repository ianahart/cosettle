import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';
import { IGroup, IMinimalUser, IPagination, IUserContext } from '../../../interfaces';
import { useContext, useState } from 'react';
import { Client } from '../../../util/client';
import Avatar from '../../Shared/Avatar';
import { UserContext } from '../../../context/user';

const Invite = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const [group] = useOutletContext<IGroup[]>();
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState<IMinimalUser[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 2,
    totalPages: 0,
    direction: 'next',
  });

  const validate = (term: string) => {
    if (term.trim().length === 0 || term.length > 200) {
      setError('Please keep name between 1 and 200 characters.');
      return true;
    }
    return false;
  };

  const searchUsersByName = (searchTerm: string, paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.searchUsersByName(
      searchTerm,
      pageNum,
      pagination.pageSize,
      pagination.direction,
      group.id,
      group.adminId
    )
      .then((res) => {
        const { direction, page, pageSize, totalPages, users } = res.data.data;
        setPagination((prevState) => ({
          ...prevState,
          direction,
          page,
          pageSize,
          totalPages,
        }));
        setUsers((prevState) => [...prevState, ...users]);
      })
      .catch((err) => {
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setUsers([]);
    setPagination({ page: 0, pageSize: 1, totalPages: 0, direction: 'next' });
    if (validate(searchTerm)) {
      return;
    }
    searchUsersByName(searchTerm, false);
  };

  const removeUserFromList = (userId: number) => {
    setUsers((prevState) => prevState.filter((user) => user.id !== userId));
  };

  const handleGroupInvite = (userId: number) => {
    sendGroupInvite(userId);
  };

  const sendGroupInvite = (userId: number) => {
    Client.sendGroupInvite(userId, group.adminId, group.id)
      .then(() => {
        removeUserFromList(userId);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box>
      <form onSubmit={handleOnSubmit}>
        {error.length > 0 && (
          <Text textAlign="center" my="0.25rem" fontSize="0.85rem" color="red.400">
            {error}
          </Text>
        )}
        <Flex align="center" justify="space-evenly">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fontSize="0.9rem"
            color="text.primary"
            placeholder="Enter a name..."
            _placeholder={{ fontSize: '0.9rem' }}
            width="80%"
            bg={user.theme === 'dark' ? '#323432' : 'border.primary'}
            borderRadius={20}
            border="none"
          />
          <Button type="submit" colorScheme="purple" mx="0.5rem" size="sm">
            Search
          </Button>
        </Flex>
      </form>
      <Box my="2rem">
        {users.map((user) => {
          return (
            <Flex my="1.5rem" key={user.id} align="center" justify="space-between">
              <Flex align="center">
                <Avatar
                  width="45px"
                  height="45px"
                  url={user.avatarUrl}
                  firstName={user.firstName}
                  lastName={user.lastName}
                />
                <Text color="text.primary" fontSize="0.9rem" ml="0.5rem">
                  {user.firstName} {user.lastName}
                </Text>
              </Flex>
              <Button size="sm" onClick={() => handleGroupInvite(user.id)}>
                Invite
              </Button>
            </Flex>
          );
        })}
      </Box>
      {pagination.page < pagination.totalPages - 1 && (
        <Flex my="1.5rem" justify="center">
          <Button
            colorScheme="purple"
            onClick={() => searchUsersByName(searchTerm, true)}
          >
            See more...
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Invite;
