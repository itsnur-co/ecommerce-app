import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { SIGNIN } from '../mutation/signin';
import { SIGNUP } from '../mutation/signup';

export function useAuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

  const [signin, { loading: loginLoading }] = useMutation(SIGNIN, {
    onCompleted: (data) => {
      setSuccess('Login successful!');
      setError('');
      setUser(data.login.user);
    },
    onError: (err) => {
      setError(err.message);
      setSuccess('');
    },
  });

  const [signup, { loading: signupLoading }] = useMutation(SIGNUP, {
    onCompleted: () => {
      setSuccess('Signup successful! Please log in.');
      setError('');
      setIsLogin(true);
    },
    onError: (err) => {
      setError(err.message);
      setSuccess('');
    },
  });

  const handleInput = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleLogin = () => {
    setError('');
    setSuccess('');
    if (!form.username || !form.password) {
      setError('Username and password are required.');
      return;
    }
    signin({ variables: { username: form.username, password: form.password } });
  };

  const handleSignup = () => {
    setError('');
    setSuccess('');
    if (!form.name || !form.username || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    signup({ variables: { name: form.name, username: form.username, email: form.email, password: form.password } });
  };

  const handleLogout = () => {
    setUser(null);
    setForm({ name: '', username: '', email: '', password: '' });
    setIsLogin(true);
    setError('');
    setSuccess('');
  };

  return {
    isLogin,
    setIsLogin,
    form,
    setForm,
    error,
    setError,
    success,
    setSuccess,
    user,
    setUser,
    loginLoading,
    signupLoading,
    handleInput,
    handleLogin,
    handleSignup,
    handleLogout,
  };
} 