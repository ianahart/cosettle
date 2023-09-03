import { Text, Box, Button, ButtonGroup, Flex, Heading, Input } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { IPagination, ISearchUser, IUserContext } from '../../interfaces';
import { Client } from '../../util/client';
import { UserContext } from '../../context/user';
import Users from './Users';

interface ISearchUserProps {
  addFriendRequest: (friendRequest: any) => void;
}

const SearchUsers = ({ addFriendRequest }: ISearchUserProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const [pagination, setPagination] = useState<IPagination>({
    pageSize: 10,
    direction: 'next',
    page: 0,
    totalPages: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<ISearchUser[]>([]);
  const [error, setError] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchUsers = (paginate: boolean, direction: string) => {
    const pageNum = paginate ? pagination.page : -1;
    setError('');
    Client.searchUsers(user.id, direction, pageNum, pagination.pageSize, searchTerm)
      .then((res) => {
        const { direction, page, pageSize, totalPages, users } = res.data.data;
        if (!paginate && users.length === 0) {
          setError(`No users found with a name of ${searchTerm}`);
        }
        setPagination({ ...pagination, direction, page, pageSize, totalPages });
        setUsers(users);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const handleOnClick = () => {
    searchUsers(false, 'next');
  };

  return (
    <Box color="text.primary">
      <Flex
        width="300px"
        flexDir="column"
        alignItems="center"
        m="0 auto"
        justify="center"
        mt="3rem"
        as="header"
      >
        <Heading textAlign="center" width="100%" fontSize="1.5rem">
          Find Friends
        </Heading>
        <Box
          mt="0.5rem"
          height="10px"
          width="100%"
          borderRadius={4}
          bg="radial-gradient(circle, rgba(128,90,213,1) 29%, rgba(213,63,140,1) 100%)"
        ></Box>
      </Flex>
      <Flex flexDir={['column', 'column', 'row']} my="3rem" alignItems="center">
        <Input
          onChange={handleOnChange}
          value={searchTerm}
          placeholder="Search for people..."
          width="80%"
          borderColor="text.secondary"
        />
        <Button
          onClick={handleOnClick}
          width={['80%', '80%', '20%']}
          ml={['0', '0', '0.5rem']}
          mt={['0.25rem', '0.25rem', '0']}
          colorScheme="purple"
        >
          Search
        </Button>
      </Flex>
      {error.length > 0 && (
        <Flex justify="center" my="1rem">
          <Text fontSize="0.85rem" color="red.400">
            {error}
          </Text>
        </Flex>
      )}
      <Users users={users} addFriendRequest={addFriendRequest} />
      <Flex my="2rem" justify="center">
        <ButtonGroup>
          {pagination.page > 0 && (
            <Button onClick={() => searchUsers(true, 'prev')} colorScheme="purple">
              Prev
            </Button>
          )}
          {pagination.page < pagination.totalPages - 1 && (
            <Button onClick={() => searchUsers(true, 'next')} colorScheme="purple">
              Next
            </Button>
          )}
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default SearchUsers;
