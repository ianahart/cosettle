import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Header from './Header';
import { useContext, useState } from 'react';
import { changePasswordFormState, passwordMeterState } from '../../state/initialState';
import {
  IChangePasswordForm,
  IPasswordStrengthMeter,
  IUserContext,
} from '../../interfaces';

import FormField from '../Shared/FormField';
import { Client } from '../../util/client';
import { UserContext } from '../../context/user';

const Password = () => {
  const { user, logout, tokens } = useContext(UserContext) as IUserContext;
  const [form, setForm] = useState<IChangePasswordForm>(changePasswordFormState);
  const [passwordStrengthMeter, setPasswordStrengthMeter] =
    useState<IPasswordStrengthMeter[]>(passwordMeterState);
  const [error, setError] = useState('');

  const updateField = (name: string, value: string, attribute: string) => {
    if (name === 'newPassword' && attribute === 'value') {
      reviewPassword(value);
    }

    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof IChangePasswordForm], [attribute]: value },
    }));
  };

  const updateCriteria = (name: string, marked: boolean) => {
    setPasswordStrengthMeter((prevState) =>
      prevState.map((criteria) => {
        if (criteria.name === name) {
          criteria.marked = marked;
        }
        return criteria;
      })
    );
  };

  const getTotalSteps = () => {
    return passwordMeterState.reduce((acc, cur) => {
      const addTo = cur.marked ? 1 : 0;
      return (acc += addTo);
    }, 0);
  };
  const reviewPassword = (password: string) => {
    if (password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
      updateCriteria('specialChar', true);
    } else {
      updateCriteria('specialChar', false);
    }
    if (password.match(/\d+/g)) {
      updateCriteria('digit', true);
    } else {
      updateCriteria('digit', false);
    }
    if (password.match(/[a-z]+/g)) {
      updateCriteria('lowercase', true);
    } else {
      updateCriteria('lowercase', false);
    }
    if (password.match(/[A-Z]+/g)) {
      updateCriteria('uppercase', true);
    } else {
      updateCriteria('uppercase', false);
    }
  };

  const clearErrors = () => {
    for (const key of Object.keys(form)) {
      updateField(key, '', 'error');
    }
  };

  const checkForErrors = () => {
    for (const key of Object.keys(form)) {
      const { error, value } = form[key as keyof IChangePasswordForm];
      if (error.length > 0 || value.trim().length === 0) {
        return true;
      }
    }
    return false;
  };

  const handleLogout = async () => {
    await Client.logout(tokens.refreshToken);
    logout();
  };

  const changePassword = () => {
    Client.changePassword(
      form.password.value,
      form.newPassword.value,
      form.confirmPassword.value,
      user.id
    )
      .then(() => {
        handleLogout();
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();
    setError('');
    if (checkForErrors()) {
      return;
    }

    changePassword();
  };

  return (
    <Box color="text.primary">
      <Box as="header">
        <Header
          heading="Change Password"
          subText="Keeping a strong password is critical for good security"
        />
        <Text fontSize="0.85rem">
          Changing your password will logout you out. You will have to log back in.
        </Text>
        {error.length > 0 && (
          <Flex my="1rem" justify="center">
            <Text fontSize="0.85rem" color="red.400" textAlign="center">
              {error}
            </Text>
          </Flex>
        )}
        <Box my="3rem">
          <form onSubmit={handleOnSubmit}>
            <FormField
              updateField={updateField}
              name={form.password.name}
              value={form.password.value}
              error={form.password.error}
              type={form.password.type}
              label="Current Password"
              id="password"
              width="90%"
              errorField="Password"
              borderColor="text.secondary"
              isDark={false}
            />

            <FormField
              updateField={updateField}
              name={form.newPassword.name}
              value={form.newPassword.value}
              error={form.newPassword.error}
              type={form.newPassword.type}
              label="New Password"
              id="newPassword"
              width="90%"
              errorField="New password"
              borderColor="text.secondary"
              isDark={false}
            />
            <Flex width="80%" justify="center" mx="auto">
              {passwordStrengthMeter.map((strength, index) => {
                return (
                  <Box
                    width="25%"
                    borderRadius={20}
                    height="10px"
                    key={strength.id}
                    bg={getTotalSteps() >= index + 1 ? 'limegreen' : 'lightblue'}
                  ></Box>
                );
              })}
            </Flex>
            <Flex justify="center" my="2rem">
              <Text>
                {getTotalSteps() >= 1 &&
                  passwordStrengthMeter[getTotalSteps() - 1]['word']}
              </Text>
            </Flex>

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
              borderColor="text.secondary"
              isDark={false}
            />
            <Flex justify="center">
              <Button type="submit" width="90%" colorScheme="purple">
                Save
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Password;
