import { Box, Flex, FormControl, Input, Text, Button } from '@chakra-ui/react';
import { useEffect, useContext, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { UserContext } from '../../context/user';
import { IMinimalUser, IPagination, IUserContext } from '../../interfaces';
import Avatar from '../Shared/Avatar';
import VisibilitySelect from './VisibilitySelect';
import InvitePeople from './InvitePeople';
import { Client } from '../../util/client';
import BasicSpinner from '../Shared/BasicSpinner';

interface ICreateViewProps {
  switchView: (view: string) => void;
}

const CreateView = ({ switchView }: ICreateViewProps) => {
  const shouldRun = useRef(true);
  const { user } = useContext(UserContext) as IUserContext;
  const [userIds, setUserIds] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState<IMinimalUser[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    direction: 'next',
    page: 0,
    pageSize: 3,
    totalPages: 0,
  });
  const [privacy, setPrivacy] = useState('');

  const handleVisibility = (curPrivacy: string) => {
    setPrivacy(curPrivacy);
  };

  const getUsers = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;

    Client.getUsers(pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { users, pageSize, direction, page, totalPages } = res.data.data;
        setPagination({ ...pagination, pageSize, direction, page, totalPages });
        if (paginate) {
          setUsers((prevState) => [...prevState, ...users]);
        } else {
          setUsers(users);
        }
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const handleAddUserId = (userId: number) => {
    setUsers((prevState) => prevState.filter((user) => user.id !== userId));
    setUserIds((prevState) => [...prevState, userId]);
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getUsers(false);
    }
  }, [getUsers]);

  const handleOnCreateGroup = () => {
    setError('');
    if (groupName.trim().length === 0 || privacy.trim().length === 0) {
      setError('Please fill out group name and privacy');
      return;
    }

    if (userIds.length === 0) {
      setError('Please select at least one person');
      return;
    }
    setLoading(true);
    Client.createGroup(user.id, groupName, privacy, userIds)
      .then(() => {
        switchView('main');
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Flex
      flexDir="column"
      justify="space-between"
      p="1rem"
      minH="100vh"
      color="text.primary"
    >
      <Box>
        <Flex justify="flex-start">
          <Flex
            onClick={() => switchView('main')}
            flexDir="column"
            color="light.primary"
            borderRadius="50%"
            align="center"
            justify="center"
            cursor="pointer"
            fontSize="1.5rem"
            width="40px"
            height="40px"
            bg="#000"
          >
            <AiOutlineClose />
          </Flex>
        </Flex>
        <Flex mt="0.5rem" justify="flex-start">
          <Text fontSize="0.75rem">Groups &gt; Create group</Text>
        </Flex>
        <Flex my="1.5rem">
          <Box>
            <Avatar
              width="45px"
              height="45px"
              firstName={user.firstName}
              lastName={user.lastName}
              url={user.avatarUrl}
            />
          </Box>
          <Box
            color={user.theme === 'dark' ? 'light.primary' : 'text.primary'}
            fontSize="0.8rem"
            ml="0.5rem"
          >
            <Text>
              {user.firstName} {user.lastName}
            </Text>
            <Text>Admin</Text>
          </Box>
        </Flex>
        {error.length > 0 && (
          <Flex justify="center" my="0.5rem">
            <Text fontSize="0.8rem" color="red.400">
              {error}
            </Text>
          </Flex>
        )}
        <Box>
          <form>
            <FormControl my="2rem">
              <Input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                borderColor={user.theme === 'dark' ? 'text.secondary' : 'border.primary'}
                placeholder="Group name"
              />
            </FormControl>
            <FormControl my="2rem">
              <VisibilitySelect privacy={privacy} handleVisibility={handleVisibility} />
            </FormControl>
            <FormControl my="2rem">
              <InvitePeople
                users={users}
                getUsers={getUsers}
                page={pagination.page}
                totalPages={pagination.totalPages}
                handleAddUserId={handleAddUserId}
              />
            </FormControl>
          </form>
        </Box>
      </Box>
      {loading && (
        <Flex justify="center">
          <BasicSpinner message="Creating group..." color="light.primary" />
        </Flex>
      )}
      {!loading && (
        <Flex>
          <Button onClick={handleOnCreateGroup} w="100%" colorScheme="purple">
            Create
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default CreateView;
