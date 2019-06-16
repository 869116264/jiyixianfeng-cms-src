// <!-- auto generated navs start -->
import axios from 'axios';

const autoGenHeaderNavs = [];
const autoGenAsideNavs = [];

// <!-- auto generated navs end -->

const customHeaderNavs = [];

const customAsideNavs = [
  {
    text: '用户管理',
    to: '/user',
    icon: 'yonghu',
    children: [
      {
        text: '用户列表',
        to: '/user/userlist',
      },
      {
        text: '审核列表',
        to: '/user/verifylist',
      },
      {
        text: '晋升列表',
        to: '/user/uplist',
      },
    ],
  },
  {
    text: '活动管理',
    to: '/activity/createactivity',
    icon: 'activity',
    children: [
      {
        text: '发起活动',
        to: '/activity/createactivity',
      },
      {
        text: '活动列表',
        to: '/activity/activitylist',
      },
    ],
  },
  // {
  //   text: '发送短信',
  //   to: '/message/sms',
  //   icon: 'message',
  // },
  {
    text: '自主认证',
    to: '/self',
    icon: 'fans',
    children: [
      {
        text: '认证列表',
        to: '/self/list',
      },
    ],
  },
];

const adminNav = [{
  text: '超管应用',
  to: '/admin',
  icon: 'eye',
  children: [
    {
      text: '管理员列表',
      to: '/admin/adminlist',
    },
    {
      text: '创建管理员',
      to: '/admin/createadmin',
    },
    {
      text: '活动审核列表',
      to: '/admin/verifyactivitylist',
    },
  ],
}];

function transform(navs) {
  return [...navs];
  // console.log(navs);
  // navs[1] += adminNav;
}

export const headerNavs = transform([
  ...autoGenHeaderNavs,
  ...customHeaderNavs,
]);

export const asideNavs = transform([...autoGenAsideNavs, ...customAsideNavs]);
