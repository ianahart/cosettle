import { Box, Flex } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import FriendList from '../components/Chat/FriendList';
import PrivateMessages from '../components/Chat/PrivateMessages';
import { UserContext } from '../context/user';
import { IUserContext } from '../interfaces';
const MessagesRoute = () => {
  const [currentChatUserId, setCurrentChatUserId] = useState<number | null>(null);
  const { user } = useContext(UserContext) as IUserContext;

  const handleSwitchChat = (userId: number) => {
    setCurrentChatUserId(userId);
  };

  return (
    <Flex className="messages-route-container" justify="center" minH="800px">
      <Box
        width={['95%', '95%', '350px']}
        border="1px solid"
        borderColor={user.theme === 'dark' ? 'text.secondary' : 'border.primary'}
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
        borderColor={user.theme === 'dark' ? 'text.secondary' : 'border.primary'}
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
