import { SemanticICONS } from 'semantic-ui-react';

export const roles = ['VIEWER', 'EDITOR', 'COMMENTER', 'OWNER', 'ANONYMOUS'] as const;

export type Role = (typeof roles)[number];

export const permissions = [
    'CREATE_FLOW',
    'EDIT_FLOW',
    'VIEW_FLOW',
    'COMMENT_FLOW',
    'DELETE_FLOW',
    'SHARE_FLOW',
    'CHANGE_VISIBILITY',
    'CONFIGURE_COMMENTS',
] as const;

export type Permission = (typeof permissions)[number];

export type RoleValue = {
    description: string;
    caption: string;
    permissions: Permission[];
    icon: SemanticICONS;
};

export const roleMap: Record<Role, RoleValue> = {
    VIEWER: {
        description: 'Can view',
        caption: 'Can only view',
        permissions: ['VIEW_FLOW'],
        icon: 'eye',
    },
    COMMENTER: {
        description: 'Can comment',
        caption: 'Can view and comment',
        permissions: ['VIEW_FLOW', 'COMMENT_FLOW'],
        icon: 'comment',
    },
    EDITOR: {
        description: 'Can edit',
        caption: 'Can view and edit',
        permissions: ['VIEW_FLOW', 'EDIT_FLOW', 'COMMENT_FLOW'],
        icon: 'edit',
    },
    OWNER: {
        description: 'Can manage',
        caption: 'Can view, edit, and manage',
        permissions: [
            'VIEW_FLOW',
            'EDIT_FLOW',
            'COMMENT_FLOW',
            'DELETE_FLOW',
            'SHARE_FLOW',
            'CHANGE_VISIBILITY',
            'CONFIGURE_COMMENTS',
        ],
        icon: 'key',
    },
    ANONYMOUS: {
        description: 'Anonymous user',
        caption: 'Anonymous user',
        permissions: [],
        icon: 'question circle',
    },
};

export const mergeRole = (tokenRole: Role, userRole: Role): Role => {
    if (tokenRole === undefined && userRole === undefined) {
        throw new Error('Both tokenRole and userRole cannot be undefined');
    }

    if (!tokenRole) {
        return userRole as Role;
    }

    if (!userRole) {
        return tokenRole as Role;
    }

    const isRoleMoreInclusive = (roleA: Role, roleB: Role): boolean => {
        const permissionsA = roleMap[roleA].permissions;
        const permissionsB = roleMap[roleB].permissions;
        return permissionsB.every(permission => permissionsA.includes(permission));
    };

    if (isRoleMoreInclusive(tokenRole, userRole)) {
        return tokenRole;
    } else if (isRoleMoreInclusive(userRole, tokenRole)) {
        return userRole;
    } else {
        return tokenRole;
    }
};
