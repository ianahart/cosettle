import { Box, Flex, FormControl, FormLabel, Textarea, Select } from '@chakra-ui/react';
import Header from './Header';
import { IDescriptionForm, IUserContext } from '../../interfaces';
import FormField from '../Shared/FormField';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { countries } from '../../state/initialState';
import { spaceTypes } from '../../state/initialState';

interface IDescriptionProps {
  form: IDescriptionForm;
  step: string;
  handleUpdateField: (
    name: string,
    value: string | boolean,
    attribute: string,
    step: string
  ) => void;
}

const Description = ({ form, step, handleUpdateField }: IDescriptionProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const updateField = (name: string, value: string, attribute: string) => {
    handleUpdateField(name, value, attribute, step);
  };

  const handleOnSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    handleUpdateField(name, value, 'value', step);
  };

  const handleOnTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleUpdateField(name, value, 'value', step);
  };
  return (
    <Box>
      <Header heading="Description" />
      <Box my="1.5rem" width="90%" mx="auto">
        <FormLabel>Space Type</FormLabel>
        <Select
          defaultValue={'Work Space'}
          onChange={handleOnSelectChange}
          name="type"
          borderColor={`${user.theme === 'dark' ? 'text.secondary' : 'border.primary'}`}
        >
          {spaceTypes.map((spaceType) => {
            return (
              <option key={spaceType.id} value={spaceType.value}>
                {spaceType.name}
              </option>
            );
          })}
        </Select>
      </Box>
      <FormField
        updateField={updateField}
        name={form.street.name}
        value={form.street.value}
        error={form.street.error}
        type={form.street.type}
        label="Street"
        id="street"
        width="90%"
        errorField="Street"
        isDark={false}
        borderColor={`${user.theme === 'dark' ? 'text.secondary' : 'border.primary'}`}
      />
      <FormField
        updateField={updateField}
        name={form.city.name}
        value={form.city.value}
        error={form.city.error}
        type={form.city.type}
        label="City"
        id="city"
        width="90%"
        errorField="City"
        isDark={false}
        borderColor={`${user.theme === 'dark' ? 'text.secondary' : 'border.primary'}`}
      />

      <Box my="1.5rem" width="90%" mx="auto">
        <FormLabel color="text.primary">Country</FormLabel>
        <Select
          defaultValue={'United States'}
          onChange={handleOnSelectChange}
          name="country"
          placeholder="Select country"
          borderColor={`${user.theme === 'dark' ? 'text.secondary' : 'border.primary'}`}
        >
          {countries.map((country) => {
            return (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            );
          })}
        </Select>
      </Box>

      <Flex>
        <FormField
          updateField={updateField}
          name={form.size.name}
          value={form.size.value}
          error={form.size.error}
          type={form.size.type}
          label="Size"
          id="size"
          width="90%"
          errorField="Size"
          isDark={false}
          borderColor={`${user.theme === 'dark' ? 'text.secondary' : 'border.primary'}`}
        />
        <FormField
          updateField={updateField}
          name={form.wifi.name}
          value={form.wifi.value}
          error={form.wifi.error}
          type={form.wifi.type}
          label="Wifi"
          id="wifi"
          width="90%"
          errorField="Location"
          isDark={false}
          borderColor={`${user.theme === 'dark' ? 'text.secondary' : 'border.primary'}`}
        />
      </Flex>
      <Flex>
        <FormField
          updateField={updateField}
          name={form.capacity.name}
          value={form.capacity.value}
          error={form.capacity.error}
          type={form.capacity.type}
          label="Capacity"
          id="capacity"
          width="90%"
          errorField="Capacity"
          isDark={false}
          borderColor={`${user.theme === 'dark' ? 'text.secondary' : 'border.primary'}`}
        />
        <FormField
          updateField={updateField}
          name={form.flooring.name}
          value={form.flooring.value}
          error={form.flooring.error}
          type={form.flooring.type}
          label="Flooring"
          id="flooring"
          width="90%"
          errorField="Flooring"
          isDark={false}
          borderColor={`${user.theme === 'dark' ? 'text.secondary' : 'border.primary'}`}
        />
      </Flex>
      <FormControl width="90%" margin="0 auto">
        <FormLabel htmlFor={form.description.name} color="text.primary">
          Description
        </FormLabel>
        <Textarea
          value={form.description.value}
          name={form.description.name}
          onChange={handleOnTextareaChange}
          borderColor={`${user.theme === 'dark' ? 'text.secondary' : 'border.primary'}`}
          id={form.description.name}
        />
      </FormControl>
    </Box>
  );
};

export default Description;
