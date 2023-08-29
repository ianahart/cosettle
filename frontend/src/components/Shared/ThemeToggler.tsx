import { Flex, Box, Switch } from '@chakra-ui/react';
import { CiLight } from 'react-icons/ci';
import { BsMoonStars } from 'react-icons/bs';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
import { Client } from '../../util/client';

const ThemeToggler = () => {
  const { user, updateUser, nonAuthTheme, setNonAuthTheme } = useContext(
    UserContext
  ) as IUserContext;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user.loggedIn) {
      toggleAuthTheme(e.target.checked);
    } else {
      toggleNonAuthTheme(e.target.checked);
    }
  };

  const toggleNonAuthTheme = (isChecked: boolean) => {
    const theme = isChecked ? 'dark' : 'light';
    setNonAuthTheme(theme);
  };

  const toggleAuthTheme = (isChecked: boolean) => {
    const theme = isChecked ? 'dark' : 'light';
    Client.updateTheme(theme, user.themeId)
      .then(() => {
        updateUser({ ...user, theme });
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const setTheme = () => {
    if (nonAuthTheme) {
      return nonAuthTheme === 'dark' ? true : false;
    } else {
      return user.theme === 'dark' ? true : false;
    }
  };

  const showIcon = () => {
    return nonAuthTheme.length > 0 ? nonAuthTheme : user.theme;
  };

  return (
    <Flex alignItems="center">
      <Switch
        size="lg"
        onChange={handleOnChange}
        isChecked={setTheme()}
        colorScheme="purple"
      />
      <Box ml="0.5rem" fontSize="1.5rem" color="light.primary">
        {showIcon() === 'light' ? <CiLight /> : <BsMoonStars />}
      </Box>
    </Flex>
  );
};

export default ThemeToggler;
