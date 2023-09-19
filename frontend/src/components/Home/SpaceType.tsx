import { Box, Text, Image, Flex } from '@chakra-ui/react';
import { ISpaceType } from '../../interfaces';
import { BsArrowRightCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

interface ISpaceTypeProps {
  space: ISpaceType;
}

const SpaceType = ({ space }: ISpaceTypeProps) => {
  const navigate = useNavigate();

  const goToExplorer = (type: string) => {
    navigate(`/explorer?type=${type}`);
  };

  return (
    <Box
      minW="180px"
      my={['1rem', '1rem', '0']}
      color="light.primary"
      bg="rgba(21, 21, 21, 0.8)"
      borderRadius={8}
      p="1rem"
    >
      <Flex align="center">
        <Image
          width="55px"
          height="55px"
          borderRadius={8}
          src={space.image}
          alt={space.value}
        />
        <Text ml="0.5rem">{space.name}</Text>
      </Flex>
      <Box cursor="pointer" onClick={() => goToExplorer(space.value)} my="1rem">
        <Flex align="center">
          <Box mr="0.5rem">
            <BsArrowRightCircle />
          </Box>
          <Text textTransform="uppercase">View More</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default SpaceType;
