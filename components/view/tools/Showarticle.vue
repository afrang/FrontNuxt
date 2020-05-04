<template>
  <div>
    <div>
      <div v-html="ctext"></div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "ShowArticle",
        props:['text'],
        data() {
            return {

            }

        },
        watch:{


        },
        computed:{
            ctext() {
                if(this.text!=null) {

                    return this.text.replace('%url%', this.$storage);
                }else{
                    return  '';
                }
            }
        },
        mounted() {
            //this.show();
            if(this.text!=null){
                this.text=this.text.replace('%url%',this.$storage);

            }



        }
    }
</script>

<style scoped>

</style>
