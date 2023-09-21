import { Box, Flex, Text } from '@chakra-ui/react';

import { LuUtilityPole } from 'react-icons/lu';
import { IoFastFoodOutline } from 'react-icons/io5';
import { FaToilet } from 'react-icons/fa';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';

interface IAmenitiesProps {
  utilities: boolean;
  food: boolean;
  bathrooms: boolean;
}

const Amenities = ({ utilities, food, bathrooms }: IAmenitiesProps) => {
  const { user, nonAuthTheme } = useContext(UserContext) as IUserContext;
  return (
    <Flex
      justify="space-around"
      color={
        user.theme === 'dark' || nonAuthTheme === 'dark'
          ? 'light.primary'
          : 'text.primary'
      }
    >
      {utilities && (
        <Flex align="center">
          <Box>
            <LuUtilityPole />
          </Box>

          <Text ml="0.25rem">Utilities</Text>
        </Flex>
      )}
      {food && (
        <Flex align="center">
          <Box>
            <IoFastFoodOutline />
          </Box>

          <Text ml="0.25rem">Food</Text>
        </Flex>
      )}
      {bathrooms && (
        <Flex align="center">
          <Box>
            <FaToilet />
          </Box>

          <Text ml="0.25rem">Bathrooms</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Amenities;
