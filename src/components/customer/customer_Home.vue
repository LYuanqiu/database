<template>
  <div class="home">
    <div class="header">头部</div>
    <template v-if="show">
      <div class="header">
        <router-link to="/customerHome"
                     class="header-title">电商网站首页</router-link>
        <div class="header-menu">
          {{user}}
        </div>
        <div class="header-menu">
          <router-link to="/cart"
                       class="header-menu-cart">
            购物车
            <span v-if="cartList.length">{{cartList.length}}</span>
          </router-link>
        </div>

        <div class="header-menu">
          <router-link to="/login/logout"
                       class="header-menu-cart">
            退出登录
          </router-link>
        </div>
        <customerList></customerList>
      </div>
      <router-view></router-view>
    </template>
    <!-- 挂载所有路由 -->
    <router-view></router-view>
  </div>
</template>

<script>
import customerList from "./customer_list.vue"
export default {
  components: {
    customerList
  },
  data(){
    return {
      user: this.$store.state.username
    }
  },
  computed: {
    cartList(){
      return this.$store.state.cartList;
    },
    show(){
      return true;
    }
  }
}
</script>

<style scoped>
.header {
  position: absolute;
  line-height: 40px;
  top: 0px;
  left: 0px;
  right: 0px;
}
body{
  margin:0;
}
</style>