import {
  Box,
  Flex,
  Text,
  Textarea,
  FormLabel,
  Heading,
  FormControl,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { IUser } from '../../interfaces';
import { useLocation, useNavigate } from 'react-router-dom';
import { Client } from '../../util/client';
import BasicSpinner from '../Shared/BasicSpinner';

interface IFormProps {
  user: IUser;
}

const Form = ({ user }: IFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (rating === 0) {
      setError('Please rate your experience');
      return;
    }

    if (review.trim().length === 0 || review.length > 250) {
      setError('Please tell us about your experience');
      return;
    }

    createReview();
  };

  const createReview = () => {
    setLoading(true);
    Client.createReview(user.id, location.state.spaceId, rating, review)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  const handleOnMouseOver = (index: number) => {
    setRating(index);
  };
  const handleOnMouseLeave = () => {
    if (rating === 1) {
      setRating(0);
      return;
    }
    setRating(rating);
  };

  return (
    <Box p="1rem" color={user.theme === 'dark' ? 'light.primary' : 'text.primary'}>
      <form onSubmit={handleOnSubmit}>
        <Heading my="2rem" textAlign="center">
          Write a review
        </Heading>
        {error.length > 0 && (
          <Flex justify="center" my="1rem">
            <Text fontSize="0.85rem" color="red.400">
              {error}
            </Text>
          </Flex>
        )}
        <Box my="2rem">
          <FormLabel>Rate your recent experience</FormLabel>
          <Flex>
            {[...Array(5)].map((_, index) => {
              index += 1;
              return (
                <Box
                  onMouseEnter={() => handleOnMouseOver(index)}
                  onMouseLeave={handleOnMouseLeave}
                  key={index}
                  fontSize="1.5rem"
                >
                  <AiFillStar color={rating >= index ? 'orange' : 'black'} />
                </Box>
              );
            })}
          </Flex>
        </Box>
        <FormControl my="2rem">
          <FormLabel>Tell us about your experience</FormLabel>
          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            minH="200px"
            border="none"
            resize="none"
            bg={user.theme === 'dark' ? '#161515' : '#ebe7e7'}
          />
        </FormControl>
        {loading && <BasicSpinner message="Saving review..." color="light.primary" />}
        {!loading && (
          <Flex my="2rem" justify="center">
            <Button width="100%" colorScheme="purple" type="submit">
              Submit
            </Button>
          </Flex>
        )}
      </form>
    </Box>
  );
};

export default Form;
