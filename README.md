#项目概述

##项目使用vue2+vuex2+webpack2，使用babel来polyfill，使用eslint进行代码检查（build时）

#项目目录
##目录基于vue-cli生成的项目结构(命令：vue init webpack abc)

* build： 构建用的配置文件，基础构建文件是webpack.base.config.js
* config：所有设置项都放在此文件夹
  + api.config.js：请求相关配置，请求路径、代理路径、状态码设置、超时时间等都在此设置
  + env.config.js：不同构建类型环境配置
  + index.config.js：构建配置
  + rem.config.js：自适应rem配置
* dist：构建生成的文件，不会提交到gitlab
* src：项目源码
    + api：请求都在此，一个文件代表一个模块，例如order.js。所有文件需通过引入'lib/request'进行请求
    + components：所有的组件都在此，公用组件放在components目录下，非公用组件以模块名建文件夹存放
    + image：图片集合地，小图标放icon文件夹，其他公用图片放image目录下，非公用图片以模块名建文件夹存放
    + icon：小图标集合地，文件夹以icon-开头，例如icon-cart
    + lib：公用辅助库，有模块概念的单独成文件，例如request.js表示请求模块，小函数放util.js里
    + page：页面文件所在，每个模块一个文件夹，每个文件下面放各个页面。例如page/order/orderList表示订单模块的订单列表页面
    + router：路由，每个模块一个文件，每个文件若干个路由，每个路由包含path、name和beforeEnter。其中name对应page相应页面。例如：router/user.js里的{name: 'profile'}会自动加载 page/user/profile.vue并将router名改为userProfile
    + store：model/action管理。
        - common.js：公共action、getter和mutations
        - types.js：所有类型常量，每个模块export一个对象
        - index.js：将所有模块的store打包
        - modules：业务模块，每个模块一个文件，每个文件包含state、getters、mutations、actions
    + style：每个模块一个文件，放置该模块的公用样式
        - common.styl：全局公用样式
    + App.vue：最顶层组件
    + main.js：入口文件
* static：预留文件夹
* test：单元测试


#项目构建


#代码风格


#其他
##z-index设置
普通业务组件：不设置z-index
普通定位组件：不设置z-index
mask：99
确认框：200
loading：250
toast：990
如非必要，z-index不要超过200
