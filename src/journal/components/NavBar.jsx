import { MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar } from "@mui/material"


export const NavBar = ({ drawerWidth = 240 }) => {
    return (
        <AppBar position='fixed' sx={{
            widht: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` }
        }}>
            <Toolbar>
                <IconButton>
                    <MenuOutlined>

                    </MenuOutlined>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
