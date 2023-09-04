import { IFriend } from '../../interfaces';
import Avatar from '../Shared/Avatar';
import { Flex, Text } from '@chakra-ui/react';

interface IFriendDetailsProps {
  friend: IFriend;
}

const FriendDetails = ({ friend }: IFriendDetailsProps) => {
  return (
    <Flex align="center">
      <Avatar
        width="45px"
        height="45px"
        url={friend.avatarUrl}
        firstName={friend.firstName}
        lastName={friend.lastName}
      />
      <Text ml="0.5rem" color="text.primary" fontSize="0.9rem">
        {friend.firstName} {friend.lastName}
      </Text>
    </Flex>
  );
};

export default FriendDetails;
