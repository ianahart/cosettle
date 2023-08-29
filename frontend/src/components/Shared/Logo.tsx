import { Flex, Heading, Image } from '@chakra-ui/react';
import darkLogo from '../../assets/dark-logo.svg';
import lightLogo from '../../assets/light-logo.svg';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';

const Logo = () => {
  const { user, nonAuthTheme } = useContext(UserContext) as IUserContext;
  return (
    <Flex alignItems="center" justifyContent="center" flexDir="column">
      <Image
        height="32px"
        width="32px"
        src={user.theme === 'dark' || nonAuthTheme === 'dark' ? lightLogo : darkLogo}
        alt="logo of wifi bars"
      />
      <Heading
        color={
          user.theme === 'dark' || nonAuthTheme === 'dark'
            ? 'text.primary'
            : 'light.primary'
        }
        as="h1"
        fontSize="1.1rem"
      >
        CoSettle
      </Heading>
    </Flex>
  );
};

export default Logo;
