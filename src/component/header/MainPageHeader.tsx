import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateIcon from '@mui/icons-material/Create';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Avatar,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material';
import React from 'react';
import claycat from '../../assets/image/claycat.jpg';
import {
    ActionSection,
    IconWrapper,
    LogoSection,
    SearchSection,
    StyledAppBar,
    StyledInputBase,
    StyledToolbar,
} from './MainPageHeaderStyle';

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                <LogoSection>
                    <img src={claycat} alt="Interview Sherpa" style={{ width: 32, height: 32 }} />
                    <span
                        style={{
                            marginLeft: '8px',
                            fontWeight: 'bold',
                            color: 'black',
                            fontSize: '1vw',
                        }}
                    >
                        Interview Sherpa
                    </span>
                </LogoSection>

                <SearchSection>
                    <StyledInputBase placeholder="Search" />
                    <IconButton size="small" style={{ marginRight: '8px' }}>
                        <SearchIcon />
                    </IconButton>
                </SearchSection>

                <ActionSection>
                    <Tooltip title="Notifications">
                        <IconWrapper>
                            <NotificationsNoneIcon />
                        </IconWrapper>
                    </Tooltip>
                    <Tooltip title="Create">
                        <IconWrapper>
                            <CreateIcon />
                        </IconWrapper>
                    </Tooltip>
                    <Avatar
                        src="/path-to-user-avatar.png"
                        sx={{ width: 32, height: 32, marginLeft: '16px' }}
                        onClick={handleProfileMenuOpen}
                    />
                    <IconWrapper onClick={handleProfileMenuOpen}>
                        <ExpandMoreIcon />
                    </IconWrapper>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleMenuClose}>
                            <ListItemIcon>
                                <SettingsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Settings</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <ListItemIcon>
                                <AccountCircleIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Profile</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Sign out</ListItemText>
                        </MenuItem>
                    </Menu>
                </ActionSection>
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default Header;
