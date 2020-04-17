<template>
  <div >

    <div class="row  w-100">

      <div class="col-sm-4 settingbar">
        <a class="icon-rotate mr- "  @click="openmenu">
          <span class="icofont-navigation-menu"></span>
          <span v-text="$t('Access')" style="font-size: 18px;"></span>
        </a>
        <a class="ml-4"  href="/logout">
          <span class="icofont-logout text-danger" title="exit"></span>

        </a>
        <a class="ml-4"  href="/">
          <span class="icofont-eye " title="showwebsite"></span>

        </a>

      </div>
      <div class="col-sm-6 text-right pt-3 text-dark"  dir="rtl" style="margin-right: -20px;">
        <span class="icofont-ui-user p-4"></span>
        <span v-text="user.name"></span> <span v-if="user.lastname" v-text="user.lastname"></span> {{ $t('wellcome')}}

      </div>
      <div class="col-sm-2 ">
        <div class="logoarmi">
          <strong>TISS|</strong>
          <span>ENGINE</span>
        </div>
        <div class="col-sm-12 text-center tiss-version">
          TissEngine <i> V2.0</i>
        </div>
      </div>
    </div>
    <modal   scrollable="true"   height="auto" name="fastmenu" dir="ltr" :key="'mainmenu'"  >
      <div class="modal-header text-right" dir="rtl" >
        <span class="icofont-close-circled icofont-2x tiss-cursur"  @click="hidemenu()"></span>
      </div>
      <div class="modal-content text-right"  dir="rtl">

        <div class="row p-3">
      <template v-for="(item,index) in menu">


          <div class="col-sm-4 col-xs-12 wlistapplication"   v-if="item.child" :key="index">
          <ul class="fastaccess">
            <li > <strong><span  :class="item.icon + ' headerwicon'"></span>  {{ item.title }}</strong> </li>
            <template  v-if="item.child">
              <li v-for="(menu,index) in item.child" :key="index" dir="rtl"  >
                <a :href="menu.href" class="nolink" @click="hidemenu()">
                  <span :class="menu.icon"></span> |  <span v-text="menu.title"></span>
                </a>

              </li>


            </template>

          </ul>
        </div>
      </template>
        </div>

      </div>
    </modal>
    <div class="myback  ">
     <component :is="dynamicComponent"></component>
    </div>
    <footer class="footer">
      <div class="container">
        <span class="text-muted " style="font-family: Arial;">TissEngine 2.1 &copy; NuxtVue Edition - 2020 </span>
      </div>
    </footer>
   </div>
</template>

<script>
   import dashboradmenus from "../components/admin/page/dashboradmenus";
    import about from '../components/admin/page/AboutSoftware';
    import gallery from "../components/admin/gallery/gallerygroup";
    import gallerydetail from "../components/admin/gallery/gallerydetail";
    import setting from "../components/admin/page/setting";
    import firstpage from "../components/admin/page/firstpage";
    import hashtag from "../components/admin/page/hashtag";
    import articlegroup from "../components/admin/blog/articlegroup";
    import articlelist from "../components/admin/blog/articlelist";
    import post from "../components/admin/user/post";
    import users from "../components/admin/user/users";
    import menus from '../components/admin/tools/menus';
    // Product Manager
    import Attributes from "../components/admin/Product/Attributes.vue";
    import feature from  "../components/admin/Product/Feature";
    import color from "../components/admin/Product/color";
    import product from "../components/admin/Product/productdetail";
    import productgroup from "../components/admin/Product/productgroup";


    export default {

        name: "dashboard",
        components:{
            dashboradmenus,
            about,
            gallery,
            setting,
            gallerydetail,
            firstpage,
            hashtag,
            articlegroup,
            articlelist,
            post,
            users,
            Attributes,
            feature,
            color,
            productgroup,
            product,
            menus
        },
        data(){
            return{

                user:{},
                menu: [
                    {
                        header: true,
                        title: this.$t('dashboradmenus'),
                        hiddenOnCollapse: true
                    },
                    {
                        href: '#',
                        title:  this.$t('home'),
                        icon: 'icofont-home'
                    },
                    {
                        title: this.$t('Article'),
                        icon: 'icofont-document-folder',
                        child: [
                            {
                                icon: 'icofont-ui-folder',
                                href: '#articlegroup',
                                title: this.$t('articlegroup')
                            },
                            {
                                icon: 'icofont-listing-box',
                                href: '#articlelist',
                                title:  this.$t('textlist')
                            },
                            {
                                icon: 'icofont-label ',
                                href: '#hashtag',
                                title: this.$t('hashtag')
                            }
                        ]
                    },
                    {

                        title: this.$t('Setting'),
                        icon: 'icofont-ui-settings',
                        child: [
                            {
                                icon: 'icofont-settings',
                                href: '#setting',
                                title: this.$t('Setting')
                            },
                            {
                                icon: 'icofont-page',
                                href: '#firstpage',
                                title: this.$t('firstpage')
                            },
                            {
                                icon: 'icofont-phone',
                                href: '#contactus',
                                title: this.$t('contactus')
                            },
                            {
                                icon: 'icofont-info-circle',
                                href: '#about',
                                title: this.$t('aboutpage')
                            },
                        ]
                    },
                    {

                        title: this.$t('other'),
                        icon: 'icofont-star',
                        child: [
                            {
                                icon: 'icofont-picture',
                                href: '#gallery',
                                title: this.$t('gallery')
                            },
                            {
                                icon: 'icofont-info',
                                href: '#about',
                                title: this.$t('about')
                            },
                        ]
                    },
                    {
                        href: '',
                        title: this.$t('Banners'),
                        icon: 'icofont-ui-home',
                        child: [
                            {
                                icon: 'icofont-ui-add ',
                                href: '#addbanner',
                                title: this.$t('addbanner')
                            },
                            {
                                icon: 'icofont-list ',
                                href: '#listourbanners',
                                title: this.$t('listourbanners')
                            },
                            {
                                icon: 'icofont-listine-dots ',
                                href: '#listallbanner',
                                title: this.$t('listallbanner')
                            },
                        ]
                    },
                    {
                        href: '',
                        title: this.$t('bannertools'),
                        icon: 'icofont-cubes',
                        child: [
                            {
                                icon: 'icofont-location-pin ',
                                href: '#locations',
                                title: this.$t('locations')
                            },
                            {
                                icon: 'icofont-ui-tag ',
                                href: '#typebanner',
                                title: this.$t('typebanner')
                            },

                        ]
                    },
                    {
                        href: '',
                        title: this.$t('users'),
                        icon: 'icofont-users-alt-5',
                        child: [
                            {
                                icon: 'icofont-listing-box ',
                                href: '#users',
                                title: this.$t('listusers')
                            },
                            {
                                icon: 'icofont-ruler-pencil-alt-1 ',
                                href: '#post',
                                title: this.$t('post')
                            },
                        ]
                    },
                    {
                        href: '',
                        title: this.$t('featureandAttributes'),
                        icon: 'icofont-toggle-on',
                        child: [
                            {
                                icon: 'icofont-verification-check',
                                href: '#Attributes',
                                title: this.$t('Attributes')
                            },
                            {
                                icon: 'icofont-verification-check ',
                                href: '#feature',
                                title: this.$t('feature')
                            },
                            {
                                icon: 'icofont-verification-check ',
                                href: '#color',
                                title: this.$t('colormanager')
                            },
                        ]
                    },
                    {
                        href: '',
                        title: this.$t('product'),
                        icon: 'icofont-box',
                        child: [
                            {
                                icon: 'icofont-verification-check',
                                href: '#productgroup',
                                title: this.$t('productgroup')
                            },
                            {
                                icon: 'icofont-verification-check ',
                                href: '#product',
                                title: this.$t('product')
                            },
                            {
                                icon: 'icofont-verification-check ',
                                href: '#layoutproduct',
                                title: this.$t('layoutproduct')
                            },

                        ]
                    },
                    {
                        href: '',
                        title: this.$t('invoice'),
                        icon: 'icofont-list',
                        child: [
                            {
                                icon: 'icofont-verification-check',
                                href: '#newinvoice',
                                title: this.$t('newinvoice')
                            },
                            {
                                icon: 'icofont-verification-check ',
                                href: '#archiveinvoice',
                                title: this.$t('archiveinvoice')
                            },
                            {
                                icon: 'icofont-verification-check ',
                                href: '#cancelinvoice',
                                title: this.$t('cancelinvoice')
                            },
                            {
                                icon: 'icofont-verification-check ',
                                href: '#findinvoice',
                                title: this.$t('findinvoice')
                            },
                        ]
                    },

                ],
                dynamicComponent:'dashborad'

            }
        },

        methods:{
            openmenu(){
                this.$modal.show('fastmenu')
            },
            hidemenu(){
                this.$modal.hide('fastmenu')
            },
            profileshow(){
                let that=this;

                this.$axios.get(this.$url+'user/profile',{headers:{Authorization:localStorage.token}})
                    .then(function (response) {
                        that.user=response.data;
                    });


            },

            cpage(page){
                this.dynamicComponent=page;
            }

        },
        watch: {
            $route (to, from){
                this.dynamicComponent = window.location.hash.substring(1).split('#')[0];
                if(this.dynamicComponent==''){

                    this.dynamicComponent='dashboradmenus';
                }
            },
            dynamicComponent: function (val) {
            }
        },
        mounted() {

            if(!localStorage.token){
                $nuxt.$router.push({name: 'login'});
            }
            this.profileshow();
            this.dynamicComponent = window.location.hash.substring(1).split('#')[0];

            if(this.dynamicComponent==''){

                this.dynamicComponent='dashboradmenus';
            }
        },
        head () {
            return {
                title: this.$t('dashboard'),
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
  .myback{
    background: rgb(223,223,223);
    background: linear-gradient(180deg, rgba(223,223,223,1) 0%, rgba(255,255,255,1) 100%);


  }
  .bg-gray{
    background-color: #cdcdc9;

    color: #fff;

  }
  .bg-blue-dark{
    background-color: #367FA9;;
  }
  .tiss-navicon{
    color:#fff;
    font-size: 24px;
    margin-top: 10px;
  }
  .tiss-cursure{
    cursor: pointer;
  }
  .tiss-version{
    font-size: 10px;
    color:#999;
    font-style: italic;

  }
  .settingbar{
    padding-top: 10px;
    padding-left: 50px;
  }
  .settingbar *{
    font-size: 22px;
    color:#333333;

    cursor: pointer;


  }
  .headeofpage{
    background-color: #eee;
    border-bottom: solid #333 1px;
    padding-bottom: 20px;

  }
  .logoarmi{

    text-align: center;
    padding-top: 5%;
    color:#333;
    font-size: 17px;
  }
  .icon-rotate:hover{
    animation: iconrotate ease-in 1s;
    animation-iteration-count: 1;
    transform-origin: 50% 50%;

  }

  @keyframes iconrotate{
    0% {
      transform:  rotate(0deg) ;
    }
    100% {
      transform:  rotate(-44deg) ;
    }
  }
  .wmaster{
    margin-top: 8px;
    background-color: #ffff;

    -webkit-box-shadow: -4px 6px 5px -4px rgba(176,173,176,1);
    -moz-box-shadow: -4px 6px 5px -4px rgba(176,173,176,1);
    box-shadow: -4px 6px 5px -4px rgba(176,173,176,1);
    border-radius: 15px;
    overflow: hidden;

  }
  .footer {
    position: relative;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #f5f5f5;
    margin-top: 100px;
  }
  .nolink{
    list-style: none;
    color: #2970e0;
    line-height: 12px;
    color: #425653;
  }
  .nolink:hover{
    list-style: none;
    text-decoration: none;
    font-weight: bold;
    color: #425653;
    line-height: 12px;
  }
  .fastaccess li{
    list-style: none;
  }
</style>
