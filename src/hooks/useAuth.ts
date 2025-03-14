import { useState } from 'react';

interface MockUser {
  displayName: string;
  photoURL: string;
  email: string;
}

const MOCK_USER: MockUser = {
  displayName: "Test User",
  photoURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80",
  email: "test@example.com"
};

export function useAuth() {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading] = useState(false);

  const signIn = async () => {
    setUser(MOCK_USER);
  };

  const signOut = async () => {
    setUser(null);
  };

  return {
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user
  };
}