import { Box, Heading, Flex, Text, Button } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/user';
import { IGroup, IPagination, IUserContext } from '../../interfaces';
import { Client } from '../../util/client';
import GroupPreview from './GroupPreview';
import BasicSpinner from '../Shared/BasicSpinner';

const AdminGroups = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const [adminGroups, setAdminGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 2,
    direction: 'next',
    totalPages: 0,
  });

  const shouldRun = useRef(true);

  const getAdminGroups = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    setMessage('');
    setLoading(true);
    Client.getAdminGroups(user.id, pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { direction, groups, page, pageSize, totalPages } = res.data.data;
        if (!paginate && groups.length === 0) {
          setMessage('You currently do not manage any groups');
        }
        setPagination((prevState) => ({
          ...prevState,
          direction,
          page,
          pageSize,
          totalPages,
        }));
        setAdminGroups((prevState) => [...prevState, ...groups]);
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
      getAdminGroups(false);
    }
  }, [shouldRun, user.id]);

  return (
    <Box>
      <Box as="header" color="text.primary">
        <Heading as="h3" fontSize="1rem">
          Groups you manage
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
        {adminGroups.map((ag) => {
          return <GroupPreview joined={false} adminGroup={ag} key={ag.id} />;
        })}
      </Box>
      {pagination.page < pagination.totalPages - 1 && (
        <Flex>
          <Button
            size="sm"
            colorScheme="purple"
            width="100%"
            onClick={() => getAdminGroups(true)}
          >
            See more
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default AdminGroups;
