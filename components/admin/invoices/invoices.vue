<template>
    <div class="container ">
      <div class=" pt-3">
        <div class="wmaster">
          <div class="row p-3">

            <div class="col-sm-12">
              <form @submit.prevent="loadinvoice">

                <div class="row" dir="rtl">

                  <div class="form-group col-xs-6 col-sm-3">
                    <label class="text-right"><span v-text="$t('invoicenumber')"></span></label>
                    <input dir="ltr" v-model="filtered.tracknumber" class="form-control" >
                  </div>
                  <div class="form-group col-xs-6 col-sm-3">

                    <label v-text="$t('status')"></label>
                    <select class="form-control" v-model="filtered.status">
                      <option v-for="item in 11" :value="item"  v-text="$t(status(item))"></option>
                    </select>
                  </div>
                  <div class="form-group col-xs-6 col-sm-3">
                    <label><span v-text="'..'"></span></label>
                    <input type="submit" dir="ltr"  class="btn btn-dark w-100" :value="$t('search')" >
                  </div>
                </div>
              </form>
              <hr>
              <table class="table table-striped text-right invocelist" dir="rtl">
                <thead class="text-center">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" v-text="$t('trackingcode')"></th>
                  <th scope="col" v-text="$t('date')"></th>
                  <th scope="col"  v-text="$t('status')">></th>
                  <th scope="col"  v-text="$t('fullprice')"></th>
                  <th scope="col"  v-text="$t('pay')"></th>
                  <th scope="col"  v-text="$t('countitem')"></th>
                  <th scope="col"  v-text="$t('detail')"></th>
                </tr>
                </thead>
                <tbody v-if="listinvoice!=null" class="text-center">
                <template  v-for="(item,index) in listinvoice.data" >
                  <tr :key="index">
                    <th scope="row" v-text="index+1"></th>
                    <td>
                      <span v-text="item.trackingcode"></span>
                    </td>
                    <td> <span v-text="item.persiandate"></span></td>
                    <td><span v-text="status(item.status)"></span></td>
                    <td><span v-text="proccessprice(index)"></span></td>
                    <td><span v-text="payment(item.payment)"></span></td>
                    <td><span v-text="proccesscount(index)"></span></td>
                    <td><a :href="'/dashboard#invoiceshow#'+item.trackingcode" class="icofont-circled-left"></a></td>
                  </tr>
                  <tr :key="index" class="text-right text-smalls">
                    <td></td>
                    <td colspan="1">
                      <small class="text-primary" v-text="$t('name')"></small>:
                      <span  v-text="item.user.name"></span>
                    </td>
                    <td colspan="1" >
                      <small class="text-primary"  v-text="$t('lastname')"></small>:
                      <span  v-text="item.user.lastname"></span>
                    </td>
                    <td colspan="1" >
                      <small class="text-primary"  v-text="$t('phone')"></small>:
                      <span  v-text="item.user.phone"></span>
                    </td>
                    <td colspan="1" >
                      <small class="text-primary"  v-text="$t('email')"></small>:

                    </td>
                    <td>
                      <span  v-text="item.user.email"></span>
                    </td>
                    <td colspan="2">
                      <span v-text="$t('showprofile')"></span>
                    </td>
                  </tr>
                </template>


                </tbody>
              </table>
              <template v-if="listinvoice!=null">
                <paginate
                  :page-count="listinvoice.meta.last_page"
                  :page-range="listinvoice.meta.per_page"
                  :margin-pages="2"
                  :click-handler="clickCallback"
                  :prev-text="$t('Prev')"
                  :next-text="$t('Next')"
                  :container-class="'pagination'"
                  :page-class="'page-item'">
                </paginate>
              </template>

            </div>
            <div class="col-sm-2">
              <dashboardprofile></dashboardprofile>

            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "invoices",
        data(){
            return{
                filtered:{
                    payment:null,
                    tracknumber:'BC',
                    status:11,
                    page:1,

                },
                listinvoice:null

            }
        },
        methods:{
            proccesscount(id){
                return this.listinvoice.data[id]['detail'].length;
            },
            proccessprice(id){

                let fullprice=0;
                for (let item in this.listinvoice.data[id]['detail']){
                    fullprice=fullprice+this.listinvoice.data[id]['detail'][item]['price']*this.listinvoice.data[id]['detail'][item]['Qty'];
                }
                let myivoice=this.listinvoice.data[id];
                console.log(myivoice);

                fullprice=fullprice-(myivoice['offweekend']+((myivoice['offpercent']*fullprice)/100));
                fullprice=fullprice+((fullprice*myivoice['tax'])/100);
                fullprice=fullprice+myivoice['postprice'];
                return fullprice;
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
                if(id==11) return  this.$t('all');

            },
            clickCallback(pagenum){
                this.filtered.page=pagenum;
                this.loadinvoice();
            },
            payment(id){
                if(id==0) return this.$t('Payonthespot');
                if(id==1) return this.$t('onlinepaied');
                if(id==2) return this.$t('canceled');
            },

            loadinvoice(){
                let self=this;
                this.$axios.get(this.$url+'user/invoices',{
                    params:{
                        payment:self.filtered.payment,
                        page:self.filtered.page,
                        status:self.filtered.status,
                        tracknumber:self.filtered.tracknumber
                    },
                    headers:{Authorization:localStorage.token}
                }).then(function (res) {
                    self.listinvoice=res.data;
                })

            }
        },
        mounted() {
            this.loadinvoice();
        }
    }
</script>

<style scoped>
  .invocelist thead{
    background-color: #ffdd00 !important;

  }
  .invocelist tbody *{
    font-size: 15px;

  }
  .invocelist tbody td{
    padding: 20px;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .invocelist thead *{
    font-size: 16px;

  }
  .text-smalls *{
    font-size: 12px !important;
    color: #333;
    padding: 5px !important;
  }
  .text-smalls {
    background-color: rgba(141, 141, 141, 0.44);

  }
</style>
