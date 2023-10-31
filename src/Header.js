import * as React from 'react';
import logo from './logo.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar id="app-bar" position="static">
                <Toolbar>
                    <img src={logo}></img>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        醫囑管理小專案
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
