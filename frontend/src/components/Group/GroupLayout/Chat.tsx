import { Box, Flex, Button, Textarea, Text } from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';
import { IGroup, IGroupMessage, IUserContext } from '../../../interfaces';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../context/user';
import { Client } from '../../../util/client';
import Avatar from '../../Shared/Avatar';

let stompClient: any = null;

const Chat = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const [inputValue, setInputValue] = useState('');
  const [group] = useOutletContext<IGroup[]>();
  const [groupMessages, setGroupMessages] = useState<IGroupMessage[]>([]);
  const shouldRun = useRef(true);

  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  useEffect(() => {
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (shouldRun.current && user.id !== 0 && group.id !== 0) {
      shouldRun.current = false;

      getGroupMessages();
      connect();
    }
  }, [shouldRun.current, connect, user.id, group.id]);

  const onConnected = () => {
    stompClient.subscribe(`/user/${user.id}/group`, onGroupMessage);
  };
  const onError = () => {};

  const onGroupMessage = (payload: any) => {
    setGroupMessages((prevState) => [JSON.parse(payload.body), ...prevState]);
  };

  const sendGroupMessage = () => {
    if (stompClient && user.id !== 0 && inputValue.trim().length > 0) {
      stompClient.send(
        '/api/v1/chat-group',
        {},
        JSON.stringify({ groupId: group.id, userId: user.id, message: inputValue })
      );
      setInputValue('');
    }
  };

  const getGroupMessages = () => {
    Client.getGroupMessages(group.id)
      .then((res) => {
        setGroupMessages(res.data.data);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box>
      <Flex
        flexDir="column"
        justify="space-between"
        className="overflow-scroll"
        overflowY="auto"
        height="500px"
        bg={user.theme === 'dark' ? '#161515' : '#f6f0f0'}
        p="1rem"
        borderRadius={8}
      >
        <Flex my="1rem" flexDir="column-reverse">
          {groupMessages.map((groupMessage) => {
            return (
              <Flex
                key={groupMessage.id}
                color={user.theme === 'dark' ? 'light.primary' : 'text.primary'}
                my="1rem"
                align="center"
              >
                <Flex align="center" justify="center">
                  <Box>
                    <Avatar
                      height="45px"
                      width="45px"
                      firstName={groupMessage.firstName}
                      lastName={groupMessage.lastName}
                      url={groupMessage.avatarUrl}
                    />
                  </Box>
                  <Box>
                    <Text fontSize="0.85rem" ml="0.5rem">
                      {groupMessage.firstName} {groupMessage.lastName}
                    </Text>
                  </Box>
                  <Box
                    ml="0.5rem"
                    bg={user.theme === 'dark' ? 'black.tertiary' : '#e5dbdb'}
                    borderRadius={8}
                    p="0.5rem"
                  >
                    <Text>{groupMessage.message}</Text>
                  </Box>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
        <Box textAlign="center">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Send a message..."
            bg={user.theme === 'dark' ? 'black.tertiary' : '#e5dbdb'}
            color="text.primary"
            resize="none"
            border="none"
            width="80%"
          />
          <Button
            onClick={sendGroupMessage}
            width="80%"
            my="1.5rem"
            mx="auto"
            display="block"
            colorScheme="purple"
          >
            Send
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Chat;
