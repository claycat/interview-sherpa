import styled from '@emotion/styled';
import { Box } from '@mui/material';
import MainPageHeader from 'component/header/MainPageHeader';
import CardSection from './CardSection';
import { MainTextSection } from './MainTextSection';

const StyledMainContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
});

const MainPage = () => {
    return (
        <StyledMainContainer>
            <MainPageHeader />
            <MainTextSection />
            <CardSection />
        </StyledMainContainer>
    );
};

export default MainPage;
