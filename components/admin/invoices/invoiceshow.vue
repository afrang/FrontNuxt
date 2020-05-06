<template>
    <div class="container">
      <div class="pt-3">
        <div class="wmaster">
          <template v-if="invoicedata!=null">
            <invoicedetail :data="invoicedata" :backurl="'/dashboard#invoices'"></invoicedetail>
            <div class="box row text-right" dir="rtl">
                <div class="col-sm-6 col-xs-12">
                  <div class="card w-100">
                      <h5 class="card-header text-bold "  v-text="$t('userinformation')"></h5>
                     <ul class="list-group list-group-flush w-100">
                        <li class="list-group-item">            <span v-text="invoicedata.data.user.name"> </span>
                          <span v-text="invoicedata.data.user.lastname"> </span></li>
                        <li class="list-group-item">
                          <span class="icofont-mobile-phone"></span>    <span v-text="invoicedata.data.user.phone"> </span>
                        </li>
                       <li class="list-group-item">
                          <span class="icofont-ui-email"></span>    <span v-text="invoicedata.data.user.email"> </span>
                        </li>

                      </ul>
                    <div class="card-footer">
                      <a :href="'/dashboard#users#'+invoicedata.data.user.id"><span v-text="$t('showmore')"></span></a>
                    </div>


                  </div>
                </div>
              <div class="col-sm-6 col-xs-12">
                      <form @submit.prevent="save">
                        <div class="form-group">
                          <label v-text="$t('status')"></label>
                          <select class="form-control" v-model="invoicedata.data.status">
                            <option v-for="item in 10" :value="item"  v-text="$t(status(item))"></option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label v-text="$t('shippingcode')"></label>
                          <input type="text" class="form-control" v-model="invoicedata.data.shippingcode">
                        </div>
                        <div class="form-group">
                          <label v-text="$t('postbarcode')"></label>
                          <input type="text" class="form-control" v-model="invoicedata.data.postbarcode">
                        </div>
                        <div class="form-group">
                          <label v-text="$t('deliverytext')"></label>
                          <textarea type="text" class="form-control" v-model="invoicedata.data.deliverytext"></textarea>
                        </div>
                        <div class="form-group">
                          <label v-text="$t('description')"></label>
                            <textarea type="text" class="form-control" v-model="invoicedata.data.description"></textarea>
                        </div>
                        <div class="form-group">
                          <label v-text="$t('adminmoment')"></label>
                          <textarea type="text" class="form-control" v-model="invoicedata.data.adminmoment"></textarea>
                        </div>
                        <div class="form-group">
                          <input type="submit" :value="$t('save')" class="btn btn-dark">
                        </div>
                      </form>

              </div>
            </div>
          </template>

        </div>
      </div>
    </div>
</template>

<script>
    import Invoicedetail from "../../view/invoice/invoicedetail";
    export default {
        name: "invoiceshow",
        components: {Invoicedetail},
        data(){
            return{
                id:window.location.hash.substring(1).split('#')[1],
                invoicedata:null
            }
        },
        methods:{
            save(){
                let self=this;
                this.$axios.put(this.$url+'user/invoices/'+this.id,this.invoicedata.data,{
                    headers:{Authorization:localStorage.token}
                }).then(function (res) {
                    this.$swal.fire({
                        position: 'center-center',
                        icon: 'success',
                        title: self.$t('saved'),
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            },
            loadinvoice(){
                let self=this;

                this.$axios.get(this.$url+'user/invoices/'+this.id,{
                    params:{

                    },
                    headers:{Authorization:localStorage.token}
                }).then(function (res) {
                    self.invoicedata=res.data;
                })
            },
            status(id){
                if(id==1) return  this.$t('Inthereviewqueue');
                if(id==2) return  this.$t('Orderconfirmation');
                if(id==3) return  this.$t('Preparingtoorder');
                if(id==4) return  this.$t('Exitfromproccesscenter');
                if(id==5) return  this.$t('Delivertopost');
                if(id==6) return  this.$t('inPostOffice');
                if(id==7) return  this.$t('Internalcourier');
                if(id==8) return  this.$t('Delivery');
                if(id==9) return  this.$t('Reject');
                if(id==10) return  this.$t('Canceled');

            },
        },mounted() {
            this.loadinvoice();
        }
    }
</script>

<style scoped>

</style>
