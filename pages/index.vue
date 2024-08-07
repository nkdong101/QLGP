<template>
  <div
    style="height: 100%; overflow: hidden"
    @wheel="onWheel"
    :style="{
      cursor: isPanning ? 'move' : 'auto',
    }"
  >
    <!-- <InputContainer style="width: 200px" label="Dòng họ" :labelWidth="100">
      <InputSelect
        @input="ChangeInpt"
        v-model="dongho_id"
        :model="Para.dong_ho"
      />
    </InputContainer> -->

    <!-- <FamilyTree
      @nodeEventClicked="handleClickNode"
      ref="FamilyTree"
      :nodes="nodes"
      :model="model"
    /> -->
    <div
      ref="svgContainer"
      class="svgContainer"
      style="
        height: 100%;
        width: 100%;
        overflow: auto;
        display: block;
        position: relative;
      "
    >
      <svg
        @mousedown="startPan"
        @mousemove="pan"
        @mouseup="endPan"
        @mouseleave="endPan"
        ref="svgElement"
        :viewBox="viewBox"
        style="height: 100%; width: 100%; overflow-x: auto; overflow-y: auto"
      >
        <defs>
          <g id="base_node_menu" style="cursor: pointer">
            <rect x="0" y="0" fill="transparent" width="22" height="22"></rect>
            <circle cx="4" cy="11" r="2" fill="#aeaeae"></circle>
            <circle cx="11" cy="11" r="2" fill="#aeaeae"></circle>
            <circle cx="18" cy="11" r="2" fill="#aeaeae"></circle>
          </g>

          <!-- <symbol id="base_node_menu" viewBox="0 0 24 24">
            <rect x="0" y="0" fill="transparent" width="22" height="22"></rect>
            <circle cx="4" cy="11" r="2" fill="#aeaeae"></circle>
            <circle cx="11" cy="11" r="2" fill="#aeaeae"></circle>
            <circle cx="18" cy="11" r="2" fill="#aeaeae"></circle>
  </symbol> -->
          <clipPath id="base_img_0">
            <circle id="base_img_0_stroke" cx="45" cy="62" r="35" />
          </clipPath>
        </defs>
        <g
          :data-l-id="`[${item.Id1}][${item.Id2}]`"
          v-for="item in nodes.Lines"
          :key="item.Points"
        >
          <path
            stroke-linejoin="round"
            stroke="#aeaeae"
            stroke-width="1px"
            fill="none"
            :d="item.Points"
          ></path>
        </g>
        <nodeSvg
          v-for="(item, index) in nodes.Data"
          :key="item.id"
          :data="item"
          :ref="'node' + item.id"
          :config="nodes.Config"
          :transform="`translate(${item.Box.X}, ${item.Box.Y})`"

          @nameClick="nameClick"
        />
      </svg>

      <el-popover
        :style="nodePoperStyles"
        class="btn-p"
        placement="right"
        popper-class="btn-poper"
        ref="pop"
        width="100"
        trigger="manual"     
      >

      <div >
        <el-button>aaa</el-button>
      </div>
        <el-button style="opacity: 1;padding:0" slot="reference"></el-button>
      </el-popover>
    </div>

    <DefaultForm :model="form" @actionOK="form.Save.call(this)">
      <div class="fm" slot="content">
        <FormInfo ref="form" :model="form.obj.form()" />
      </div>
    </DefaultForm>
  </div>
</template>

<script>
import Giapha from "~/assets/scripts/objects/Giapha";
import DefaultForm from "~/assets/scripts/base/DefaultForm";
import API from "~/assets/scripts/API";
import {
  ShowMessage,
  ShowConfirm,
  MessageType,
} from "~/assets/scripts/Functions";
import GetDataAPI from "~/assets/scripts/GetDataAPI";
import { EventBus } from "~/assets/scripts/EventBus.js";

export default {
  computed: {
    svgStyle() {
      return {
        height: this.nodes.Config.MaxHeight + "px",
        // width: this.nodes.Config.MaxWidth + "px",
        width: this.nodes.Config.MaxWidth + "px",
      };
    },
  },
  data() {
    return {
      lastClickPosition: { x: 0, y: 0 },
      nodeClicked: null,
      isPanning: null,
      viewBox: "561 -7 648 729",
      viewBoxImg: "0 200 200 200",
      dongho_id: null,
      model: {
        enableSearch: false,
        template: "myTemplate",
      },
      nodePoperStyles: {
        top: `0px`,
        left: `0px`,
      },
      nodes: {
        Config: {},
      },
      form: new DefaultForm({
        obj: new Giapha(),
        title: "",
        visible: false,
        // type: 'dialog',
        // width: "500px",
        noSave: true,
        fullscreen: true,
        ShowForm: (title, obj, isAdd) => {
          this.isAdd = isAdd;
          var _app = this;
          this.form.title = title;
          // if (!isAdd) {
          //   obj = obj;
          //   if (!obj) {
          //     ShowMessage("You need choose 1 selection!");
          //     return;
          //   }
          // }
          GetDataAPI({
            url: API.GetFamily,
            params: {
              iPerson_id: obj.id,
            },
            action: (re) => {
              this.form.obj = new Giapha({
                ...re,
              });
              this.form.visible = true;
            },
          });
        },
        Save: () => {
          console.log("save", this.family);
        },
      }),
    };
  },
  methods: {
   
    nameClick(obj){
      this.form.ShowForm('Thông tin',obj,true);
    },

    startPan(event) {
      if (event.button !== 0) return; // Only respond to left mouse button
      this.isPanning = true;
      this.startPoint = { x: event.clientX, y: event.clientY };
      const viewBoxValues = this.viewBox.split(" ").map(Number);
      this.startViewBox = {
        x: viewBoxValues[0],
        y: viewBoxValues[1],
        width: viewBoxValues[2],
        height: viewBoxValues[3],
      };
    },
    pan(event) {
      if (!this.isPanning) return;

      const dx =
        (this.startPoint.x - event.clientX) *
        (this.startViewBox.width / this.$refs.svgElement.clientWidth);
      const dy =
        (this.startPoint.y - event.clientY) *
        (this.startViewBox.height / this.$refs.svgElement.clientHeight);

      this.viewBox = `${this.startViewBox.x + dx} ${this.startViewBox.y + dy} ${
        this.startViewBox.width
      } ${this.startViewBox.height}`;
    },
    endPan() {
      this.isPanning = false;
    },
    nodePosition(item, index) {
      console.log(item);
      if (item.fid && item.mid) {
        console.log(item);
        // console.log(`translate(${index * (this.nodes.Config.Width + 30)},  ${item.Level * (this.nodes.Config.Height + 50)})`)
        return `translate(${index * (this.nodes.Config.Width + 30)},  ${
          item.Level * (this.nodes.Config.Height + 50)
        })`;
      }

      return `translate(${index * (this.nodes.Config.Width + 50)}, 0)`;
    },

    LoadData(id) {
      // console.log('id',id);
      this.form.visible = false;
      // return;
      GetDataAPI({
        url: API.GetFamily,
        params: {
          iPerson_id: id,
        },
        action: (re) => {
          this.$nextTick(() => {
            this.form.obj = new Giapha({
              ...re,
            });
          });
          this.GetNodeData();
          this.form.visible = true;
        },
      });
    },
    handleClickNode(title, obj, isAdd) {
      console.log(title, obj, isAdd);
      this.form.ShowForm(title, obj, isAdd);
    },
    ChangeInpt(val) {
      this.dongho_id = val;
      this.GetNodeData();
    },
    GetNodeData() {
      GetDataAPI({
        url: API.GetTree,
        params: {
          iDongho_id: this.dongho_id || this.user.Dongho_id,
        },
        action: (re) => {
          this.nodes = re;
          // console.log(this.nodes);
        },
      });
    },
    onWheel(e) {
      // console.log(e);
      // this.$refs.pop.doDestroy();
      if (e.ctrlKey) {
        
        e.preventDefault(); 
        const svgElement = this.$refs.svgElement;
       
        const { left, top, width, height } = svgElement.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;
        const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9;

        const viewBoxValues = this.viewBox.split(" ").map(Number);
        const [x, y, viewBoxWidth, viewBoxHeight] = viewBoxValues;

        const newWidth = viewBoxWidth * zoomFactor;
        const newHeight = viewBoxHeight * zoomFactor;

        const dx = (mouseX / width) * (viewBoxWidth - newWidth);
        const dy = (mouseY / height) * (viewBoxHeight - newHeight);

        this.viewBox = `${x + dx} ${y + dy} ${newWidth} ${newHeight}`;
        // if (this.nodeClicked) {
        //   const node = this.nodeClicked.$el;

        //   if (node) {
        //     const rect = node.getBoundingClientRect();

        //     this.nodePoperStyles = `transform: translate(${rect.x}px,${rect.y}px)`;
        //     // this.showPopover(rect.top + window.scrollY, rect.left + window.scrollX);
        //   }
        // this.$refs.pop.doDestroy();
        this.updatePopoverPosition();
      }
    },
    updatePopoverPosition() {
      const { x, y } = this.lastClickPosition;
      // Convert coordinates to viewBox-relative coordinates
      const [viewBoxX, viewBoxY, viewBoxWidth, viewBoxHeight] = this.viewBox
        .split(" ")
        .map(Number);
      const svgWidth = this.$refs.svgElement.getBoundingClientRect().width;
      const svgHeight = this.$refs.svgElement.getBoundingClientRect().height;

      const scaleX = svgWidth / viewBoxWidth;
      const scaleY = svgHeight / viewBoxHeight;

      const relativeX = (x - viewBoxX) * scaleX;
      const relativeY = (y - viewBoxY) * scaleY;

      this.nodePoperStyles = {
        position: "absolute",
        top: `${relativeY}px`,
        left: `${relativeX}px`,
        transform: "none", // Ensure no additional transform interferes
      };
    },

    // dotClick(item) {
    //   this.nodeClicked = item;
    //   if(this.$refs.pop.showPopper){
    //     this.$refs.pop.doClose();
    //   }
    //   this.$nextTick(() => {
    //     const node = item.$el; // Adjusted for Vue v-for array ref
    //     if (node) {
    //       const rect = node.getBoundingClientRect();
    //       this.lastClickPosition = {
    //         x: rect.left + window.scrollX,
    //         y: rect.top + window.scrollY,
    //       };
    //       // this.updatePopoverPosition();
    //       this.nodePoperStyles = {

    //         top: `${rect.y}px`,
    //         left: `${rect.x}px`,
    //         transform: "none", // Ensure no additional transform interferes
    //       };
    //       console.log(this.$refs.pop)
    //       this.$refs.pop.doToggle();
    //     }
    //   });
    // },
    nodeClick() {
      console.log("click");
    },
  },
  mounted() {
    this.$refs.svgContainer.addEventListener("wheel", this.onWheel, {
      passive: false,
    });
    // console.log(this)
    // this.$refs.svgContainer.querySelector('g').addEventListener("click", this.nodeClick);
    this.dongho_id = this.user.Dongho_id;
    this.GetNodeData();

    // <
  },
  beforeMount() {
    EventBus.$on("reloadFormFam", this.LoadData);
  },

  beforeDestroy() {
    this.$refs.svgContainer.removeEventListener("wheel", this.onWheel);
    // this.$refs.svgContainer.querySelector('g').removeEventListener("click", this.nodeClick);
    EventBus.$off("reloadFormFam", this.LoadData);
  },
};
</script>

<style lang="scss" scoped>
.fm {
  height: 100%;
  overflow: hidden;
  .form-info {
    height: 100%;
    /deep/ .form-info-c {
      height: 100%;
      display: flex;
      overflow: hidden;
      flex-direction: column;
      > div:nth-child(3) {
        // height:100%;
        // background:red;
        // div:nth-child(2){
        height: 100%;
        overflow: hidden;
        // }
        #div_siblings_form {
          height: 100%;
          overflow: auto;
        }
      }
    }
  }
}
.fm /deep/ .form-info .form-info-c .el-row {
  justify-content: center;
}

.svgContainer .btn-p {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
