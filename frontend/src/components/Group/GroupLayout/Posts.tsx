import { Box } from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';
import { IGroup, IUserContext } from '../../../interfaces';
import { useContext } from 'react';
import { UserContext } from '../../../context/user';
import CreatePost from './CreatePost';
import { Client } from '../../../util/client';

const Posts = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const [group] = useOutletContext<IGroup[]>();

  const handleCreatePost = (content: string, file: File | null) => {
    Client.createPost(group.id, user.id, content, file)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box
      borderRadius={8}
      p="1rem"
      color="text.primary"
      bg="#161515"
      maxW="968px"
      mx="auto"
    >
      <Box my="2rem">
        <CreatePost handleCreatePost={handleCreatePost} />
      </Box>
    </Box>
  );
};

export default Posts;
