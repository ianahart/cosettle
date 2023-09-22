import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../context/user';
import { IUserContext } from '../interfaces';
import Form from '../components/Review/Form';

const CreateReviewRoute = () => {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <Box minH="100vh">
      <Box
        borderRadius={8}
        mx="auto"
        mt="3rem"
        bg={user.theme === 'dark' ? '#1d1d1d' : '#faf7f7'}
        minH="600px"
        width={['95%', '95%', '600px']}
      >
        <Form user={user} />
      </Box>
    </Box>
  );
};

export default CreateReviewRoute;
