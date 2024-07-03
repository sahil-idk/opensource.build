// context/UserContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { currentUser } from '@clerk/nextjs/server';

const UserContext = createContext(null);

export const UserProvider = ({ children }: {
    children: React.ReactNode;
    
}) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await currentUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
