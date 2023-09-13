import { IPost, IUserContext } from '../../../interfaces';
import {
  Box,
  Flex,
  Image,
  Text,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import Avatar from '../../Shared/Avatar';
//@ts-ignore
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BsHandThumbsUp, BsThreeDots, BsTrash } from 'react-icons/bs';
import { BiComment } from 'react-icons/bi';
import { useContext, useRef } from 'react';
import { UserContext } from '../../../context/user';
dayjs.extend(relativeTime);
interface IPostProps {
  post: IPost;
  handleLikePost: (postId: number, userId: number) => void;
  handleUnlikePost: (postId: number, userId: number) => void;
  handleDeletePost: (postId: number) => void;
}

const Post = ({
  post,
  handleLikePost,
  handleUnlikePost,
  handleDeletePost,
}: IPostProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const commentInput = useRef<HTMLInputElement>(null);

  const toggleLike = (action: string) => {
    if (action === 'like') {
      handleLikePost(post.id, user.id);
    } else {
      handleUnlikePost(post.id, user.id);
    }
  };

  const deletePost = () => {
    handleDeletePost(post.id);
  };

  return (
    <Box p="0.5rem" bg="black.tertiary" borderRadius={8} my="1.2rem">
      <Flex justify="flex-end">
        <Menu>
          <MenuButton
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
            bg="transparent"
            as={IconButton}
            aria-label="Options"
            icon={
              <Box color="text.primary">
                <BsThreeDots />
              </Box>
            }
          />
          <MenuList border="none" bg="#161515">
            {user.id === post.userId && (
              <MenuItem icon={<BsTrash />} bg="#161515" onClick={deletePost}>
                Delete
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Flex>
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
      <Box>
        <Text fontSize="0.9rem">
          {post.totalLikes > 0 ? `${post.totalLikes} likes` : ''}
        </Text>
      </Box>
      <Box
        mt="0.25rem"
        mb="0.5rem"
        borderBottom="1px solid"
        borderColor="text.secondary"
      ></Box>
      <Flex my="1rem" p="1rem" align="center" justify="space-between">
        <Flex
          onClick={() => toggleLike(post.userLiked ? 'unlike' : 'like')}
          align="center"
          cursor="pointer"
        >
          <Box
            transform={post.userLiked ? 'rotate(-15deg)' : 'rotate(0deg)'}
            color={post.userLiked ? 'primary.dark' : 'inherit'}
          >
            <BsHandThumbsUp />
          </Box>
          <Text
            color={post.userLiked ? 'primary.dark' : 'inherit'}
            fontSize="0.9rem"
            ml="0.25rem"
          >
            Like
          </Text>
        </Flex>
        <Flex
          onClick={() => commentInput.current?.focus()}
          cursor="pointer"
          align="center"
        >
          <Box>
            <BiComment />
          </Box>
          <Text ml="0.5rem" fontSize="0.9rem">
            Write a comment
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Avatar
          width="35px"
          height="35px"
          url={user.avatarUrl}
          firstName={user.firstName}
          lastName={user.lastName}
        />
        <Input
          ref={commentInput}
          ml="0.5rem"
          _placeholder={{ fontSize: '0.85rem' }}
          fontSize="0.85rem"
          borderRadius={20}
          bg="#161515"
          border="none"
          placeholder="Write a comment..."
        />
      </Flex>
      <Flex justify="center" my="1rem">
        <Text cursor="pointer" fontSize="0.9rem">
          View Comments...
        </Text>
      </Flex>
      {/*Comments go here*/}
    </Box>
  );
};

export default Post;
