import { AppBar, Typography } from '@mui/material';

function Footer() {
    return ( 
        <AppBar color="secondary" sx={{ bottom: 0, top: "calc(100% - 50px)" }} position="fixed" component="footer">
        <Typography>Rilloo 2024</Typography>
        </AppBar>
     );
}

export default Footer;