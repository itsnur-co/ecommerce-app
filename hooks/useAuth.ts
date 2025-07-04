import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { REFRESH_TOKEN } from '../mutation/refreshtoken';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [refreshTokenMutation] = useMutation(REFRESH_TOKEN);

  // Auto-login on app start
  useEffect(() => {
    const tryAutoLogin = async () => {
      setLoading(true);
      setError(null);
      const storedRefreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
      if (storedRefreshToken) {
        try {
          const { data } = await refreshTokenMutation({ variables: { refreshToken: storedRefreshToken } });
          const newAccessToken = data?.refreshJwtAuthToken?.authToken;
          if (newAccessToken) {
            setAccessToken(newAccessToken);
            await AsyncStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
            // Optionally fetch user profile here and setUser
            setUser({}); // Placeholder, replace with real user fetch
          } else {
            handleLogout();
          }
        } catch (err: any) {
          setError('Session expired. Please log in again.');
          handleLogout();
        }
      }
      setLoading(false);
    };
    tryAutoLogin();
  }, []);

  // Manual logout
  const handleLogout = useCallback(async () => {
    setUser(null);
    setAccessToken(null);
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY]);
    // Optionally navigate to login screen here
  }, []);

  // Manual login (to be called after successful login mutation)
  const handleLogin = useCallback(async (userData: any, tokens: { accessToken: string; refreshToken: string }) => {
    setUser(userData);
    setAccessToken(tokens.accessToken);
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
  }, []);

  return {
    user,
    accessToken,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    isLoggedIn: !!user,
  };
} 