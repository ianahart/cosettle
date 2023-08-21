import { Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';

interface IAvatarProps {
  backgroundColor: string;
  height: string;
  width: string;
}

const Avatar = ({ backgroundColor, height, width }: IAvatarProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height={height}
      width={width}
      color="light.primary"
      borderRadius="50%"
      bg={!user.avatarUrl ? backgroundColor : 'unset'}
      backgroundImage={user.avatarUrl ? `url(${user.avatarUrl})` : 'none'}
      backgroundPosition="center"
      backgroundSize="cover"
    >
      {!user.avatarUrl ? user.abbreviation : ''}
    </Flex>
  );
};

export default Avatar;
