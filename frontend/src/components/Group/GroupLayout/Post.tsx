import { IComment, IPagination, IPost, IUserContext } from '../../../interfaces';
import {
  Box,
  Flex,
  Image,
  Text,
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Button,
} from '@chakra-ui/react';
import Avatar from '../../Shared/Avatar';
//@ts-ignore
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BsHandThumbsUp, BsThreeDots, BsTrash } from 'react-icons/bs';
import { BiComment } from 'react-icons/bi';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../../../context/user';
import { Client } from '../../../util/client';
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
  const commentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentPrompt, setCommentPrompt] = useState(false);
  const [pagination, setPagination] = useState<IPagination>({
    pageSize: 4,
    page: 0,
    totalPages: 0,
    direction: 'next',
  });

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

  const createComment = () => {
    setError('');
    if (comment.length > 200 || comment.trim().length === 0) {
      setError('Comment must be between 1 and 200 characters');
      return;
    }
    Client.createComment(post.id, user.id, comment)
      .then(() => {
        setComment('');
        setCommentPrompt(false);
        setComments([]);
        getComments(false);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const getComments = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;

    Client.getComments(post.id, pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { totalPages, page, pageSize, direction, comments } = res.data.data;
        setPagination((prevState) => ({
          ...prevState,
          totalPages,
          page,
          pageSize,
          direction,
        }));

        setComments((prevState) => [...prevState, ...comments]);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
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
          {post.url && (
            <Image
              width="50%"
              mx="auto"
              borderRadius={4}
              src={post.url}
              alt={post.content}
            />
          )}
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
          onClick={() => commentTextareaRef.current?.focus()}
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
      <Flex p="0.5rem">
        <Avatar
          width="35px"
          height="35px"
          url={user.avatarUrl}
          firstName={user.firstName}
          lastName={user.lastName}
        />
        {!commentPrompt ? (
          <Box
            cursor="pointer"
            onClick={() => setCommentPrompt(true)}
            ml="0.5rem"
            width="100%"
            bg="#161515"
            borderRadius={20}
            minH="35px"
            p="0.5rem"
          >
            <Text>Write a comment...</Text>
          </Box>
        ) : (
          <Box ml="0.5rem" width="100%" bg="#161515" borderRadius={8}>
            <Textarea
              value={comment}
              resize="none"
              onChange={(e) => setComment(e.target.value)}
              ref={commentTextareaRef}
              _placeholder={{ fontSize: '0.85rem' }}
              fontSize="0.85rem"
              borderRadius={8}
              bg="#161515"
              border="none"
              placeholder="Write a comment..."
            />
            {error.length > 0 && (
              <Text color="red.400" textAlign="center" fontSize="0.8rem">
                {error}
              </Text>
            )}
            <Flex p="0.5rem" justify="flex-end">
              <Button onClick={createComment} colorScheme="purple" size="sm">
                Post
              </Button>
              <Button onClick={() => setCommentPrompt(false)} ml="0.5rem" size="sm">
                Cancel
              </Button>
            </Flex>
          </Box>
        )}
      </Flex>
      {!comments.length && (
        <Flex justify="center" my="1rem">
          <Text
            role="button"
            onClick={() => getComments(false)}
            cursor="pointer"
            fontSize="0.9rem"
          >
            View Comments...
          </Text>
        </Flex>
      )}
      {comments.map((comment) => {
        return (
          <Flex my="1rem" ml="3rem" key={comment.id} align="center">
            <Avatar
              firstName={comment.firstName}
              lastName={comment.lastName}
              url={comment.avatarUrl}
              width="35px"
              height="35px"
            />
            <Box borderRadius={8} p="1rem" bg="#161515" ml="0.5rem">
              <Text fontSize="0.9rem" fontWeight="bold">
                {comment.firstName} {comment.lastName}
              </Text>
              <Text fontSize="0.9rem">{comment.text}</Text>
            </Box>
          </Flex>
        );
      })}
      {pagination.page < pagination.totalPages - 1 && (
        <Flex justify="center">
          <Button colorScheme="purple" onClick={() => getComments(true)}>
            More comments...
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Post;
