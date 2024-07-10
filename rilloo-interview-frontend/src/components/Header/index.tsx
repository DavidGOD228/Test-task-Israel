import { AppBar, Button, Toolbar } from '@mui/material';
import useRouter from '../../hooks/useRouter';

function Header() {
    const { setCurrentView } = useRouter();
    return (              
        <AppBar sx={{ height: "70px" }} component="header">
            <Toolbar>
                <Button color="inherit" onClick={() => setCurrentView("home")}>Home</Button>
                <Button color="inherit" onClick={() => setCurrentView("user")}>User</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;