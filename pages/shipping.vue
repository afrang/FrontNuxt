<template>
  <div v-if="user!=null">
    <headers></headers>
    <div class="container-fluid " style="margin-bottom: 200px;">
      <factordetailnotconfirm></factordetailnotconfirm>
    </div>
    <footers class="mt-5"  ></footers>

  </div>
</template>

<script>
    import Headers from "../components/view/template/header";
    import Footers from "../components/view/template/footer";
    import factordetailnotconfirm from "../components/profile/factordetailnotconfirm";
    export default {
        name: "shipping",
        components: {Footers, Headers,factordetailnotconfirm},
        data(){
            return{
                error:null,
                user:null,
                factordetail:null
            }
        },
        methods:{
            profileshow(){
                let that=this;

                this.$axios.get(this.$url+'user/profile',{headers:{Authorization:localStorage.token}})
                    .then(function (response) {
                        that.user=response.data;
                        if(response.data.roll!=null){
                            $nuxt.$router.push({name: 'dashboard'});
                        }


                    }) .catch((error) => {
                    that.error=error.response.data.errors;
                });


            },
        },
        mounted() {
            try {
                if(!localStorage.token){
                    $nuxt.$router.push({name: 'register'});
                };
            }finally {
                this.profileshow();
            }



        },
        head () {
            return {
                title: this.$t('factordetail'),
                script: [
                    {
                        src: process.env.BASE_BACKEND+"asset/jquery/jquery-3.5.0.min.js",

                        type: "text/javascript"
                    },
                    {
                        src: process.env.BASE_BACKEND+"asset/jquery/popper.min.js",
                        type: "text/javascript"
                    },
                    {
                        src:process.env.BASE_BACKEND+"asset/jquery/bootstrap.min.js",
                        type: "text/javascript"
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
