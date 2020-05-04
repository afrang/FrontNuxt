<template>
  <div  v-if="mitem!=false">
    <headers class="headerfirstpage" ></headers>
    <template v-if="cfirsptagedata.offsliders">
      <slider1  class="myslider" height="320" :id="cfirsptagedata.sliders.image" :name="'topslider'"></slider1>

    </template>
    <div class="bg-yellow">
      <div class="container" >
        <div class="row">
          <div class="col-sm-4 col-xs-12 p-4" dir="rtl" >
            <div class="row">
              <div class="col-sm-12 text-center">
                <a v-if="cfirsptagedata.urlbox1" :href="cfirsptagedata.urlbox1.text">
                  <template v-if="cfirsptagedata.counter2">
                    <countdown
                      v-if="cfirsptagedata.counter2.text!=null"
                      style="position: absolute; margin-top:6px; margin-left: -20px;"
                      trans='{
                                         "day":"Day",
                                         "hours":"Hours",
                                         "minutes":"Minuts",
                                         "seconds":"Seconds",
                                         "expired":"Event has been expired.",
                                         "running":"Till the end of event.",
                                         "upcoming":"Till start of event.",
                                         "status": {
                                            "expired":"Expired",
                                            "running":"Running",
                                            "upcoming":"Future"
                                           }}'
                      :starttime='[ cfirsptagedata.counter2.text, "jYYYY/jMM/jDD HH:mm" ] | moment("MMM D, YYYY hh:mm:00")'
                      :endtime='[ cfirsptagedata.counter2.image, "jYYYY/jMM/jDD HH:mm" ] | moment("MMM D, YYYY hh:mm:00")' ></countdown>
                  </template>

                  <img  v-if="cfirsptagedata.img1" class="img-thumbnail w-100" style="height: 190px;"  :src="$storage+'media/firspage/1/thump/'+cfirsptagedata.img1.image" >
                </a>

              </div>
              <div class="col-sm-12 mt-4" >
                <template v-if="cfirsptagedata.counter">
                  <countdown
                    v-if="cfirsptagedata.counter.text!=null"
                    style="position: absolute; margin-top:6px; margin-left: -20px;"
                    trans='{
                                          "day":"Day",
                                          "hours":"Hours",
                                          "minutes":"Minuts",
                                          "seconds":"Seconds",
                                          "expired":"Event has been expired.",
                                          "running":"Till the end of event.",
                                          "upcoming":"Till start of event.",
                                          "status": {
                                             "expired":"Expired",
                                             "running":"Running",
                                             "upcoming":"Future"
                                            }}'
                    :starttime='[ cfirsptagedata.counter.text, "jYYYY/jMM/jDD HH:mm" ] | moment("MMM D, YYYY hh:mm:00")'
                    :endtime='[ cfirsptagedata.counter.image, "jYYYY/jMM/jDD HH:mm" ] | moment("MMM D, YYYY hh:mm:00")' ></countdown>

                </template>
                <img  v-if="cfirsptagedata.img2" class="img-thumbnail w-100" style="height: 190px;"  :src="$storage+'media/firspage/1/thump/'+cfirsptagedata.img2.image" >
              </div>
            </div>
          </div>
          <div class="col-sm-8 col-xs-12 p-4" >

            <slider2  v-if="cfirsptagedata.offsliders" :id="cfirsptagedata.offsliders.image"></slider2>

          </div>
        </div>
      </div>
    </div>

    <template v-if="listspecial!=null">
      <carousel :perPage="5">
        <slide  v-for="(item,index) in listspecial.data" :key="index" class="m-1"  >
          <a class="removedecration" :href="'/product/'+item.url">
            <div class="card "  style="border-radius: 45px;" >
              <img  v-if="item.image!=null" class="card-img-top h400" :src="$storage+'media/Product/'+item.id+'/thump/'+item.image" :alt="item.name">
              <img  v-if="item.image==null"  class="card-img-top h400" src="/asset/icofont/nopic.png" :alt="item.name">
              <div class="card-text text-center tiss-thumpbox">
                <div class="row">
                  <div class="col-sm-12 text-right">
                    <span v-if="item.percent!=null" class="badge badge-danger float-left" v-text="item.percent+ '%'"></span>
                    <p v-text="item.group" class="yellowtext"></p>
                    <h5 class="m&#45;&#45;4" dir="rtl"><span v-text="item.name" class="font-weight-bolder"></span> <small class="text-blue font-weight-bolder m&#45;&#45;4" v-text="item.model"></small></h5>
                  </div>
                  <div class="col-sm-6 text-right myitems  redlies " >
                    <template v-if="item.price!=null">
                      <small v-text="$t('toman')"></small>
                      <vue-numeric dir="rtl" :read-only="true"  separator="," v-model="item.price"></vue-numeric>
                    </template>
                  </div>
                  <div class="col-sm-6 myitems text-right greentext">
                    <template v-if="item.discount!=null">
                      <small v-text="$t('toman')"></small>
                      <vue-numeric dir="rtl" :read-only="true"   class="mainprice"  separator="," v-model="item.discount"></vue-numeric>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </slide>
      </carousel>
    </template>
    <div class="container" >
      <div class=" row mt-3 productfirst">
        <div class="col-sm-6 col-xs-12 text-center">
          <a  v-if="product.prs!=null" :href="'/prodcut/'+product.prs.data.url">
            <div class="img-hover-zoom">
              <img  v-if="cfirsptagedata!=null" :src="$storage+'media/firstpage/1/orginal/'+cfirsptagedata.special.image" class="w-100" style="border-radius: 5px;">
            </div>

            <div class="container">
              <div v-if="product.prs!=null" class="row mt-2 mypricespecial" >
                <div class="col-sm-6 text-left">
                  <div class="col-sm-6 myitems text-right greentext">
                    <template v-if="product.prs.data.price!=null">
                      <small v-text="$t('toman')"></small>
                      <vue-numeric dir="rtl" :read-only="true"  separator="," v-model="item.price"></vue-numeric>
                    </template>
                    <template v-if="product.prs.data.discount!=null">
                      <small v-text="$t('toman')"></small>
                      <vue-numeric dir="rtl" :read-only="true"   class="mainprice"  separator="," v-model="product.prs.data.discount"></vue-numeric>
                    </template>
                  </div>
                  <star-rating style="margin-top: -10px;" star-size="20" :glow="20" :round-start-rating="false"  :read-only="true" :show-rating="false" :rating="2.5" class="w-100"></star-rating>
                </div>
                <div class="col-sm-6 text-right" dir="rtl">
                  <h5>{{ product.prs.data.name }} <small>{{ product.prs.data.model }}</small></h5>
                  <p>{{ product.prs.data.group }}</p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col-sm-6 col-xs-12">
          <div class="row">
            <div class="col-sm-6"  v-for="(n, index) in 4"  :key="index">
              <a  v-if="product['pr'+(index+1)]!=null" :href="'/prodcut/'+product['pr'+(index+1)].data.url">
                <template v-if="product['pr'+(index+1)]!=null" >
                  <div class="img-hover-zoom">
                    <img  v-if="product['pr'+(index+1)].data.image!=null" height="320px;" class="w-100" style="border-radius: 5px;" :src="$storage+'media/Product/'+product['pr'+(index+1)].data.id+'/thump/'+product['pr'+(index+1)].data.image" :alt="product['pr'+(index+1)].data.name">
                    <img  v-if="product['pr'+(index+1)].data.image==null"  height="320px;" class="w-100" style="border-radius: 5px;" src="/asset/icofont/nopic.png" :alt="product['pr'+(index+1)].data.name">
                  </div>
                  <div class="row mt-2 mypricespecial" >
                    <div class="col-sm-4">
                      <star-rating style="margin-top: -10px;" star-size="20" :glow="20" :round-start-rating="false"  :read-only="true" :show-rating="false" :rating="2.5" class="w-100"></star-rating>
                      <template v-if="product['pr'+(index+1)].data.price!=null">
                        <small v-text="$t('toman')"></small>
                        <vue-numeric dir="rtl" :read-only="true"  separator="," v-model="product['pr'+(index+1)].data.price"></vue-numeric>
                      </template>
                    </div>
                    <div class="col-sm-8 text-right" dir="rtl">
                      <h5 >{{ product['pr'+(index+1)].data.name }} <small>{{ product['pr'+(index+1)].data.model }}</small></h5>
                      <p>{{ product['pr'+(index+1)].data.group }}</p>
                    </div>
                  </div>
                </template>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gray1">
      <div class="row">
        <div class="col-sm-6 col-xs-12 p-0">
          <div class="">
            <img v-if="cfirsptagedata.b1img.image" :src="$storage+'media/firstpage/1/orginal/'+cfirsptagedata.b1img.image" width="100%" style="height: 800px;">
            <a  v-if="blog['b1']!=null" :href="'/blog'+blog['b1'].data.url">
              <div class="boxb1 " dir="rtl">
                <p v-text="blog['b1'].data.title"></p>
                <h4 v-text="blog['b1'].data.name"></h4>
              </div>
            </a>
          </div>
        </div>
        <div class="col-sm-6 col-xs-12 row p-0" >
          <div class="col-sm-6 p-0" style="height: 400px;">
            <img v-if="cfirsptagedata.b2img.image" :src="$storage+'media/firstpage/1/orginal/'+cfirsptagedata.b2img.image" width="100%" style="height: 400px;">
            <div   v-if="blog['b1']!=null" class="b2text textblog">
              <p v-text="blog['b1'].data.title"></p>
              <h4 v-text="blog['b1'].data.name"></h4>
            </div>-->
          </div>
          <div class="col-sm-6 p-0" style="height: 400px;">
            <img  v-if="cfirsptagedata.b3img"  :src="$storage+'media/firstpage/1/orginal/'+cfirsptagedata.b3img.image" width="100%" style="height: 400px;">
            <div    v-if="blog['b2']!=null" class="b2text textblog">
              <p class="text-white"  v-text="blog['b2'].data.title"></p>
              <h4 class="text-white"  v-text="blog['b2'].data.name"></h4>
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="col-sm-12 p-0">
            <img  v-if="cfirsptagedata.b4img"  :src="$storage+'media/firstpage/1/orginal/'+cfirsptagedata.b4img.image" width="100%" style="height: 400px;">
            <a   v-if="blog['b3']!=null" :href="'/blog'+blog['b3'].data.url">
              <div class="boxb1 " dir="rtl" style="margin-top:-140px; color:#fff;">
                <p  v-text="blog['b3'].data.title"></p>
                <h4 class="text-white"   v-text="blog['b3'].data.name"></h4>
              </div>
            </a>
          </div>
          <div class="mt-4 col-sm-12 row mb-4" style="margin-bottom: 200px;">
          </div>
        </div>
        <div class="col-sm-12 row" dir="rtl">
          <div class="col-sm-6 col-xs-12 p-4">
            <show-article class="text-justify text-white" :text="cfirsptagedata.about.text"></show-article>
            <div class="clearfix"></div>
          </div>
          <div class="col-sm-6 col-xs-12 text-center pt-4">
            <img  v-if="cfirsptagedata.aboutimg"    style="margin-top: 300px;"  class="mt-4"  :src="$storage+'media/firstpage/1/thump/'+cfirsptagedata.aboutimg.image" >
          </div>
        </div>
        <br>
        <div class="clearfix mt-5"></div>
      </div>
    </div>
    <footers></footers>
  </div>
</template>

<script>
    import headers from "../components/view/template/header";
    import slider1 from "../components/view/template/slider1";

    import footers from "../components/view/template/footer";

    import ShowArticle from "../components/view/tools/Showarticle";
    //import countdown from "../components/view/tools/countdown";
      import StarRating from 'vue-star-rating';



    export default {
        loading: true,
        name: "firstpage",
        components:{
            headers,
            slider1,
            ShowArticle,
            StarRating,
            footers,

        },


        data: () => ({
            setting:{
                webname:'',
            },
            firsptagedata:null,
            cfirsptagedata:{},
            listspecial:null,
            moneyslide:{
                decimal: ',',
                thousands: ',',
                prefix:'تومان',
                suffix: ' ',
                precision: 0,
                masked: false
            },
            mitem:false,
            blog:{
                b1:null,
                b2:null,
                b3:null,
                b4:null,
            },
            product:{
                prs:null,
                pr1:null,
                pr2:null,
                pr3:null,
                pr4:null

            }
        }),
        watch :{
            firsptagedata:function (mydata) {

                if(mydata!=null){
                    let self=this;
                    try {

                        mydata.map(function (item) {

                            self.cfirsptagedata[item.name] = item;
                            if (item.name == 'tagslider') {
                                self.searchproduct();
                            }
                            if (item.name == 'prs') {
                                self.findprs('prs');
                            }
                            if (item.name == 'pr1') {
                                self.findprs('pr1');
                            }
                            if (item.name == 'pr2') {
                                self.findprs('pr2');
                            }
                            if (item.name == 'pr3') {
                                self.findprs('pr3');
                            }
                            if (item.name == 'pr4') {
                                self.findprs('pr4');
                            }
                            if (item.name == 'b1') {
                                self.blogshow('b1');
                            }
                            if (item.name == 'b2') {
                                self.blogshow('b2');
                            }
                            if (item.name == 'b3') {
                                self.blogshow('b3');
                            }
                            if (item.name == 'b4') {
                                self.blogshow('b4');
                            }

                        });
                    } finally {
                        self.$forceUpdate();
                        self.mitem=true;
                    }

                }


            },


        },
        methods:{
            loaddata(){

                let that=this;
                this.$axios.get(this.$url+'firstpage',{
                    params:{
                        methods:'firstpage',
                    },
                }).then(function (res) {
                    that.firsptagedata = res.data;


                });
            },
            searchproduct(){
                let that=this;

                this.$axios.get(this.$url+'searchproduct',{
                    params: {
                        tag:that.cfirsptagedata.tagslider.image

                    },
                }).then(function (res) {
                    that.listspecial=res.data;
                });
            },
            findprs(pr){
                let that=this;

                this.$axios.get(this.$url+'searchproduct/'+this.cfirsptagedata[pr].image,{
                    params: {

                    },
                    headers:{Authorization:localStorage.token}
                }).then(function (res) {
                    that.product[pr]=res.data;
                });
            },
            blogshow(blog){
                let that=this;
                this.$axios.get(this.$url+'article/'+this.cfirsptagedata[blog].image,{
                }).then(function (res) {
                    that.blog[blog]=res.data;
                });
            },
            options(){

            }
        },
        mounted() {

        },
        beforeMount(){

            let that=this;
            this.$axios.get(this.$url+'setting').then(function (res) {
                that.setting=res.data;
                that.$forceUpdate();
            });
            this.loaddata();
        },
        head () {
            return {
                title: this.setting.webname,

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
  .headerfirstpage{
    position: absolute;z-index: 5000; width: 100%;
  }
  .mesa{
    width: 100%;
    height: 700px;
    background-size: cover;
    margin-top: -200px;
    background-attachment: fixed;
  }
  .redlies{
    text-decoration:line-through;
  }
  .mypricespecial{
    text-decoration: none;
    color:#333333;;

  }
  .mainprice{
    font-size: 18px; color: red;
  }
  .mypricespecial  * h5{
    font-size:14px;
    font-weight: bolder;
    color:dimgray;;

  }
  .mypricespecial  * p{
    font-size:10px;
    font-weight: bolder;
    color:dimgray;;

  }
  .myitems{
    margin-top: -5px;
    font-weight: bolder;
  }
  .bg-yellow{
    background-color:yellow ;
  }
  .mytitleproduct div h5{
    color: #666666;;
    font-weight: bolder;
    font-size: 24px;
    margin-right: 10px;
  }
  .mytitleproduct p{
    padding-right: 20px;
    direction: rtl;
  }
  .productfirst div a{
    text-decoration: none;


  }
  .productfirst div p {
    color: #666;
    font-weight: bold;

  }
  /* [1] The container */
  .img-hover-zoom {
    overflow: hidden; /* [1.2] Hide the overflowing of child elements */
  }

  /* [2] Transition property for smooth transformation of images */
  .img-hover-zoom img {
    transition: transform 1s ease;
  }

  /* [3] Finally, transforming the image when container gets hovered */
  .img-hover-zoom:hover img {
    transform: scale(1.2);
  }
  .tiss-thumpbox{
    margin: 10px;
    border-radius: 4px;
    margin-top: -125px;
    background-color: #ffffff;
    padding: 10px;
    height: 78px;
    line-height: 1;


  }
  .h400{
    height: 400px;
    overflow: hidden;
  }
  .yellowtext{
    color: #e0ab0f;
  }.m--4{
     margin-top: -11px;
   }
  .greentext{
    color: #e0670b;
  }
  .removedecration{
    text-decoration: none;
    color: gray;
  }
  .gray1{
    background-color: #808285;
    width: 100%;
    padding-bottom: 200px;
    clip-path: polygon(0 4%, 100% 0, 100% 100%, 0 85%);
  }
  .boxb1{
    margin-top:-740px;
    position: absolute;
    text-align: right;
    width: 90%;
  }
  .boxb1 p{
    color: #454545;
    font-weight: bold;
    border-bottom: solid goldenrod 1px;
    width: 70%;
    padding-bottom: 3px;
  }
  .boxb1 h4{
    font-weight: bolder;
    color: #000000;

  }
  .b2text{
    margin-top: -350px;
    padding: 10px;
    text-align: right;
    line-height: 20px;
  }
  .b2text p{
    color:dimgray;
    font-weight: bolder;
    width: 100%;
    font-size: 14px;
    border-bottom: solid darkorange 2px;
  }
  .b2text h4{
    font-weight: bolder;
    color:black;;
  }
</style>
