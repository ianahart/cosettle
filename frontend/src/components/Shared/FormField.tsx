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
  isDark?: boolean;
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
  isDark = true,
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
    const error = `${errorField} must be present`;
    if (value.trim().length === 0 || value.length > 250) {
      updateField(name, error, 'error');
    }
  };

  return (
    <FormControl
      color={isDark ? 'light.primary' : 'text.primary'}
      my="1.5rem"
      textAlign="center"
    >
      <FormLabel display="inline-block" width={width} htmlFor={id}>
        {label}
      </FormLabel>
      <Box position="relative">
        <Input
          width={width}
          border="1px solid"
          borderColor={isDark ? 'light.primary' : 'text.secondary'}
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
      </Box>
      {error.length > 0 && (
        <Text color="red.400" mt="0.25rem" fontSize="0.8rem">
          {error}
        </Text>
      )}
    </FormControl>
  );
};

export default FormField;
