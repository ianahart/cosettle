import { Box, Text, Flex } from '@chakra-ui/react';
import { ISpace, IUserContext } from '../../interfaces';
import Amenities from './Amenities';
import Dropdown from './Dropdown';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { nanoid } from 'nanoid';
import { useMemo, useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/user';
import { AiOutlineStar } from 'react-icons/ai';
import { Client } from '../../util/client';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
//@ts-ignore
import { OpenStreetMapProvider } from 'leaflet-geosearch';

interface IDescriptionProps {
  space: ISpace;
}

const Description = ({ space }: IDescriptionProps) => {
  const navigate = useNavigate();
  const { user, nonAuthTheme } = useContext(UserContext) as IUserContext;
  const [isFavorited, setIsFavorited] = useState(false);
  const [coords, setCoords] = useState<any>([]);
  const provider = useMemo(() => new OpenStreetMapProvider(), []);

  useEffect(() => {
    if (user.id !== 0 && space.id !== 0) {
      Client.isFavorited(user.id, space.id)
        .then((res) => {
          setIsFavorited(res.data.data);
        })
        .catch((err) => {
          throw new Error(err.response.data.message);
        });
    }
  }, [user.id, space.id]);

  useEffect(() => {
    const geocode = async () => {
      const results = await provider.search({
        query: `${space.street}, ${space.city}, ${space.country}`,
      });
      if (results.length) {
        setCoords((prevState: any) => [...prevState, results[0].bounds[0]]);
      }
    };
    if (space.city) {
      geocode();
    }
  }, [space.city, space.street, space.country]);

  const toggleFavorite = (action: string) => {
    if (user.id === 0) {
      navigate('/login');
      return;
    }
    Client.toggleFavorite(user.id, space.id, action)
      .then(() => {
        action === 'favorite' ? setIsFavorited(true) : setIsFavorited(false);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Flex
      minH="100vh"
      justify="space-between"
      flexDir="column"
      color={
        user.theme === 'dark' || nonAuthTheme === 'dark'
          ? 'light.primary'
          : 'text.primary'
      }
    >
      <Box>
        <Flex
          onClick={() => toggleFavorite(isFavorited ? 'unfavorite' : 'favorite')}
          cursor="pointer"
          justify="flex-end"
          align="center"
        >
          <Box color={isFavorited ? 'orange' : 'inherit'} fontSize="1.2rem">
            <AiOutlineStar />
          </Box>
          <Text ml="0.25rem">{isFavorited ? 'Unfavorite' : 'Add to Favorites'}</Text>
        </Flex>

        <Box my="2rem">
          <Text>{space.street}</Text>
          <Text>
            {space.city}, {space.country}
          </Text>
        </Box>
        <Box my="2rem">
          <Text lineHeight="1.6">{space.description}</Text>
        </Box>
        <Box my="2rem">
          <Amenities
            utilities={space.utilities}
            bathrooms={space.bathrooms}
            food={space.food}
          />
        </Box>
        {coords.length > 0 && (
          <MapContainer
            style={{ width: '100%', height: '400px' }}
            center={coords[0]}
            zoom={16}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coords[0]}>
              <Popup>
                {space.street} {space.city} {space.country}
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </Box>
      <Box className="dropdowns" p="1rem">
        <Dropdown name="Contact">
          <Box>
            <Flex my="0.5rem" justify="space-between">
              <Text>First Name:</Text>
              <Text>{space.firstName}</Text>
            </Flex>
            <Flex my="0.5rem" justify="space-between">
              <Text>Last Name:</Text>
              <Text>{space.lastName}</Text>
            </Flex>
            <Flex my="0.5rem" justify="space-between">
              <Text>Email:</Text>
              <Text>{space.email}</Text>
            </Flex>
            <Flex my="0.5rem" justify="space-between">
              <Text>Phone Number:</Text>
              <Text>{space.phoneNumber}</Text>
            </Flex>
          </Box>
        </Dropdown>
        <Dropdown name="Times">
          <Flex justify="space-around">
            <Box pointerEvents="none">
              <TimePicker className="time-picker" value={space.openTime} />
            </Box>
            <Box pointerEvents="none">
              <TimePicker className="time-picker" value={space.closeTime} />
            </Box>
          </Flex>
          <Flex flexWrap="wrap" justify="center" my="1rem">
            {space.days.split(',').map((day) => {
              return (
                <Box
                  border="1px solid"
                  borderColor="text.secondary"
                  p="0.25rem"
                  borderRadius={20}
                  textAlign="center"
                  minW="80px"
                  mx="1rem"
                  key={nanoid()}
                >
                  <Text>{day}</Text>
                </Box>
              );
            })}
          </Flex>
        </Dropdown>
        <Dropdown name="Details">
          <Flex my="0.5rem" justify="space-between">
            <Text>Flooring:</Text>
            <Text>{space.flooring}</Text>
          </Flex>
          <Flex my="0.5rem" justify="space-between">
            <Text>Capacity:</Text>
            <Text>{space.capacity} people</Text>
          </Flex>
          <Flex my="0.5rem" justify="space-between">
            <Text>Size:</Text>
            <Text>{space.size} sqft</Text>
          </Flex>
          <Flex my="0.5rem" justify="space-between">
            <Text>Price:</Text>
            <Text>${space.price}</Text>
          </Flex>
          <Flex my="0.5rem" justify="space-between">
            <Text>Wifi:</Text>
            <Text>{space.wifi}</Text>
          </Flex>
        </Dropdown>
      </Box>
    </Flex>
  );
};

export default Description;
