import { MenuItem } from '../../../interfaces/sidebar.interfaces';

export const MENU: MenuItem[] = [

  {
    id: 10,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ri-dashboard-2-line',
    link: '/admin'
  },

  {
    id: 11,
    label: 'MENUITEMS.CALLS.TEXT',
    icon: 'ri-dashboard-2-line',
    link: '/calls'
  },

  {
    id: 12,
    label: 'MENUITEMS.CONNECTNOW.TEXT',
    icon: 'ri-dashboard-2-line',
    link: '/calls/connectNow'
  },
  {
    id: 13,
    label: 'MENUITEMS.CALLREPORT.TEXT',
    icon: 'ri-dashboard-2-line',
    link: '/calls/callReport'
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
      {
        id: 86,
        label: 'MENUITEMS.SEGURITY.LIST.USER',
        link: '/segurity/user',
        parentId: 84
      },
    ]
  },
  {
    id: 5,
    label: 'MENUITEMS.ADMIN.TEXT',
    icon: 'ri-rocket-line',
    subItems: [
      {
        id: 85,
        label: 'MENUITEMS.ADMIN.LIST.ORGANIZATION',
        link: '/admin/organizations',
        parentId: 84
      },
    ]
  },

];
