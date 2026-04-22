import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router'

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Typography
                        variant="h6"
                        component= {Link}
                        to='/'
                        sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
                    >
                        HomePage
                    </Typography>

                    <Typography
                        variant="h6"
                        component= {Link}
                        to='/cart'
                        sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
                    >
                        Cart
                    </Typography>

                    <Typography
                        variant="h6"
                        component= {Link}
                        to='/category'
                        sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
                    >
                        Category
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
