<template>
  <div class="chat-container">
    <div ref="massageList" class="chat-box">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <Row align="top" :wrap="false" :class="{'my-message': message.sender === 'me', 'server-message': message.sender === 'server'}">
          <img :src="message.sender === 'me' ? userAvatarIcon : aiIcon" alt="avatar">
          <div class="msg">
            <span v-if="message.sender === 'me'">{{message.text}}</span>
            <template v-if="message.sender === 'server'">
              <el-skeleton v-if="message.resend" :rows="3" animated class="resendCover"/>
              <span v-else>{{ message.text }}</span>
            </template>
            <div v-if="message.sender === 'server'" class="icon-box">
              <img v-copy="message.text" :src="copyIcon" alt="copy">
              <img :src="syncIcon" alt="sync" @click="resendMessage(index)">
              <img :src="shareIcon" alt="share">
            </div>
          </div>
        </Row>
      </div>
    </div>
    <div ref="inputBox" class="input-container">
      <div class="input">
<!--        <textarea v-model="newMessage" class="pc" type="textarea" rows="4" placeholder="Type a message" @keyup.enter="sendMessage"></textarea>-->
<!--        <textarea v-model="newMessage" class="mobile" type="textarea" rows="1" placeholder="Type a message" @keyup.enter="sendMessage"></textarea>-->
<!--        <input v-model="newMessage" class="pc mobile" type="textarea" placeholder="Type a message" @keyup.enter="sendMessage"></input>-->
        <Input v-model="newMessage" class="pc" type="textarea" :rows="4" placeholder="Type a message" @on-enter="sendMessage"/>
        <Input v-model="newMessage" class="mobile" autosize type="textarea" :rows="1" placeholder="Type a message" @on-enter="sendMessage"/>
      </div>
      <button class="send-button" @click="sendMessage">
        <Icon type="ios-paper-plane-outline" />
      </button>
    </div>
  </div>
</template>

<script>
import userAvatarIcon from '~/assets/imgs/svg/userAvatar.svg';
import aiIcon from '~/assets/imgs/svg/aiLogo.svg';

import shareIcon from '~/assets/imgs/svg/share.svg';
import copyIcon from '~/assets/imgs/svg/copy.svg';
import syncIcon from '~/assets/imgs/svg/sync.svg';
export default {
  name: "ChatBox",
  data() {
    return {
      ws: null, // WebSocket 实例
      messages: [], // 聊天记录
      newMessage: '', // 用户输入的消息

      userAvatarIcon,
      aiIcon,
      shareIcon,
      copyIcon,
      syncIcon,
    };
  },
  mounted() {
    // 创建 WebSocket 连接
    this.ws = new WebSocket('ws://localhost:8080');

    // WebSocket 接收到消息时
    this.ws.onmessage = (event) => {
      this.messages.push({ text: event.data, sender: 'server', resend: false });
    };

    // WebSocket 连接关闭时
    this.ws.onclose = () => {
      // console.log('WebSocket connection closed');
    };
  },
  methods: {
    resendMessage(index) {
      this.messages[index].resend = true;
      // 模拟重新获取消息
      setTimeout(() => {
        // 假设重新请求获得相同消息，重置 resend 状态
        this.messages[index].resend = false;
      }, 3000);
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        // 将用户输入的消息发送给 WebSocket 服务端
        this.ws.send(this.newMessage);

        // 将用户的消息展示到聊天框
        this.messages.push({ text: this.newMessage, sender: 'me' });

        // 清空输入框
        this.newMessage = '';
        setTimeout(() => {
          const targetEl = this.$refs.massageList;
          targetEl.scrollTop = targetEl.scrollHeight;
        }, 20)
      }
    },
  },
}
</script>

<style scoped lang="scss">

.chat-container {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.chat-box {
  overflow-y: auto;
  flex-grow: 1;
  .message {
    margin-bottom: 20px;
    img{
      width: 40px;
      margin-right: 14px;
    }
    .msg{
      border-radius: 6px;
      padding: 10px;
      span{
        display: block;
        word-break: break-word;
        text-align: left;
      }
      .icon-box{
        display: flex;
        align-items: center;
        margin-top: 10px;
        img{
          width: 18px;
          height: 18px;
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }

  }
  .my-message {
    .msg{
      color: var(--text-color4);
      background: linear-gradient( 90deg, #6B4AFF 0%, #536AFF 100%), #6B4AFF;
    }
  }
  .server-message {
    .msg{
      background: var(--text-bg-color1);
      color: var(--text-color1);
      //span{
      //  margin-bottom: 10px;
      //}
    }

  }
}


.input-container {
  //flex-grow:;
  display: flex;
  z-index: 10;
  width: 100%;
  border-radius: 14px 14px 14px 14px;
  background: #F1F2FF;
  border: 1px solid rgba(75, 72, 221, 1);
  position: relative;
  .input {
    flex: 1;
    padding: 12px;
    margin-bottom: 40px;
    textarea{
      /* 去除默认样式 */
      //min-height: 64px;
      border: none;             /* 去掉边框 */
      outline: none;            /* 去掉聚焦时的边框 */
      padding: 0;               /* 去掉内边距 */
      margin: 0;                /* 去掉外边距 */
      background: transparent;  /* 去掉背景颜色 */
      resize: none;             /* 禁止手动调整大小 */
      box-shadow: none;         /* 去掉默认阴影 */
      width: 100%;              /* 让宽度填满父元素 */
      //height: 100%;             /* 让高度填满父元素 */

      /* 自定义样式 */
      font-size: 15px;          /* 设置字体大小 */
      color: var(--text-color1);              /* 文本颜色 */

      &::placeholder{
        color: var(--text-color2);
      }
      &:focus{
        /* 去除聚焦时的高亮效果 */
        outline: none;            /* 去除默认聚焦时的边框 */
        box-shadow: none;         /* 去除默认聚焦时的阴影 */
      }
    }
    .ivu-input{
      padding: 0;
      background: transparent;
      border: none;
    }
  }
  .send-button {
    position: absolute;
    background: linear-gradient( 90deg, #6B4AFF 0%, #536AFF 100%), #5A1EFF;
    bottom: 12px;
    right: 12px;
    //padding: 5px 10px;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 30px;
    height: 30px;
    width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.resendCover{
  width: 300px;
}
</style>
<style scoped lang="scss">
.pc{
  display: block;
}
.mobile{
  display: none;
}
@media screen and (max-width: 768px){
  .pc{
    display: none;
  }
  .mobile{
    display: block;
  }
  .chat-box{
    .message{
      img{
        width: 25px;
        height: 25px;
        margin-right: 8px;
      }
      span{
        font-size: 11px;
      }
      .msg{
        padding: 8px;
        .icon-box{
          margin-top: 8px;
          img{
            width: 14px;
            height: 14px;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .input-container{
    .input{
      margin: 0;
      padding: 5px 60px 5px 5px;
      //margin-bottom: 32px;
      textarea{
        min-height: 32px;
        //height: auto;
      }
      .ivu-input{
        height: 32px;
      }

    }
    .send-button{
      bottom: 5px;
      right: 5px;
      height: 32px;
    }
  }
}
</style>
