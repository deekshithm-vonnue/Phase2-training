export const RESOURCES = ["ticket", "assignment", "user", "category"] as const;
export type Resource = (typeof RESOURCES)[number];

export const ACTIONS = ["create", "read", "update", "delete", "own"] as const;
export type Action = (typeof ACTIONS)[number];

export type Permission = `${Resource}:${Action}`;

export const ROLES = ["ADMIN", "USER", "AGENT"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_PERMISSIONS = {
  ADMIN: [
    "ticket:create",
    "ticket:read",
    "ticket:update",
    "ticket:delete",

    "category:create",
    "category:read",
    "category:update",
    "category:delete",

    "assignment:create",
    "assignment:read",
    "assignment:update",
    "assignment:delete",

    "user:create",
    "user:read",
    "user:update",
    "user:delete",
  ],

  USER: ["ticket:create", "ticket:own"],

  AGENT: ["ticket:own", "assignment:own"],
} as const satisfies Record<Role, readonly Permission[]>;
