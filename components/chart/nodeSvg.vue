<template lang="">
  <g
    style="pointer-events: bounding-box"
    :transform="transform"
    @click="handleClick"
  >
    <rect
      :x="0"
      :y="0"
      :height="config.Height"
      :width="config.Width"
      fill="#ffffff"
      stroke-width="3"
      :stroke="getFillColor(data.gender)"
      rx="5"
      ry="5"
    ></rect>
    <rect
      x="0"
      y="0"
      height="20"
      :width="config.Width"
      :fill="getFillColor(data.gender)"
      stroke-width="1"
      stroke="#b1b9be"
      rx="5"
      ry="5"
    ></rect>
    <line
      x1="0"
      y1="20"
      :x2="config.Width"
      y2="20"
      stroke-width="5"
      :stroke="getFillColor(data.gender)"
    ></line>
    <text
      data-width="160"
      data-text-overflow="multiline"
      style="font-size: 14px"
      fill="black"
      x="100"
      y="66"
      text-anchor="start"
      ><tspan x="100" y="66" text-anchor="start">{{ data.name }}</tspan></text
    >
    <use xlink:href="#base_img_0_stroke" />
    <circle id="base_img_0_stroke" fill="#b1b9be" cx="45" cy="62" r="37" />
    <image
      preserveAspectRatio="xMidYMid slice"
      clip-path="url(#base_img_0)"
      xlink:href="https://www.industrialempathy.com/img/remote/ZiClJf-640w.avif"
      x="10"
      y="26"
      width="72"
      height="72"
    ></image>
    <!-- <el-popover
    
    placement="top-start"
    title="Title"
    width="200"
    trigger="click"
    content="this is content, this is content, this is content">
    <el-button :ref="'pop' + data.id" slot="reference">Hover to activate</el-button>
    </el-popover> -->
    <use @click="handClickdot" :data-ctrl-n-menu-id="data.id" x="210" y="95" xlink:href="#base_node_menu"></use>
    
      
     
  </g>
</template>
<script>
export default {
  props: {
    data: {},
    config: {},
    transform: {
      type: String,
      default: "",
    },
  },
  methods: {
    handClickdot(){
      console.log("handClickdotdotdotdot")
      // console.log(this.$refs['pop'+this.data.id])
      // this.$refs['pop'+this.data.id].click();
    },
    getFillColor(gender) {
      return gender === "male" ? "#6bb4df" : "#cb4aaf";
    },
    handleClick() {
      console.log(this.data);
    },
  },

  mounted() {
    // console.log(this.data)
  },
};
</script>
<style lang=""></style>
