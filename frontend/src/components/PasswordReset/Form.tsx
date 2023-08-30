import { Box, Flex, Button, Text } from '@chakra-ui/react';
import Logo from '../Shared/Logo';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { resetPasswordFormState } from '../../state/initialState';
import { IResetPasswordForm } from '../../interfaces';
import FormField from '../Shared/FormField';
import { Client } from '../../util/client';
const Form = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') as string;
  const id = searchParams.get('uid') as string;
  const [form, setForm] = useState<IResetPasswordForm>(resetPasswordFormState);
  const [error, setError] = useState('');

  const updateField = (name: string, value: string, attribute: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof IResetPasswordForm], [attribute]: value },
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

  const resetPassword = () => {
    if (!id && !token) return;
    Client.resetPasswordFromEmail(
      parseInt(id),
      token,
      form.password.value,
      form.confirmPassword.value
    )
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    clearErrors();
    if (checkForErrors()) {
      return;
    }

    resetPassword();
  };

  return (
    <Box
      borderRadius={4}
      className="box-shadow"
      mx="auto"
      mt="5rem"
      width={['95%', '95%', '600px']}
      minH="400px"
      bg="cover.primary"
    >
      <form onSubmit={handleOnSubmit}>
        <Flex as="header" justify="center" pt="1rem">
          <Logo />
        </Flex>
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
        {error.length > 0 && (
          <Flex justify="center" my="0.25rem">
            <Text fontSize="0.85rem" color="red.400">
              {error}
            </Text>
          </Flex>
        )}
        <Flex justify="center">
          <Button type="submit" width="90%" colorScheme="purple">
            Reset Password
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default Form;
