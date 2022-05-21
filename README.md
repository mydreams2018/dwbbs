# dwbbs

#### 介绍
H5开源web聊天,目前已经完成了用户的注册、登录、添加好友、删除好友、

查询好友、添加聊天、显示聊天、上传用户图片、修改用户备注功能、

和后端数据交互使用的是websocket .前后端信息交互主要使用json格式.上传文件使

用的是自定的规则...

自定义的前后端JSON数据交互协议例:

```js
const queryCurrentFriends ={
    uuid:"",
    url:"queryUsersFriends",
    src:"queryUsersFriends",
    tar:"queryUsersFriends",
    charts:{
        nikeName:"",
        currentPage:1,
        totalPage:1,
        currentActiveId:"m1-friends",
        tokenSession:websktoken
    }
}
```
#### 版本说明
05-01日: 更新了前端的部分布局、加入了后端通知机制的协调

05-12日: 加入TLS加密协议、使用原生SSLEngine实现.

05-15日: 加入手机端css样式

#### 线上测试地址
https://www.kungreat.cn/
#### 详细介绍地址
https://space.bilibili.com/384704339
#### 界面图

1. 注册界面<img src="https://www.kungreat.cn/images/images_md/register.PNG" style="zoom:50%;" />
2. 登录 <img src="https://www.kungreat.cn/images/images_md/login.PNG" alt="login" style="zoom:50%;" />
3. 用户查询 <img src="https://www.kungreat.cn/images/images_md/users.PNG" alt="friends" style="zoom:50%;" />

4.好友列表<img src="https://www.kungreat.cn/images/images_md/friends.PNG" alt="friends" style="zoom:50%;" />

5.用户设置 支持选择图片上传 和拖拉 上传图片

<img src="https://www.kungreat.cn/images/images_md/settings.PNG" alt="settings" style="zoom:50%;" />

6.聊天区域

<img src="https://www.kungreat.cn/images/images_md/viewsend.PNG" alt="viewsend" style="zoom:50%;" />

7.手机端样式

<img src="https://www.kungreat.cn/images/images_md/pacs.PNG" alt="pacs" style="zoom:50%;" />

<img src="https://www.kungreat.cn/images/images_md/pchs.PNG" alt="pchs" style="zoom:50%;" />

<img src="https://www.kungreat.cn/images/images_md/pfs.PNG" alt="pfs" style="zoom:50%;" />

<img src="https://www.kungreat.cn/images/images_md/pnts.PNG" alt="pnts" style="zoom:50%;" />

<img src="https://www.kungreat.cn/images/images_md/pscts.PNG" alt="pscts" style="zoom:50%;" />

#### 软件架构

软件架构说明
HTML5  javaScript  css  

#### 安装教程

1.  下载此项目源代码.
2.  放在任意一个前端服务器
3.  启动前端服务器访问

#### 使用说明

1.  需要配合后端使用.
2.  https://github.com/mydreams2018/cpdog
