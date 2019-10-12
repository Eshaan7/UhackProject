import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
		title: 'Expenses',
		icon: 'list-outline',
		children: [
			{
				title: 'Housing',
				link: '/pages/expenses-management/housing',
			},
			{
				title: 'Food',
				link: '/pages/expenses-management/food',
			},
			{
				title: 'Grocery',
				link: '/pages/expenses-management/grocery',
			},
			{
				title: 'Savings',
				link: '/pages/expenses-management/savings',
			},
		],
	},
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
