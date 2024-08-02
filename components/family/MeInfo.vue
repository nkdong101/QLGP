<template lang="">
  
        <PNode style="" :nameTitle="''"  :type="2" :Pid="obj.Id" :obj="obj.Curent" :hus="obj.Curent.Gender == 1 ? true : false"/>
    
</template>
<script>
export default {
    props:{
        obj:{}
    },
    data(){
        return{
            objF:{
              
            }
        }
    },
    mounted() {
        // console.log("mounted me",this.obj)
    },
}
</script>
<style lang="">
    
</style>