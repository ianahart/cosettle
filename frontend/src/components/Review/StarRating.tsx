import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Client } from '../../util/client';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

interface IStarRatingProps {
  spaceId: number;
}

const StarRating = ({ spaceId }: IStarRatingProps) => {
  const navigate = useNavigate();
  const shouldRun = useRef(true);
  const [rating, setRating] = useState(0);
  const [total, setTotal] = useState(0);

  const getReviewStats = () => {
    Client.getReviewStats(spaceId)
      .then((res) => {
        const { averageRating, totalReviews } = res.data.data;
        setRating(averageRating);
        setTotal(totalReviews);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && spaceId !== 0) {
      getReviewStats();
    }
  }, [spaceId, shouldRun.current]);

  const goToReviews = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate('/reviews', { state: { spaceId } });
  };

  return (
    <Flex onClick={(e) => goToReviews(e)} align="center" mb="0.5rem" mt="1rem">
      {[...Array(5)].map((_, index) => {
        return (
          <Box key={nanoid()}>
            <AiFillStar fontSize="1.2rem" color={rating > index ? 'orange' : 'black'} />
          </Box>
        );
      })}
      <Box ml="1rem">
        <Text fontWeight="bold">{total} reviews</Text>
      </Box>
    </Flex>
  );
};

export default StarRating;
