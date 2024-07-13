import styled from '@emotion/styled';
import { AppBar, IconButton, InputBase, Toolbar } from '@mui/material';

export const StyledAppBar = styled(AppBar)({
    backgroundColor: 'white',
    boxShadow: 'none',
    borderBottom: '1px solid #e0e0e0',
});

export const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 24px',
});

export const LogoSection = styled('div')({
    display: 'flex',
    alignItems: 'center',
    '& img': {
        borderRadius: '20%',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        marginRight: '8px',
    },
    '& span': {
        fontWeight: '500 !important',
        color: '#676767 !important',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '13px',
        fontStyle: 'normal',
        lineHeight: 'normal',
        textAlign: 'center',
    },
});

export const SearchSection = styled('div')({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f1f3f4',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '720px',
});

export const StyledInputBase = styled(InputBase)({
    paddingLeft: '16px',
    flex: 1,
    fontSize: '14px',
});

export const ActionSection = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

export const IconWrapper = styled(IconButton)(({ theme }) => ({
    padding: '8px',
    '&:hover': {
        backgroundColor: 'transparent',
    },
}));
