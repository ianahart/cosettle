import { Box, Heading, Flex, Text, Button, Image } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/user';
import { IJoinedGroup, IPagination, IUserContext } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import { Client } from '../../util/client';
import groupBG from '../../assets/group.png';
import BasicSpinner from '../Shared/BasicSpinner';

interface IJoinedGroupsProps {
  refresh: boolean;
  handleRefresh: (refresh: boolean) => void;
}

const JoinedGroups = ({ refresh, handleRefresh }: IJoinedGroupsProps) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;
  const [joinedGroups, setJoinedGroups] = useState<IJoinedGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 2,
    direction: 'next',
    totalPages: 0,
  });

  const shouldRun = useRef(true);

  const goToGroup = (id: number) => {
    navigate(`/groups/${id}`);
  };

  useEffect(() => {
    if (refresh) {
      setJoinedGroups([]);
      getJoinedGroups(false);
      handleRefresh(false);
    }
  }, [refresh]);

  const getJoinedGroups = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    setMessage('');
    setLoading(true);
    Client.getJoinedGroups(user.id, pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { direction, groupMembers, page, pageSize, totalPages } = res.data.data;
        if (!paginate && groupMembers.length === 0) {
          setMessage('You currently have not joined any groups');
        }
        setPagination((prevState) => ({
          ...prevState,
          direction,
          page,
          pageSize,
          totalPages,
        }));
        setJoinedGroups((prevState) => [...prevState, ...groupMembers]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getJoinedGroups(false);
    }
  }, [shouldRun, user.id]);

  return (
    <Box>
      <Box as="header" color="text.primary">
        <Heading as="h3" fontSize="1rem">
          Groups you've joined
        </Heading>
      </Box>
      {loading && (
        <Flex justify="center" my="1rem">
          <BasicSpinner message="Loading your groups..." color="light.primary" />
        </Flex>
      )}
      {message.length > 0 && (
        <Flex my="1rem" justify="center">
          <Text textAlign="center">{message}</Text>
        </Flex>
      )}
      <Box my="1rem" height="200px" overflowY="auto" className="overflow-scroll">
        {joinedGroups.map((jg) => {
          return (
            <Box
              key={jg.id}
              _hover={{ bg: '#161515' }}
              cursor="pointer"
              onClick={() => goToGroup(jg.groupId)}
              my="1rem"
              p="0.5rem"
            >
              <Flex align="center">
                <Image
                  height="45px"
                  width="45px"
                  borderRadius={8}
                  src={jg.url ? jg.url : groupBG}
                />
                <Text ml="0.5rem" fontWeight="bold">
                  {jg.groupName}
                </Text>
              </Flex>
            </Box>
          );
        })}
      </Box>
      {pagination.page < pagination.totalPages - 1 && (
        <Flex>
          <Button
            size="sm"
            colorScheme="purple"
            width="100%"
            onClick={() => getJoinedGroups(true)}
          >
            See more
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default JoinedGroups;
