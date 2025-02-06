import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an authentication check
    setTimeout(() => {
      setUser({ id: '1', email: 'johndoe@example.com', name: 'John Doe' }); // Mock user data
      setLoading(false);
    }, 1000);
  }, []);

  return { user, loading };
} 