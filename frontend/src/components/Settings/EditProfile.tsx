import { Box, Button, Flex, FormLabel, Text, Textarea, useToast } from '@chakra-ui/react';
import Header from './Header';
import { useContext, useEffect, useRef, useState } from 'react';
import { profileForm } from '../../state/initialState';
import { IProfileForm, IUserContext } from '../../interfaces';
import { UserContext } from '../../context/user';
import { Client } from '../../util/client';
import FormField from '../Shared/FormField';
import ImageUpload from './ImageUpload';

interface ISyncForm {
  [key: string]: string;
  firstName: string;
  lastName: string;
  bio: string;
  email: string;
  avatarUrl: string;
}

const EditProfile = () => {
  const toast = useToast();
  const { user, updateUser, logout, tokens } = useContext(UserContext) as IUserContext;
  const [form, setForm] = useState<IProfileForm>(profileForm);
  const shouldRun = useRef(true);

  const updateField = (name: string, value: string, attribute: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof IProfileForm], [attribute]: value },
    }));
  };

  const syncProfile = (data: ISyncForm) => {
    for (let prop in data) {
      if (prop === 'avatarUrl') {
        continue;
      }
      updateField(prop, data[prop] === null ? '' : data[prop], 'value');
    }
  };

  const getProfile = () => {
    Client.getProfile(user.profileId)
      .then((res) => {
        syncProfile(res.data.data);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.profileId !== 0) {
      shouldRun.current = false;
      getProfile();
    }
  }, [shouldRun.current, user.profileId, getProfile]);

  const handleOnTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    updateField(name, value, 'value');
  };

  const clearErrors = () => {
    for (const key of Object.keys(form)) {
      updateField(key, '', 'error');
    }
  };

  const applyErrors = (data: any) => {
    for (let prop in data) {
      if (prop === 'message') {
        updateField('email', data[prop], 'error');
      }
      updateField(prop, data[prop], 'error');
    }
  };

  const updateProfile = () => {
    const fields = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      bio: form.bio.value,
    };

    Client.updateProfile(fields, user.id, user.profileId)
      .then((res) => {
        updateUser({ ...res.data.data });
        toast({
          title: 'Profile saved.',
          description: 'Your profile was successfully updated.',
          status: 'success',
          duration: 7000,
          isClosable: true,
        });
        if (user.email !== fields.email) {
          handleLogout();
        }
      })
      .catch((err) => {
        console.log(err);
        applyErrors(err.response.data);
        throw new Error(err.response.data.message);
      });
  };

  const handleLogout = () => {
    Client.logout(tokens.refreshToken).then(() => logout());
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();
    updateProfile();
  };

  return (
    <Box color="text.primary">
      <Box as="header">
        <Header
          heading="Edit Profile"
          subText="Control what information you want to share with the community"
        />
      </Box>
      <Box>
        <form onSubmit={handleOnSubmit}>
          <Flex>
            <ImageUpload />
          </Flex>
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
              isDark={false}
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
              isDark={false}
            />
          </Flex>
          <Flex width="90%" margin="0 auto">
            <Text fontSize="0.85rem">
              *Changing email will result in you being logged out.
            </Text>
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
            isDark={false}
          />
          <Flex flexDir="column">
            <FormLabel m="0 auto" htmlFor="bio" width="90%" color="text.primary">
              Bio
            </FormLabel>
            <Textarea
              onChange={handleOnTextareaChange}
              value={form.bio.value}
              name={form.bio.name}
              id="bio"
              width="90%"
              m="1rem auto 2rem auto"
              borderColor="text.secondary"
            />
          </Flex>
          <Flex justify="center">
            <Button type="submit" colorScheme="purple" width="90%">
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default EditProfile;
