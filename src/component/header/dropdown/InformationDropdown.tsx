import { Dropdown, DropdownItem, DropdownMenu } from 'semantic-ui-react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { CenteredDropdownContainer, InquiryIconWrapper } from '../TopicPageHeaderStyle';

const handleOpenDropdownBug = () => {
    window.open('https://github.com/claycat/interview-sherpa-be-mono/issues');
};

const handleOpenDropdownVisitGithub = () => {
    window.open('https://github.com/claycat/interview-sherpa-be-mono');
};

const handleOpenDropdownRoadmap = () => {
    window.open(
        'https://github.com/claycat/interview-sherpa-be-mono/issues?q=is%3Aissue+is%3Aopen+label%3Aroadmap',
    );
};

export const InformationDropdown = () => {
    return (
        <>
            <CenteredDropdownContainer>
                <Dropdown
                    trigger={
                        <>
                            <InquiryIconWrapper>
                                <QuestionMarkIcon style={{ fontSize: '20px' }} />
                                <KeyboardArrowDownIcon style={{ width: '20px' }} />
                            </InquiryIconWrapper>
                        </>
                    }
                    pointing="top right"
                    style={{
                        color: '#707070',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    icon={null}
                >
                    <DropdownMenu>
                        <DropdownItem icon="info" text="About" />
                        <DropdownItem
                            icon="bug"
                            text="Submit Bug Report"
                            onClick={handleOpenDropdownBug}
                        />
                        <DropdownItem
                            icon="github"
                            text="Visit Github"
                            onClick={handleOpenDropdownVisitGithub}
                        />
                        <DropdownItem
                            icon="road"
                            text="Roadmap"
                            onClick={handleOpenDropdownRoadmap}
                        />
                    </DropdownMenu>
                </Dropdown>
            </CenteredDropdownContainer>
        </>
    );
};
