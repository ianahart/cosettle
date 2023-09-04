import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '../Shared/Avatar';
import { IFriend } from '../../interfaces';
import { useEffect, useState, useRef, useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import FriendDetails from './FriendDetails';

interface IFriendProps {
  friend: IFriend;
}

const Friend = ({ friend }: IFriendProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [openPopOver, setOpenPopOver] = useState(false);

  const clickAway = useCallback(
    (e: MouseEvent) => {
      console.log('clickAway');
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
    console.log('handlePopOver');
    e.stopPropagation();
    setOpenPopOver(false);
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
                <Button size="sm" colorScheme="purple">
                  Go to profile
                </Button>
              </RouterLink>
              <Button size="sm">Remove friend</Button>
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Friend;
