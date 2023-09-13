import { Box, Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';
import { IGroup, IPagination, IPost, IUserContext } from '../../../interfaces';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../context/user';
import CreatePost from './CreatePost';
import { Client } from '../../../util/client';
import BasicSpinner from '../../Shared/BasicSpinner';
import Post from './Post';

const Posts = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);
  const [group] = useOutletContext<IGroup[]>();
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 10,
    totalPages: 0,
    direction: 'next',
  });
  const [createPostError, setCreatePostError] = useState('');

  const updatePostLike = (postId: number, userLiked: boolean) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          post.userLiked = userLiked;
          if (userLiked) {
            post.totalLikes += 1;
          } else {
            post.totalLikes -= 1;
          }
        }
        return post;
      })
    );
  };

  const handleDeletePost = (postId: number) => {
    Client.deletePost(postId)
      .then(() => {
        setPosts((prevState) => prevState.filter((post) => post.id !== postId));
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const handleLikePost = (postId: number, userId: number) => {
    Client.likePost(postId, userId)
      .then(() => {
        updatePostLike(postId, true);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const handleUnlikePost = (postId: number, userId: number) => {
    Client.unlikePost(postId, userId)
      .then(() => {
        updatePostLike(postId, false);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const handleCreatePost = (content: string, file: File | null) => {
    setCreatePostLoading(true);
    Client.createPost(group.id, user.id, content, file)
      .then(() => {
        setPagination({ page: 0, pageSize: 1, totalPages: 0, direction: 'next' });
        setPosts([]);
        getPosts(false);
        setCreatePostLoading(false);
      })
      .catch((err) => {
        setCreatePostLoading(false);
        setCreatePostError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  const getPosts = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getPosts(group.id, pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { page, direction, posts, pageSize, totalPages } = res.data.data;
        setPosts((prevState) => [...prevState, ...posts]);
        setPagination((prevState) => ({
          ...prevState,
          page,
          direction,
          pageSize,
          totalPages,
        }));
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && group.id !== 0) {
      getPosts(false);
    }
  }, [shouldRun.current, group.id]);

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
        <CreatePost
          createPostError={createPostError}
          handleCreatePost={handleCreatePost}
        />
        {createPostLoading && (
          <Flex justify="center" my="1rem">
            <BasicSpinner message="Creating post..." color="#fff" />
          </Flex>
        )}
        <Box my="1rem">
          {posts.map((post) => {
            return (
              <Post
                handleDeletePost={handleDeletePost}
                handleUnlikePost={handleUnlikePost}
                handleLikePost={handleLikePost}
                post={post}
                key={post.id}
              />
            );
          })}
        </Box>
        {pagination.page < pagination.totalPages - 1 && (
          <Flex my="2rem" justify="center">
            <ButtonGroup>
              <Button onClick={() => getPosts(true)} size="sm" colorScheme="purple">
                Load more...
              </Button>
            </ButtonGroup>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Posts;
