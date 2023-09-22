import { Box, Heading, Text, Flex, ButtonGroup, Button } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../context/user';
import { IPagination, IReview, IUserContext } from '../interfaces';
import { useLocation } from 'react-router-dom';
import { Client } from '../util/client';
import Avatar from '../components/Shared/Avatar';
import { nanoid } from 'nanoid';
import { AiFillStar } from 'react-icons/ai';

const ReviewsRoute = () => {
  const location = useLocation();
  const { user, nonAuthTheme } = useContext(UserContext) as IUserContext;
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 10,
    totalPages: 0,
    direction: 'next',
  });
  const shouldRun = useRef(true);

  const getReviews = (paginate: boolean, direction: string) => {
    const pageNumber = paginate ? pagination.page : -1;
    Client.getReviews(location.state.spaceId, pageNumber, pagination.pageSize, direction)
      .then((res) => {
        const { direction, page, pageSize, totalPages, reviews } = res.data.data;
        setPagination((prevState) => ({
          ...prevState,
          direction,
          totalPages,
          pageSize,
          page,
        }));
        setReviews(reviews);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      getReviews(false, 'next');
    }
  }, [shouldRun.current]);

  return (
    <Box>
      <Flex
        flexDir="column"
        justify="space-between"
        mt="5rem"
        mx="auto"
        minH="600px"
        p="1rem"
        w={['95%', '95%', '600px']}
        borderRadius={8}
        color={
          user.theme === 'dark' || nonAuthTheme === 'dark'
            ? 'light.primary'
            : 'text.primary'
        }
        bg={user.theme === 'dark' || nonAuthTheme === 'dark' ? '#1d1d1d' : '#faf7f7'}
      >
        <Box>
          <Box textAlign="center" as="header">
            <Heading>Reviews</Heading>
          </Box>

          <Box>
            {reviews.map((review) => {
              return (
                <Box
                  my="1.5rem"
                  p="0.5rem"
                  key={review.id}
                  borderRadius={8}
                  bg={
                    user.theme === 'dark' || nonAuthTheme === 'dark'
                      ? '#161515'
                      : 'border.primary'
                  }
                >
                  <Flex align="center">
                    <Avatar
                      width="45px"
                      height="45px"
                      firstName={review.firstName}
                      lastName={review.lastName}
                      url={review.avatarUrl}
                    />
                    <Box ml="0.5rem">
                      <Text>
                        {review.firstName} {review.lastName}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex my="0.5rem">
                    {[...Array(5)].map((_, index) => {
                      return (
                        <Box key={nanoid()}>
                          <AiFillStar
                            fontSize="1.2rem"
                            color={review.rating > index ? 'orange' : 'black'}
                          />
                        </Box>
                      );
                    })}
                  </Flex>
                  <Box my="0.5rem">
                    <Text fontSize="0.9rem" lineHeight="1.6">
                      {review.text}
                    </Text>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Flex my="3rem" justify="center" mb="auto">
          <ButtonGroup>
            {pagination.page > 0 && (
              <Button onClick={() => getReviews(true, 'prev')}>Prev</Button>
            )}
            {pagination.page < pagination.totalPages - 1 && (
              <Button onClick={() => getReviews(true, 'next')}>Next</Button>
            )}
          </ButtonGroup>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ReviewsRoute;
