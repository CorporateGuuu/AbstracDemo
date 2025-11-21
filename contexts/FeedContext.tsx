// contexts/FeedContext.tsx
import { createContext, useContext } from 'react';

interface FeedContextType {
  isInFeed: boolean;
}

const FeedContext = createContext<FeedContextType>({ isInFeed: false });

export const FeedProvider = ({ children }: { children: React.ReactNode }) => (
  <FeedContext.Provider value={{ isInFeed: true }}>
    {children}
  </FeedContext.Provider>
);

export const useIsInFeed = () => useContext(FeedContext).isInFeed;
