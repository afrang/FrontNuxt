<template>
  <div>
    <div class="yellowfooter" v-if="contact!=null">
      <div class="row" dir="rtl">

        <div class="col-sm-2 col-xs-12 row">

          <div class="col-sm-12 row text-center m-4 "  style="padding-top: 40px; ">
            <div class=" col-sm-4 ">
              <a :href="contact.facbook" class="btn btn-blue btn-circle icofont-facebook"></a>
            </div>
            <div class=" col-sm-4 ">
              <a  :href="contact.instagram" class="btn btn-instgram btn-circle icofont-instagram"></a>
            </div>
            <div class=" col-sm-4 ">
              <a :href="contact.twitter"  class="btn btn-blue btn-primary btn-circle icofont-twitter"></a>
            </div>
            <div class=" col-sm-4 mt-3">
              <a  :href="contact.youtube"  class="btn btn-red btn-circle icofont-youtube"></a>
            </div>
            <div class=" col-sm-4 mt-3">
              <a  :href="contact.linkedin"  class="btn btn-blue btn-primary btn-circle icofont-linkedin"></a>
            </div>
            <div class=" col-sm-4 mt-3">
              <a :href="contact.googleplus"  class="btn btn-red  btn-circle icofont-google-plus"></a>
            </div>
            <div class=" col-sm-4 mt-3">
              <a :href="contact.Pinterest"   class="btn btn-red  btn-circle icofont-pinterest"></a>
            </div>
            <div class=" col-sm-4 mt-3">
              <a   :href="contact.whatsapp"  class="btn btn-green btn-circle icofont-whatsapp"></a>
            </div>
            <div class=" col-sm-4 mt-3">
              <a :href="contact.telegramchanal"  class="btn btn-blue btn-circle icofont-telegram"></a>
            </div>


          </div>

        </div>
        <div class="col-sm-8 col-xs-12 text-right">
          <div class="col-sm-5 row text-center m-4 "  style="padding-top: 40px; ">

            <address dir="rtl" class="text-right addressbar" >
              <div><span class="icofont-location-pin"></span> <strong v-text="$t('address')"> </strong> {{ contact.address}}</div>
              <div><span class="icofont-phone"></span> <strong v-text="$t('phone')"></strong>{{ contact.phone }}</div>
              <div><span class="icofont-phone"></span> <strong v-text="$t('email')"></strong>{{ contact.email }}</div>
            </address>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" v-if="setting!=null">
      <div class="container row text-right myfooter" dir="rtl">
        <div class="col-sm-3 col-xs-12 text-right">
          <h6 v-text="$t('quickaccess')"></h6>
          <ul>
            <li><a href="/" v-text="$t('home')"></a></li>
            <li><a href="/product" v-text="$t('product')"></a></li>
            <li><a href="/blog" v-text="$t('blog')"></a></li>
            <li><a href="/aboutus" v-text="$t('aboutus')"></a></li>
            <li><a href="/contactus" v-text="$t('contactus')"></a></li>
          </ul>
        </div>
        <div class="col-sm-3 col-xs-12">
          <h6 v-text="$t('QA')"></h6>
          <ul>
            <li><a href="/help" v-text="$t('help')"></a></li>
            <li><a href="/privacy" v-text="$t('privacy')"></a></li>
            <li><a href="/login" v-text="$t('loginregister')"></a></li>
            <li><a href="/aboutus" v-text="$t('aboutus')"></a></li>
            <li><a href="/contactus" v-text="$t('contactus')"></a></li>
          </ul>
        </div>
        <div class="col-sm-6 col-xs-12 text-center pt-5">
          <img :src="$storage+'media/setting/'+setting.id+'/thump/'+setting.logo" :alt="setting.webname">
        </div>
      </div>

    </div>
    <div class="bg-dark">
      <div class="container">
        <div class="row pt-4 pb-3">
          <div class="col-sm-4 col-xs-12 text-left" dir="rtl">
            <div class="text-white" v-text="$t('footercopyright3')"></div>

          </div>
          <div class="col-sm-8 col-xs-12 text-right" dir="rtl">
            <div class="text-white" v-text="$t('footercopyright1')"></div>
            <div   class="text-white" v-text="$t('footercopyright2')"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "footers",
        data() {
            return {
                setting:null,
                contact:null
            }
        },
        methods:{

            loadsetting(){
                let that=this;
                this.$axios.get(this.$url+'setting').then(function (res) {
                    that.setting=res.data;
                });
                this.$axios.get(this.$url+'contactus').then(function (res) {
                    that.contact=res.data;
                });

            },
        },
        mounted() {
            this.loadsetting();
        }
    }
</script>

<style scoped>
  .yellowfooter{
    clip-path: polygon(0 24%, 100% 0, 100% 100%, 0 79%);
    background-color: #f2ea1b;
    min-height: 350px;
    margin-top: -100px;
  }
  .btn-circle{
    border-radius:90%;
    width: 50px;
    height: 50px;
    padding-top: 15px;
    font-size: 24px;
  }
  .btn-blue{
    background-color: dodgerblue;;
    color:#fff;
  }
  .btn-instgram{
    background: rgb(255,0,0);
    color:#fff;
    background: linear-gradient(-90deg, rgba(255,0,0,1) 0%, rgba(6,15,255,1) 100%);

  }
  .btn-red{
    background-color: red;
    color: #fff;
  }
  .btn-green{
    background-color: green;
    color:#fff;
  }
  .btn:hover{
    color:#fff;
  }
  .addressbar{
    line-height: 40px;
    margin-top: 40px;
  }
  .addressbar div strong:after{
    content: ':';
  }
  .footer{
    background-color: #808285;

    width: 100%;
    margin-top: -100px;
    padding-top: 120px;
  }
  .myfooter div h6{
    color: #fff;
    border-bottom: solid 5px yellow;
    padding-bottom: 10px;
    font-weight: bold;
    font-size: 16px;
  }
  .myfooter div ul li{
    list-style: none;
  }
  .myfooter div ul li a{
    list-style: none;
    color: black;
  }
  .myfooter div ul li a:hover{
    text-decoration: none;
    font-weight: bold;
  }

</style>
