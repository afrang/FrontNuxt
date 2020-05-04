<template>
  <div class="row mb-5" dir="ltr">

    <div class="col-sm-8 col-xs-12">
      <table class="table table-bordered  " dir="rtl">
        <thead class="text-bold bg-dark text-white">
        <td class="text-center">#</td>
        <td  class="text-right" v-text="$t('comment')"></td>
        <td class="text-center" v-text="$t('count')"></td>
        <td class="text-center" v-text="$t('price')"></td>
        <td class="text-center" v-text="$t('totalprice')"></td>
        <td class="text-center" v-text="$t('del')"></td>
        <td  class="text-center" v-text="$t('seeproduct')"></td>

        </thead>
        <tr v-for="(item,index) in mytable" :key="index" class="border-bottom" style="border-bottom: solid 1px #333333;">
          <td class="text-center" v-text="index+1">
          </td>
          <td class="text-right">
            <ul>
              <li ><h3 v-text="item.name"></h3></li>
              <li >
                <h5 ><strong>{{ $t('model') }} : </strong> {{ item.model }} </h5>
              </li>
              <li v-if="item.color!=null">
                <p><strong>{{ $t('color') }} : </strong>  {{ item.color }}</p>
              </li>
              <li v-if="item.attrname!=null">
                <p> <strong>{{ item.attrname }} : </strong> {{ item.attroption }} </p>
              </li>
              <li v-if="item.other!=null">
                <p> <strong>{{ item.other }} : </strong>  {{ item.othername }}  </p>
              </li>
            </ul>
          </td>
          <td>
            <select class="form-control" @change="changeqty(index)" v-model="mytable[index].Qty" >
              <option v-for="n in 15" v-text="n" :value="n"></option>
            </select>
          </td>
          <td> <VueNumeric  :key="1001+index" dir="rtl" :read-only="true"  separator="," v-model="item.price"></VueNumeric></td>
          <td>  <VueNumeric  :key="1002+index" dir="rtl" :read-only="true"  separator="," v-model="item.total"></VueNumeric></td>
          <td class="text-center"> <span @click="removeitem(index)" class="icofont-ui-delete text-danger tiss-cursur icofont-2x"></span></td>
          <td class="text-center"> <a class="icofont-eye text-success icofont-2x"></a></td>
        </tr>
        <tr>
          <td class="" ></td>
          <td class="text-right text-bold" colspan="3" v-text="$t('GrandTotal')"></td>
          <td>  <VueNumeric  :key="1103" dir="rtl" :read-only="true"  separator="," v-model="grandtotalwithouttax"></VueNumeric></td>
        </tr>
        <tr>
          <td class="" ></td>
          <td class="text-right text-bold" colspan="3" v-text="$t('PostPrice')"></td>
          <td>  <VueNumeric   :key="1104"  dir="rtl" :read-only="true"  separator="," v-model="postpirce"></VueNumeric></td>
        </tr>

        <tr v-if="this.tax!=0">
          <td class="" ></td>
          <td class="text-right text-bold" colspan="3" v-text="$t('tax')"></td>
          <td>  <VueNumeric  :key="1105"  dir="rtl" :read-only="true"  separator="," v-model="tax"></VueNumeric></td>
        </tr>
        <template  v-if="setting!=null">
          <tr v-if="setting.offweekend!=0">
            <td class="" ></td>
            <td class="text-right text-bold" colspan="3" >
              <span v-text="$t('offweekendi')"></span>
              (<span class="text-danger" v-text="setting.offweekend+$t('toman')"></span>)
            </td>
            <td>  <VueNumeric :key="1106"  dir="rtl" :read-only="true"  separator="," v-model="offweekend"></VueNumeric></td>
          </tr>
        </template>
        <template  v-if="setting!=null">
          <tr v-if="setting.offpercent!=0">
            <td class="" ></td>
            <td class="text-right text-bold" colspan="3">
              <span v-text="$t('offpercenti')"></span>
              (<span class="text-danger" v-text="setting.offpercent+$t('percent')"></span>)
            </td>
            <td>  <VueNumeric :key="1107"   dir="rtl" :read-only="true"  separator="," v-model="offpercent"></VueNumeric></td>
          </tr>
        </template>
        <tr v-if="setting!=null">
          <td class="" ></td>
          <td class="text-right text-bold" colspan="3">
            <strong> <span v-text="$t('payment')"></span></strong>
          </td>
          <td> <strong> <VueNumeric  :key="1108"  dir="rtl" :read-only="true"  separator="," v-model="payment"></VueNumeric> {{  $t('toman') }}</strong></td>
        </tr>

      </table>
    </div>
    <div class="col-sm-4 col-xs-12" dir="rtl">
      <div class="setionship w-100">
        <div class="headership">
          <span class="icofont-location-pin"></span>
          <span v-text="$t('address')"></span>
        </div>
        <div class="contentship p-4">

          <button @click="addaddress"   class="btn btn-primary btn-sm"  data-toggle="modal" data-target="#myModal">
            <span class="icofont-ui-add"></span>
            <span v-text="$t('addaddress')"></span>
          </button>
          <button @click="loadaddress"   class="btn btn-primary btn-sm"  >
            <span class="icofont-refresh"></span>

          </button>
          <hr>
          <template v-if="listaddress!=null">

            <v-select v-on:input='changeaddress()' v-model="address" :options="listaddress.data" label="fulladdress">
              <template  #option="{ fulladdress, postalcode,name,family,mobile,phone }">
                <div dir="rtl" class="text-right">
                  <hr>
                  <h3 style="margin: 0">{{ fulladdress }}</h3>
                  <div>{{ $t('reicver')}} :  {{ name }} {{ family }}</div>
                  <div dir="rtl"><span class="icofont-phone"></span> <span>{{ phone}}</span></div>
                  <div  dir="rtl"><span class="icofont-mobile-phone"></span> <span>{{ mobile }}</span></div>
                  <hr>
                </div>
              </template>
            </v-select>
          </template>
          <div class="m-1">
            <ul class="addresstext"  dir="rtl" v-if="address!=null">
              <li>
                <span class="icofont-location-pin"></span>
                <span v-text="address.fulladdress"></span>
              </li>
              <li>
                <span class="icofont-phone-circle"></span>
                <span v-text="address.phone"></span>
              </li>
              <li>
                <span v-text="address.mobile"></span>
                <span class="icofont-mobile-phone"></span>
              </li>
              <li>
                {{ $t('reicver')}} :  {{ address.name }} {{ address.family }}

              </li>
            </ul>
            <hr>
            <a type="button" class="btn btn-primary text-white w-100 mt-2" >
              <span style="font-size: 18px;" class="icofont-pay "></span>
              <span v-text="$t('paymentinoivce')"></span>
            </a>
            <a @click="accpetfactor" type="button" class="btn btn-primary text-white w-100 mt-2" >
              <span  style="font-size: 18px;" class="icofont-motor-bike "></span>
              <span v-text="$t('Payonthespot')"></span>
            </a>
            <a href="/category" type="button" class="btn btn-success text-white w-100 mt-2" >
              <span  style="font-size: 18px;" class="icofont-arrow-up "></span>
              <span v-text="$t('backtopay')"></span>
            </a>

          </div>

        </div>


      </div>

    </div>
    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <span class="icofont-location-pin"></span>
            <span v-text="$t('address')"></span>
          </div>
          <div class="modal-body" >
            <div class="dir-rtl">
              <editaddress     v-on:myevent="doSomething" :key="keyaddress"></editaddress>

            </div>
          </div>
        </div>

      </div>
    </div>

    <!--
      <pre>{{ detailfactor}}</pre>
    -->
  </div>
</template>

<script>
    import VueNumeric from 'vue-numeric';
    import Editaddress from "./editaddress";

    export default {
        name: "factordetail",
        data(){
            return{
                keyaddress:100,
                detailfactor:null,
                mytable:[],
                setting:null,
                grandtotalwithouttax:null,
                postpirce:0,
                taxpercent:null,
                tax:0,
                offweekend:0,
                payment:0,
                offpercent:0,
                userinfo:null,
                listaddress:null,
                address:null
            }
        },

        components: {
            Editaddress,
            VueNumeric
        },
        watch:{
            address:function(data){
                if(data!=null){
                    this.postprice=data.postprice;
                    this.calcpostandtax();
                    this.$forceUpdate();
                }

            },
            setting:function(){
                this.calcpostandtax();
            },
            grandtotalwithouttax:function(data){
                this.calcpostandtax();
            },
             detailfactor:function (data) {


                  let that=this;
                  if(data!=null){
                      let totalprice=0;

                      for (const items in data){
                          try {
                             // CreateObject
                              that.mytable[items]={};
                              // Count Product
                              that.mytable[items].Qty=data[items].Qty;
                              // Key Product
                              that.mytable[items].key=items;
                              // Check Again Product Detail
                              that.$axios.get(this.$url+'product/'+data[items].product)
                                  .then(function (res) {

                                      // Product Name
                                      that.mytable[items].name=res.data.data.name;
                                      // Product Model
                                      that.mytable[items].model=res.data.data.model;
                                      // Porduct Base Price
                                      that.mytable[items].price=res.data.data.price;

                                      // Check Color If isset Color
                                      if(data[items].color!=null){
                                          let mycolor=res.data.data.toColor.find(obj => obj.color == data[items].color.color);
                                          that.mytable[items].color=mycolor.to_color.name;
                                      }else{
                                          that.mytable[items].color=null;
                                      }
                                     // Check Item  selectedOptions
                                       if(data[items].option.item!=null){
                                              let myattr=res.data.data.attr.find(obj => obj.id == data[items].option.attrvalue.id);
                                              that.mytable[items].attrname=myattr.name;
                                              let option=myattr.option.find(obj=>obj.id==data[items].option.optionvalue.id);

                                              that.mytable[items].attroption=option.name;
                                           that.mytable[items].price=option.price+that.mytable[items].price;

                                          }else{
                                              that.mytable[items].option=null;
                                          }


                                     if(data[items].selectedOptions.attrvalue!=null){
                                       let other=res.data.data.attr.find(obj => obj.id == data[items].selectedOptions.attrvalue.id);

                                         that.mytable[items].other=other.name;
                                         let option=other.option.find(obj=>obj.id==data[items].selectedOptions.optionvalue.id);
                                          that.mytable[items].other=other.name;
                                         that.mytable[items].othername=option.name;
                                          that.mytable[items].price=option.price+that.mytable[items].price;
                                          that.grandtotalwithouttax=that.grandtotalwithouttax+that.mytable[items].total;

                                      }else{
                                          that.mytable[items].other=null;

                                      }

                                      that.mytable[items].total=that.mytable[items].price*that.mytable[items].Qty;
                                      that.grandtotalwithouttax=that.grandtotalwithouttax+that.mytable[items].total;
                                      //if(options.item)
                                      that.$forceUpdate();
                                  });
                          }finally {

                              this.calcpostandtax();

                          }




                      }

                  }

              }
        },
        computed:{

        },
        methods:{
            accpetfactor(){
                this.$swal.fire({
                    title: this.$t('Areyousure'),
                    text: this.$t('Payonthespot'),
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: this.$t('no'),
                    confirmButtonText:  this.$t('yes')
                }).then((result) => {

                    if (result.value) {
                        if(this.address==null){
                            this.$swal.fire(
                                this.$t('Pleaseselectaddress'),
                                this.$t('oraddaddress'),
                                'warning'
                            )
                        }else{
                            let self=this;
                            let address=self.address;
                            address.tax=this.setting.taxpercent;
                            address.offweekend=this.setting.offweekend;
                            address.offpercent=this.setting.offpercent;
                            let data={
                                address:address,
                                sabad:JSON.parse(localStorage.getItem('sabad'))
                            };
                            this.$axios.post(self.$url+'Profile/invoice',data,{
                                headers:{
                                    Authorization:localStorage.token
                                }
                            })
                                .then(function (res) {
                                    localStorage.removeItem('sabad');
                                    self.$router.push({name: 'profile-orders'});
                                })
                        }
                    }
                })
            },
            changeaddress(){
                localStorage.setItem('address',JSON.stringify(this.address));

            },
            doSomething(id){

                $("#myModal").modal("hide");
                this.loadaddress();
            },
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

            addaddress(){
                //
                //  this.$modal.show('address');

                this.keyaddress=this.keyaddress+1;
            },
            removeitem(id){

                this.detailfactor=null;

                let sabad = JSON.parse(localStorage.getItem('sabad'));
                delete  sabad[id];
                const  myobject=new Object();
                let x=0;
                for (let items in sabad){
                    myobject[x]=sabad[items];
                    x++;
                }

                localStorage.setItem('sabad',JSON.stringify(myobject));
                this.$forceUpdate();
                window.location.reload();
                this.loadfactor();
            },
            // Basket Manager
            calcpostandtax(){
                if(this.setting!=null){
                    try {
                        if(this.address!=null){
                            this.postpirce=this.address['postprice'];
                        }else{
                            this.postpirce=this.setting.postprice;
                        }
                        this.tax=(this.setting.taxpercent*this.grandtotalwithouttax)/100;
                        this.offweekend=this.setting.offweekend;
                        this.offpercent=(this.setting.offpercent*this.grandtotalwithouttax)/100;

                    }finally {

                        this.payment=(this.postpirce+this.grandtotalwithouttax+this.tax)-(this.offweekend+this.offpercent);


                    }

                }

            },
            tottaolnumber(x,y){
                return x*y;
            },
            changeqty(item){
                try {
                    let my=JSON.parse(localStorage.getItem('sabad'));
                    my[item].Qty=this.mytable[item].Qty;
                    localStorage.setItem('sabad',JSON.stringify(my));
                } finally {
                    this.loadfactor();

                }


            },
            loadprofile(){

                let that=this;
                this.$axios.get(this.$url+'user/profile',{headers:{Authorization:localStorage.token}})
                    .then(function (res) {
                            that.userinfo=res.data;
                        }
                    )

            },
            loadfactor(){
                this.detailfactor=JSON.parse(localStorage.getItem('sabad'));


            },
            loadsetting(){
                let self=this;
                self.$axios.get(this.$url+'Profile/SettinginvoiceController',{
                    headers:{
                        Authorization:localStorage.token
                    }
                }).then(function (res) {
                    self.setting=res.data;
                })
            }
        },
        mounted() {
            this.loadsetting();
            this.loadfactor();
            this.loadprofile();
            this.loadaddress();
            if(localStorage.address) {
                this.address=JSON.parse(localStorage.getItem('address'));
            }
        }
    }
</script>

<style scoped>
  .setionship{
    width: 100%;
    min-height: 100px;
    background-color: #f4f4f4;
    border-radius: 15px 15px 0px 0px;
    font-size: 12px;
    text-align: right;
    direction: rtl;

  }
  .headership *{
    font-size: 14px;

  }
  .headership{
    background-color: #feff14;
    color: #333333;;
    padding: 15px;
    border-radius: 15px 15px 0px 0px;
    margin-bottom: 10px;

  }
  .addresstext *{
    font-size: 14px;
    line-height: 30px;


  }
  .addresstext{
    border: solid 1px #a3a3a3;
    border-radius: 10px;
    margin-top: 20px;
  }
  .addresstext li{
    list-style: none;
  }
</style>
