import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { countries, spaceTypesState } from '../state/initialState';
import CustomSelect from '../components/Explorer/CustomSelect';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ICustomSelectData, IPagination, ISpace, IUserContext } from '../interfaces';
import { useSearchParams } from 'react-router-dom';
import { Client } from '../util/client';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';

const ExplorerRoute = () => {
  const { user, nonAuthTheme } = useContext(UserContext) as IUserContext;
  const navigate = useNavigate();
  const shouldRun = useRef(true);
  const [searchParams] = useSearchParams();
  const CITIES_ENDPOINT = 'https://countriesnow.space/api/v0.1/countries/cities';
  const [spaceType, setSpaceType] = useState('All');
  const [country, setCountry] = useState('All');
  const [city, setCity] = useState('All');
  const [cities, setCities] = useState<ICustomSelectData[]>([]);
  const [filteredCities, setFilteredCities] = useState<ICustomSelectData[]>([]);
  const [spaces, setSpaces] = useState<ISpace[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 1,
    direction: 'next',
    totalPages: 0,
  });

  const saveValue = (value: string, type: string) => {
    switch (type) {
      case 'spaces':
        setSpaceType(value);
        break;
      case 'countries':
        setCountry(value);
        setCities([]);
        break;
      case 'cities':
        setCity(value);
        break;
      default:
    }
  };

  const filterOutCities = (value: string) => {
    const filteredCities = cities.filter((city) => {
      if (city.value.toLowerCase().includes(value)) {
        return city;
      }
    });
    setFilteredCities(filteredCities);
  };

  const fetchCities = (country: string) => {
    axios
      .post(CITIES_ENDPOINT, { country })
      .then((res) => {
        res.data.data.forEach((city: string, index: number) =>
          cities.push({ id: index, name: city, value: city })
        );
      })
      .then(() => setFilteredCities([...cities]))
      .catch((err: any) => {
        throw new Error(err.response.data.message);
      });
  };

  const fetchSpaces = (
    country: string,
    spaceType: string,
    city: string,
    paginate: boolean
  ) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.fetchSpaces(
      country,
      spaceType,
      city,
      pageNum,
      pagination.pageSize,
      pagination.direction
    )
      .then((res) => {
        const { direction, page, pageSize, spaces, totalPages } = res.data.data;
        setPagination((prevState) => ({
          ...prevState,
          direction,
          page,
          pageSize,
          totalPages,
        }));
        if (paginate) {
          setSpaces((prevState) => [...prevState, ...spaces]);
        } else {
          setSpaces(spaces);
        }
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && searchParams.get('type') !== null) {
      setSpaceType(searchParams.get('type') as string);
    }
  }, [shouldRun.current]);

  useEffect(() => {
    if (country !== 'All') {
      fetchCities(country);
    }
  }, [country]);

  useEffect(() => {
    if (country.length && spaceType.length && city.length) {
      fetchSpaces(country, spaceType, city, false);
    }
  }, [country, spaceType, city]);

  const goToSpace = (spaceId: number) => {
    navigate(`/spaces/${spaceId}`);
  };

  return (
    <Box width="968px" mx="auto" my="2rem">
      <Flex
        my="1.5rem"
        justify="space-evenly"
        p="1rem"
        borderRadius={8}
        border="1px solid"
        borderColor={
          user.theme === 'dark' || nonAuthTheme === 'dark'
            ? 'text.secondary'
            : 'border.primary'
        }
        bg={user.theme === 'dark' || nonAuthTheme === 'dark' ? '#1d1d1d' : 'transparent'}
      >
        <Box>
          <CustomSelect
            value={spaceType}
            saveValue={saveValue}
            type="spaces"
            data={spaceTypesState}
          />
        </Box>
        <Box>
          <CustomSelect
            value={country}
            saveValue={saveValue}
            type="countries"
            data={countries}
          />
        </Box>
        <Box>
          <CustomSelect
            value={city}
            filterOutCities={filterOutCities}
            saveValue={saveValue}
            type="cities"
            data={filteredCities}
          />
        </Box>
      </Flex>

      <Box
        my="1.5rem"
        p="1rem"
        borderRadius={8}
        border="1px solid"
        borderColor={
          user.theme === 'dark' || nonAuthTheme === 'dark'
            ? 'text.secondary'
            : 'border.primary'
        }
        bg={user.theme === 'dark' || nonAuthTheme === 'dark' ? '#1d1d1d' : 'transparent'}
      >
        <Box>
          <Heading
            color={
              user.theme === 'dark' || nonAuthTheme === 'dark'
                ? 'light.primary'
                : 'text.primary'
            }
          >
            Spaces
          </Heading>
          {spaces.map((space) => {
            return (
              <Flex
                onClick={() => goToSpace(space.id)}
                cursor="pointer"
                my="1rem"
                key={space.id}
              >
                <Image
                  width="120px"
                  height="120px"
                  borderRadius={8}
                  src={space.photos[0].url}
                  alt={space.photos[0].filename}
                />
                <Box
                  ml="0.5rem"
                  color={
                    user.theme === 'dark' || nonAuthTheme === 'dark'
                      ? 'light.primary'
                      : 'text.primary'
                  }
                >
                  <Text>{space.street}</Text>
                  <Text>
                    {space.city}, {space.country}
                  </Text>
                </Box>
              </Flex>
            );
          })}
          {pagination.page < pagination.totalPages - 1 && (
            <Flex my="1rem" justify="center">
              <Button
                onClick={() => fetchSpaces(country, spaceType, city, true)}
                colorScheme="purple"
              >
                Load more...
              </Button>
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ExplorerRoute;
