import { Heading, Box } from '@chakra-ui/react';

interface IHeaderProps {
  heading: string;
}

const Header = ({ heading }: IHeaderProps) => {
  return (
    <>
      <Heading
        mt="3rem"
        color="text.primary"
        textAlign="center"
        width="100%"
        fontSize="1.5rem"
      >
        {heading}
      </Heading>
      <Box
        mt="0.5rem"
        height="10px"
        width="100%"
        bg="radial-gradient(circle, rgba(128,90,213,1) 29%, rgba(213,63,140,1) 100%)"
      ></Box>
    </>
  );
};

export default Header;
