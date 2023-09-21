import { Box, Heading, Text, Flex, Image, Tooltip, Button } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../context/user';
import { IFavorite, IPagination, IUserContext } from '../interfaces';
import { Client } from '../util/client';
import { useNavigate } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';

const FavoritesRoute = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<IFavorite[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    pageSize: 1,
    page: 0,
    totalPages: 0,
    direction: 'next',
  });

  const getFavorites = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getFavorites(user.id, pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { favorites, page, pageSize, direction, totalPages } = res.data.data;
        setPagination((prevState) => ({
          ...prevState,
          totalPages,
          direction,
          pageSize,
          page,
        }));
        setFavorites((prevState) => [...prevState, ...favorites]);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      getFavorites(false);
    }
  }, [shouldRun.current, user.id]);

  const goToSpace = (id: number) => {
    navigate(`/spaces/${id}`);
  };

  const removeFavorite = (spaceId: number) => {
    Client.toggleFavorite(user.id, spaceId, 'unfavorite').then(() => {
      setFavorites((prevState) =>
        prevState.filter((favorite) => favorite.spaceId !== spaceId)
      );
    });
  };

  return (
    <Box>
      <Box
        borderRadius={8}
        mx="auto"
        mt="3rem"
        bg={user.theme === 'dark' ? '#1d1d1d' : '#faf7f7'}
        minH="500px"
        p="1rem"
        color={user.theme === 'dark' ? 'light.primary' : 'text.primary'}
        width={['95%', '95%', '600px']}
      >
        <Box my="2rem">
          <Heading>Favorites</Heading>
        </Box>

        {favorites.map((favorite) => {
          return (
            <Flex justify="space-between" my="1rem" key={favorite.id}>
              <Flex>
                <Image
                  borderRadius={8}
                  width="100px"
                  height="100px"
                  src={favorite.spacePhoto.url}
                  alt={favorite.spacePhoto.filename}
                />
                <Box
                  cursor="pointer"
                  onClick={() => goToSpace(favorite.spaceId)}
                  ml="0.5rem"
                >
                  <Text>{favorite.street}</Text>
                  <Text>
                    {favorite.city} {favorite.country}
                  </Text>
                </Box>
              </Flex>
              <Tooltip placement="top-end" label="Remove as favorite">
                <Box onClick={() => removeFavorite(favorite.spaceId)}>
                  <BsTrash />
                </Box>
              </Tooltip>
            </Flex>
          );
        })}
        {pagination.page < pagination.totalPages - 1 && (
          <Flex justify="center" my="1rem">
            <Button onClick={() => getFavorites(true)} colorScheme="purple">
              Load more...
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default FavoritesRoute;
