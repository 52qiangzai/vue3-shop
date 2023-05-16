<script setup>
import { ref, watch } from 'vue'
import { regPhone, regPwd, regUserName } from '@/utils/regUtils'

import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
//登录信息
const formData = ref({
  account: 'a123456',
  password: '123456',
  code: '',
  phone: ''
})
const errMsg = {
  phone: {
    show: false,
    msg: ['请输入正确的手机号']
  },
  password: {
    show: false,
    msg: ['密码长度不小于6位']
  },
  code: {
    show: false,
    msg: ['验证码错误']
  },
  user: {
    show: false,
    msg: ['字母开头用户名6-12位']
  }
}
watch(formData.value, (newV, oldV) => {
  console.log(newV, oldV)
  loginReg()
})
// 判断当前登录信息
const loginType = ref('user-login')
// 当前登录方式
const activeBoxName = ref('input-box')
// 判断是否同意协议
const agreeChecked = ref(false)
// 登录请求前验证
const loginReg = () => {
  // 账号登陆
  if (loginType.value === 'user-login') {
    console.log('用户名验证', regUserName(formData.value.account), formData.value.account)
    console.log('密码验证', regPwd(formData.value.password))
    if (regUserName(formData.value.account) && regPwd(formData.value.password)) {
      errMsg.password.show = false
      errMsg.user.show = false
      return true
    } else if (regUserName(formData.value.account)) {
      errMsg.user.show = false
      return false
    } else if (regPwd(formData.value.password)) {
      errMsg.password.show = false
      return false
    } else {
      errMsg.user.show = true
      errMsg.password.show = true
      return false
    }
  } else {
    // 验证手机号登录
    errMsg.phone.show = !regPhone(formData.value.mobile)
    return regPhone(formData.value.mobile)
  }
}

const reqLoginUserInfo = async () => {
  if (!loginReg()) {
    ElMessage.error('请输入用户名密码！！')
    return
  }
  if (!agreeChecked.value) {
    ElMessage.warning('请先同意协议！！')
    return
  }
  userStore.getUserInfo(formData.value, loginType.value).then(() => {
    router.push('/')
  })
}
</script>
<template>
  <header class="login-header">
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
      <h3 class="sub">欢迎登录</h3>
      <RouterLink class="entry" to="/">
        进入网站首页
        <i class="iconfont icon-angle-right"></i>
        <i class="iconfont icon-angle-right"></i>
      </RouterLink>
    </div>
  </header>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a href="javascript:;" @click="activeBoxName = 'input-box'">账户登录</a>
        <a href="javascript:;" @click="activeBoxName = 'qrcode-box'">扫码登录</a>
      </nav>
      <!-- 账号登录 -->
      <div class="input-box" v-show="activeBoxName === 'input-box'">
        <div
          class="toggle"
          @click="
            loginType === 'user-login' ? (loginType = 'code-login') : (loginType = 'user-login')
          "
        >
          <i class="iconfont" :class="loginType === 'user-login' ? 'icon-msg' : 'icon-user'"></i
          >&nbsp;使用{{ loginType === 'user-login' ? '短信' : '账户' }}登录
        </div>
        <!-- 账号登陆 -->
        <form class="form" autocomplete="off">
          <div class="form-item" v-if="loginType === 'user-login'">
            <div class="input">
              <i class="iconfont icon-user"></i
              ><input
                class="username"
                type="text"
                placeholder="请输入用户名"
                name="account"
                v-model="formData.account"
              />
            </div>
            <div class="error" v-if="errMsg.user.show">
              <i class="iconfont icon-warning"></i> {{ errMsg.user.msg[0] }}
            </div>
          </div>
          <div class="form-item" v-if="loginType === 'user-login'">
            <div class="input">
              <i class="iconfont icon-lock"></i
              ><input
                class=""
                type="password"
                placeholder="请输入密码"
                name="password"
                v-model="formData.password"
              />
            </div>
            <div class="error" v-if="errMsg.password.show">
              <i class="iconfont icon-warning"></i>
              {{ errMsg.password.msg[0] }}
            </div>
          </div>
          <!-- 手机号 -->
          <div class="form-item" v-if="loginType === 'code-login'">
            <div class="input">
              <i class="iconfont icon-user"></i
              ><input
                class="username"
                type="text"
                placeholder="请输入手机号"
                name="phone"
                v-model="formData.mobile"
              />
            </div>
            <div class="error" v-if="errMsg.phone.show">
              <i class="iconfont icon-warning"></i> {{ errMsg.phone.msg[0] }}
            </div>
          </div>
          <!-- 验证码 -->
          <div class="form-item" v-if="loginType === 'code-login'">
            <div class="input">
              <i class="iconfont icon-code"></i
              ><input
                class="username"
                type="text"
                placeholder="请输入验证码"
                name="icon-code"
                v-model="formData.code"
              />
              <span>发送验证码</span>
            </div>
            <div class="error"><i class="iconfont icon-warning"></i> 请输入验证码</div>
          </div>
          <div class="form-item">
            <div class="agree">
              <div
                class="xtx-checkbox"
                name="isAgree"
                value="false"
                @click="agreeChecked ? (agreeChecked = false) : (agreeChecked = true)"
              >
                <i
                  class="iconfont"
                  :class="{ 'icon-checked': agreeChecked, 'icon-unchecked': !agreeChecked }"
                ></i
                ><!---->
              </div>
              <span>我已同意</span><a href="javascript:;">《隐私条款》</a><span>和</span
              ><a href="javascript:;">《服务条款》</a>
            </div>
            <!---->
          </div>
          <a href="javascript:;" class="btn" @click="reqLoginUserInfo">登录</a>
        </form>
        <div class="action">
          <a
            href="https://graph.qq.com/oauth2.0/authorize?client_id=101941968&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3A%2F%2Ferabbit.itheima.net%2F%23%2Flogin%2Fcallback"
            ><img
              src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
              alt=""
          /></a>
          <div class="url">
            <a href="javascript:;">忘记密码</a><a href="javascript:;">免费注册</a>
          </div>
        </div>
      </div>
      <!-- 扫码登录 -->
      <div class="qrcode-box" v-show="activeBoxName === 'qrcode-box'">
        <img src="http://erabbit.itheima.net/img/qrcode.5372a064.jpg" alt="" />
        <p>打开 <a href="#">小兔鲜App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <footer class="login-footer">
    <div class="container">
      <p>
        <a href="javascript:;">关于我们</a>
        <a href="javascript:;">帮助中心</a>
        <a href="javascript:;">售后服务</a>
        <a href="javascript:;">配送与验收</a>
        <a href="javascript:;">商务合作</a>
        <a href="javascript:;">搜索推荐</a>
        <a href="javascript:;">友情链接</a>
      </p>
      <p>CopyRight &copy; 小兔鲜儿</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('../../assets/images/logo.png') no-repeat center 18px / contain;
    }
  }
  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }
  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;
    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    div.input-box {
      margin-top: 0px;
      .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div a {
          color: #999;
          margin-left: 10px;
        }
      }
      .toggle {
        padding: 15px 40px;
        text-align: right;
        cursor: pointer;
        color: $xtxColor;
        i {
          font-size: 14px;
        }
      }
      .form {
        padding: 0 40px;
        overflow: hidden;
        .form-item {
          margin-bottom: 10px;
          .error {
            color: #cf4444;
          }
          .xtx-checkbox {
            display: inline-block;
            i.icon-checked {
              color: $xtxColor;
            }
            & ~ a {
              color: #069;
            }
          }
          .input {
            border-color: #cf4444;
            position: relative;
            height: 36px;
            span {
              position: absolute;
              right: 1px;
              top: 1px;
              text-align: center;
              line-height: 34px;
              font-size: 14px;
              background: #f5f5f5;
              color: #666;
              width: 90px;
              height: 34px;
              cursor: pointer;
            }
            i {
              width: 34px;
              height: 34px;
              background: #cfcdcd;
              color: #fff;
              position: absolute;
              left: 1px;
              top: 1px;
              text-align: center;
              line-height: 34px;
              font-size: 18px;
            }
            input {
              padding-left: 36px;
              border: 1px solid #cfcdcd;
              height: 36px;
              line-height: 36px;
              width: 100%;
              box-sizing: border-box;
            }
          }
        }
        .btn {
          display: block;
          width: 100%;
          height: 40px;
          color: #fff;
          text-align: center;
          line-height: 40px;
          background: #27ba9b;
        }
      }
    }
    .input-box,
    .qrcode-box {
      margin-top: 30px;
      width: 100%;
      height: auto;
      padding: 10px 5px;
    }
    .qrcode-box {
      text-align: center;

      p {
        margin-top: 20px;
        a {
          color: $xtxColor;
          font-size: 20px;
          padding: 0 5px;
        }
      }
    }
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active {
          color: $xtxColor;
          font-weight: bold;
        }
      }
    }
  }
}
.login-footer {
  padding: 30px 0 50px;
  background: #fff;
  p {
    text-align: center;
    color: #999;
    padding-top: 20px;
    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;
      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}
</style>
