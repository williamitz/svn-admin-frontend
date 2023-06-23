import { MenuItem } from '../../../interfaces/sidebar.interfaces';

export const MENU: MenuItem[] = [

  {
    id: 10,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ri-dashboard-2-line',
    link: '/dashboard'
  },

  {
    id: 1,
    label: 'MENUITEMS.PAGES.TEXT',
    isTitle: true
  },

  {
    id: 2,
    label: 'MENUITEMS.LANDING.TEXT',
    icon: 'ri-rocket-line',
    subItems: [
      {
        id: 85,
        label: 'MENUITEMS.LANDING.LIST.ONEPAGE',
        link: '/landing',
        parentId: 84
      },
      {
        id: 86,
        label: 'MENUITEMS.LANDING.LIST.NFTLANDING',
        link: '/landing/nft',
        parentId: 84,
      },
      {
        id: 87,
        label: 'MENUITEMS.LANDING.LIST.JOB',
        link: '/landing/job',
        badge: {
          variant: 'bg-success',
          text: 'MENUITEMS.DASHBOARD.BADGE',
        },
        parentId: 84,
      },
    ]
  },
  {
    id: 3,
    label: 'MENUITEMS.COMPONENTS.TEXT',
    isTitle: true
  },
  {
    id: 4,
    label: 'MENUITEMS.WIDGETS.TEXT',
    icon: 'ri-honour-line',
    link: '/widgets'
  },

  {
    id: 5,
    label: 'MENUITEMS.SEGURITY.TEXT',
    icon: 'ri-rocket-line',
    subItems: [
      {
        id: 85,
        label: 'MENUITEMS.SEGURITY.LIST.ROLE',
        link: '/segurity/role',
        parentId: 84
      },
    ]
  },

];
