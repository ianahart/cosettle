import { Box, Flex, Text } from '@chakra-ui/react';
import Header from './Header';
import { IAvailabilityForm, IDay, IUserContext } from '../../interfaces';
import FormField from '../Shared/FormField';
import { useContext, useEffect, useRef, useState } from 'react';
import { daysState } from '../../state/initialState';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { UserContext } from '../../context/user';

interface IAvailabilityProps {
  handleRemoveDay: (id: string, step: string) => void;
  handleAddDay: (day: IDay, step: string) => void;
  form: IAvailabilityForm;
  step: string;
  handleUpdateField: (
    name: string,
    value: string | boolean,
    attribute: string,
    step: string
  ) => void;
}

const Availability = ({
  handleRemoveDay,
  handleAddDay,
  form,
  step,
  handleUpdateField,
}: IAvailabilityProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const [days, setDays] = useState<IDay[]>(daysState);
  const [openTime, setOpenTime] = useState('9:00');
  const [closeTime, setCloseTime] = useState('17:00');
  const shouldRun = useRef(true);

  const syncDays = () => {
    const existingIds = form.days.value.map((day) => day.id);
    setDays((prevState) => prevState.filter((day) => !existingIds.includes(day.id)));
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      syncDays();
    }
  }, [shouldRun.current, syncDays]);

  const updateField = (name: string, value: string, attribute: string) => {
    handleUpdateField(name, value, attribute, step);
  };

  const addDay = (id: string, name: string) => {
    setDays((prevState) => prevState.filter((day) => day.id !== id));
    handleAddDay({ id, name }, step);
  };

  const removeDay = (id: string, name: string) => {
    setDays((prevState) => [...prevState, { id, name }]);
    handleRemoveDay(id, step);
  };

  const handleCloseTime = (time: any) => {
    setCloseTime(time);
    handleUpdateField('openTime', time, 'value', 'availability');
  };

  const handleOpenTime = (time: any) => {
    setOpenTime(time);
    handleUpdateField('closeTime', time, 'value', 'availability');
  };

  return (
    <Box>
      <Header heading="Availability" />
      <FormField
        updateField={updateField}
        name={form.price.name}
        value={form.price.value}
        error={form.price.error}
        type={form.price.type}
        label="Price"
        id="price"
        width="90%"
        errorField="Price"
        isDark={false}
        borderColor={`${user.theme === 'dark' ? 'text.secondary' : 'border.primary'}`}
      />
      <Box width="90%" margin="0 auto">
        <Text>Days</Text>
        <Flex mt="0.5rem" width="90%" flexWrap="wrap">
          {days.map(({ id, name }) => {
            return (
              <Box
                onClick={() => addDay(id, name)}
                cursor="pointer"
                p="0.5rem"
                borderRadius="20px"
                bg="primary.dark"
                _hover={{ opacity: 0.8 }}
                m="1rem"
                key={id}
              >
                <Text fontSize="0.85rem" color="light.primary">
                  {name}
                </Text>
              </Box>
            );
          })}
        </Flex>
        <Flex flexDir="column" my="1rem" width="90%">
          {form.days.value.map(({ id, name }) => {
            return (
              <Flex alignItems="center" my="0.5rem" key={id}>
                <Box mr="0.5rem" color="primary.dark">
                  <AiOutlineCheck />
                </Box>
                <Box>
                  <Text fontSize="0.8rem">{name}</Text>
                </Box>
                <Box
                  onClick={() => removeDay(id, name)}
                  mx="0.5rem"
                  cursor="pointer"
                  color="primary.dark"
                >
                  <AiOutlineClose />
                </Box>
              </Flex>
            );
          })}
        </Flex>
        <Flex justifyContent="space-around">
          <Box>
            <Text>Open</Text>
            {/*@ts-ignore*/}
            <TimePicker onChange={handleOpenTime} value={openTime} />
          </Box>
          <Box>
            <Text>Close</Text>
            {/*@ts-ignore*/}
            <TimePicker onChange={handleCloseTime} value={closeTime} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Availability;
