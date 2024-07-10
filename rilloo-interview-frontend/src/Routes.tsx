import useAuth from './hooks/useAuth';
import Home from './views/Home'
import Login from './views/Login';
import User from './views/User'

function Routes({ currentView }: { currentView: string }) {
    const { user } = useAuth();
    const isLoggedIn = !!user;
    
    return (
        <>
            {isLoggedIn ? 
                currentView === 'home' ? <Home /> :
                currentView === 'user' ? <User /> : 
                <div>404</div> :
                <Login />
            }
        </>
    );
}

export default Routes;