<template>
  <div class="pt-4">
    <div class="container pt-4 text-right dir-rtl wmaster">
      <h4 v-text="$t('hashtagmanager')"></h4>
      <hr>
      <a   class="badge p-2 m-1 badge-success text-right "  v-for="(item,index) in tag" :key="index" >
        <span  class="tiss-cursur" v-text="item.name"></span>
        |
        <span @click="deleted(item.id)" class="icofont-close "></span>

      </a>



    </div>
  </div>
</template>

<script>
    export default {
        name: "hashtag",
        data() {
            return {
                tag:[]
            }
        },
        methods:{
            deleted(id){
                let that=this;
                that.$axios.delete(this.$url+'user/Tag/'+id,{
                    headers: {
                        Authorization: localStorage.token
                    }
                }).then(function (res) {
                    that.loadtags();

                });
            },
            loadtags() {
                let that = this;
                this.$axios.get(this.$url + 'user/Tag', {
                    headers: {
                        Authorization: localStorage.token
                    }
                }).then(function (res) {
                    that.tag = res.data;

                });
            }

        },
        watch: {

        },
        mounted() {
            this.loadtags();
        },
        head () {
            return {
                title: this.$t('tags'),

            }
        }
    }
</script>

<style scoped>

</style>
