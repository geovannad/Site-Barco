
import { Avatar, Divider, Drawer, List, useTheme } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';

import { Box, useMediaQuery } from "@mui/system"
import Barco from "../../../assets/download.png"
import { useDrawerContext } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
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
        toggleDrawerOpen(); 
        navigate(path);
    };
    

    return (
        <>
            <Drawer  variant={smDown ? 'temporary' : 'permanent'} open={isDrawerOpen} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(30)} height="100%" display="flex" flexDirection="column" >
                    <Box width="100%" height={theme.spacing(24)} display="flex" alignItems="center" justifyContent="center" flexDirection="column" paddingTop="20px">
                        <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12)}} src={Barco}  />
                        <h2>Bergamin Boat</h2>
                    </Box>
                    <Divider />
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <nav aria-label="main mailbox folders">
                            <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => changePage({ path: "/catalogo" })}>
                                    <ListItemIcon>
                                        <FolderCopyIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Catálogo de barcos" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => changePage({ path: "/barco/cadastro/ " })}>
                                    <ListItemIcon>
                                        <Add />
                                    </ListItemIcon>
                                    <ListItemText primary="Cadastrar barco" />
                                </ListItemButton>
                            </ListItem>
                            </List>
                        </nav>
                    
                    </Box>
                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(30)}>
                {children}
            </Box>
        </>
    );
};
