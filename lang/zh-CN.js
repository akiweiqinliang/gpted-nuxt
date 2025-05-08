import country from '~/lang/country/zh-CN'
import organization from '~/lang/organization/zh-CN';
import homeZh from "~/lang/page/zh/home-zh";
import loginZh from "~/lang/page/zh/login-zh";
import discoverZh from "~/lang/page/zh/discover-zh";
import dashboardZh from "~/lang/page/zh/dashboard-zh";
import memberZh from "~/lang/page/zh/member-zh";
import resourceZh from "~/lang/page/zh/resource-zh";
import activityZh from "~/lang/page/zh/activity-zh";
import billingZh from "~/lang/page/zh/billing-zh";
export default {
  zh: '中文',
  ...country,
  ...organization,

  // common 操作
  add: '添加',
  edit: '编辑',
  delete: '删除',
  search: '搜索',
  update: '更新',
  apply: '应用',
  cancel: '取消',
  confirm: '确定',
  resend: '重发',
  ok: '确认',
  yes: '确定',
  no: '取消',

  // common 提示
  and: '和',
  success: '成功',
  deleteSuccess: '删除成功',
  // 时间单位
  year: '/ 年',
  // 可遍历列表
  daysOfWeek: [ "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
  tenderContent: ['全部', '正在进行的招标', '中标通知', '预测通知', '正在进行的招标', '中标通知', '预测通知'],
  announcementType: ['全部', '正在进行的招标', '中标通知', '预测通知'],

  // placeholder
  placeholder_email: '请输入您的电子邮件地址',
  placeholder_password: '请输入您的密码',
  placeholder_setPassword: '请设置密码',
  placeholder_newPassword: '新密码',
  placeholder_verificationCode: '验证码',
  placeholder_signUpCode: '请输入注册码',

  ...loginZh, // 登录
  ...homeZh, // 首页
  ...discoverZh, // 搜索页
  ...dashboardZh, // 控制台
  ...memberZh, // 充值 会员页
  ...activityZh, // 活动页
  ...resourceZh, // 资源页
  ...billingZh, // 个人中心-账单页
};
