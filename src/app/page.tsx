'use client';

import { useEffect } from 'react';
import { loginAndStoreToken } from '@/lib/services/authService';

export default function Home() {
  const handleLogin = async () => {
    const success = await loginAndStoreToken('farmer1@example.com', 'password123');
    if (success) {
      return(
        <div>Success</div>
      )
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return <div>Logging in...</div>;
}
