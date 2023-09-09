import { AiOutlineMobile, AiOutlineDesktop } from 'react-icons/ai';
import { Box, Text, Flex } from '@chakra-ui/react';

interface IViewportProps {
  viewport: string;
  handleSetViewport: (curViewport: string) => void;
}

const Viewport = ({ viewport, handleSetViewport }: IViewportProps) => {
  return (
    <Flex justify="space-between">
      <Text fontWeight="bold" color="light.primary">
        {viewport === 'desktop' ? 'Desktop Preview' : 'Mobile Preview'}
      </Text>
      <Flex>
        <Box
          onClick={() => handleSetViewport('desktop')}
          color={viewport === 'desktop' ? 'primary.dark' : 'light.primary'}
          cursor="pointer"
          mx="0.5rem"
          fontSize="1.5rem"
        >
          <AiOutlineDesktop />
        </Box>
        <Box
          onClick={() => handleSetViewport('mobile')}
          color={viewport === 'mobile' ? 'primary.dark' : 'light.primary'}
          cursor="pointer"
          mx="0.5rem"
          fontSize="1.5rem"
        >
          <AiOutlineMobile />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Viewport;
