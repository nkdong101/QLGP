<template lang="">
    <div style="width: 100%">
        <div v-for="item in obj.Couple">

            <wife_child :gender="item.Gender" :obj="item"  :id="item.Id"/>
        </div>
        
    </div>
</template>
<script>
export default {
    props:{
        obj:{}
    },
    data(){
        return{
            CoupleF:{
              
            }
        }
    },
    mounted() {
        // console.log("mountedCouple",this.obj)
    },
}
</script>
<style lang="">
    
</style>