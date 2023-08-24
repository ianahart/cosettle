import { Box } from '@chakra-ui/react';
import Header from './Header';
import { IContactForm } from '../../interfaces';
import FormField from '../Shared/FormField';

interface IContactProps {
  form: IContactForm;
  step: string;
  handleUpdateField: (
    name: string,
    value: string | boolean,
    attribute: string,
    step: string
  ) => void;
}

const Contact = ({ form, step, handleUpdateField }: IContactProps) => {
  const updateField = (name: string, value: string, attribute: string) => {
    handleUpdateField(name, value, attribute, step);
  };

  return (
    <Box>
      <Header heading="Contact" />
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
      <FormField
        updateField={updateField}
        name={form.phoneNumber.name}
        value={form.phoneNumber.value}
        error={form.phoneNumber.error}
        type={form.phoneNumber.type}
        label="Phone Number"
        id="phoneNumber"
        width="90%"
        errorField="Phone number"
        isDark={false}
      />
    </Box>
  );
};
export default Contact;
