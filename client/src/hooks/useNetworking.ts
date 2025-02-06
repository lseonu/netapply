import { useState } from 'react';

interface Contact {
  id: string;
  name: string;
  title: string;
  mutualConnections: number;
}

export function useNetworking() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findContacts = async (companyName: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/networking/contacts?company=${companyName}`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { contacts, loading, error, findContacts };
} 