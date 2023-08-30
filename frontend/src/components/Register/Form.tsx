import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerFormState } from '../../state/initialState';
import { IRegisterForm } from '../../interfaces';
import FormField from '../Shared/FormField';
import { Client } from '../../util/client';
import BasicSpinner from '../Shared/BasicSpinner';

const Form = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<IRegisterForm>(registerFormState);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (name: string, value: string, attribute: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof IRegisterForm], [attribute]: value },
    }));
  };

  const checkForErrors = () => {
    let errors = false;
    for (const [_, val] of Object.entries(form)) {
      const { value, error } = val;
      if (value.trim().length === 0 || error.length > 0) {
        errors = true;
      }
    }
    return errors;
  };

  const clearErrors = () => {
    for (const [key, _] of Object.entries(form)) {
      updateField(key, '', 'error');
    }
  };

  const register = () => {
    setIsLoading(true);
    Client.register(form, 'USER')
      .then(() => {
        setIsLoading(false);
        navigate('/login');
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();
    setError('');
    checkForErrors();
    if (checkForErrors()) {
      return;
    }
    register();
  };

  return (
    <Box
      backdropFilter="10px"
      borderRadius={8}
      bg="cover.primary"
      minH="600px"
      zIndex={3}
      p="0.5rem"
      width={['95%', '95%', '600px']}
    >
      {isLoading ? (
        <Flex flexDir="column" minH="50vh" alignItems="center" justifyContent="center">
          <BasicSpinner color="light.primary" message="Creating Account..." />
        </Flex>
      ) : (
        <form onSubmit={handleOnSubmit}>
          <Heading mt="2rem" textAlign="center" color="light.primary">
            Sign up
          </Heading>
          <Text color="light.primary" my="0.5rem" textAlign="center">
            Find a coworking space with ease
          </Text>
          {error.length > 0 && (
            <Text textAlign="center" my="0.5rem" fontSize="0.8rem" color="red.400">
              {error}
            </Text>
          )}
          <Flex justifyContent="center">
            <FormField
              updateField={updateField}
              name={form.firstName.name}
              value={form.firstName.value}
              error={form.firstName.error}
              type={form.firstName.type}
              label="First Name"
              id="firstName"
              width="90%"
              errorField="First name"
              borderColor="light.primary"
            />
            <FormField
              updateField={updateField}
              name={form.lastName.name}
              value={form.lastName.value}
              error={form.lastName.error}
              type={form.lastName.type}
              label="Last Name"
              id="lastName"
              width="90%"
              errorField="Last name"
              borderColor="light.primary"
            />
          </Flex>
          <FormField
            updateField={updateField}
            name={form.email.name}
            value={form.email.value}
            error={form.email.error}
            type={form.email.type}
            label="Email"
            id="email"
            width="90%"
            errorField="Email"
            borderColor="light.primary"
          />
          <FormField
            updateField={updateField}
            name={form.password.name}
            value={form.password.value}
            error={form.password.error}
            type={form.password.type}
            label="Password"
            id="password"
            width="90%"
            errorField="Password"
            borderColor="light.primary"
          />
          <FormField
            updateField={updateField}
            name={form.confirmPassword.name}
            value={form.confirmPassword.value}
            error={form.confirmPassword.error}
            type={form.confirmPassword.type}
            label="Confirm Password"
            id="confirmPassword"
            width="90%"
            errorField="Confirm password"
            borderColor="light.primary"
          />
          <Flex justifyContent="center" my="1rem">
            <Button type="submit" width="90%" colorScheme="purple">
              Sign up
            </Button>
          </Flex>
        </form>
      )}
    </Box>
  );
};

export default Form;
