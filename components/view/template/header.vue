<template>
  <div>
  <template v-if="setting!=nul">


    <div class="headers w-100" dir="rtl" v-if="show!=false">
      <div class="row col-sm-12" dir="rtl">
        <div class="col-sm-4 col-xs-12 ">
          <popper  class="mt-4 mr-2 float-right"
                   :key="1"
                   trigger="clickToOpen"
                   :options="{
                            width:400,
                            placement: 'top',
                            modifiers: {  offset: { offset: '-120px,-20px' } }
                            }">
            <div class="popper   popover list-group text-right backgroundtrsparet bg-white "  style="position: absolute;"  dir="rtl">
              <div class=" p-4"  >
                <div class="row" style="width: 320px;">
                  <div class="col-sm-6">
                    <span v-text="countbasket"></span> <span  v-text="$t('countproduct')"></span>
                  </div>
                  <div class="col-sm-6">
                    <span class="text-secondary" ><span v-text="$t('seebasket')"></span><span class="icofont-rounded-left"></span></span>
                  </div>
                </div>
                <hr>
                <div class="list-group overytiss" >
                  <a v-for="item in countbasket" :key="item"  class="list-group-item list-group-item-action flex-column align-items-start ">

                    <div class="row">
                      <div class="col-sm-4">
                        <img class="img-thumbnail" src="https://dkstatics-public.digikala.com/digikala-products/113451737.jpg?x-oss-process=image/resize,m_lfit,h_150,w_150/quality,q_80">
                      </div>
                      <div class="col-sm-8">
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">کوسن</h5>
                          <small>مدل : 52000</small>
                        </div>
                        <p class="mb-1"></p>
                        <div class="row">
                          <div class="col-sm-9">
                            <div>
                              <small>قیمت : 2000 تومان</small>
                            </div>
                            <div>
                              <small>تعداد : 5 عدد</small>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <span class="mt-4 icofont-ui-delete"></span>
                          </div>
                        </div>


                      </div>
                    </div>

                  </a>


                </div>
              </div>
              <hr>
              <div class=" container row">
                <div class="col-sm-6 pb-4">
                  <small v-text="$t('totalprice')"></small> :
                  <div style="font-size: 20px;">
                    <span class="text-secondary" v-text="80000"></span> تومان

                  </div>




                </div>
                <div class="col-sm-6">
                  <a class="btn mt-1 btn-secondary text-white" v-text="$t('regsiterandsubmite')"></a>
                </div>
              </div>

            </div>

            <span slot="reference">
                            <div class="basketbox   ">

                              <div class="badge badge-danger" v-html="countbasket"></div>

                            </div>
                        </span>
          </popper>
          <popper class="mt-4 mr-2 float-right"
                  :key="2"
                  trigger="clickToOpen"
                  :options="{
                                  placement: 'right',
                                  modifiers: { offset: { offset: '-200px,10px' } }
                            }">
            <ul class="popper list-group text-right backgroundtrsparet  "  dir="rtl">
              <li class="list-group-item  backgroundtrsparet backgroundtrsparethover"  ><a class="disablelink" href="/register"><span  class="icofont icofont-login"></span><span v-text="$t('Register')"></span></a> </li>
              <li class="list-group-item backgroundtrsparet  backgroundtrsparethover"  ><a class="disablelink" href="/login"> <a  class="icofont icofont-lock"></a><span v-text="$t('login')"></span></a></li>
            </ul>
            <span slot="reference">
                            <div class="userbox  "></div>
                        </span>
          </popper>

        </div>

        <div class="col-sm-4">


        </div>
        <div class="col-sm-4  col-xs-12 text-left  pt-4 pl-5" @click="loadsetting">
          <a   href="/">
            <img :src="$storage+'media/setting/'+setting.id+'/thump/'+setting.logo" :alt="setting.webname">

          </a>

        </div>
      </div>

      <hr>
      <div class="row p-4" dir="rtl" style="margin-top: -20px;">
        <ul class="nav ">
          <li class="nav-item mr-3 ml-2" v-for="(item,inx) in productgroup" :key="inx" >
            <template  v-if="item.to_sub.length==0">
              <a :href="'/category/'+item.url" class="mytext" >
                <img :src="$storage+'media/GroupProduct/'+item.id+'/orginal/'+item.thump" width="20px" :alt="item.name" >
                <span v-text="item.name"></span>
              </a>

            </template>
            <template  v-if="item.to_sub.length!=0">

              <popper class=" "
                      :key="3"
                      trigger="clickToOpen"
                      :options="{
                                  placement: 'bottom-end',
                                  modifiers: { offset: { offset: '0px,0px' } }
                            }">
                <div class="popper list-group text-right   w-50"  >
                  <div class="row p-2 ">
                    <div class="col-sm-8 col-xs-12 ">
                      <ul class="list-groups">
                        <li >
                          <h4 v-text="item.name"></h4>
                          <hr>
                        </li>
                        <li v-for="(nav,index) in item.to_sub" :key="index">
                          <a :href="'/category/'+nav.url" class="mytext">
                            <span class="icofont-curved-left"></span>
                            <h6 v-text="nav.name"></h6>
                            <span class="badge badge-primary badge-pill"></span>

                          </a>
                        </li>

                      </ul>
                    </div>
                    <div class="col-sm-4 col-xs-12 " v-html="item.text"></div>
                  </div>
                </div>
                <span slot="reference">
                                          <a  class="mytext">
                                <img :src="$storage+'media/GroupProduct/'+item.id+'/orginal/'+item.thump" width="20px" :alt="item.name" >
                                <span v-text="item.name"></span>
                            </a>
                        </span>
              </popper>

            </template>

          </li>

        </ul>

      </div>
    </div>
  </template>
  </div>

</template>

<script>
    import Popper from 'vue-popperjs';
    import 'vue-popperjs/dist/vue-popper.css';

    export default {
        name: "headers",
        data(){
            return{
                countbasket:5,
                productgroup:{},
                setting:null,
                show:false
            }
        },
        components: {
            'popper': Popper
        },
        methods:{
            loadsetting(){
                let that=this;
                this.$axios.get(this.$url+'setting').then(function (res) {
                    that.setting=res.data;
                });

            },
            loadproductgroup(){
                let that=this;
                this.$axios.get(this.$url+'pgroup',{
                    params:{
                        parent:0
                    }
                }).then(function (res) {
                    that.productgroup=res.data;
                    that.show=true;
                })

            }
        },
        mounted() {
            this.loadsetting();
            this.loadproductgroup();
        }
    }
</script>

<style scoped>
  .mytext{
    cursor: pointer;
    color:#333;
  }
  .mytext:hover{
    color: #333;
    text-decoration: none !important;
    font-weight: bold;
  }
  .popover{
    max-width: 100%; /* Max Width of the popover (depending on the container!) */
  }
  .backgroundtrsparethover:hover{
    background-color: rgba(224,215,11,0.7) !important;
  }
  .btn-secondary:hover{
    background-color: rgba(224,215,11,0.7) !important;
    color:#333 !important;

  }
  .headers{
    background-color: rgba(255, 255, 255, 0.3);
    width: 100%;

    z-index: 200;
  }
  .backgroundtrsparet{
    background-color: rgba(213,212,224,0.24)
  }
  .myslider{

  }
  .basketbox{

    width: 40px;
    height: 40px;
    background-image: url("/asset/icofont/icons.png");
    background-position: -11px -6px;
  }
  .basketbox:hover{
    background-position: -11px -50px;
    cursor: pointer;
  }
  .disablelink{
    color:#333;
    font-style: normal;

  }
  .disablelink:hover{
    text-decoration: none;
  }
  .userbox{

    width: 40px;
    height: 40px;
    background-image: url("/asset/icofont/icons.png");
    background-position: -52px -6px;
  }
  .userbox:hover{
    background-position: -52px -51px;
    cursor: pointer;
  }
  .overytiss{
    overflow-x: auto;
    max-height: 300px;
  }
  .list-groups li{
    list-style: none;
    font-family: IRANSans;
  }
  .list-groups li * a{
    color: #333
  ;
  }
</style>
