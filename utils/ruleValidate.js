const validateLowestPrice = (rule, value, callback) => {
  if (value < 0) {
    callback(new Error('价格不得为负'));
  } else {
    callback();
  }
};
const validateHighestPrice = (rule, value, callback) => {
  if (value < 0) {
    callback(new Error('价格不得为负'));
  } else {
    callback();
  }
};
const validatePrice = (rule, value, callback) => {
  if (
    value.lowestPrice &&
    value.highestPrice &&
    value.lowestPrice > value.highestPrice
  ) {
    callback(new Error('价格区间有误'));
  }
};
const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('手机号不能为空'));
  }
  const phoneNumberRegex = /^1[3456789]\d{9}$/;
  if (phoneNumberRegex.test(value)){
    callback();
  }else {
    callback(new Error('请输入正确的手机号'));
  }
};
const validateConfirmCode = (rule, value, callback) => {
  if (!value) {
    callback(new Error('验证信息不能为空'));
  }
  // 模拟异步验证效果 axios add account to db
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('请输入正确的验证码'));
    }else {
      callback();
    }
  }, 1000);
};

const validateMail = (rule, value, callback) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (re.test(String(value).toLowerCase())){
    callback();
  }else {
    callback(new Error('Please enter a valid email address'));
  }
};
const ruleValidate = {
  priceRange: [{ message: '价格区间有误', validator: validatePrice }],
  lowestPrice: [
    {
      trigger: 'change',
      validator: validateLowestPrice,
    },
  ],
  highestPrice: [
    {
      trigger: 'change',
      validator: validateHighestPrice,
    },
  ],
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  // 验证码
  confirmCode: [{ validator: validateConfirmCode, trigger: 'blur' }],
  mail: [{validator: validateMail, trigger: 'blur'}]
};
export {
  ruleValidate,
};
