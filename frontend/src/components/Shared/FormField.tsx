import { FormControl, FormLabel, Input, Box, Text } from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface IFormFieldProps {
  updateField: (name: string, value: string, attribute: string) => void;
  name: string;
  value: string;
  id: string;
  error: string;
  type: string;
  width: string;
  label: string;
  errorField: string;
}

const FormField = ({
  updateField,
  name,
  value,
  id,
  error,
  type,
  width,
  label,
  errorField,
}: IFormFieldProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name, value, 'value');
  };

  const togglePasswordVisibility = () => {
    const password = type === 'password' ? 'text' : 'password';
    updateField('password', password, 'type');
    updateField('confirmPassword', password, 'type');
  };

  const handleOnFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    updateField(name, '', 'error');
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = `${errorField} must be between 1 and 250 characters.`;
    if (value.trim().length === 0 || value.length > 250) {
      updateField(name, error, 'error');
    }
  };

  return (
    <FormControl
      color="light.primary"
      position="relative"
      my="1.5rem"
      display="flex"
      flexDir="column"
      textAlign="center"
      alignItems="center"
    >
      <FormLabel display="inline-block" width={width} htmlFor={id}>
        {label}
      </FormLabel>
      <Input
        width={width}
        border="1px solid"
        borderColor="light.primary"
        fontSize="0.9rem"
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        type={type}
        name={name}
        value={value}
        onChange={handleOnChange}
        id={id}
      />
      {name === 'password' && (
        <Box
          onClick={togglePasswordVisibility}
          fontSize="1.2rem"
          color="light.primary"
          zIndex={5}
          cursor="pointer"
          position="absolute"
          bottom="10px"
          right="50px"
        >
          {type === 'password' ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </Box>
      )}
      {error.length > 0 && <Text fontSize="0.85rem">{error}</Text>}
    </FormControl>
  );
};

export default FormField;
