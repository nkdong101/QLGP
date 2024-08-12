<template lang="">
  <div class="header">
    <div class="header-logo"></div>
    <div class="header-menu">
      <el-menu
        default-active="1"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
        active-text-color="#fff"
        text-color="#f1f1f1"
      >
        <el-menu-item @click="menuClick" index="1"
          >
          <!-- <a style="" href="#hero-section">Đăng nhập</a> -->
          <nuxt-link to="/Account/Home/dang-nhap">Đăng nhập</nuxt-link>
          </el-menu-item
        >
        <el-menu-item @click="menuClick" index="2"
          >
          <!-- <a href="#reigter">Đăng ký sử dụng</a> -->
          <nuxt-link to="/Account/Home/dang-ky">Đăng ký sử dụng</nuxt-link>
         
         
          </el-menu-item
        >
        <el-menu-item @click="menuClick" index="3"
          >
          <!-- <a href="#Comment">Góp ý</a> -->
          <nuxt-link to="/Account/Home/gop-y">Góp ý</nuxt-link>

          </el-menu-item
        >
        <!-- <el-submenu index="2">
          <template slot="title"></template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-submenu>
        </el-submenu> -->
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    menuClick(el) {
      // console.log(el)
      el.$el.querySelector("a").click();
      if (el.index === "1") this.$emit("login", true);
      else {
        this.$emit("login", false);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
      /deep/ li {
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
</style>
