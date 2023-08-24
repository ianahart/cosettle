import { Box, Checkbox, CheckboxGroup, Flex, Stack } from '@chakra-ui/react';
import Header from './Header';
import { IAmenitiesForm } from '../../interfaces';

interface IAmenitiesProps {
  form: IAmenitiesForm;
  step: string;
  handleUpdateField: (
    name: string,
    value: string | boolean,
    attribute: string,
    step: string
  ) => void;
}

const Amenities = ({ form, step, handleUpdateField }: IAmenitiesProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    handleUpdateField(name, checked, 'value', step);
  };

  return (
    <Box>
      <Header heading="Amenities" />
      <Flex justify="center" width="90%">
        <CheckboxGroup colorScheme="purple">
          <Stack alignItems="flex-start">
            <Checkbox
              name="bathrooms"
              onChange={handleOnChange}
              isChecked={form.bathrooms.value}
            >
              Bathrooms
            </Checkbox>
            <Checkbox name="food" onChange={handleOnChange} isChecked={form.food.value}>
              Food and Snacks
            </Checkbox>
            <Checkbox
              name="utilities"
              onChange={handleOnChange}
              isChecked={form.utilities.value}
            >
              Utilities Included
            </Checkbox>
          </Stack>
        </CheckboxGroup>
      </Flex>
    </Box>
  );
};

export default Amenities;
