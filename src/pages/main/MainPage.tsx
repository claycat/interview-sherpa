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
                <SocialLoginButtons />
            </MainContainerRight>
        </SplitScreenContainer>
    );
};

export default MainPage;
