<template>
  <div
    class="giapha"
    style="height: 100%; overflow: hidden"
    @wheel="onWheel"
    :style="{
      cursor: isPanning ? 'move' : 'auto',
    }"
  >
    <div
      ref="svgContainer"
      class="svgContainer"
      style="
        height: 100%;
        width: 100%;
        overflow: hidden;
        display: block;
        position: relative;
      "
       
    >
      <!-- -->
      <svg
        @mousedown="startPan"
        @mousemove="pan"
        @mouseup="endPan"
        @mouseleave="endPan"
        @touchstart="startPan"
    @touchmove="pan"
    @touchend="endPan"
    @touchcancel="endPan"
      
        ref="svgElement"
        :viewBox="viewBox"
        style="height: 100%; width: 100%; overflow-x: auto; overflow-y: auto"
      >
        <defs>
          <filter id="dropShadow" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceGraphic" dx="5" dy="5" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>

          <g id="base_node_menu" style="cursor: pointer">
            <rect x="0" y="0" fill="transparent" width="22" height="22"></rect>
            <circle cx="4" cy="11" r="2" fill="#aeaeae"></circle>
            <circle cx="11" cy="11" r="2" fill="#aeaeae"></circle>
            <circle cx="18" cy="11" r="2" fill="#aeaeae"></circle>
          </g>
          <g id="base_up">
            <circle
              cx="15"
              cy="15"
              r="15"
              fill="#fff"
              stroke="#aeaeae"
              stroke-width="1"
            ></circle>
            <svg width="20" height="20" x="5" y="5" viewBox="0 0 512 512">
              <path
                fill="#aeaeae"
                d="m336.061 377.731c-5.086-6.54-14.511-7.717-21.049-2.631l-44.012 34.231v-200.331c0-8.284-6.716-15-15-15s-15 6.716-15 15v200.331l-44.011-34.231c-6.538-5.086-15.962-3.908-21.049 2.631-5.086 6.539-3.908 15.963 2.631 21.049l62.429 48.556v49.664c0 8.284 6.716 15 15 15s15-6.716 15-15v-49.664l62.429-48.556c6.54-5.086 7.717-14.51 2.632-21.049z"
              ></path>
              <path
                fill="#aeaeae"
                d="m271 497v-49.664l62.429-48.556c6.54-5.086 7.717-14.51 2.631-21.049-5.086-6.54-14.511-7.717-21.049-2.631l-44.011 34.231v-200.331c0-8.284-6.716-15-15-15v318c8.284 0 15-6.716 15-15z"
              ></path>
              <path
                fill="#aeaeae"
                d="m320 512h-128c-8.284 0-15-6.716-15-15s6.716-15 15-15h128c8.284 0 15 6.716 15 15s-6.716 15-15 15z"
              ></path>
              <path
                fill="#aeaeae"
                d="m320 482h-64v30h64c8.284 0 15-6.716 15-15s-6.716-15-15-15z"
              ></path>
              <path
                fill="#aeaeae"
                d="m400 439c-61.206 0-111-49.794-111-111s49.794-111 111-111 111 49.794 111 111-49.794 111-111 111z"
              ></path>
              <path
                fill="#aeaeae"
                d="m112 439c-61.206 0-111-49.794-111-111s49.794-111 111-111 111 49.794 111 111-49.794 111-111 111z"
              ></path>
              <path
                fill="#aeaeae"
                d="m256 222c-61.206 0-111-49.794-111-111s49.794-111 111-111 111 49.794 111 111-49.794 111-111 111z"
              ></path>
              <path
                fill="#aeaeae"
                d="m367 111c0-61.206-49.794-111-111-111v222c61.206 0 111-49.794 111-111z"
              ></path>
            </svg>
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
          :config="nodes.Config"
          :transform="`translate(${item.Box.X}, ${item.Box.Y})`"
          @dotClick="dotClick"
          @nameClick="nameClick"
          @findHoNgoai="findHoNgoai"
          ref="node"
          @hook:mounted="movetoNode0(item, index)"
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
        <div>
          <el-button>aaa</el-button>
        </div>
        <el-button style="opacity: 1; padding: 0" slot="reference"></el-button>
      </el-popover>
    </div>
    <!-- <div v-if="node.Data && node.Data.length ==0">
      <el-button type="text">Thêm thông tin đầu tiền</el-button>
    </div> -->
    <DefaultForm :model="form" @actionOK="form.Save.call(this)">
      <div class="fm" :style="{ display: !isAdd ? 'flex' : '' }" slot="content">
        <FormInfo
          :style="{ width: !isAdd ? '30%' : '100%' }"
          ref="form"
          :model="isAdd ? form.obj.form() : form.obj.form2()"
        />
        <div class="tieusu" v-if="!isAdd">
          <p class="title">Tiểu sử</p>
          <div class="ts-content">
            <div v-for="(item, i) in tsArr" :key="i">
              <p>- {{ item }}</p>
            </div>
          </div>
          <div ref="ts_ip">
            <!-- <el-input
              type="textarea"
              :autosize="{ minRows:2}"
              placeholder="Thêm tiểu sử"
              v-model="tieusu"
              @input="showSaveTS"
            >
            </el-input>
            <el-button  @click="addTS" type="primary" v-if="isAddTs"
              >Save</el-button
            > -->
            <QEditor
              ref="entry"
              v-model.lazy="tieusu"
              class="quill-container"
            />
          </div>
        </div>
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
import APIHelper from "~/assets/scripts/API/APIHelper";
export default {
  // layout: this.user.ChucVu === "Administrator" ? 'default' : "UserLayout",
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
      tieusu: "",
      isAddTs: false,
      isAdd: null,
      tsArr: [],
      nodeClicked: null,
      isPanning: null,
      viewBox: "561 0 648 729",
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
          // console.log(quill)
          if (isAdd) {
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
          } else {
            APIHelper.Giapha.getInfor(obj.id).then((re) => {
              //   console.log(re);
              this.form.obj = new Giapha({ ...re });
              this.form.noSave = false;
              this.form.visible = true;
            });
          }
        },
        Save: () => {
          console.log("save", this.tieusu);
        },
      }),
    };
  },
  methods: {
    movetoNode0(item, index) {
      if (index === 0) {
        const node0 = this.$refs.node[0].$el.getBoundingClientRect();
        const svgElement = this.$refs.svgElement;
        const svgRect = svgElement.getBoundingClientRect();

      
        const svgCenterX = svgRect.width;
        

        const [_, y, viewBoxWidth, viewBoxHeight] = this.viewBox
          .split(" ")
          .map(Number);

       
        this.viewBox = `${svgCenterX} ${y} ${viewBoxWidth} ${viewBoxHeight}`;

        
      }
    },

    findHoNgoai(data) {
      console.log(data, localStorage.Dongho_watching);
      //return;
      GetDataAPI({
        url: API.GetTree,
        params: {
          iDongho_id:
            data.Hongoai_id == localStorage.Dongho_watching
              ? data.Dongho_id
              : data.Hongoai_id,
        },
        action: (re) => {
          this.nodes = re;
          localStorage.Dongho_watching =
            data.Hongoai_id == localStorage.Dongho_watching
              ? data.Dongho_id
              : data.Hongoai_id;
          // console.log(this.nodes);
        },
      });
    },
    addTS() {
      this.tsArr.push(this.tieusu);
      this.tieusu = "";
      this.isAddTs = false;
    },
    showSaveTS() {
      if (this.tieusu) {
        this.isAddTs = true;
        console.log(this);
        this.$nextTick(() => {
          this.$refs.ts_ip.scrollIntoView({ behavior: "smooth", block: "end" });
        });
      }
      if (!this.tieusu) {
        this.isAddTs = false;
      }
    },
    nameClick(obj) {
      this.form.ShowForm("Thông tin", obj, true);
    },

    startPan(event) {
       
        if (event.type === 'mousedown' && event.button !== 0) return; 

        this.isPanning = true;

   
        const clientX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
        const clientY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;

        this.startPoint = { x: clientX, y: clientY };

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

     
        const clientX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
        const clientY = event.type === 'mousemove' ? event.clientY : event.touches[0].clientY;

        const dx = (this.startPoint.x - clientX) * ((this.startViewBox.width + 500) / this.$refs.svgElement.clientWidth);
        const dy = (this.startPoint.y - clientY) * ((this.startViewBox.height + 500) / this.$refs.svgElement.clientHeight);

        let newX = this.startViewBox.x + dx;
        if (this.startViewBox.x + dx < 0) return;

        this.viewBox = `${newX} ${this.startViewBox.y + dy} ${this.startViewBox.width} ${this.startViewBox.height}`;
    },
    endPan() {
        this.isPanning = false;
    },
    nodePosition(item, index) {
      // console.log(item);
      if (item.fid && item.mid) {
        // console.log(item);
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

        if (newWidth > 1700 || newWidth < 135) return;

        this.viewBox = `${x + dx} ${y + dy} ${newWidth} ${newHeight}`;
        // if (this.nodeClicked) {
        //   const node = this.nodeClicked.$el;

        //   if (node) {
        //     const rect = node.getBoundingClientRect();

        //     this.nodePoperStyles = `transform: translate(${rect.x}px,${rect.y}px)`;
        //     // this.showPopover(rect.top + window.scrollY, rect.left + window.scrollX);
        //   }
        // this.$refs.pop.doDestroy();
        // this.updatePopoverPosition();
      }
    },
    // updatePopoverPosition() {
    //   const { x, y } = this.lastClickPosition;
    //   // Convert coordinates to viewBox-relative coordinates
    //   const [viewBoxX, viewBoxY, viewBoxWidth, viewBoxHeight] = this.viewBox
    //     .split(" ")
    //     .map(Number);
    //   const svgWidth = this.$refs.svgElement.getBoundingClientRect().width;
    //   const svgHeight = this.$refs.svgElement.getBoundingClientRect().height;

    //   const scaleX = svgWidth / viewBoxWidth;
    //   const scaleY = svgHeight / viewBoxHeight;

    //   const relativeX = (x - viewBoxX) * scaleX;
    //   const relativeY = (y - viewBoxY) * scaleY;

    //   this.nodePoperStyles = {
    //     position: "absolute",
    //     top: `${relativeY}px`,
    //     left: `${relativeX}px`,
    //     transform: "none", // Ensure no additional transform interferes
    //   };
    // },

    dotClick(item) {
      // console.log("click", item);
      this.form.ShowForm(`Thông tin của ${item.name}`, item, false);
    },
    nodeClick() {
      // console.log("click");
    },
    moveTofirst() {
      const firstElement = this.nodes.Data[0];
      if (firstElement) {
        const padding = 20; // Add some padding
        const x = firstElement.Box.X - padding;
        const y = firstElement.Box.Y - padding;
        const width = firstElement.Box.Width + padding * 2;
        const height = firstElement.Box.Height + padding * 2;

        // Set the viewBox to focus on the first element
        this.viewBox = `${x} ${y} ${width} ${height}`;
      }
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
    console.log(this);

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
.giapha {
  background-color: #fff;
  border-radius: 10px;
}

.fm {
  height: 100%;
  // overflow: hidden;

  .form-info {
    height: 100%;
    /deep/ .form-info-c {
      height: 100%;
      display: flex;
      // overflow-y: auto;
      overflow-x: hidden;
      flex-direction: column;
      > div:nth-child(3) {
        // height:100%;
        // background:red;
        // div:nth-child(2){
        // height: 100%;
        // overflow-y: auto;
        // }
        #div_siblings_form {
          // height: 100%;
          // overflow-y: auto;
        }
      }
    }
  }
  .tieusu {
    border: 1px solid rgb(203, 203, 203);
    border-radius: 10px;
    width: 100%;
    height: 100%;
    padding: 10px;
    margin-left: 10px;
    position: relative;
    overflow: auto;
    .title {
      //  position: absolute;
      //  top: 0;
      //  left: 0;
      font-weight: bolder;
      //  transform: translate(50%, 50%);
      //  z-index: 1000;
      height: auto;
      //  width:100%;
      padding: 5px 10px;
      // background-color: white;
    }
    .ts-content {
      padding: 10px 0;
      div {
        padding-bottom: 10px;
      }
    }
  }
}
.fm ::v-deep .form-info .form-info-c > .el-row {
  justify-content: center;
}

.svgContainer .btn-p {
  position: absolute;
  top: 0;
  left: 0;
}

@media only screen and (max-width: 800px) {
  /deep/#div_Couple_form{
    width: 100%;
    margin-bottom: 5px;
    overflow-x: scroll;
    border-right: 1px solid gray;
    #Couple_form{
      min-width: 560px;
    
    }
  }

  /deep/#div_siblings_form{
    width: 100%;
    margin-bottom: 5px;
    overflow-x: scroll;
    #siblings_form{
      min-width: 560px;
    }
  }

}
</style>
