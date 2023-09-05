import { Box, Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IPrivateMessage, IUserContext } from '../../interfaces';
import Avatar from '../Shared/Avatar';
//@ts-ignore
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

interface IPrivateMessageProps {
  privateMessage: IPrivateMessage;
}

const PrivateMessage = ({ privateMessage }: IPrivateMessageProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <Flex
      p="0.5rem"
      my="1rem"
      justify={`${user.id === privateMessage.senderUserId ? 'flex-end' : 'flex-start'}`}
    >
      <Flex
        flexDir={`${user.id === privateMessage.senderUserId ? 'row' : 'row-reverse'}`}
      >
        <Text
          wordBreak="break-all"
          minH="40px"
          minW="150px"
          borderRadius={20}
          bg="#303032"
          textAlign="center"
          p="0.25rem"
          mr="1rem"
          color="text.primary"
        >
          {privateMessage.message}
        </Text>
        <Box>
          <Avatar
            url={privateMessage.senderAvatarUrl}
            firstName={privateMessage.receiverFirstName}
            lastName={privateMessage.receiverLastName}
            width="45px"
            height="45px"
          />
          <Text fontSize="0.7rem" color="text.primary">
            {dayjs(privateMessage.createdAt).format('L LT')}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default PrivateMessage;
