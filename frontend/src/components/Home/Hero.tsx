import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../../assets/hero.svg';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';

const Hero = () => {
  const { user, nonAuthTheme } = useContext(UserContext) as IUserContext;
  const navigate = useNavigate();

  const goToExplorer = () => {
    navigate('/explorer');
  };

  const goToCreateSpace = () => {
    if (user.id === 0) {
      navigate('/login');
      return;
    }
    navigate('/spaces/create');
  };

  return (
    <Flex flexDir={['column', 'column', 'row']} align="center">
      <Box flexGrow={1} color="light.primary">
        <Heading
          color={
            nonAuthTheme === 'dark' || user.theme === 'dark'
              ? 'light.primary'
              : 'text.primary'
          }
          textAlign="center"
          as="h1"
        >
          Find a perfect working space near you!
        </Heading>
        <Box my="1.5rem" textAlign="center">
          <Button borderRadius={20} colorScheme="purple" onClick={goToExplorer}>
            <Box mr="0.25rem">
              <AiOutlineSearch />
            </Box>
            <Text textTransform="uppercase">Explore Space</Text>
          </Button>
          <Text
            color={
              nonAuthTheme === 'dark' || user.theme === 'dark'
                ? 'light.primary'
                : 'text.primary'
            }
            my="1rem"
            textAlign="center"
          >
            or
          </Text>
          <Button borderRadius={20} onClick={goToCreateSpace}>
            <Box mr="0.25rem">
              <AiOutlinePlus />
            </Box>
            <Text textTransform="uppercase">Create Space</Text>
          </Button>
        </Box>
      </Box>
      <Box flexGrow={2}>
        <Image src={heroImg} alt="three people working on laptops" />
      </Box>
    </Flex>
  );
};

export default Hero;
