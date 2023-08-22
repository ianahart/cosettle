import { Box, Heading } from '@chakra-ui/react';
import {useContext} from 'react';
import {UserContext} from '../../context/user';
import {IUserContext} from '../../interfaces';

interface IHeaderProps {
  heading: string;
}

const HeadingStack = ({ heading }: IHeaderProps) => {
  const {user} = useContext(UserContext) as IUserContext;

  return (
    <Box>
      <Heading fontSize="1rem">{heading}</Heading>
            <Box my="0.25rem" borderBottom="1px solid" borderColor={user.theme === 'dark' ? 'text.secondary' : 'light.primary'}></Box>
    </Box>
  );
};

export default HeadingStack;
