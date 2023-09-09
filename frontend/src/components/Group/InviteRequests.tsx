import { Box, Button, ButtonGroup, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { IInvite, IPagination, IUserContext } from '../../interfaces';
import { UserContext } from '../../context/user';
import { Client } from '../../util/client';
import BasicSpinner from '../Shared/BasicSpinner';
import groupBG from '../../assets/group.png';

interface IInviteRequestsProps {
  handleRefresh: () => void;
}

const InviteRequests = ({ handleRefresh }: IInviteRequestsProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);
  const [loading, setLoading] = useState(false);
  const [invites, setInvites] = useState<IInvite[]>([]);
  const [message, setMessage] = useState('');
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 1,
    totalPages: 0,
    direction: 'next',
  });

  const removeInvite = (id: number) => {
    setInvites((prevState) => prevState.filter((invite) => invite.id !== id));
  };

  const acceptInvite = (id: number) => {
    Client.acceptInvite(id, true)
      .then(() => {
        removeInvite(id);
        handleRefresh();
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const ignoreInvite = (id: number) => {
    Client.ignoreInvite(id)
      .then(() => {
        removeInvite(id);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const getInvites = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    setLoading(true);
    setMessage('');
    Client.getInvites(user.id, pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { pageSize, page, totalPages, direction, groupMembers } = res.data.data;
        setPagination((prevState) => ({
          ...prevState,
          pageSize,
          page,
          totalPages,
          direction,
        }));
        setInvites((prevState) => [...prevState, ...groupMembers]);
        setLoading(false);

        if (!paginate && groupMembers.length === 0) {
          setMessage('You currently do not have any invites');
        }
      })
      .catch((err) => {
        setLoading(false);
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getInvites(false);
    }
  }, [shouldRun.current, user.id]);

  return (
    <Box>
      <Box as="header" color="text.primary">
        <Heading as="h3" fontSize="1rem">
          Invites
        </Heading>
      </Box>
      {message.length > 0 && (
        <Flex my="1rem" justify="center">
          <Text textAlign="center">{message}</Text>
        </Flex>
      )}
      {loading && (
        <Flex justify="center" my="1rem">
          <BasicSpinner message="Loading invites..." color="light.primary" />
        </Flex>
      )}
      <Box my="1rem">
        {invites.map((invite) => {
          return (
            <Box
              _hover={{ bg: '#161515' }}
              borderRadius={4}
              cursor="pointer"
              my="1rem"
              p="0.5rem"
              key={invite.id}
            >
              <Flex align="center">
                <Image
                  height="45px"
                  width="45px"
                  borderRadius={8}
                  src={invite.url ? invite.url : groupBG}
                />
                <Text ml="0.25rem" fontWeight="bold">
                  {invite.name}
                </Text>
              </Flex>
              <Flex>
                <Text my="0.25rem" fontSize="0.7rem">
                  {invite.adminFirstName} {invite.adminLastName} invited you to join this
                  group
                </Text>
              </Flex>
              <ButtonGroup my="0.25rem">
                <Button
                  onClick={() => acceptInvite(invite.id)}
                  size="sm"
                  colorScheme="purple"
                >
                  Join
                </Button>
                <Button
                  onClick={() => ignoreInvite(invite.id)}
                  size="sm"
                  colorScheme="purple"
                >
                  Ignore
                </Button>
              </ButtonGroup>
            </Box>
          );
        })}
        {pagination.page < pagination.totalPages - 1 && (
          <Flex justify="center">
            <Button size="sm" onClick={() => getInvites(true)}>
              See more...
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default InviteRequests;
