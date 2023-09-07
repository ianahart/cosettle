import { Box, Flex, FormControl, Heading, Input, Text } from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

interface IMainViewProps {
  switchView: (view: string) => void;
}

const MainView = ({ switchView }: IMainViewProps) => {
  return (
    <Box p="1rem" color="text.primary">
      <Box as="header" display="flex" justifyContent="space-between" alignItems="center">
        <Heading as="h2" fontSize="1.5rem">
          Groups
        </Heading>
        <Box fontSize="1.5rem" cursor="pointer">
          <FiSettings />
        </Box>
      </Box>
      <FormControl position="relative" mt="1rem" mb="2rem">
        <Input
          pl="2.0rem"
          color="text.primary"
          placeholder="Search groups"
          border="none"
          bg="#323432"
          borderRadius="20px"
        />
        <Box fontSize="1.2rem" position="absolute" top="10px" left="5px">
          <AiOutlineSearch />
        </Box>
      </FormControl>
      <RouterLink to="/groups/your-groups">
        <Flex p="0.25rem" _hover={{ bg: '#323432' }} alignItems="center" borderRadius={4}>
          <Flex
            flexDir="column"
            justify="center"
            align="center"
            bg="primary.dark"
            borderRadius="50%"
            color="light.primary"
            height="40px"
            width="40px"
            mr="0.5rem"
            fontSize="1.3rem"
          >
            <FaUsers />
          </Flex>
          <Text>Your groups</Text>
        </Flex>
      </RouterLink>
      <RouterLink to="/groups/create">
        <Flex
          onClick={() => switchView('create')}
          bg="rgba(128,90,213, 0.2)"
          borderRadius={4}
          height="35px"
          color="primary.dark"
          fontWeight="bold"
          mt="2rem"
          align="center"
          justifyContent="center"
        >
          <Box mr="0.25rem">
            <AiOutlinePlus />
          </Box>
          <Box>
            <Text fontSize="0.9rem">Create new group</Text>
          </Box>
        </Flex>
      </RouterLink>
    </Box>
  );
};

export default MainView;
