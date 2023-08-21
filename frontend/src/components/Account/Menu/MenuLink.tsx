import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface IMenuLinkProps {
  to: string;
  text: string;
  icon: React.JSX.Element;
}

const MenuLink = ({ to, text, icon }: IMenuLinkProps) => {
  return (
    <Box _hover={{ opacity: 0.8 }} my="0.75rem">
      <RouterLink to={to}>
        <Flex align="center">
          <Box mr="0.25rem" color="text.primary">
            {icon}
          </Box>
          <Box fontSize="0.9rem">{text}</Box>
        </Flex>
      </RouterLink>
    </Box>
  );
};

export default MenuLink;
