import { Group} from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, Container, MenuItem, LinearProgress, MenuList } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { Observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";
import { useAccount } from "../../lib/hooks/useAccount";
import UserMenu from "./UserMenu";

export default function NavBar() {
    const {uiStore} = useStore();
    const {currentUser} = useAccount();

    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" 
                sx={{backgroundImage : 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)',
                    position: 'relative'
                }}>
            <Container maxWidth="xl">
                <Toolbar sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Box>
                        <MenuList id="basic-menu-activities-home">
                            <MenuItem component={NavLink} to='/' sx={{ display: 'flex', gap: 2 }}>
                                <Group fontSize="large" />
                                <Typography sx={{variant: 'h4', fontWeight: 'bold', fontSize: 'large'}}>Reactivities</Typography>
                            </MenuItem>
                        </MenuList>
                    </Box>
                    <Box sx={{ display: 'flex' }}> 
                        <MenuList id="basic-menu-activities"  
                                        sx = {{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                p: 3,
                                                gap: 3,
                                                maxWidth: 'md',
                                                mx: 'auto',
                                                borderRadius: 3
                                            }}>
                            <MenuItemLink to='/activities' >
                                Activities
                            </MenuItemLink>
                            <MenuItemLink to='/counter'>
                                Counter
                            </MenuItemLink>
                            <MenuItemLink to='/errors'>
                                Errors
                            </MenuItemLink>
                        </MenuList>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        {    
                            currentUser ? (<UserMenu />) 
                                        : (
                                            <MenuList id="basic-menu-activities-login"  
                                                    sx={{ 
                                                        display: 'flex', 
                                                        flexDirection: 'row', 
                                                        padding: 0 
                                                    }}>
                                                <MenuItemLink to = '/login'>Login</MenuItemLink>
                                                <MenuItemLink to = '/register'>Register</MenuItemLink>
                                            </MenuList>
                                        )
                        }
                    </Box>
                </Toolbar>
            </Container>
            <Observer>
                {() => uiStore.isLoading ? (
                        <LinearProgress 
                            color="secondary"
                            sx= {{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 4
                            }}
                        />
                    )
                    : null
                }
            </Observer>
        </AppBar>
    </Box>
    )
}