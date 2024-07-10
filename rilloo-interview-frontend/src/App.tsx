import { Box } from '@mui/material'
import Routes from './Routes'
import Header from './components/Header'
import Footer from './components/Footer'
import useRouter from './hooks/useRouter'

function App() {
    const { currentView } = useRouter();
    return (
        <>
            <Header />
            <Box height="100%" width="100%" mt="70px" mb="50px">
                <Routes currentView={currentView} />
            </Box>
            <Footer />
        </>
    )
}

export default App
