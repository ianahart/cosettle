import { Box, Flex, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { IFriend, IUserContext } from '../../interfaces';
import { useEffect, useState, useRef, useCallback, useContext } from 'react';
import { AiOutlineClose, AiOutlineMessage, AiOutlineMinus } from 'react-icons/ai';
import FriendDetails from './FriendDetails';
import { UserContext } from '../../context/user';
import { Client } from '../../util/client';
import { BiUserMinus } from 'react-icons/bi';

interface IFriendProps {
  friend: IFriend;
  messages: boolean;
  getFriends: (paginate: boolean) => void;
  handleRemoveFriend: (id: number) => void;
  handleSwitchChat?: (userId: number) => void;
}

const Friend = ({
  friend,
  getFriends,
  handleRemoveFriend,
  messages,
  handleSwitchChat = undefined,
}: IFriendProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [openPopOver, setOpenPopOver] = useState(false);

  const clickAway = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element;
      if (menuRef.current !== null && triggerRef.current !== null) {
        if (!menuRef.current.contains(target) && !triggerRef.current.contains(target)) {
          setOpenPopOver(false);
        }
      }
    },
    [setOpenPopOver]
  );

  useEffect(() => {
    document.addEventListener('click', clickAway);
    return () => document.removeEventListener('click', clickAway);
  }, [clickAway]);

  const handleSetOpenPopOver = (e: React.MouseEvent<HTMLDivElement>, open: boolean) => {
    e.stopPropagation();
    setOpenPopOver(open);
  };

  const removeFriend = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    userId: number,
    friendId: number
  ) => {
    e.stopPropagation();
    Client.removeFriend(userId, friendId)
      .then(() => {
        handleRemoveFriend(id);
        getFriends(false);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const switchChat = (userId: number) => {
    if (handleSwitchChat !== undefined) {
      handleSwitchChat(userId);
    }
  };

  return (
    <Box
      cursor="pointer"
      ref={triggerRef}
      onClick={() => setOpenPopOver(true)}
      my="1.5rem"
      key={friend.id}
      position="relative"
    >
      <FriendDetails friend={friend} />
      {openPopOver && (
        <Box
          ref={menuRef}
          position="absolute"
          top="30px"
          left="0"
          minWidth="250px"
          zIndex={10}
          borderRadius={8}
          p="0.5rem"
          className="box-shadow"
          minH="100px"
          bg="rgb(54,54,54)"
        >
          <Flex flexDir="column" justifyItems="center" height="100%">
            <Flex justify="flex-end">
              <Box
                onClick={(e) => handleSetOpenPopOver(e, false)}
                cursor="pointer"
                fontSize="1.2rem"
                color="light.primary"
              >
                <AiOutlineClose />
              </Box>
            </Flex>

            <FriendDetails friend={friend} />
            <Flex justify="space-between" mt="2rem" alignItems="center">
              <RouterLink to={`/profiles/${friend.profileId}`}>
                <Button mr="0.5rem" size="sm" colorScheme="purple">
                  Go to profile
                </Button>
              </RouterLink>
              <Flex direction="column">
                <Button
                  size="sm"
                  onClick={(e) => removeFriend(e, friend.id, user.id, friend.userId)}
                >
                  <Box mx="0.25rem">
                    <BiUserMinus />
                  </Box>
                  Remove friend
                </Button>
                {messages && (
                  <Button onClick={() => switchChat(friend.userId)} my="0.5rem" size="sm">
                    <Box mx="0.25rem">
                      <AiOutlineMessage />
                    </Box>
                    Messages
                  </Button>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Friend;
