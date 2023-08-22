import { Flex, Box, Switch } from '@chakra-ui/react';
import { CiLight } from 'react-icons/ci';
import { BsMoonStars } from 'react-icons/bs';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
import {Client} from '../../util/client';

const ThemeToggler = () => {
  const { user, updateUser } = useContext(UserContext) as IUserContext;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleTheme(e.target.checked);
  };

    const toggleTheme = (isChecked: boolean) => {
      const theme = isChecked ? 'dark' : 'light';
        Client.updateTheme(theme, user.themeId).then((res) => {
            console.log(res)
                updateUser({ ...user, theme });

        }).catch((err) => {
                throw new Error(err.response.data.message);
            })
    }

  return (
    <Flex alignItems="center">
      <Switch
        size="lg"
        onChange={handleOnChange}
        isChecked={user.theme === 'dark' ? true : false}
        colorScheme="purple"
      />
      <Box ml="0.5rem" fontSize="1.5rem" color="primary.dark">
        {user.theme === 'light' ? <CiLight /> : <BsMoonStars />}
      </Box>
    </Flex>
  );
};

export default ThemeToggler;
