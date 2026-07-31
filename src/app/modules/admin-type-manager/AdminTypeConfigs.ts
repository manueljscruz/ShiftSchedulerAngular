import { TypeManagerConfig } from './TypeManagerConfig';

export const ADMIN_TYPE_CONFIGS: TypeManagerConfig[] = [
    // Simple types — handled by generic AdminTypeManagerComponent
    { typeKey: 'localizations',           label: 'Localizations',       icon: 'language'         },
    { typeKey: 'genders',                 label: 'Genders',             icon: 'wc'               },
    { typeKey: 'entity-types',            label: 'Entity Types',        icon: 'business'         },
    { typeKey: 'absence-types',           label: 'Absence Types',       icon: 'event_busy'       },
    { typeKey: 'shift-break-types',       label: 'Shift Break Types',   icon: 'coffee'           },
    { typeKey: 'holiday-types',           label: 'Holiday Types',       icon: 'beach_access'     },
    { typeKey: 'business-aspects',        label: 'Business Aspects',    icon: 'category'         },
    { typeKey: 'entity-permission-roles', label: 'Permission Roles',    icon: 'manage_accounts'  },
    // Skills — generic system with color support (HasColors = true)
    { typeKey: 'skills',                  label: 'Skills',              icon: 'star'             },
    // Complex types — individual dedicated pages
    { typeKey: 'holiday-behaviours',   label: 'Holiday Behaviours',   icon: 'event',         routePath: 'configuration/holiday-behaviours'  },
    { typeKey: 'rule-types',           label: 'Rule Types',           icon: 'rule',          routePath: 'configuration/rule-types'          },
    { typeKey: 'holiday-catalogs',     label: 'Holiday Catalogs',     icon: 'menu_book',     routePath: 'configuration/holiday-catalogs'    },
    { typeKey: 'notification-types',   label: 'Notification Types',   icon: 'notifications', routePath: 'configuration/notification-types'  },
    { typeKey: 'subscription-plan-types',           label: 'Subscription Plan Types',     icon: 'workspace_premium', routePath: 'configuration/subscription-plan-types'           },
    { typeKey: 'subscription-duration-types',        label: 'Subscription Duration Types', icon: 'schedule',          routePath: 'configuration/subscription-duration-types'       },
    { typeKey: 'payment-method-types',               label: 'Payment Method Types',        icon: 'payments',          routePath: 'configuration/payment-method-types'              },
    { typeKey: 'subscription-plan-duration-prices',  label: 'Subscription Prices',         icon: 'sell',              routePath: 'configuration/subscription-plan-duration-prices' },
    { typeKey: 'campaigns',                          label: 'Campaigns',                   icon: 'campaign',          routePath: 'configuration/campaigns'                         },
];

export function getTypeConfig(typeKey: string): TypeManagerConfig | undefined {
    return ADMIN_TYPE_CONFIGS.find(c => c.typeKey === typeKey);
}
