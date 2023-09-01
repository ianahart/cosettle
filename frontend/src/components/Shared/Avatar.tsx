import { Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
import { abbreviate } from '../../util';

interface IAvatarProps {
  height: string;
  width: string;
  url: string;
  firstName: string;
  lastName: string;
}

const Avatar = ({ height, width, url, firstName, lastName }: IAvatarProps) => {
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
      backgroundImage={url ? `url(${url})` : 'none'}
      backgroundPosition="center"
      backgroundSize="cover"
    >
      {!url ? abbreviate(firstName, lastName) : ''}
    </Flex>
  );
};

export default Avatar;
