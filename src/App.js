import './App.css';
import * as React from 'react';
import '@fontsource/roboto/700.css';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Header from './Header'
import PatientList from "./PatientList";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const lightTheme = createTheme({ palette: { mode: 'light' } });

function App() {
    // Declare a new state variable, which we'll call "count"
    const patients = [
        {
            "ID": "653f82718800782bdb4b6959",
            "Name": "小剛",
            "OrderList": [
                "653fd8d2534827276d8de0b5",
                "653fd905534827276d8de0b6"
            ],
            "Orders": [
                {
                    "ID": "653fd8d2534827276d8de0b5",
                    "Message": "超過120請施打8u"
                },
                {
                    "ID": "653fd905534827276d8de0b6",
                    "Message": "低於80請施打7d"
                }
            ]
        },
        {
            "ID": "653f82718800782bdb4b6958",
            "Name": "小傑",
            "OrderList": [
                "653fd8d2534827276d8de0b5",
                "653fd905534827276d8de0b6"
            ],
            "Orders": [
                {
                    "ID": "653fd8d2534827276d8de0b5",
                    "Message": "遇到皮特變大傑"
                },
                {
                    "ID": "653fd905534827276d8de0b6",
                    "Message": "遇到猗牙很開心"
                }
            ]
        }
    ];
    return (
        <div className="App">
            <Header></Header>
            <Container sx={{paddingTop: 3}}>
                <ThemeProvider theme={lightTheme}>
                    <Box
                        sx={{
                            borderRadius: 2,
                            bgcolor: 'background.default',
                            display: 'grid',
                        }}
                    >
                        <Item elevation="4">
                            {PatientList(patients)}
                        </Item>
                    </Box>
                </ThemeProvider>
            </Container>
        </div>
    );
}

export default App;
