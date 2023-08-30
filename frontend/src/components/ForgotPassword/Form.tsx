import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { forgotPasswordFormState } from '../../state/initialState';
import { IForgotPasswordForm } from '../../interfaces';
import FormField from '../Shared/FormField';
import Logo from '../Shared/Logo';
import { Client } from '../../util/client';
import BasicSpinner from '../Shared/BasicSpinner';

const Form = () => {
  const [form, setForm] = useState<IForgotPasswordForm>(forgotPasswordFormState);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const updateField = (name: string, value: string, attribute: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof IForgotPasswordForm], [attribute]: value },
    }));
  };

  const clearErrors = () => {
    for (const key of Object.keys(form)) {
      updateField(key, '', 'error');
    }
  };

  const checkForErrors = () => {
    for (const key of Object.keys(form)) {
      const { error, value } = form[key as keyof IForgotPasswordForm];
      if (error.length > 0 || value.trim().length === 0) {
        return true;
      }
    }
    return false;
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessageSent(false);
    clearErrors();
    if (checkForErrors()) {
      return;
    }
    sendForgotPasswordEmail();
  };

  const sendForgotPasswordEmail = () => {
    setIsLoading(true);
    Client.sendForgotPasswordEmail(form.email.value)
      .then(() => {
        setIsLoading(false);
        setMessageSent(true);
        updateField('email', '', 'value');
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
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
        <Flex flexDir="column" pt="3rem" as="header" justify="center">
          <Logo />
          {messageSent ? (
            <Text
              textAlign="center"
              fontSize="0.85rem"
              color="light.primary"
              mt="2rem"
              mx="auto"
              width="70%"
            >
              Email sent succesfully... Check your inbox or spam folder.
            </Text>
          ) : (
            <Text
              textAlign="center"
              fontSize="0.85rem"
              color="light.primary"
              mt="2rem"
              mx="auto"
              width="70%"
            >
              Enter the email address associated with your account and we'll send you a
              link to reset your password.
            </Text>
          )}
        </Flex>
        {error.length > 0 && (
          <Flex justify="center" mt="1.5rem">
            <Text fontSize="0.85rem" color="red.400">
              {error}
            </Text>
          </Flex>
        )}
        <FormField
          updateField={updateField}
          name={form.email.name}
          value={form.email.value}
          error={form.email.error}
          type={form.email.type}
          label="Email"
          id="email"
          width="70%"
          errorField="Email"
          borderColor="light.primary"
        />
        {!isLoading && (
          <Flex justify="center">
            <Button type="submit" width="70%" colorScheme="purple">
              Continue
            </Button>
          </Flex>
        )}
        {isLoading && (
          <Flex justify="center" my="2rem">
            <BasicSpinner color="#fff" message="Sending email..." />
          </Flex>
        )}
        <Flex pb="1rem" justify="center" mt="2rem">
          <Flex align="center">
            <Text fontSize="0.85rem" mr="0.5rem" color="light.primary">
              Don't have an account?{' '}
            </Text>
            <Box color="primary.dark" fontWeight="bold">
              <RouterLink to="/register">Sign up</RouterLink>
            </Box>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};
export default Form;
