// TopicPageHeaderStyle.ts

import styled from '@emotion/styled';
import { AppBar, Toolbar } from '@mui/material';

export const StyledAppBar = styled(AppBar)({
    backgroundColor: 'white',
    boxShadow: 'none',
    flexDirection: 'row',
    padding: '3px 0px',
    height: '50px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
});

export const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: '9px',
});

export const IconWrapper = styled('div')({
    height: '30px',
    color: '#707070',
    backgroundColor: '#F4F4F4',
    borderRadius: '8px',
    marginLeft: '10px',
    cursor: 'pointer',
    display: 'flex',
    gap: '5px',
    fontSize: '13px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10px',
});

export const HeaderTitleSection = styled('div')({
    backgroundColor: '#F4F4F4',
    width: '250px',
    height: '30px',
    marginLeft: '10px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    gap: '8px',
});

export const HeaderTitleInput = styled('input')({
    width: '100%',
    height: '100%',
    border: 'none',
    background: 'transparent',
    color: '#676767',
    fontSize: '14px',
    outline: 'none',
    padding: '0',
    '&::placeholder': {
        color: '#red',
        opacity: 1,
    },
});
export const SaveIconWrapper = styled(IconWrapper)({});

export const ShareIconWrapper = styled(IconWrapper)({});

export const DeveloperIconWrapper = styled('div')({
    width: '40px',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#707070',
});

export const InquiryIconWrapper = styled(IconWrapper)({
    width: '50px',
    marginRight: '10px',
});

export const SignInIconWrapper = styled(IconWrapper)({
    width: '40px',
    marginRight: '10px',
});

export const LeftSection = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

export const RightSection = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

export const DeveloperIcon = styled('img')({
    width: '30px',
    height: '30px',
    borderRadius: '8px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
});

export const ProfileImage = styled('img')({
    marginLeft: '10px',
    marginRight: '10px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    objectFit: 'cover',
});

export const StatusText = styled('div')(({ isAuthenticated }: { isAuthenticated: boolean }) => ({
    color: isAuthenticated ? 'green' : 'red',
}));
