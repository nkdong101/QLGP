<template>
  <div style="height: 100%; overflow: auto">
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
    <div ref="svgContainer" :style="svgStyle">
      <svg :viewBox="viewBox" style="height: 100%; width: 100%; display: block">
        <defs>
          <g id="base_node_menu" style="cursor:pointer;"><rect x="0" y="0" fill="transparent" width="22" height="22"></rect><circle cx="4" cy="11" r="2" fill="#aeaeae"></circle><circle cx="11" cy="11" r="2" fill="#aeaeae"></circle><circle cx="18" cy="11" r="2" fill="#aeaeae"></circle></g>
          <clipPath id="base_img_0">
            <circle id="base_img_0_stroke" cx="45" cy="62" r="35" />
          </clipPath>
        </defs>

        <g data-l-id="[22][23]" class="link right-partner">
          <path
            stroke-linejoin="round"
            stroke="#aeaeae"
            stroke-width="1px"
            fill="none"
            d="M326.25,60 L366.25,60"
          ></path>
        </g>
        <nodeSvg
          v-for="(item, index) in nodes.Data"
          :key="item.id"
          :data="item"
          :config="nodes.Config"
          :transform="`translate(${item.Box.X}, ${item.Box.Y})`"
        />
      </svg>
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
        maxWidth: this.nodes.Config.MaxWidth + "px",
      };
    },
  },
  data() {
    return {
      viewBox: "0 0 600 500",
      viewBoxImg: "0 200 200 200",
      dongho_id: null,
      model: {
        enableSearch: false,
        template: "myTemplate",
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
          //   this.Save();
          console.log("save", this.family);
        },
      }),
    };
  },
  methods: {
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
      if (e.ctrlKey) {
        e.preventDefault();
        const scaleAmount = e.deltaY > 0 ? 1.1 : 0.9;
        const [x, y, width, height] = this.viewBox.split(" ").map(Number);
        const [xImg, yImg, widthImg, heightImg] = this.viewBoxImg
          .split(" ")
          .map(Number);
        const newWidth = width * scaleAmount;
        const newHeight = height * scaleAmount;
        const nwidthImg = widthImg * scaleAmount;
        const nheightImg = heightImg * scaleAmount;
        this.viewBox = `${x} ${y} ${newWidth} ${newHeight}`;
        this.viewBoxImg = `${xImg} ${yImg} ${nwidthImg} ${nheightImg}`;
      }
    },
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
</style>
