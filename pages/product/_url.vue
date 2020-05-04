<template>
  <div >
    <headers></headers>
    <modal  v-if="masterimg!=null" name="demo-login" transition="pop-out" :width="modalWidth"  :height="500"   dir="ltr">
      <div class="box" >
        <div class="box-part" id="bp-left">
          <div class="partition" id="partition-register">
            <div class="partition-title" dir="rtl" v-text="product.data.name"></div>
            <div class="partition-form" style="overflow-y: auto; height: 100%; ">
              <ul class="myitemimages">
                <template  v-for="(item,index) in product.data.toImage">
                  <li :key="index"  class="tiss-cursur" @click="changepicture(item)">
                    <img  :src="$storage+'media/Product/'+product.data.id+'/thump/'+item.file" width="100%">
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
        <div class="box-part" id="bp-right" >
          <img  style="width: 100%;" :src="$storage+'media/Product/'+product.data.id+'/medium/'+masterimg.file"  >
        </div>
      </div>
    </modal>
    <template  v-if="product!=null" >
      <div class="row m-2" style="direction: rtl;" dir="trl ">
      <div class="col-sm-5 col-xs-12 p-4" >
        <template v-if="masterimg!=null">
          <div >
            <img class="w-100 " :src="$storage+'media/Product/'+product.data.id+'/medium/'+masterimg.file">
          </div>
          <ul class="myitemimage">
            <template  v-for="(item,index) in product.data.toImage">
              <li :key="index" v-if="index<=4"   class="tiss-cursur" @click="changepicture(item)">
                <img  :src="$storage+'media/Product/'+product.data.id+'/thump/'+item.file">
                <div class="moreimage" v-if="index==4" @click="show">
                  <i class="icofont-multimedia icofont-2x text-white"></i>
                </div>

              </li>
            </template>

          </ul>
        </template>

      </div>
      <div class="col-sm-4 col-xs-12 p-4 mydetailnumber">
        <h1 v-text="product.data.name"></h1>
        <h4 v-text="product.data.model"></h4>
        <div class="row text-right" dir="rtl ">
          <div class="col-sm-6">
          </div>
        </div>

        <div class="row text-right mt-2" dir="rtl ">
          <div class="row">
            <div class="col-sm-3">
              <a class="titledetail" v-text="$t('category')"></a>
            </div>
            <div class="col-sm-8" >
              <a class="titledetailvalue linkedes" :href="'/category/'+product.data.toGroup.url" v-text="product.data.toGroup.name"></a>
            </div>
            <div class="col-sm-3 mt-3" v-if="product.data.toColor.length!=0">
              <a  class="titledetail"  v-text="$t('selectcolor')"></a>:
            </div>
            <div class="col-sm-12 mt-3" v-if="product.data.toColor.length!=0">

              <ul class="colorobox "  v-if="product.data.toColor.length!=0">
                <li  v-for="(color,index) in product.data.toColor" :key="index" @click="colorselect(index)" class="btn btn-outline-dark ouline-grey row">
                  <span  class="col-sm-4 tiss-cursur bbbb border-1" :style="{'background-color': color.to_color.code }" :title="color.to_color.name"></span>
                  <span class="col-sm-8 cccc" v-text="color.to_color.name"></span>

                </li>
              </ul>
              <div class="clearfix"></div>
              <hr>
            </div>
            <div class="col-sm-12 mt-3">
              <ul v-if="product.data.attr.length!=0" class="mylistprice">
                <li v-for="(item,index) in product.data.attr" :key="index">
                  <div class="card border-dark mb-3 w-100" >
                    <div class="card-header">
                      <span  v-text="item.name"></span>
                      <template v-if="item.pricemode==1">
                        |  <span class="icofont-plus-square"></span>
                      </template>
                    </div>
                    <div class="card-body text-dark" >
                      <template v-for="(opt,inx) in item.option">
                        <div :key="inx" class="btn btn-outline-dark mt-1 text-right w-100 " :class="itemcolor(index,inx,item.pricemode)" @click="calcprice(index,inx)"  style="border: rgba(21,21,21,0.6);">
                          <div class="row" >
                            <div class="col-sm-8  my-2x" v-text="opt.name"></div>
                            <div class="col-sm-4">
                              <template v-if="opt.price!=0">
                                <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="opt.price"></VueNumeric> <small v-text="$t('toman')"></small>
                                <div class="discount" v-if="opt.discount!=0">
                                  <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="opt.discount"></VueNumeric> <small v-text="$t('toman')"></small>
                                </div>
                              </template>
                              <template v-else>
                                <template v-if="item.pricemode==1">
                                  <span class="text-danger" v-text="$t('free')"></span>
                                </template>
                                <template v-else>
                                  <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="product.data.price"></VueNumeric> <small v-text="$t('toman')"></small>
                                  <div class="discount" v-if="product.data.discount!=0">
                                    <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="product.data.discount"></VueNumeric> <small v-text="$t('toman')"></small>
                                  </div>
                                </template>
                              </template>
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-else>
                <div class="row">
                  <div class="col-sm-4 myprice" v-text="$t('price')"></div>
                  <div class="col-sm-8" >
                    <div class="mymainprice text-left">
                      <VueNumeric   dir="rtl" :read-only="true"  separator="," v-model="product.data.price"></VueNumeric> <small v-text="$t('toman')"></small>

                    </div>
                    <div class="mymaindiscount text-left" v-if="product.data.discount!=null || product.data.discount!=0">
                      <VueNumeric   dir="rtl" :read-only="true"  separator="," v-model="product.data.discount"></VueNumeric> <small v-text="$t('toman')"></small>

                    </div>

                  </div>

                </div>
              </div>
              <h4 v-text="$t('morecomment')" class="mt-4"> </h4>
              <div v-if="product.data.morecomment!=null || product.data.morecomment!=''" class="morecomemnt" :class="fewcomment" >
                <ShowArticle :text="product.data.morecomment"></ShowArticle>
              </div>
              <div class="text-center">
                <span class=" icofont-2x" :class="mousedown" @click="expandcomment"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3 col-xs-12 ">
        <div class="bg-grey-lights  text-left">
          <div >
            <h5 class="pricetext text-right mt-3" v-text="$t('shareite')"></h5>
            <div class="bg-transparent">
              <ul class="sharemenu bg-transparent">
                <li><a class="btn btn-primary" :href="'https://www.facebook.com/sharer/sharer.php?m2w&s=100&p[url]='+link">
                  <span class="icofont-facebook iconshareitew"></span>
                </a></li>
                <li>
                  <a class="btn btn-primary"  target="_blank" :href="'https://twitter.com/intent/tweet?url='+link">
                    <span class="icofont-twitter iconshareitew"></span>
                  </a>
                </li>
                <li>
                  <a class="btn btn-success" target="_blank" :href="'https://api.whatsapp.com/send?phone=&text='+link+'&source=&data=&app_absent='">
                    <span class="icofont-whatsapp iconshareitew"></span>
                  </a>
                </li>

                <li><a class="btn btn-outline-warning"  v-clipboard:copy="link" v-clipboard:success="onCopy" v-clipboard:error="onError">
                  <span class="text-black copiedtext"  v-text="$t('copylink')"></span>
                  <span class="icofont-ui-copy text-black iconshareite"></span>
                </a>

                </li>

              </ul>
            </div>
          </div>
          <hr>
          <template v-if="totalprice==0">
            <div class="pricetext text-right" v-text="$t('selectyouroption')"></div>

          </template>
          <template v-else>
          <template v-if="product.data.attr.length==0">
            <div class="row text-right" v-if="selectedoption.item!=null">
              <div class="col-sm-8 pricetextsmall text-right">
                <div>{{ product.data.name }}</div>
              </div>
              <div class="col-sm-4 text-left">
                <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="price"></VueNumeric> <small v-text="$t('toman')"></small>
              </div>
            </div>
          </template>
            <template v-else>
            <div class="row text-right" v-if="selectedoption.item!=null">
              <div class="col-sm-8 pricetextsmall text-right">
                <div>{{ selectedoption.attrvalue.name }}</div>
                <small class="text-primary" v-text="selectedoption.optionvalue.name"></small>
              </div>
              <div class="col-sm-4 text-left">
                <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="price"></VueNumeric> <small v-text="$t('toman')"></small>
              </div>
            </div>
            </template>
            <hr>
            <div class="row text-right" v-if="optselectedoption.item!=null">
              <div class="col-sm-8 pricetextsmall text-right">
                <div>{{ optselectedoption.attrvalue.name }}</div>
                <small class="text-primary" v-text="optselectedoption.optionvalue.name"></small>

              </div>
              <div class="col-sm-4 text-left ">
                <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="addprice"></VueNumeric> <small v-text="$t('toman')"></small>
              </div>
            </div>
            <hr>
            <template v-if="colorselected!=null">
              <div>
                <div class="col-sm-8 pricetextsmall text-right">
                  <a v-text="$t('color')"></a>:
                  <small class="text-primary" v-text="colorselected.to_color.name"></small>
                </div>
                <div class="col-sm-4 ">
                </div>

              </div>
              <hr>
            </template>
            <div class="pricetext w-100 text-right" dir="ltr" v-text="$t('payprice')"></div>
            <span  class="pricevaluefinal" >
                    <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="totalprice"></VueNumeric> <small v-text="$t('toman')"></small>

                    </span>
            <div>
                        <span  class="dpricevaluefinal" >
                    <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="dtotalprice"></VueNumeric> <small v-text="$t('toman')"></small>
                    </span>
            </div>
            <div>
                        <span v-if="price!=0">
                          <a v-if="status==1" @click="addtobasket()" class="btn bg-yellow w-100 mt-4 mb-2192192.1 ">اضافه کرده به سبد خرید</a>
                          <a v-if="status==0"  class="btn bg-yellow w-100 mt-4 mb-2192192.1 ">ناموجود</a>
                          <a v-if="status==3" class="btn bg-yellow w-100 mt-4 mb-2192192.1 ">اتمام تولید</a>

                        </span>
              <span v-else>
                          <a v-if="status==0"  class="btn bg-yellow w-100 mt-4 mb-2192192.1 ">ناموجود</a>
                          <a v-if="status==3" class="btn bg-yellow w-100 mt-4 mb-2192192.1 ">اتمام تولید</a>

                        </span>
            </div>


          </template>

        </div>
      </div>
      <div class="container mt-10" dir="rtl" >
        <div class="row">
          <div class="col-xs-12 w-100 ">
            <nav>
              <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"  v-text="$t('Attribute')"></a>
                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false" v-text="$t('review')" ></a>
                <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false" v-text="$t('description')"></a>
                <a class="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false" v-text="$t('help')"></a>
                <a class="nav-item nav-link" id="nav-user-comment" data-toggle="tab" href="#usercomments" role="tab" aria-controls="nav-about" aria-selected="false" v-text="$t('userreview')"></a>
              </div>
            </nav>
            <div class="tab-content py-3 px-3 px-sm-0 w-100" id="nav-tabContent">
              <div class="tab-pane fade show w-100 active text-right p-3 b" style="width: 100%; " id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

               <template v-if="product.data.feature!=null">
                  <template v-for="(fea,idx) in product.data.feature">
                    <li :key="idx">
                      <span v-text="fea.name"></span>:
                      <template v-if="fea.mode==4">
                        <template v-if="fea.to_options">
                          <span v-text="fea.to_options.name"></span>

                        </template>
                      </template>
                      <template v-if="fea.mode==3">
                        <span v-if="fea.value==1" v-text="$t('have')"></span>
                        <span v-if="fea.value==0" v-text="$t('nothaving')"></span>
                      </template>
                      <template v-if="fea.mode==2">
                        <span v-text="fea.value"></span>
                      </template>
                      <template v-if="fea.mode==1">
                        <p v-html="fea.value"></p>
                      </template>
                    </li>

                  </template>
               </template>
              </div>
              <div class="tab-pane fade p-3" dir="rtl" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <p v-html="product.data.review"></p>
              </div>
              <div class="tab-pane fade p-3" id="nav-contact" dir="rtl" role="tabpanel" aria-labelledby="nav-contact-tab">
                <p v-html="product.data.morecomment"></p>
              </div>
              <div class="tab-pane fade p-3" id="nav-about" dir="rtl" role="tabpanel" aria-labelledby="nav-about-tab">
                <p v-html="product.data.help"></p>
              </div>
              <div class="tab-pane fade" id="usercomments" role="tabpanel" aria-labelledby="nav-about-tab">
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>

    </template>
    <pre>{{ product }}</pre>
    <Footers class="mt-40"></Footers>
  </div>
</template>

<script>
    const MODAL_WIDTH = 1024
    import VueNumeric from 'vue-numeric';
    import headers from "../../components/view/template/header";
    import Footers from "../../components/view/template/footer";
    import ShowArticle from "../../components/view/tools/Showarticle";
    export default {
        name: "productdetailshow",

        data(){
            return{
                prodcutname:'',
                status:1,
                product:null,
                masterimg:null,
                fewcomment:'smallparageraph',
                mousedown:'icofont-scroll-double-down',
                modalWidth: MODAL_WIDTH,
                totalprice:0,
                dtotalprice:0,
                price:0,
                colorselected:null,
                dprice:0,
                addprice:0,
                daddprice:0,
                selectedoption:{
                    item:null,
                    option:null,
                    optionvalue:null,
                    attrvalue:null,

                },
                optselectedoption:{
                    item:null,
                    option:null,
                    optionvalue:null,
                    attrvalue:null,

                }

            }
        },
        components: {
            headers,
            Footers,
            VueNumeric,ShowArticle
        },
        computed:{
            link:function () {
                if(this.product!=null){
                    return  '';
                }else{
                    return '';
                }
            },
            selectcolor:function(){
                return "backgroundcolor";
            },
        },

        methods:{
            colorselect(e){
                this.colorselected=this.product.data.toColor[e];
                this.status=this.colorselected.existing;

            },

            onCopy: function (e) {

                let that=this;
                this.$swal.fire({
                    position: 'center-center',
                    icon: 'success',
                    title: that.$t('Copied'),
                    showConfirmButton: false,
                    timer: 1500
                })
            },
            onError: function (e) {
                alert('Failed to copy texts')
            },
            calcprice(index,opt){
                let self=this;
                let item=this.product.data.attr[index];
                let option=item.option[opt];
                let curentprice=0;
                if(item.pricemode==0){
                    this.selectedoption.optionvalue=option;
                    this.selectedoption.attrvalue=item;

                    this.selectedoption.option=opt;
                    this.selectedoption.item=index;
                    if(option.price==0){
                        self.price=this.product.data.price;
                        self.dprice=this.product.data.discount;
                    }else{

                        self.price=option.price;
                        self.dprice=option.discount;
                    }

                }
                if(item.pricemode==1){
                    this.optselectedoption.optionvalue=option;
                    this.optselectedoption.attrvalue=item;

                    this.optselectedoption.option=opt;
                    this.optselectedoption.item=index;
                    if(option.price==0){
                        self.addprice=0;
                    }else{
                        self.addprice=option.price;
                        self.daddprice=option.discount;
                    }

                }

                if(item.pricemode==0) {
                }
                this.totalprice=this.price+this.addprice;
                this.dtotalprice=this.dprice+this.daddprice;


            },
            itemcolor(item,option,pricemode){
                if(pricemode==0){
                    if(this.selectedoption.item==item &&  this.selectedoption.option==option){
                        return 'itemselect';
                    }
                }
                if(pricemode==1){
                    if(this.optselectedoption.item==item &&  this.optselectedoption.option==option){
                        return 'itemselect';
                    }
                }



            },
            expandcomment(){
                if(this.fewcomment=='smallparageraph'){
                    this.fewcomment='largparageraph';
                    this.mousedown='icofont-scroll-double-up';
                }else{
                    this.fewcomment='smallparageraph';
                    this.mousedown='icofont-scroll-double-down';
                }

            },
            show () {
                this.$modal.show('demo-login');
            },
            hide () {
                this.$modal.hide('demo-login');
            },
            changepicture(item){
                this.masterimg=item;
            },
            mainpage(){
                let that=this;
                if(this.product.data.toImage){
                    this.product.data.toImage.filter(function (item) {
                        if(item.master==1){
                            that.masterimg=item;
                        }
                    })
                }

            },
            addtobasket(){
                const item={
                  'product':this.product.data.id,
                  'Qty':1,
                  'color':this.colorselected,
                  'option':this.optselectedoption,
                  'selectedOptions':this.selectedoption,
              };
                try{
                    if(!localStorage.sabad){
                        const myobject=new Object();
                        myobject[0]=item;
                        localStorage.setItem('sabad',JSON.stringify(myobject));
                    }else{
                        let sabad=JSON.parse(localStorage.getItem('sabad'));
                        const  myobject=new Object();
                        let x=0;
                        for (let items in sabad){
                            myobject[x]=sabad[items];
                            x++;
                        }
                        myobject[x]=item;
                        localStorage.setItem('sabad',JSON.stringify(myobject));
                    };


                }finally {
                    $nuxt.$router.push({name: 'shipping'});

                }


            },
            loadproduct(){
                let that=this;

                this.$axios.get(this.$url+'product/'+this.$route.params.url)
                    .then(function (res) {
                        that.product=res.data;
                        that.prodcutname=res.data.name;
                        if(res.data.data.attr.length==0){

                            that.totalprice=res.data.data.price;
                            that.price=res.data.data.price;
                            that.dtotalprice=res.data.data.discount;
                        }
                        that.mainpage();
                        that.$forceUpdate();
                    })


            }
        },
        beforeMount() {
            this.loadproduct();
            this.show();
        }
        ,created () {

        },
        head () {
            return {
                title: this.prodcutname,
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

<style lang="scss">

  $background_color: #404142;
  $github_color: #DBA226;
  $facebook_color: #3880FF;
  .titledetail{
    color: #151515;
    font-size: 14px;
  }
  .titledetailvalue{
    font-size: 14px;
    color: #333333;
    font-weight: bold;

  }
  .mydetailnumber h1{
    direction: rtl;
    text-align: right;
    font-size: 25px;
    color: #9d9d9d;
  }
  .mydetailnumber h4{
    text-align: right;
    color: rgba(141, 141, 141, 0.56);
    font-size: 14px;
    font-weight: bold;
    border-bottom: solid 1px rgba(141, 141, 141, 0.38);
  }
  .itemselect{
    background-color: #e0ab0f !important;
    color:#333333;
  }
  .box {
    background: white;
    overflow: hidden;
    height: 100%;
    border-radius: 2px;
    box-sizing: border-box;
    box-shadow: 0 0 40px black;
    color: #8b8c8d;
    font-size: 0;
    .box-part {
      display: inline-block;
      position: relative;
      vertical-align: top;
      box-sizing: border-box;
      height: 100%;
      width: 30%;
      &#bp-right {
        width: 70%;
        border-left: 1px solid #eee;
      }
    }
    .box-messages {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
    .box-error-message {
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      height: 0;
      line-height: 32px;
      padding: 0 12px;
      text-align: center;
      width: 100%;
      font-size: 11px;
      color: white;
      background: #F38181;
    }
    .partition {
      width: 100%;
      height: 100%;
      .partition-title {
        box-sizing: border-box;
        padding: 30px;
        width: 100%;
        text-align: center;
        letter-spacing: 1px;
        font-size: 20px;
        font-weight: 300;
      }
      .partition-form {
        padding: 0 20px;
        box-sizing: border-box;
      }
    }
    input[type=password],
    input[type=text] {
      display: block;
      box-sizing: border-box;
      margin-bottom: 4px;
      width: 100%;
      font-size: 12px;
      line-height: 2;
      border: 0;
      border-bottom: 1px solid #DDDEDF;
      padding: 4px 8px;
      font-family: inherit;
      transition: 0.5s all;
      outline: none;
    }
    button {
      background: white;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 10px;
      letter-spacing: 1px;
      font-family: "Open Sans", sans-serif;
      font-weight: 400;
      min-width: 140px;
      margin-top: 8px;
      color: #8b8c8d;
      cursor: pointer;
      border: 1px solid #DDDEDF;
      text-transform: uppercase;
      transition: 0.1s all;
      font-size: 10px;
      outline: none;
      &:hover {
        border-color: mix(#DDDEDF, black, 90%);
        color: mix(#8b8c8d, black, 80%);
      }
    }
    .large-btn {
      width: 100%;
      background: white;
      span {
        font-weight: 600;
      }
      &:hover {
        color: white !important;
      }
    }
    .button-set {
      margin-bottom: 8px;
    }
    #register-btn,
    #signin-btn {
      margin-left: 8px;
    }
    .facebook-btn {
      border-color: $facebook_color;
      color: $facebook_color;
      &:hover {
        border-color: $facebook_color;
        background: $facebook_color;
      }
    }
    .github-btn {
      border-color: $github_color;
      color: $github_color;
      &:hover {
        border-color: $github_color;
        background: $github_color;
      }
    }
    .autocomplete-fix {
      position: absolute;
      visibility: hidden;
      overflow: hidden;
      opacity: 0;
      width: 0;
      height: 0;
      left: 0;
      top: 0;
    }
  }
  .pop-out-enter-active,
  .pop-out-leave-active {
    transition: all 0.5s;
  }
  .pop-out-enter,
  .pop-out-leave-active {
    opacity: 0;
    transform: translateY(24px);
  }
  .myitemimage{
    width: 100%;
    white-space: nowrap; /* This is required unless you put the helper span closely near the img */
    margin: 1em 0;
    height: 50px;

  }
  .myitemimage li{
    float: right;
    list-style: none;
    border-collapse: separate;
    border-spacing: 15px;
    border: solid 1px #a3a3a3;
    margin: 1px;
    width: 18%;
    vertical-align: center;
    horiz-align: center;
    border-radius: 5px;
    display: flex;
    height: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
    padding: 10px;


  }
  .myitemimage li:hover{
    border: solid 1px #848484;
  }
  .myitemimage li   img{width: 100%;
    vertical-align: middle;
    max-height: 50px;

  }
  .moreimage{
    position: absolute;


  }
  .myitemimages{
    width: 100%;
    white-space: nowrap; /* This is required unless you put the helper span closely near the img */
    margin: 1em 0;
    height: 70px;

  }
  .myitemimages li{
    float: right;
    list-style: none;
    border-collapse: separate;
    border-spacing: 15px;
    border: solid 1px #a3a3a3;
    margin: 1px;
    width: 32%;
    vertical-align: center;
    horiz-align: center;
    border-radius: 5px;
    display: flex;
    height: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
    padding: 10px;

  }
  .myitemimage li   img{width: 100%;
    vertical-align: middle;
    max-height: 70px;

  }
  .colorobox li{
    float: right;
    list-style: none;
    margin: 1px;
    border-radius: 10px;
    display: inline-block;
  }
  .colorobox li .cccc {
    font-size: 14px;
  }
  .colorobox li .bbbb{
    width: 20px;
    height: 20px;
    overflow: hidden;

    border-radius: 5px;


  }
  .border-1{
    border: solid 1px #a3a3a3;
  }
  .smallparageraph{
    height: 44px;
    overflow: hidden;
  }
  .largparageraph{

  }
  .morecomemnt{
    overflow: hidden;
  }
  .mylistprice li{
    list-style: none;
  }
  .bg-grey-lights{
    text-align: right;
    padding: 5px;
    margin-top: 100px;
    border-radius: 5px;
    -webkit-box-shadow: inset 0px 0px 34px 5px rgba(219,212,219,0.58);
    -moz-box-shadow: inset 0px 0px 34px 5px rgba(219,212,219,0.58);
    box-shadow: inset 0px 0px 34px 5px rgba(219,212,219,0.58);
    border: 1px solid #e4e4e4;
  }

  .pricetext{
    color: #8a8a8a;
    font-size: 20px;

  }
  .pricetextsmall{
    color: #8a8a8a;
    font-size: 14px;

  }
  .pricevaluefinal span{
    font-size: 26px !important;
  }
  .discount *{
    font-size: 10px;
    color: #a3a3a3;;
  }
  .discount{
    text-decoration: line-through;
    color: #a3a3a3;

  }
  .dpricevaluefinal *{
    font-size: 10px;
  }
  .dpricevaluefinal{
    text-align: left;
    direction: ltr;
    text-decoration:#333333 line-through;
  }
  .ouline-grey{
    border: #717171 !important;
  }
  .my-2x{
    font-size: 16px;
    padding-top: 7px;
  }
  .sharemenu {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
  }

  .sharemenu li {
    float: right;
    margin: 0px;
    padding: 5px;
    zoom: 85%;
  }
  .sharemenu li{
    margin: 2px;
  }
  .sharemenu li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  .iconshareite{
    font-size: 14px;
    color: #333333;
  }
  .iconshareitew{
    font-size: 22px;
    color: #fff;
  }
  .sharemenu li a:hover {
    background-color: #111;
  }
  .iconshareite{
    font-size: 18px;
  }
  .copiedtext{
    color: #333333;
  }
  .bg-yellow{
    background-color: #838383 !important;
    color:yellow !important;
  }
  .myprice{
    font-size: 20px;
    font-weight: bold;
    color: #383d41;
  }
  .mymainprice *{
    font-size: 20px;
  }
  .mymaindiscount *{
    text-decoration: line-through;
  }
  .backgroundcolor{
    background-color: #383d41 !important;
    color: #fff !important;
  }


  nav > .nav.nav-tabs{

    border: none;
    color:#fff;
    background:#272e38;
    border-radius:0;

  }
  nav > div a.nav-item.nav-link,
  nav > div a.nav-item.nav-link.active
  {
    border: none;
    padding: 18px 25px;
    color:#fff;
    background:#272e38;
    border-radius:0;
  }

  nav > div a.nav-item.nav-link.active:after
  {
    content: "";
    position: relative;
    bottom: -60px;
    left: -10%;
    border: 15px solid transparent;
    border-top-color: #e0ab0f;
  }
  .tab-content{
    background: #fdfdfd;
    line-height: 25px;
    border: 1px solid #ddd;
    border-top:5px solid #e0ab0f;
    border-bottom:5px solid #e0ab0f;
    padding:30px 25px;
  }

  nav > div a.nav-item.nav-link:hover,
  nav > div a.nav-item.nav-link:focus
  {
    border: none;
    background: #e0ab0f;
    color:#fff;
    border-radius:0;
    transition:background 0.20s linear;
  }
  .mt-40{
    margin-top: 100px;
  }
  .mt-10{
    margin-top: 40px;
  }
</style>
