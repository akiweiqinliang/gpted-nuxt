import country from '~/lang/country/en-US';
import organization from '~/lang/organization/en-US';
import homeEn from "~/lang/page/en/home-en";
import loginEn from "~/lang/page/en/login-en";
import discoverEn from "~/lang/page/en/discover-en";
import dashboardEn from "~/lang/page/en/dashboard-en";
import memberEn from "~/lang/page/en/member-en";
import resourceEn from "~/lang/page/en/resource-en";
import activityEn from "~/lang/page/en/activity-en";
import billingEn from "~/lang/page/en/billing-en";
export default {
  en: 'English',
  ...country,
  ...organization,

  // common 操作
  add: 'Add',
  edit: 'Edit',
  delete: 'Delete',
  search: 'Search',
  update: 'Update',
  apply: 'Apply',
  cancel: 'Cancel',
  confirm: 'Confirm',
  resend: 'Resend',
  ok: 'Ok',
  yes: 'Yes',
  no: 'No',

  // common 提示
  and: 'and',
  success: 'successful',
  deleteSuccess: 'Delete successful',
  // 时间单位
  year: '/ year',
  // 可遍历列表
  daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  tenderContent: ['All', 'Ongoing tenders', 'Award notice', 'Forecast notice', 'Ongoing tenders', 'Award notice', 'Forecast notice'],
  announcementType: ['All', 'Ongoing tenders', 'Award notice', 'Forecast notice'],

  // placeholder
  placeholder_email: 'Please enter your email address',
  placeholder_password: 'Please enter your password',
  placeholder_setPassword: 'Please set password',
  placeholder_newPassword: 'New password',
  placeholder_verificationCode: 'Verification code',
  placeholder_signUpCode: 'Please enter sign up code',

  ...loginEn, // 登录
  ...homeEn, // 首页
  ...discoverEn, // 发现页
  ...dashboardEn, // 控制台
  ...memberEn, // 充值 会员页
  ...activityEn, // 活动页
  ...resourceEn, // 资源页
  ...billingEn, // 个人中心-账单页
};
