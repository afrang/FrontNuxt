<template>
  <div>
    <headers></headers>


    <div class="row p-3">

      <div class="col-sm-10">
        <div class="text-left p-4">
          <a class="btn btn-dark text-white" @click="loadaddress">
            <span v-text="$t('reload')"></span>
          </a>
        </div>


        <template v-if="listaddress!=null">
          <uL class="row mi" dir="rtl">
            <template  v-for="(item,index) in listaddress.data">
              <li :key="index" class="col-sm-6">
                <div dir="rtl" class="text-right">
                  <hr>
                  <a  @click="removeitem(item.id)" class="icofont-ui-delete btn btn-success float-left text-white"></a>
                  <h3 style="margin: 0">{{ item.fulladdress }}</h3>
                  <div>{{ $t('reicver')}} :  {{ item.name }} {{ item.family }}</div>
                  <div dir="rtl"><span class="icofont-phone"></span> <span>{{ item.phone}}</span></div>
                  <div  dir="rtl" ><span class="icofont-mobile-phone"></span> <span>{{ item.mobile }}</span></div>

                  <hr>
                </div>
              </li>
            </template>


          </uL>

        </template>
      </div>
      <div class="col-sm-2">
        <dashboardprofile></dashboardprofile>

      </div>
    </div>

  </div>
</template>

<script>
    import headers  from '../../components/view/template/header';
    import dashboardprofile from "../../components/profile/dashboardprofile";
    export default {
        name: "address",
        components:{
            headers,dashboardprofile
        },
        data(){
          return{
              listaddress:null
          }
        },
        methods:{
            loadaddress(){
                let self=this;
                self.$axios.get(this.$url+'Profile/AddressController',{
                    headers:{
                        Authorization:localStorage.token

                    }
                }).then(function (res) {

                    self.listaddress=res.data;
                })
            },
            removeitem(id) {
                let self = this;
                this.$swal.fire({
                    title: self.$t('Areyousure'),
                    text: self.$t('Youwontbeabletorevertthis'),
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText:self.$t('cancel'),
                    confirmButtonText: self.$t('Yesdeleteit')
                }).then((result) => {
                    if (result.value) {

                        self.$axios.delete(this.$url + 'Profile/AddressController/' + id, {
                            headers: {
                                Authorization: localStorage.token

                            }
                        }).then(function (res) {

                            self.loadaddress();
                            self.$forceUpdate();
                        });
                    }
                });
            }
        },
        mounted() {
            this.loadaddress();
        }
    }
</script>

<style scoped>
.mi  li{
  list-style: none;
}
</style>
