<template>
  <div >

    <div class="row headeofpage">
      <div class="col-sm-2 settingbar">
        <a class="icon-rotate mr-2 icofont-gear-alt"></a>
        <a class="icon-rotate mr-2 icofont-notification"></a>

      </div>
      <div class="col-sm-8 text-right pt-3 text-dark"  dir="rtl" style="margin-right: -20px;">
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
    <nav class="navbar navbar-expand-lg navbar-light bg-light" dir="rtl">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent" >
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>

      </div>
    </nav>
    <div class="col-sm-12  mainback">

     <component :is="dynamicComponent"></component>
    </div>
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
    // Product Manager
    import Attributes from "../components/admin/Product/Attributes.vue";
    import feature from  "../components/admin/Product/Feature";
    import color from "../components/admin/Product/color";
    import product from "../components/admin/Product/productdetail";
    import productgroup from "../components/admin/Product/productgroup";
    /*  import menus from "./admin/menu";


 import setting from "./setting/setting";
 import contactus from "./setting/contactus";
 import gallery from "./gallery/gallerygroup";


 import firstpage from "./setting/firstpage";
 import layoutproduct from "./Product/layoutproduct";*/

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
            product
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
        }

    }
</script>

<style scoped>
  .mainback{
    background-color: #e8e8e8;
    height: 100%;
    padding-bottom: 100%;
  }
  .bg-gray{
    background-color: #cdcdc9;
    height:100%;
    color: #fff;
    min-height: 500px;
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
    padding-top: 20px;
    padding-left: 50px;
  }
  .settingbar *{
    font-size: 25px;
    color:transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #333;
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
    height: 200px;
    -webkit-box-shadow: -4px 6px 5px -4px rgba(176,173,176,1);
    -moz-box-shadow: -4px 6px 5px -4px rgba(176,173,176,1);
    box-shadow: -4px 6px 5px -4px rgba(176,173,176,1);
    border-radius: 15px;
    overflow: hidden;

  }
</style>
