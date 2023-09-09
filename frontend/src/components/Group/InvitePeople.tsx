import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/user';
import { IMinimalUser, IUserContext } from '../../interfaces';
import Avatar from '../Shared/Avatar';

interface IInvitePeopleProps {
  users: IMinimalUser[];
  getUsers: (paginate: boolean) => void;
  page: number;
  totalPages: number;
  handleAddUserId: (userId: number) => void;
}

const InvitePeople = ({
  users,
  getUsers,
  page,
  totalPages,
  handleAddUserId,
}: IInvitePeopleProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(UserContext) as IUserContext;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const clickAway = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element;
      if (menuRef.current !== null && triggerRef.current !== null) {
        if (!menuRef.current.contains(target) && !triggerRef.current.contains(target)) {
          setDropdownOpen(false);
        }
      }
    },
    [setDropdownOpen]
  );

  useEffect(() => {
    document.addEventListener('click', clickAway);

    return () => document.removeEventListener('click', clickAway);
  }, [clickAway]);

  return (
    <Box>
      <Box
        onClick={() => setDropdownOpen(true)}
        ref={triggerRef}
        position="relative"
        cursor="pointer"
        height="40px"
        p="0.25rem"
        borderRadius={4}
        border="1px solid"
        borderColor={user.theme === 'dark' ? 'text.secondary' : 'border.primary'}
      >
        <Text>Invite people</Text>

        {dropdownOpen && (
          <Box
            ref={menuRef}
            borderRadius={4}
            bg="#323432"
            className="overflow-scroll"
            overflowY="auto"
            zIndex={10}
            position="absolute"
            height="250px"
            width="100%"
            top="40px"
            left="0"
          >
            {users.map((user) => {
              return (
                <Box
                  onClick={() => handleAddUserId(user.id)}
                  _hover={{ bg: 'black.tertiary' }}
                  borderRadius={4}
                  p="0.25rem"
                  key={user.id}
                  my="1.2rem"
                >
                  <Flex align="center">
                    <Avatar
                      height="45px"
                      width="45px"
                      url={user.avatarUrl}
                      firstName={user.firstName}
                      lastName={user.lastName}
                    />
                    <Text ml="0.5rem" fontSize="0.9rem">
                      {user.firstName} {user.lastName}
                    </Text>
                  </Flex>
                </Box>
              );
            })}
            {page < totalPages - 1 && (
              <Flex justify="center">
                <Button onClick={() => getUsers(true)} size="sm" colorScheme="purple">
                  See more...
                </Button>
              </Flex>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default InvitePeople;
