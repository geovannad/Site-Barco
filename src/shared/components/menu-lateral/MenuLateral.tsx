
import { Avatar, Divider, Drawer, List, useTheme } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';

import { Box, useMediaQuery } from "@mui/system"
import Barco from "../../../assets/download.png"
import { useDrawerContext } from "../../contexts";
import { useNavigate } from "react-router-dom";
// import Box from "@mui/material";

interface MenuLateralProps {
    children: React.ReactNode;
}


export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {
    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate();



    const {isDrawerOpen, toggleDrawerOpen} = useDrawerContext();

    const changePage = ({ path }: { path: string }) => {
        toggleDrawerOpen(); // Chama a função
        navigate(path);
    };
    

    return (
        <>
            <Drawer  variant={smDown ? 'temporary' : 'permanent'} open={isDrawerOpen} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column" >
                    <Box width="100%" height={theme.spacing(22)} display="flex" alignItems="center" justifyContent="center" flexDirection="column" paddingTop="20px">
                        <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12)}} src={Barco}  />
                        <h2>Boat</h2>
                    </Box>
                    <Divider />
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <nav aria-label="main mailbox folders">
                            <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => changePage({ path: "/hoje" })}>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Página Inicial" />
                                </ListItemButton>
                            </ListItem>
                            </List>
                        </nav>
                    
                    </Box>
                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
};
