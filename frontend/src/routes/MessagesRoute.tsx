import { Box, Flex } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../context/user';
import { IUserContext } from '../interfaces';
import FriendList from '../components/Chat/FriendList';
import PrivateMessages from '../components/Chat/PrivateMessages';
const MessagesRoute = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);
  const [currentChatUserId, setCurrentChatUserId] = useState<number | null>(null);

  const handleSwitchChat = (userId: number) => {
    setCurrentChatUserId(userId);
  };

  return (
    <Flex className="messages-route-container" justify="center" minH="800px">
      <Box
        width={['95%', '95%', '350px']}
        border="1px solid"
        borderColor="text.secondary"
        mx="auto"
        maxW={['95%', '95%', '350px']}
        minH="800px"
      >
        <FriendList handleSwitchChat={handleSwitchChat} />
      </Box>
      <Box
        minH="800px"
        width="100%"
        border="1px solid"
        borderColor="text.secondary"
        borderLeft="none"
      >
        <Box
          width={['95%', '95%', '650px']}
          maxW={['95%', '95%', '650px']}
          mx="auto"
          mt="5rem"
        >
          <PrivateMessages currentChatUserId={currentChatUserId} />
        </Box>
      </Box>
    </Flex>
  );
};

export default MessagesRoute;
