import {Box, Button, Flex, Text} from '@chakra-ui/react';
import Logo from '../Shared/Logo';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useContext, useState} from 'react';
import {loginFormState} from '../../state/initialState';
import {ILoginForm, IUserContext} from '../../interfaces';
import FormField from '../Shared/FormField';
import {Client} from '../../util/client';
import {UserContext} from '../../context/user';

const Form = () => {
    const navigate = useNavigate();
    const {stowTokens, updateUser, setNonAuthTheme} = useContext(UserContext) as IUserContext;
    const [form, setForm] = useState<ILoginForm>(loginFormState);
    const [error, setError] = useState('');

    const updateField = (name: string, value: string, attribute: string) => {
        setForm((prevState) => ({
            ...prevState,
            [name]: {...prevState[name as keyof ILoginForm], [attribute]: value},
        }));
    };

    const checkForErrors = () => {
        let errors = false;
        for (const [_, val] of Object.entries(form)) {
            const {error, value} = val;
            if (error.length > 0 || value.trim().length === 0) {
                errors = true;
            }
        }
        return errors;
    };

    const clearErrors = () => {
        for (const [key, _] of Object.entries(form)) {
            updateField(key, '', 'error');
        }
        setError('');
    };

    const login = () => {
        Client.login(form.email.value, form.password.value)
            .then((res) => {
                const {refreshToken, token, user} = res.data;
                localStorage.removeItem('theme');
                setNonAuthTheme('');
                stowTokens({refreshToken, token});
                updateUser(user);
                navigate('/');
            })
            .catch((err) => {
                setError(err.response.data.message);
                throw new Error(err.response.data.message);
            });
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearErrors();
        if (checkForErrors()) return;
        login();
    };

    return (
        <Box
            backdropFilter="10px"
            borderRadius={8}
            bg="cover.primary"
            minH="600px"
            zIndex={3}
            p="0.5rem"
            color="light.primary"
            width={['95%', '95%', '400px']}
        >
            <form onSubmit={handleOnSubmit}>
                <Box
                    borderRadius="50%"
                    width="80px"
                    height="80px"
                    margin="3rem auto 1rem auto"
                    bg="light.primary"
                >
                    <Logo />
                </Box>
                <Text textAlign="center" fontSize="0.85rem">
                    Welcome back, please login to your account.
                </Text>
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
                />
                {error.length > 0 && (
                    <Flex justify="center" my="0.5rem" fontSize="0.8rem">
                        <Text color="red.400">{error}</Text>
                    </Flex>
                )}
                {error.length === 0 && (
                    <Flex justifyContent="space-between">
                        <Text fontSize="0.8rem">
                            Not registered?{' '}
                            <RouterLink to="/register">
                                <Box as="span" fontWeight="bold" color="primary.light">
                                    Create an account
                                </Box>
                            </RouterLink>
                        </Text>
                        <Text fontSize="0.8rem" color="primary.light" fontWeight="bold">
                            <RouterLink to="/forgot-password">Forgot Password?</RouterLink>
                        </Text>
                    </Flex>
                )}
                <Flex mt="3rem" justifyContent="center">
                    <Button type="submit" width="90%" colorScheme="purple">
                        Login
                    </Button>
                </Flex>
            </form>
        </Box>
    );
};

export default Form;
