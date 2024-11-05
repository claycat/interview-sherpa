import { roleMap } from 'constant/roles';
import { Icon } from 'semantic-ui-react';
import { useAuthStore } from 'state/authStore';
import { capitalizeFirstLetter } from 'util/stringUtils';
import { RoleIconWrapper } from '../TopicPageHeaderStyle';

export const RoleIconComponent = () => {
    const { role } = useAuthStore();

    return (
        <RoleIconWrapper>
            <div css={{ marginBottom: '6px' }}>
                <Icon name={roleMap[role].icon} />
            </div>
            <span>{capitalizeFirstLetter(role)}</span>
        </RoleIconWrapper>
    );
};
