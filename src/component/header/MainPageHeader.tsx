import React from 'react';
import {
    AppBar,
    Avatar,
    Badge,
    Button,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import claycatImg from '../../assets/image/claycat.jpg';

const StyledAppBar = styled(AppBar)({
    backgroundColor: 'white',
    boxShadow: '0 1px 0 0 rgba(0, 0, 0, 0.1)',
    color: 'black',
});

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
    height: '64px',
});

const LogoSection = styled('div')({
    display: 'flex',
    alignItems: 'center',
    '& img': {
        width: '32px',
        height: '32px',
        marginRight: '8px',
    },
    '& span': {
        fontWeight: 'bold',
    },
});

const SearchSection = styled('div')({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    padding: '4px 8px',
    width: '400px',
});

const StyledInputBase = styled(InputBase)({
    marginLeft: '8px',
    flex: 1,
});

const ActionSection = styled('div')({
    display: 'flex',
    alignItems: 'center',
    '& > *': {
        marginLeft: '16px',
    },
});
const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: 'normal',
    backgroundColor: '#e8f3ff', // Light blue background
    color: '#1976d2', // Blue text color
    borderRadius: '20px', // Rounded corners
    padding: '6px 16px',
    '&:hover': {
        backgroundColor: '#d0e8ff', // Slightly darker on hover
    },
    '& .MuiSvgIcon-root': {
        fontSize: '20px', // Adjust icon size
    },
}));

const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                <LogoSection>
                    <img src={claycatImg} alt="Interview Sherpa Logo" />
                    <span>Interview Sherpa</span>
                </LogoSection>

                <SearchSection>
                    <StyledInputBase placeholder="Search" />
                    <SearchIcon sx={{ color: 'action.active' }} />
                </SearchSection>

                <ActionSection>
                    <Badge badgeContent={1} color="error">
                        <NotificationsIcon color="action" />
                    </Badge>
                    <StyledButton variant="contained" startIcon={<AddIcon />}>
                        Create
                    </StyledButton>
                    <Avatar src="/path-to-user-avatar.png" sx={{ width: 32, height: 32 }} />
                    <IconButton onClick={handleMenuOpen} size="small">
                        <KeyboardArrowDownIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
                    </Menu>
                </ActionSection>
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default Header;
