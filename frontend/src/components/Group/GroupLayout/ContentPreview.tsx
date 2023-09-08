import { Box, Flex, Text, Input } from '@chakra-ui/react';
import { BiSolidUserCircle } from 'react-icons/bi';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { AiOutlineSmile } from 'react-icons/ai';

interface IContentPreviewProps {
  viewport: string;
}

const ContentPreview = ({ viewport }: IContentPreviewProps) => {
  return (
    <Flex
      flexDir={viewport === 'desktop' ? 'row' : 'column'}
      justify="space-between"
      className="group-content-preview-container"
      bg="#161515"
      p="1rem"
      borderRadius={8}
      minH="200px"
    >
      <Box width="100%" m="0.5rem" bg="#2c2a2a" borderRadius={8} p="2rem">
        <Flex flexGrow="2" align="center">
          <Box color="text.primary" fontSize="2rem" mr="0.5rem">
            <BiSolidUserCircle />
          </Box>
          <Input
            border="none"
            borderRadius={20}
            bg="black.tertiary"
            placeholder="What's on your mind?"
          />
        </Flex>
        <Flex my="1.5rem" justify="space-between">
          <Flex>
            <Box color="text.primary" mr="0.25rem" fontSize="1.5rem">
              <HiOutlinePhotograph />
            </Box>
            <Text color="text.primary">Photo</Text>
          </Flex>
          <Flex>
            <Box color="text.primary" mr="0.25rem" fontSize="1.5rem">
              <AiOutlineSmile />
            </Box>
            <Text color="text.primary">Feeling/Activity</Text>
          </Flex>
        </Flex>
      </Box>
      <Box
        m="0.5rem"
        minW={['100%', '250px', '250px']}
        height="80px"
        bg="#2c2a2a"
        borderRadius={8}
        p="1rem"
      >
        <Text color="text.primary">About</Text>
      </Box>
    </Flex>
  );
};

export default ContentPreview;
