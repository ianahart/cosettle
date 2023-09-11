import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { IGroup, IGroupMember } from '../../../interfaces';
import { useEffect, useRef, useState } from 'react';
import { Client } from '../../../util/client';
import Avatar from '../../Shared/Avatar';
import { BsChevronRight } from 'react-icons/bs';

const Members = () => {
  const [group] = useOutletContext<IGroup[]>();
  const navigate = useNavigate();
  const shouldRun = useRef(true);
  const [message, setMessage] = useState('');
  const [groupMembers, setGroupMembers] = useState<IGroupMember[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 5,
    direction: 'next',
    totalPages: 0,
  });

  const getGroupMembers = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getGroupMembers(group.id, pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { direction, page, pageSize, totalPages, groupMembers } = res.data.data;
        if (!paginate && groupMembers.length === 0) {
          setMessage('This group currently does not have any members.');
        }
        setPagination((prevState) => ({
          ...prevState,
          page,
          pageSize,
          totalPages,
          direction,
        }));
        setGroupMembers((prevState) => [...prevState, ...groupMembers]);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && group.id !== 0) {
      getGroupMembers(false);
    }
  }, [shouldRun.current, group.id]);

  const goToProfile = (id: number) => {
    navigate('/profiles/' + id);
  };

  return (
    <Box color="text.primary">
      {message.length > 0 && (
        <Flex justify="center" my="1.5rem">
          <Text fontSize="0.85rem">{message}</Text>
        </Flex>
      )}
      <Box my="1rem">
        {groupMembers.map((groupMember) => {
          return (
            <Flex key={groupMember.id} align="center" justify="space-between">
              <Flex align="center" my="1rem">
                <Avatar
                  height="45px"
                  width="45px"
                  firstName={groupMember.firstName}
                  lastName={groupMember.lastName}
                  url={groupMember.url}
                />
                <Text ml="0.5rem">
                  {groupMember.firstName} {groupMember.lastName}
                </Text>
              </Flex>
              <Box cursor="pointer" onClick={() => goToProfile(groupMember.profileId)}>
                <BsChevronRight />
              </Box>
            </Flex>
          );
        })}
      </Box>
      {pagination.page < pagination.totalPages - 1 && (
        <Flex justify="center" my="1.5rem">
          <Button size="sm" colorScheme="purple" onClick={() => getGroupMembers(true)}>
            See more...
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Members;
