import { Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';

interface IAvatarProps {
  height: string;
  width: string;
}

const Avatar = ({ height, width }: IAvatarProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height={height}
      width={width}
      color={user.theme === 'dark' ? 'light.primary' : 'text.primary'}
      borderRadius="50%"
      bg={user.theme === 'dark' ? 'primary.dark' : 'light.primary'}
      backgroundImage={user.avatarUrl ? `url(${user.avatarUrl})` : 'none'}
      backgroundPosition="center"
      backgroundSize="cover"
    >
      {!user.avatarUrl ? user.abbreviation : ''}
    </Flex>
  );
};

export default Avatar;
