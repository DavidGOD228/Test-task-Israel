import { useContext } from 'react';
import routerContext from '../context/Router';

const useRouter = () => {
  const context = useContext(routerContext);
  if (!context) {
      throw new Error('useRouter must be used within a RouterContextProvider');
  }
  return context;
}

export default useRouter;