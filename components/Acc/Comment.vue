<template lang="">
  <div class="Comment">
    <div class="Comment-left">
      <h4>Góp ý cùng phát triển</h4>
      <div style="width: 100%; text-align: center; padding: 0 0 10px 0">
        <i>Hãy để người thân, con cháu của bạn hiểu hơn về dòng họ của mình!</i>
      </div>
      <div class="fCm">
        <el-form

:model="cmOb"
:rules="rules"
ref="CmForm"
label-width="120px"
class="cm-form"
label-position="top"
>
<el-form-item label="Người góp ý" prop="cmPer" required>
  <el-input   size="medium"  v-model="cmOb.cmPer"></el-input>
</el-form-item>
<el-form-item label="Số liên hệ" prop="phone" required>
  <el-input   size="medium" type="tel" v-model="cmOb.phone"></el-input>
</el-form-item>
<el-form-item label="Email liên hệ" prop="email" >
  <el-input   size="medium" type="email" v-model="cmOb.email"></el-input>
</el-form-item>
<el-form-item label="Nội dung góp ý" prop="Content_cm">
  <el-input :autosize="{
    minRows:3,maxRows: 9,
  }"   size="medium" type="textarea" v-model="cmOb.Content_cm"></el-input>
</el-form-item>

</el-form-item> 


</el-form>
      </div>
      


      <div style="text-align:center;padding:20px 0 0 0; width: 100%" class="footer">
      <el-button type="primary" style="padding: 12px 30%;font-size:16px; border-radius: 20px;"
        >Gửi</el-button
      >
    </div>
    </div>
    <div class="Comment-right"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cmOb: {
        cmPer: "",
        phone: "",
        email: "",
        Content_cm: "",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.Comment {
    background: #fff;
    
  display: flex;
//   padding-bottom: 30px;
  .Comment-left {
    width: 50%;
    // text-align: center;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
    h4 {
      font-family: PlayfairDisplay;
      padding: 10px 0 10px 0;
      text-transform: uppercase;
      font-size: 24pt;
      color: #9e1c1e;
    }
    .fCm{
        border-radius: 10px;
        border: 1px solid  rgba(0, 0, 0, 0.24);;
        padding: 30px 40px;
        // text-align: left;
        width: 70%;
        .cm-form{
            /deep/ .el-form-item{
                .el-form-item__label{
                    font-size: 12px;
                    padding: 0 !important;
                    line-height: 25px;
                }
            }
            .el-form-item__content{
                .el-input{
                    .el-input__inner{

                    }
                }
            }
        }
    }
  }
  .Comment-right {
    width: 50%;
    background: url("/images/HERO-WritingLetters2.0-1200x675.png");
    background-position: center;
    background-size: cover;
  }
}
</style>
