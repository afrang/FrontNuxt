<template>
  <div dir="rtl" class="text-right">
    <div class="invoicebox1 row">
      <div class="col-sm-1">
        <a :href="backurl" >
          <div class="icofont-bubble-right mt-3 inflashback"></div>
          <div v-text="$t('back')"></div>
        </a>

      </div>
      <div class="col-sm-11 border-right">
        <ul>
          <li><span v-text="$t('order')"></span>: <span v-text="data.data.trackingcode"></span></li>
          <li><span v-text="$t('registerat')"></span> : <span v-text="data.data.persiandate"></span></li>
          <li><span v-text="$t('status')"></span> : <span v-text="status(1)"></span></li>
        </ul>

      </div>

    </div>
    <div class="box2">
      <div class="row">
        <div class="col-sm-6 col-xs-12">
          <p v-text="$t('recivername')"></p>
          <p><span v-text="data.data.name"></span> <span v-text="data.data.family"></span></p>
        </div>

      <div class="col-sm-6 col-xs-12">
        <p v-text="$t('phonerevicedname')"></p>
        <p><span v-text="data.data.mobile"></span> </p>
      </div>
      <div class="col-sm-6 col-xs-12">
        <p v-text="$t('recivedaddress')"></p>
        <p><span v-text="data.data.fulladdress"></span> </p>
      </div>
        <div class="col-sm-6 col-xs-12">
        <p v-text="$t('countitem')"></p>
        <p><span v-text="data.data.detail.length"></span> </p>
      </div>
      <div class="col-sm-6 col-xs-12">
        <p v-text="$t('fullprice')"></p>
        <p>
          <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="proccessprice"></VueNumeric>
 </p>
      </div>
      <div class="col-sm-6 col-xs-12">
        <p v-text="$t('payment')"></p>
        <p>
          <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="proccesspricefinal"></VueNumeric>
</p>
      </div>
    </div>
    </div>
    <table class="table tableinvoice  table-bordered mt-4 table-striped text-right invocelist" dir="rtl">
      <thead class="text-center  text-white text-bold" style="background-color: #a3a3a3;">
      <tr >
        <th scope="col">#</th>
        <th scope="col" v-text="$t('description')"></th>
        <th scope="col" v-text="$t('Qty')"></th>
        <th scope="col"  v-text="$t('price')"></th>
        <th scope="col"  v-text="$t('total')"></th>
        <th scope="col"  v-text="$t('discount')"></th>
        <th scope="col"  v-text="$t('seeproduct')"></th>
      </tr>
      </thead>
      <tr v-for="(item,index) in data.data.detail">
        <td class="text-center">1</td>
        <td >
          <div><span v-text="item.productname"></span></div>
          <div><span v-text="item.modelname"></span></div>
          <div v-if="item.attrvalue!=':'"><span v-text="item.attrvalue"></span></div>
          <div  v-if="item.optionvalue!=':'"><span v-text="item.optionvalue"></span></div>
        </td>
        <td class="text-center">
          <div><span v-text="item.Qty"></span></div>
        </td>

        <td class="text-center">
          <div>
      <VueNumeric  :key="110+index"  dir="rtl" :read-only="true"  separator="," v-model="item.price"></VueNumeric> {{  $t('toman') }}
</div>
        </td>
        <td class="text-center">
          <div>
            <VueNumeric :key="111+index"  dir="rtl" :read-only="true"  separator="," v-model="item.total" ></VueNumeric> {{  $t('toman') }}

          </div>
        </td>
        <td class="text-center">
          <div>
            <span v-if="item.totaldiscount!=0">
            <VueNumeric :key="111+index"  dir="rtl" :read-only="true"  separator="," v-model="item.totaldiscount" ></VueNumeric> {{  $t('toman') }}
</span>

          </div>

        </td>
        <td>
        </td>

      </tr>
      <tr>
        <td colspan="4"><strong><span v-text="$t('tax')"></span><span class="taxnumber" v-text="data.data.tax"></span></strong></td>
        <td class="taxprice" >
          <VueNumeric :key="111+index"  dir="rtl" :read-only="true"  separator="," v-model="taxcalc" ></VueNumeric> {{  $t('toman') }}

        </td>
      </tr>
      <tr>
        <td colspan="4"><strong><span v-text="$t('PostPrice')"></span></strong></td>
        <td class="taxprice" >
          <VueNumeric :key="111+index"  dir="rtl" :read-only="true"  separator="," v-model="data.data.postprice" ></VueNumeric> {{  $t('toman') }}

        </td>
      </tr>
      <tr>
        <td colspan="4"><strong><span v-text="$t('offweekendi')"></span></strong></td>
        <td class="taxprice  offpercent" >
          <VueNumeric :key="111+index"  dir="rtl" :read-only="true"  separator="," v-model="data.data.offweekend" ></VueNumeric> {{  $t('toman') }}

        </td>
      </tr>
      <tr>
        <td colspan="4"><strong><span v-text="$t('offpercent')"></span><span class="taxnumber offpercent" v-text="data.data.offpercent"></span></strong></td>
        <td class="taxprice offpercent " >
          <VueNumeric :key="111+index"  dir="rtl" :read-only="true" separator="," v-model="data.data.offweekend" ></VueNumeric> {{  $t('toman') }}

        </td>
      </tr>
      <tr class="bg-yellow">
        <td colspan="4"><strong><span v-text="$t('grandtotal')"></span></strong></td>
        <td class="taxprice offpercent " >
          <VueNumeric :key="111+index"  dir="rtl" :read-only="true" separator="," v-model="proccessprice" ></VueNumeric> {{  $t('toman') }}

        </td>
      </tr>
      <tr class="">
        <td colspan="4"><strong><span v-text="$t('payed')"></span></strong></td>
        <td class="taxprice offpercent " >
          <VueNumeric :key="111+index"  dir="rtl" :read-only="true" separator="," v-model="data.data.payment" ></VueNumeric> {{  $t('toman') }}

        </td>
      </tr>
      <tr class="bg-yellow">
        <td colspan="4"><strong><span v-text="$t('payment')"></span></strong></td>
        <td class="taxprice offpercent " >
          <VueNumeric :key="111+index"  dir="rtl" :read-only="true" separator="," v-model="proccesspricefinal" ></VueNumeric> {{  $t('toman') }}

        </td>
      </tr>
    </table>


  </div>

</template>

<script>
    import VueNumeric from 'vue-numeric';

    export default {
        name: "invoicedetail",
        props:['data','backurl'],
        components:{
            VueNumeric
        },
        computed:{


            taxcalc:function(){
                let fullprice=0;
                for (let item in this.data.data['detail']){
                    fullprice=fullprice+this.data.data['detail'][item]['price']*this.data.data['detail'][item]['Qty'];
                }
                let myivoice=this.data.data;
                return  ((fullprice*myivoice['tax'])/100);
            },
            proccesspricefinal:function(){
             return  this.proccessprice-this.data.data.payment;
            },
            proccessprice:function(){

                let fullprice=0;
                for (let item in this.data.data['detail']){
                    fullprice=fullprice+this.data.data['detail'][item]['price']*this.data.data['detail'][item]['Qty'];
                }
                let myivoice=this.data.data;

                fullprice=fullprice-(myivoice['offweekend']+((myivoice['offpercent']*fullprice)/100));
                fullprice=fullprice+((fullprice*myivoice['tax'])/100);
                fullprice=fullprice+myivoice['postprice'];
                return fullprice;
            },

        },
        methods: {
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
        }
    }
</script>

<style scoped>
  .taxnumber:before{
    content: ' %';
  }
  .taxnumber{
    color: lightcoral;
    font-size: 14px;

  }
  .taxprice{
    text-align: center;
    font-weight: bolder;
    color: lightcoral;
    font-size: 14px;
  }
  .inflashback{
    font-size: 45px !important;
    color:gray;

  }
  .border-left{

  }
  .box2{

    border: solid 1px #a3a3a3;
    width: 100%;
    background-color: #ffffff !important;
    min-height: 100px;
    margin-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 4px;
  }
  .box2 .row div{
    border-bottom: solid 1px;
   padding-bottom: 5px;
    padding-top: 10px;
  }
  .box2 .row div:nth-child(odd){
    border-left: solid 1px;

  }
  .box2 .row div:nth-child(+n+5){
    border-bottom: 0px !important;

  }
  .box2 .row div p:nth-child(odd){
      font-size: 12px;
    color:gray;
    font-weight: bold;
  }
  .box2 .row div p:nth-child(even) *{
      font-size: 16px !important;
    color:black;
    font-weight: bolder;

  }
  .invoicebox1 div:nth-child(odd){
    text-align: center;
  }
  .invoicebox1 div:nth-child(odd) *{
      text-decoration: none;
    font-size: 12px;
    color: #333333;

  }
  .invoicebox1 div:nth-child(odd):hover{
  color:#f2ea1b;;
    cursor: pointer;
  }
  .invoicebox1 div:nth-child(even) ul li{
    list-style: none;
    line-height: 40px;
    margin-right: -20px;

  }
  .invoicebox1 div:nth-child(even) ul li *{
    list-style: none;
    font-size: 16px;
    font-weight: normal;
    color: gray;
  }
  .tableinvoice tr td:nth-child(2) div:nth-child(1) *{
      font-size: 17px;
    font-width: bold;
  }
  .tableinvoice tr td:nth-child(2) div:nth-child(2) *{
      font-size: 12px;
    font-width: bold;
    font-style: italic;
  }
  .tableinvoice tr td:nth-child(2) div:nth-child(3) * {
    margin-top: 20px;
  }
  .tableinvoice tr td:nth-child(3) *{
    font-weight: bolder;
    font-size: 20px;
    margin-top: 15px;
  }
  .tableinvoice tr td:nth-child(4) *{
    font-weight: bolder;
    font-size: 20px;
    margin-top: 15px;
  }
  .tableinvoice tr td:nth-child(5) *{
    font-weight: bolder;
    font-size: 15px;
    color:green;;
    margin-top: 15px;

  }
  .tableinvoice tr td:nth-child(6) *{
    font-weight: bolder;
    font-size: 15px;
    color:darkgreen;;
    margin-top: 15px;

  }
  .tableinvoice tr td:nth-child(7) *{
    font-weight: bolder;
    font-size: 15px;
    color:lightcoral;;
    margin-top: 15px;

  }
  .offpercent{
    color: green;
  }
  .bg-yellow{
    background-color: #FFDD00;;
  }
</style>
