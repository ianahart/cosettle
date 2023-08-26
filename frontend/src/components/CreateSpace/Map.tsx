import { Box, Flex, Text } from '@chakra-ui/react';

interface IMapProps {
  keys: string[];
  selectedIndex: number;
}

const Map = ({ keys, selectedIndex }: IMapProps) => {
  const steps = keys.map((key) => key.slice(0, 1).toUpperCase() + key.slice(1));

  return (
    <Box width={['95%', '95%', '600px']} my="1rem">
      <Flex justify="space-around" flexWrap="wrap">
        {steps.map((step, index) => {
          return (
            <Flex key={index} alignItems="center">
              <Flex
                flexDir="column"
                justify="center"
                align="center"
                bg={selectedIndex === index ? 'primary.light' : 'primary.dark'}
                borderRadius="50%"
                width="30px"
                height="30px"
                mx="0.25rem"
              >
                <Text color="light.primary">{index + 1}</Text>
              </Flex>
              <Box>
                <Text color="primary.dark" fontSize="1.1rem">
                  {step}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Map;
