import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Icon, Modal, Segment } from 'semantic-ui-react';

export const dimmerStyle = css`
    .ui.dimmer {
        background-color: rgba(0, 0, 0, 0.2) !important;
    }
`;

export const Sidebar = styled.div`
    width: 250px;
    background-color: #f9f9f9;
    padding: 20px;
    color: #333;
    display: flex;
    flex-direction: column;
    justify-content: start;
    flex: 0 0 250px; // Fixed width of 250px
    height: 100%; // Take 100% of the parent's height
    box-sizing: border-box; // Ensure padding is included in the height calculation
`;

export const UserSection = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

export const UserEmail = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

export const UserStatus = styled.div`
    font-size: 14px;
    color: #888;
`;

export const ButtonsContainer = styled.div``;

export const UpgradeButton = styled(Button)`
    margin-bottom: 10px !important;
    color: #ffffff;
`;

export const CloseButton = styled(Button)`
    color: #ffffff;
`;

export const MainContent = styled.div`
    flex: 1; // Take the remaining space
    background-color: #ffffff;
    padding: 20px;
    color: #333;
    min-width: 500px; // Prevent the main content from shrinking too much
    box-sizing: border-box; // Ensure padding doesn't make the content overflow
`;

export const SearchSegment = styled(Segment)`
    width: 50%;
    background-color: #f1f1f1 !important;
    padding: 10px !important;
    border-radius: 5px !important;
    margin-bottom: 20px !important;
`;

export const DiagramListSegment = styled(Segment)`
    height: 60vh;
    overflow-y: auto;
`;

export const CloseIcon = styled(Icon)`
    position: absolute !important;
    top: 10px !important;
    right: 10px !important;
    cursor: pointer !important;
    z-index: 1000 !important;
    color: #333 !important;
`;

export const ModalContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: stretch; /* Ensures children stretch to fill height */
    height: 100%; /* Parent must have defined height */
    width: 100%; /* Added to ensure full width */
    max-width: 100vw; /* Prevent overflow beyond viewport */
    overflow: hidden; /* Prevent content from sticking out */
    box-sizing: border-box; /* Ensure padding is included in width/height */
`;

export const ModalContent = styled(Modal.Content)`
    height: 80vh; /* Set height for Modal Content to ensure it doesn't overflow */
    padding: 0;
    display: flex;
    flex-direction: column; /* Stack children in a column */
    box-sizing: border-box; /* Ensure padding is included */
    overflow: hidden; /* Prevent content overflow */
`;

export const DiagramTableHeader = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr 0.2fr; /* Added space for the actions column */
    padding: 10px 20px;
    font-weight: bold;
    border-bottom: 1px solid #444;
`;

export const DiagramListContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DiagramListItem = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr 0.2fr; /* Added space for the actions column */
    padding: 10px 20px;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;

    color: #333; /* Changed from white to dark for better contrast */

    &:hover {
        background-color: #e0e0e0; /* Light gray for hover effect */
    }

    &:active {
        background-color: #f5f5f5; /* Slightly different color for active state */
    }
`;

export const DiagramColumn = styled.div`
    color: #888;
    align-items: center;
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
