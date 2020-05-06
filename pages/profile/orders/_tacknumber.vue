<template>
    <div>
      <headers></headers>


      <div class="row p-3">

        <div class="col-sm-10">
          <template v-if="invoicedata!=null">
            <invoicedetail :data="invoicedata" backurl="/profile/orders"></invoicedetail>
          </template>

        </div>
        <div class="col-sm-2">
          <dashboardprofile></dashboardprofile>

        </div>
      </div>

    </div>
</template>

<script>
    import dashboardprofile from "../../../components/profile/dashboardprofile";
    import Headers from "../../../components/view/template/header";
    import Footers from "../../../components/view/template/footer";
    import invoicedetail from "../../../components/view/invoice/invoicedetail";
    export default {
        name: "_tacknumber.vue",
        data(){
            return{
                tracknumber:this.$route.params.tacknumber,
                invoicedata:null

            }

        },
        watch:{

        },
        components:{
            dashboardprofile,Headers,invoicedetail
        },
        methods:{
            loadinoivce(){
                let self=this;
                this.$axios.get(this.$url+'Profile/invoice/'+this.tracknumber,{
                    params:{

                    },
                    headers:{Authorization:localStorage.token}
                }).then(function (res) {
                    self.invoicedata=res.data;
                })
            }
        },
        mounted() {
            this.loadinoivce();
        }
    }
</script>

<style scoped>

</style>
