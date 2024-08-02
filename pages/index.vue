<template>
  <div style="height: 100%; overflow: hidden">
    <InputContainer style="width: 200px" label="Dòng họ" :labelWidth="100">
      <InputSelect
        @input="ChangeInpt"
        v-model="dongho_id"
        :model="Para.dong_ho"
      />
    </InputContainer>

    <FamilyTree
      @nodeEventClicked="handleClickNode"
      ref="FamilyTree"
      :nodes="nodes"
      :model="model"
    />
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

  data() {
    return {
      dongho_id: null,
      model: {
        enableSearch: false,
        template: "myTemplate",
      },
      nodes: [],
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
    LoadData(id){
      // console.log('id',id);
      this.form.visible = false;
      // return;
      GetDataAPI({
            url: API.GetFamily,
            params: {
              iPerson_id: id,
            },
            action: (re) => {
              this.$nextTick(()=>{
                this.form.obj = new Giapha({
                ...re,
              });
              })
             
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
        },
      });
    },
  },
  mounted() {
    this.dongho_id = this.user.Dongho_id;
    // this.GetNodeData();
  },
  beforeMount() {
      EventBus.$on("reloadFormFam", this.LoadData);
    },
  
    beforeDestroy() {
      EventBus.$off("reloadFormFam", this.LoadData);
    },
};
</script>

<style lang="scss" scoped>
.fm{
  height:100%;
  overflow:hidden;
  .form-info{
    height:100%;
    /deep/ .form-info-c{
      height:100%;
      display: flex;
      overflow: hidden;
      flex-direction: column;
      div:nth-child(3){
        // height:100%;
        // background:red;
        // div:nth-child(2){
        //   height:100%;
          overflow: hidden;
        // }
        #div_siblings_form{
          height:100%;
          overflow: hidden;
        }
      }
    }
  }
}
.fm /deep/ .form-info .form-info-c .el-row {
  justify-content: center ;
}
</style>
