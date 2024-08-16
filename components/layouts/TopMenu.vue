<template lang="">
  <div :class="['header', { hasUser: user && $route.path !=='/Account/Home/trang-chu' }]">
    <div class="header-logo"></div>
    <div class="header-menu">
      <el-menu
        :default-active="$route.path"
        class="el-menu"
        mode="horizontal"
        :active-text-color="!user ? '#fff' : '#fff'"
        :text-color="user ? '#f1f1f1' : '#f1f1f1'"
        :router="true"
      >
        <el-menu-item  @click="menuClick" index="/Account/Home/trang-chu">
          <!-- <a style="" href="#hero-section">Đăng nhập</a> -->
          <nuxt-link to="/Account/Home/trang-chu">Trang chủ</nuxt-link>
          <!-- Đăng nhập -->
        </el-menu-item>
        <el-menu-item v-if="user" index="/"> <nuxt-link to="/"> Gia phả </nuxt-link></el-menu-item>
        <el-menu-item
          v-if="!user"
          @click="menuClick"
          index="/Account/Home/dang-ky"
        >
          <!-- <a href="#reigter">Đăng ký sử dụng</a> -->
          <nuxt-link to="/Account/Home/dang-ky">Đăng ký sử dụng</nuxt-link>
          <!-- Đăng ký sử dụng -->
        </el-menu-item>
        <el-menu-item v-if="!user" @click="menuClick" index="/Account/Home/gop-y">
          <!-- <a href="#Comment">Góp ý</a> -->
          <nuxt-link to="/Account/Home/gop-y">Góp ý</nuxt-link>
        </el-menu-item>
        <el-submenu  v-if="user" popper-class="submenu" index="#">
          <template slot="title">Mở rộng</template>

          <el-menu-item
            v-for="item in menu"
            :key="item.index"
            :index="item.path"
            >{{ item.banner }}</el-menu-item
          >
          <!-- <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item> -->
        </el-submenu>
        <el-menu-item
          style="display: flex; align-items: center"
          v-if="user"
          index="#"
        >
          <Avatar />
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
import StoreManager from "~/assets/scripts/StoreManager";

export default {
  computed: {
    menu() {
      return StoreManager.GetMenu();
    },
  },
  methods: {
    menuClick(el) {
      // // console.log(el)
      // el.$el.querySelector("a").click();
      // if (el.index === "1") this.$emit("login", true);
      // else {
      //   this.$emit("login", false);
      // }
    },
  },
  mounted() {
    console.log("topmenu", this);
    console.log("topmenu", StoreManager.GetMenu());
  },
};
</script>
<style lang="scss" scoped>


// .el-menu--popup {
//  
// }
.hasUser {
  position: static !important;
  // background-image: linear-gradient(
  //     180deg,
  //     rgba(48, 53, 58, 0.6) 0%,
  //     rgba(50, 48, 48, 0.2) 70%
  //   ),
  //   url("/images/banner1.jpg") !important;
  //   background-size: fill,cover !important;;
    // background-position: center !important;;

  // /deep/
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10%;
  position: fixed;
  background: inherit;
  z-index: 1000;
  width: 100%;
  backdrop-filter: blur(2px);
  .header-logo {
    width: 50px;
    height: 50px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    // background-;
    background-image: url("/images/vanhoaviet.png");
  }

  .header-menu {
    .el-menu {
      border: 0;
      background-color: inherit !important;
      /deep/ .el-submenu {
        div {
          &:hover {
            background: transparent;
          }
          border: 0;
          line-height: 50px;
          height: 50px;
          i{
            color: white;
            font-size: 14px;
          }
        }
      }
      .el-menu-item {
        letter-spacing: 0.02em;
        position: relative;
        background-color: inherit !important;
        font-weight: 500;
        padding: 0;
        text-align: center;
        height: 50px;
        border: 0 !important;
        line-height: 50px;
        a {
          padding: 0 40px;
          // text-align: center
          text-decoration: none;
        }
        &::after {
          content: "";
          width: 100%;
          position: absolute;
          height: 2px;
          background-color: #f1f1f1;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          opacity: 0;
        }

        // &::before {
        //   content: "";
        //   width: 0;
        //   position: absolute;
        //   height: 3px;
        //   background-color: #000;
        //   left: 0;
        //   bottom: 0;
        //   // transform: translateX(-100%);
        //   // opacity: 0;

        // }
        &:hover {
          transform: translateY(-1px);

          transition: transform 0.2s ease;
          &::before {
          }
        }

        .el-submenu__title {
          height: 50px;
          line-height: 50px;
        }
      }
      .is-active {
        text-decoration: none !important;
        // font-weight: bold;
        // color: yellow;
        &::after {
          // top: 65%;
          width: calc(100% - 75px);
          transition: all 0.5s ease;
          opacity: 1;
          left: 50%;
          transform: translate(-50%, -600%);
        }
        &::before {
          display: none;
          // transition: 0s !important;
        }
      }
    }
  }
}
.el-menu--horizontal > .el-menu-item.is-active {
  // border: unset;
}

// . 


</style>
