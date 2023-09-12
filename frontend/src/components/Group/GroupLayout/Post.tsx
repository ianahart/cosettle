import { IPost } from '../../../interfaces';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Avatar from '../../Shared/Avatar';
//@ts-ignore
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
interface IPostProps {
  post: IPost;
}

const Post = ({ post }: IPostProps) => {
  console.log(post);
  return (
    <Box p="0.5rem" bg="black.tertiary" borderRadius={8} my="1.2rem">
      <Flex>
        <Avatar
          height="45px"
          width="45px"
          firstName={post.firstName}
          lastName={post.lastName}
          url={post.avatarUrl}
        />
        <Box>
          <Text ml="0.5rem" fontSize="0.9rem">
            {post.firstName} {post.lastName}
          </Text>

          <Text ml="0.5rem" fontSize="0.8rem">
            posted {dayjs(post.createdAt).fromNow()}
          </Text>
        </Box>
      </Flex>
      <Box my="1rem">
        <Box>
          <Text mb="1rem" fontSize="0.9rem">
            {post.content}
          </Text>
          {post.url && <Image width="100%" src={post.url} alt={post.content} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
