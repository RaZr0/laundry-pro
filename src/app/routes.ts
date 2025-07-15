export const ROUTES = {
    'dashboard': {
        link: '/dashboard',
    },
    'customers': {
        link: '/customers',
    },
    'orders': {
        link: '/orders',
        children: {
            new : {
                link: '/new',
            }
        }
    },
    'shippings': {
        link: '/shippings',
    },
    'accounts': {
        link: '/accounts',
    },
    'settings': {
        link: '/settings',
        children: {
            'printing': {
                link: '/printing',
            },
            'pricing': {
                link: '/pricing',
            },
        }
    },
    'login': {
        link: '/login',
    },
}