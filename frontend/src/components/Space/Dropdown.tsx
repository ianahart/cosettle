import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

interface IDropdownProps {
  children: React.ReactNode;
  name: string;
}

const Dropdown = ({ name, children }: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box my="1rem">
      <Flex
        cursor="pointer"
        onClick={() => setIsOpen((prevState) => !prevState)}
        justify="space-between"
      >
        <Text fontSize="1.2rem">{name}</Text>
        <Box fontSize="1.2rem">{isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}</Box>
      </Flex>
      {isOpen && (
        <Box bg="#161515" fontSize="0.9rem" p="1rem" my="1rem" borderRadius={8}>
          {children}
        </Box>
      )}
    </Box>
  );
};

export default Dropdown;
