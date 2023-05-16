// 正则验证手机号
export const regPhone = (phone) => {
  return /0?(13|14|15|17|18|19)[0-9]{9}/.test(phone)
}

// 验证用户名 字母开头6-12位

export const regUserName = (name) => {
  return /^[a-zA-Z]{1}[a-zA-Z0-9]{5,11}$/.test(name)
}
// 验证密码，最少6位
export const regPwd = (password) => {
  return /^.{6,}$/.test(password)
}
