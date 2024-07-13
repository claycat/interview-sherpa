import styled from '@emotion/styled';

export const MainTextSectionContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20vh',
    fontSize: '2.5em',
    color: '#29C5CF',
    fontWeight: '600',
    fontFamily: 'Inter',
});

export const MainTextSection = () => {
    return <MainTextSectionContainer>Explore Various Interview Subjects</MainTextSectionContainer>;
};
