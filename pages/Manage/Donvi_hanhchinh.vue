<template lang="">
  <div
    style="
      height: 100%;
      width: 100%;
      display: flex;
      align-items: flex-start;
      flex: 1 1;
    "
  >
    <div style="height: 100%;width: 50%" class="tinh">
      <TablePaging ref="tp" :model="tp">
        <template slot="column-header-button">
          <el-button
            @click="form.ShowForm('Thêm tỉnh', true, {})"
            type="primary"
          >
            <i class="fa fa-plus"></i>
          </el-button>
        </template>
        <template slot="column-content-button" slot-scope="{ row }">
          <div style="display: flex; align-items: center">
            <el-button
              @click="form.ShowForm('Sửa tỉnh', true, row)"
              type="warning"
            >
              <i class="fa fa-edit"></i>
            </el-button>
            <el-button @click="form.Delete(row)" type="danger">
              <i class="fa fa-times"></i>
            </el-button>
          </div>
        </template>
      </TablePaging>
    </div>
    <div style="height: 100%;width:50%" class="huyen">
      <TablePaging ref="tpHuyen" :model="tpHuyen">
        <template slot="column-header-button">
          <el-button
            @click="form.ShowForm('Thêm huyện', false, {})"
            type="primary"
          >
            <i class="fa fa-plus"></i>
          </el-button>
        </template>
        <template slot="column-content-button" slot-scope="{ row }">
          <div style="display: flex; align-items: center">
            <el-button
              @click="form.ShowForm('Sửa huyện', false, row)"
              type="warning"
            >
              <i class="fa fa-edit"></i>
            </el-button>
            <el-button @click="form.Delete(row)" v-if="pagePermission.delete" type="danger">
              <i class="fa fa-times"></i>
            </el-button>
          </div>
        </template>
      </TablePaging>
    </div>

    <DefaultForm :model="form" @actionOK="form.Save.call(this)">
      <div slot="content">
        <FormInfo :model="form.obj.form()" />
      </div>
    </DefaultForm>
  </div>
</template>
<script>
import API from "~/assets/scripts/API";
import TablePagingCol from "~/assets/scripts/base/TablePagingCol";
import { EventBus } from "~/assets/scripts/EventBus";
import {
  ShowMessage,
  ShowConfirm,
  MessageType,
} from "~/assets/scripts/Functions";
import GetDataAPI from "~/assets/scripts/GetDataAPI";
import Donvi_hanhchinh from "~/assets/scripts/objects/Donvi_hanhchinh";
export default {
  data() {
    return {
      isTinh: true,
      objCache: null,
      form: {
        obj: new Donvi_hanhchinh(),
        visible: false,
        width: "400px",
        title: "",
        ShowForm: (title, isTinh, obj) => {
          this.form.title = title;
          this.isTinh = isTinh;
          this.form.obj = new Donvi_hanhchinh({
            ...obj,
          });
          if (!isTinh) {
            this.form.obj._formElements.Name.label = "Huyện";
            this.form.obj.Level = 1;
            if(!this.selectedRow){
                ShowMessage("Vui lòng chọn tỉnh để thực hiện");
                return;
            }
            this.form.obj.Parent_id = this.selectedRow.Id;
          
            
          }

          console.log(this.form.obj);
          this.form.visible = true;
        },
        Save: () => {
          // this.$refs.form.
          if (this.form.obj.Id) {
            GetDataAPI({
              url: !this.isTinh ? API.DonviHanhchinh_Edit_Huyen : API.DonviHanhchinh_Edit_Tinh + `?id=${this.form.obj.Id}`,
              //    API.DonviHanhchinh_Add_Tinh,
              method: "POST",
              params: this.form.obj.toJSON(),
              action: (re) => {
                ShowMessage("Sửa thành công", "success");
                this.LoadTable();
                this.form.visible = false;
              },
            });
          } else {
            GetDataAPI({
              url:
                //    API.DonviHanhchinh_Edit_Tinh,
                !this.isTinh ? API.DonviHanhchinh_Add_Huyen: API.DonviHanhchinh_Add_Tinh,
              method: "POST",
              params: this.form.obj.toJSON(),

              action: (re) => {
                ShowMessage("Thêm thành công", "success");
                this.LoadTable();
                this.form.visible = false;
              },
            });
          }
        },
        Delete: (row) => {
          ShowConfirm({
            message:this.isTinh ? "Xóa tỉnh" : "Xóa huyện" +" [" + row.Name + "]",
            title: "Cảnh báo",
            type: MessageType.warning,
          })
            .then((re) => {
              console.log(re);
              GetDataAPI({
                method: "POST",
                url: this.isTinh ? API.DonviHanhchinh_Delete_Tinh + "?id=" + row.Id : API.DonviHanhchinh_Delete_Huyen,
                params: this.isTinh ? '' : row,
                action: (re)  =>{
                  this.LoadTable();

                  ShowMessage("Delete successfully");
                },
              });
            })
            .catch((err) => {
              // An error occurred
            });
        },
      },
      tp: {
        title: "Danh sách đơn vị hành chính",
        data: [],
        clickRow: (row) => {
          this.LoadHuyen(row);
          this.objCache = row;
          console.log(this.objCache)
        },
        cols: [
          new TablePagingCol({
            title: "Mã số",
            data: "Index",
            width: 100,
          }),
          new TablePagingCol({
            title: "Tỉnh",
            data: "Name",
            width: "auto",
          }),

          //   new TablePagingCol({
          //     title: "Cấp độ",
          //     data: "Level",
          //   }),
          //   new TablePagingCol({
          //     title: "Cấp dưới",
          //     data: "Childs",
          //   }),
          new TablePagingCol({
            title: "",
            data: "button",
            sortable: false,
          }),
        ],
      },

      tpHuyen: {
        data: [],
        cols: [
          new TablePagingCol({
            title: "Mã số",
            data: "Index",
            width: "100px",
          }),
          new TablePagingCol({
            title: "Huyện",
            data: "Name",
            width: "auto",
          }),

          new TablePagingCol({
            title: "",
            data: "button",
            sortable: false,
          }),
        ],
      },
    };
  },
  methods: {
    LoadHuyen(tinh) {
   
      this.tpHuyen.data = tinh.Childs;
      this.$refs.tpHuyen.LoadData(true);
    },
    loadData() {
      this.$refs.tp.LoadData(true);
      if(this.objCache){
        Object.assign(this.selectedRow,this.objCache);
        this.loadHuyen(this.objCache)
      }
     
    },
    LoadTable() {
      GetDataAPI({
        url: API.DonviHanhchinh_Get_Tinh,
        // method: "POST",
        action: (re) => {
          this.tp.data = re;
          this.loadData();
         
        },
      });
    },
  },
  computed: {
    selectedRow: function () {
      return this.$refs.tp.selectedRow;
    },
    selectedHuyenRow: function () {
      return this.$refs.tpHuyen.selectedRow;
    },
  },
  mounted() {
    // console.log(this)
    this.LoadTable();
  },
};
</script>
<style lang=""></style>
