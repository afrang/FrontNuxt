<template>
    <span>
        <span class="titletexthelp"  @mouseenter="helpshow=true" @mouseleave="helpshow=false"   v-text="name"></span>
        <div v-if="helpshow==true"  class="helptext" >
            <ShowArticle :text="help" :key="randomNumber"></ShowArticle>
        </div>
    </span>
</template>
<script>
    import ShowArticle from "./Showarticle";
    export default {
        components: { ShowArticle},
        name: "help",
        computed:{
            randomNumber: function () {
              return   this.random = Math.floor(Math.random() * (10 - 1 + 1)) + 1
            }

        },
        props:{
            help:{
                type:String,
                default: null
            },
            name:null
        },data(){
            return{
                helpshow:false
            }
        }
    }
</script>

<style scoped>
  .titletexthelp{
    border-bottom: dashed 1px blue;
    cursor: pointer;
  }
  .helptext{
    position: absolute; z-index: 6000; background-color: #e0ab0f; font-size: 14px;
    padding: 10px; color:#fff; text-align: right; right: 100px; border-radius: 5px;
    line-height: 25px; width: 100%;
  }
</style>
