import { createContext, useState } from 'react';

export interface RouterContextType {
    currentView: string;
    setCurrentView: (view: string) => void;
}

const routerContext = createContext<RouterContextType>({} as RouterContextType);

const RouterContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentView, setCurrentView] = useState('home');

    return (
        <routerContext.Provider value={{ currentView, setCurrentView }}>
            {children}
        </routerContext.Provider>
    );
}

export { RouterContextProvider };
export default routerContext;