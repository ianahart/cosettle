import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Image,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/user';
import { IJoinedGroup, IPagination, IUserContext } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import { Client } from '../../util/client';
import groupBG from '../../assets/group.png';
import BasicSpinner from '../../components/Shared/BasicSpinner';

const YourGroupsRoute = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;
  const [joinedGroups, setJoinedGroups] = useState<IJoinedGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 3,
    direction: 'next',
    totalPages: 0,
  });

  const shouldRun = useRef(true);

  const goToGroup = (id: number) => {
    navigate(`/groups/${id}/about`);
  };

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
      <Grid gridTemplateColumns="1fr 1fr 1fr" my="1rem" className="overflow-scroll">
        {joinedGroups.map((jg) => {
          return (
            <GridItem
              key={jg.id}
              _hover={{ bg: '#161515' }}
              cursor="pointer"
              onClick={() => goToGroup(jg.groupId)}
              my="1rem"
              p="0.5rem"
            >
              <Image borderRadius={8} src={jg.url ? jg.url : groupBG} />
              <Text
                fontSize="1.2rem"
                color="text.primary"
                align="center"
                ml="0.5rem"
                fontWeight="bold"
              >
                {jg.groupName}
              </Text>
            </GridItem>
          );
        })}
      </Grid>
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

export default YourGroupsRoute;
