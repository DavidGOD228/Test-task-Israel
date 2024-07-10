import { Box, Button, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import authContext from '../../context/Auth';

function Login() {
    const auth = useContext(authContext);
    const [username, setUsername] = useState('John Doe');
    const [password, setPassword] = useState('123456');
    const [isError, setIsError] = useState(false);

    const onLogin = async () => {
        if (!(username && password)) {
            return;
        }   

        const data = await auth.login({username, password});
        

        if (data.id) {
            // redirect
            console.log('redirect');
            
        } else {
            console.log('redirect');
            setIsError(true);
        }
    }

    const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, callBack: React.Dispatch<React.SetStateAction<string>>) => {
        callBack(event.target.value);
    };

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center">
            <Typography variant="h3">Login</Typography>
            <Box 
                component="form" 
                display="flex" 
                flexDirection="column"
                mt={3} 
                rowGap={0.5}
            >
                <TextField id="username" label="Username" variant="outlined" value={username} error={isError} onChange={(e) => handleTextInputChange(e, setUsername)} />
                <TextField id="password" label="Password" variant="outlined" value={password} error={isError} onChange={(e) => handleTextInputChange(e, setPassword)} />
                <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={onLogin}>Login</Button>
            </Box> 
        </Box>
        );
}

export default Login;