import { Box, Button, Textarea, Flex, Text } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/user';
import { IChatUser, IPrivateMessage, IUserContext } from '../../interfaces';
import { Client } from '../../util/client';
import { chatUserState } from '../../state/initialState';
import Avatar from '../Shared/Avatar';
import PrivateMessage from './PrivateMessage';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

let stompClient: any = null;

interface IChatMessagesProps {
  currentChatUserId: number | null;
}

const PrivateMessages = ({ currentChatUserId }: IChatMessagesProps) => {
  const shouldRun = useRef(true);
  const { user } = useContext(UserContext) as IUserContext;
  const [chatUser, setChatUser] = useState<IChatUser>(chatUserState);
  const [privateMessages, setPrivateMessages] = useState<IPrivateMessage[]>([]);
  const [inputValue, setInputValue] = useState('');

  const connect = () => {
    let Sock = new SockJS('https://cosettle-c845ecf11f50.herokuapp.com/wss');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;

      connect();
    }
  }, [shouldRun.current, connect, user.id]);

  const onConnected = () => {
    stompClient.subscribe(`/user/${user.id}/private`, onPrivateMessage);
  };
  const onError = () => {};

  const addMessage = (message: any) => {
    setPrivateMessages((prevState) => [message, ...prevState]);
  };

  const onPrivateMessage = (payload: any) => {
    addMessage(JSON.parse(payload.body));
  };

  const getChatMessages = () => {
    if (currentChatUserId === null) return;
    Client.getChatMessages(user.id, currentChatUserId)
      .then((res) => {
        setPrivateMessages(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.response.data.message);
      });
  };

  const getUser = () => {
    if (currentChatUserId === null) return;
    Client.getUser(currentChatUserId)
      .then((res) => {
        setChatUser(res.data.data);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (currentChatUserId !== null) {
      getUser();
      getChatMessages();
    }
  }, [currentChatUserId]);

  useEffect(() => {
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const sendPrivateMessage = (friendId: number, userId: number) => {
    if (stompClient && friendId !== 0 && inputValue.trim().length > 0) {
      stompClient.send(
        '/api/v1/private-message',
        {},
        JSON.stringify({ friendId, userId, message: inputValue })
      );
      setInputValue('');
    }
  };

  return (
    <Box>
      <Box mb="2rem">
        {chatUser.id !== 0 && (
          <Box>
            <Flex>
              <Avatar
                firstName={chatUser.firstName}
                lastName={chatUser.lastName}
                url={chatUser.avatarUrl}
                height="45px"
                width="45px"
              />
              <Box ml="0.5rem">
                <Text color="text.primary" fontSize="0.9rem">
                  {chatUser.firstName} {chatUser.lastName}
                </Text>

                <Text color="text.primary" fontSize="0.9rem">
                  {chatUser.email}
                </Text>
              </Box>
            </Flex>
          </Box>
        )}
      </Box>
      <Flex
        direction="column-reverse"
        borderRadius={4}
        bg="#212122"
        height="500px"
        maxH="500px"
        className="overflow-scroll"
        overflowY="auto"
      >
        {privateMessages.map((privateMessage) => {
          return (
            <PrivateMessage key={privateMessage.id} privateMessage={privateMessage} />
          );
        })}
      </Flex>
      {chatUser.id !== 0 && (
        <Box bg="#333131" borderBottomRadius={4}>
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Write a message..."
            color="light.primary"
            resize="none"
            fontSize="0.9rem"
            bg="#333131"
            border="none"
            borderTopRadius={0}
          ></Textarea>
          <Flex p="0.5rem" justify="flex-end">
            <Button
              onClick={() => sendPrivateMessage(chatUser.id, user.id)}
              colorScheme="purple"
            >
              Send
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default PrivateMessages;
