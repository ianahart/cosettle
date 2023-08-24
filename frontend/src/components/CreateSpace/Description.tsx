import { Box, Flex, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import Header from './Header';
import { IDescriptionForm } from '../../interfaces';
import FormField from '../Shared/FormField';

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
  const updateField = (name: string, value: string, attribute: string) => {
    handleUpdateField(name, value, attribute, step);
  };

  const handleOnTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleUpdateField(name, value, 'value', step);
  };
  return (
    <Box>
      <Header heading="Description" />
      <FormField
        updateField={updateField}
        name={form.location.name}
        value={form.location.value}
        error={form.location.error}
        type={form.location.type}
        label="Location"
        id="location"
        width="90%"
        errorField="Location"
        isDark={false}
      />
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
          borderColor="text.secondary"
          id={form.description.name}
        />
      </FormControl>
    </Box>
  );
};

export default Description;
