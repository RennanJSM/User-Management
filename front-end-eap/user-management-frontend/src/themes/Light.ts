import { createTheme } from "@mui/material";
import { cyan, red } from "@mui/material/colors";


export const LightTheme = createTheme({
    palette: {
        primary: {
            main: cyan[600],
            dark: cyan[800],
            light: cyan[400],
            contrastText: 'white',
            
        },
        secondary: {
            main: red[600],
            dark: red[800],
            light: red[400],
            contrastText: 'white',
        },
        background: {
            default: '#f7f6f3',
            paper: 'white'
        }
    }
});