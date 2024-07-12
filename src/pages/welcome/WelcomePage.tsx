import SocialLoginButtons from 'component/login/SocialLoginButtons';
import {
    MainContainerLeft,
    MainContainerRight,
    SplitScreenContainer,
    WelcomePageMainHeader,
    WelcomePageSubHeader,
} from './WelcomePageStyle';

const WelcomePage = () => {
    return (
        <SplitScreenContainer>
            <MainContainerLeft>
                <WelcomePageMainHeader>Interview Sherpa</WelcomePageMainHeader>
                <WelcomePageSubHeader>Guide to your interview journey</WelcomePageSubHeader>
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

export default WelcomePage;
