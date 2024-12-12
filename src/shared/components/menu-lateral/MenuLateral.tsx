
import { Drawer, useTheme } from "@mui/material";
import { Box } from "@mui/system"
// import Box from "@mui/material";

interface MenuLateralProps {
    children: React.ReactNode;
}

export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {
    const theme = useTheme()
    return (
        <>
            <Drawer  variant="permanent">
                Teste
            </Drawer>
            <Box height="100vh" marginLeft={theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
};
