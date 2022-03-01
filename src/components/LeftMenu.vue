<template>
  <el-aside width="220px">
    <div class="left-title">x</div>
    <ul class="header-nav">
      <router-link :to="item.url" v-for="item in navList" :target="item.key ==='1'? '_blank': ''" :key="item.key" :class="{active: $route.path.indexOf(item.url) !== -1, navItem: true}">
        <img :src="$route.path.indexOf(item.url) !== -1? item.iconPathActive: item.iconPath" alt="">
        <span>{{item.name}}</span>
      </router-link>
    </ul>
  </el-aside>
</template>

<script>
import mainIcon from "assets/image/menu_main_icon.png";
import mainIconActive from "assets/image/menu_main_icon_active.png";
import anaysisIcon from "assets/image/menu_anaysis_icon.png";
import anaysisIconActive from "assets/image/menu_anaysis_icon_active.png";
import equIcon from "assets/image/menu_equ_icon.png";
import equIconActive from "assets/image/menu_equ_icon_active.png";
import monitorIcon from "assets/image/menu_monitor_icon.png";
import monitorIconActive from "assets/image/menu_monitor_icon_active.png";
import notifyIcon from "assets/image/menu_notify_icon.png";
import notifyIconActive from "assets/image/menu_notify_icon_active.png";
import userIcon from "assets/image/menu_user_icon.png";
import userIconActive from "assets/image/menu_user_icon_active.png";

export default {
  name: 'LeftMenu',
  data() {
    return {
      navList: [
        { key: "1", name: "xx", url: "/home", iconPath: mainIcon, iconPathActive: mainIconActive },
        { key: "2", name: "xx", url: "/areaMonitor", iconPath: monitorIcon, iconPathActive: monitorIconActive },
        { key: "3", name: "x", url: "/targetBehaviorAnalysis", iconPath: anaysisIcon, iconPathActive: anaysisIconActive },
        { key: "4", name: "x", url: "/deviceAssets", iconPath: equIcon, iconPathActive: equIconActive },
        { key: "5", name: "x", url: "/noticeConfig", iconPath: notifyIcon, iconPathActive: notifyIconActive },
        // { key: "6", name: "x", url: "/accountManage", iconPath: userIcon, iconPathActive: userIconActive },
      ],
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.left-title {
  width: 100%;
  height: 80px;
  text-align: center;
  line-height: 80px;
  color: #fff;
  font-size: 18px;
}
.header-nav {
  list-style: none;
}
.navItem {
  display: block;
  color: #ffffff;
  cursor: pointer;
  width: 100%;
  height: 58px;
  line-height: 50px;
  padding-left: 26px;
  border-top: #394149 solid 1px;
  img {
    height: 20px;
    width: 20px;
    vertical-align: middle;
  }
  span {
    font-size: 14px;
    vertical-align: middle;
    margin-left: 8px;
  }
}
.active {
  border-left: #178eea solid 5px;
  font-weight: bold;
  background: #2c343b;
  padding-left: 21px;
}

.el-aside {
  background: #323b43;
  
}
</style>
