import SocialLoginButtons from 'component/login/SocialLoginButtons';
import {
    MainContainerLeft,
    MainContainerRight,
    MainPageMainHeader,
    MainPageSubHeader,
    SplitScreenContainer,
} from './MainPageStyle';

const MainPage = () => {
    return (
        <SplitScreenContainer>
            <MainContainerLeft>
                <MainPageMainHeader>Interview Sherpa</MainPageMainHeader>
                <MainPageSubHeader>Guide to your interview journey</MainPageSubHeader>
            </MainContainerLeft>
            <MainContainerRight>
                <h1 style={{ marginBottom: '40px', fontWeight: '600' }}>
                    Start your Interview Preperation
                </h1>

                <SocialLoginButtons />
            </MainContainerRight>
        </SplitScreenContainer>
    );
};

export default MainPage;
