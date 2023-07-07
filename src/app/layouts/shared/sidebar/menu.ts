import { MenuItem } from '../../../interfaces/sidebar.interfaces';

export const MENU: MenuItem[] = [

  {
    id: 10,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ri-dashboard-2-line',
    link: '/admin'
  },

  // {
  //   id: 11,
  //   label: 'MENUITEMS.CALLS.TEXT',
  //   icon: 'ri-dashboard-2-line',
  //   link: '/calls'
  // },

  // {
  //   id: 12,
  //   label: 'MENUITEMS.CONNECTNOW.TEXT',
  //   icon: 'ri-dashboard-2-line',
  //   link: '/calls/connectNow'
  // },

  {
    id: 20,
    label: 'MENUITEMS.SCHEDULEINTERPRETER.TEXT',
    icon: 'ri-calendar-2-line',
    subItems: [
      {
        id: 85,
        label: 'MENUITEMS.SCHEDULEINTERPRETER.LIST.SCHEDULEINTERPRETERACTIVITY',
        link: '/admin/schedule-interpreter',
        parentId: 84
      },
      {
        id: 86,
        label: 'MENUITEMS.SCHEDULEINTERPRETER.LIST.NEWASSIGNMENT',
        link: '/admin/new-assignment-interpreter',
        parentId: 84,
      },
      {
        id: 87,
        label: 'MENUITEMS.SCHEDULEINTERPRETER.LIST.ONSITEINTERPRETER',
        link: '/admin/onsite-interpreter',
        parentId: 84,
      },
    ]
  },

  {
    id: 21,
    label: 'MENUITEMS.POOLINTERPRETER.TEXT',
    icon: 'ri-translate-2',
    subItems: [
      {
        id: 85,
        label: 'MENUITEMS.POOLINTERPRETER.LIST.POOLADDINTERPRETER',
        link: '/admin/pool-interpreter',
        parentId: 84
      },
      {
        id: 86,
        label: 'MENUITEMS.POOLINTERPRETER.LIST.POOLACTIVITYINTERPRETER',
        link: '/admin/pool-activity-interpreter',
        parentId: 84,
      },
    ]
  },

  {
    id: 13,
    label: 'MENUITEMS.CALLREPORT.TEXT',
    icon: 'mdi mdi-phone-log-outline',
    // link: '/calls/callReport',
    subItems: [
      {
        id: 85,
        label: 'MENUITEMS.CALLREPORT.LIST.OPICALLDETAIL',
        link: '/calls/opi-call',
        parentId: 84
      },
      {
        id: 86,
        label: 'MENUITEMS.CALLREPORT.LIST.VRICALLDETAIL',
        link: '/calls/opi-call',
        parentId: 84,
      },
      {
        id: 87,
        label: 'MENUITEMS.CALLREPORT.LIST.ASLCALLDETAIL',
        link: '/calls/opi-call',
        parentId: 84,
      },
    ]
  },
  {
    id: 22,
    label: 'MENUITEMS.CUSTOMERS.TEXT',
    icon: ' ri-team-line',
    link: '/admin/customer'
  },
  {
    id: 23,
    label: 'MENUITEMS.BILLINGS.TEXT',
    icon: 'ri-article-line',
    link: '/admin/billing'
  },

  {
    id: 14,
    label: 'MENUITEMS.CONFIGURATION.TEXT',
    icon: 'ri-settings-line',
    // link: '/calls/callReport',
    subItems: [
      {
        id: 85,
        label: 'MENUITEMS.CONFIGURATION.LIST.QUICKBOOK',
        link: '/admin/quickbooks',
        parentId: 84
      },
      {
        id: 86,
        label: 'MENUITEMS.CONFIGURATION.LIST.CALLQUEUES',
        link: '/admin/call-queues',
        parentId: 84,
      },
      {
        id: 87,
        label: 'MENUITEMS.CONFIGURATION.LIST.PROFILEACCOUNT',
        link: '/admin/profile-account',
        parentId: 84,
      },
    ]
  },

  {
    id: 24,
    label: 'MENUITEMS.INTERPRETERPORTAL.TEXT',
    icon: 'ri-dashboard-line',
    link: '/admin/portal-interpreter'
  },
  {
    id: 24,
    label: 'MENUITEMS.MYASSIGNMENT.TEXT',
    icon: 'ri-calendar-2-line',
    link: '/admin/my-assignments'
  },
  {
    id: 24,
    label: 'MENUITEMS.CALLHISTORY.TEXT',
    icon: 'mdi mdi-phone-dial-outline',
    link: '/calls/call-history'
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
      {
        id: 87,
        label: 'MENUITEMS.SEGURITY.LIST.MENU',
        link: '/segurity/menu',
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
