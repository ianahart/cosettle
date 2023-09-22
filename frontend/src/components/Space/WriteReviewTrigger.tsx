import { Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface IWriteReviewTriggerProps {
  spaceId: number;
  userId: number;
}

const WriteReviewTrigger = ({ spaceId, userId }: IWriteReviewTriggerProps) => {
  const navigate = useNavigate();

  const goToReview = () => {
    if (userId === 0) {
      navigate('/login');
      return;
    }
    navigate('/reviews/create', { state: { spaceId } });
  };

  return (
    <Box onClick={goToReview} cursor="pointer">
      <Text textDecor="underline">Write a review</Text>
    </Box>
  );
};

export default WriteReviewTrigger;
