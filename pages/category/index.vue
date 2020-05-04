<template>
  <div>
    <headers></headers>
    <hr>
    <div id="demo" class="carousel slide" data-ride="carousel">

      <!-- Indicators -->
      <ul class="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>

      </ul>

      <!-- The slideshow -->
      <div class="carousel-inner">
        <div class="carousel-item active">
          <a v-if="bloggroup.url1" :href="bloggroup.url1.image">
            <img v-if="bloggroup.simg1" height="550" width="100%" :src="$storage+'media/layoutproduct/1/orginal/'+bloggroup.simg1.image">
          </a>
        </div>
        <div class="carousel-item">
          <a v-if="bloggroup.url1" :href="bloggroup.url2.image">
            <img v-if="bloggroup.simg2" height="550"   width="100%" :src="$storage+'media/layoutproduct/1/orginal/'+bloggroup.simg2.image">
          </a>
        </div>

      </div>

      <!-- Left and right controls -->
      <a class="carousel-control-prev" href="#demo" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </a>
      <a class="carousel-control-next" href="#demo" data-slide="next">
        <span class="carousel-control-next-icon"></span>
      </a>

    </div>
    <div class="row mt-4 mb-4 m-1">
      <div class="col-sm-3 col-xs-6">
        <a v-if="bloggroup.url6" :href="bloggroup.url6.image">
          <img v-if="bloggroup.simg6" class="img-thumbnail"  width="100%" :src="$storage+'media/layoutproduct/1/orginal/'+bloggroup.simg6.image">
        </a>
      </div>
      <div class="col-sm-3 col-xs-6">
        <a v-if="bloggroup.url5" :href="bloggroup.url5.image">
          <img v-if="bloggroup.simg5" class="img-thumbnail"  width="100%" :src="$storage+'media/layoutproduct/1/orginal/'+bloggroup.simg5.image">
        </a>
      </div>
      <div class="col-sm-3 col-xs-6">
        <a v-if="bloggroup.url4" :href="bloggroup.url4.image">
          <img v-if="bloggroup.simg4" class="img-thumbnail"  width="100%" :src="$storage+'media/layoutproduct/1/orginal/'+bloggroup.simg4.image">
        </a>
      </div>
      <div class="col-sm-3 col-xs-6">
        <a v-if="bloggroup.url3" :href="bloggroup.url3.image">
          <img v-if="bloggroup.simg3" class="img-thumbnail"  width="100%" :src="$storage+'media/layoutproduct/1/orginal/'+bloggroup.simg3.image">
        </a>
      </div>
    </div>
    <div class=" text-right" dir="rtl">
      <img v-if="bloggroup.simg7"   width="100%" :src="$storage+'media/layoutproduct/1/orginal/'+bloggroup.simg7.image">

    </div>
    <footers class=" m-40 mt-20" ></footers>
  </div>
</template>

<script>
    import headers from "../../components/view/template/header";
    import footers from "../../components/view/template/footer";

    export default {
        name: "category",
        components:{
            headers,footers
        },
        data(){
            return{
                pagedata:{},
                datas:{}
            }
        },
        computed:{
            bloggroup:function (item) {

                return  this.pagedata;
            }
        },
        methods:{
            loadgroups(){
                let that=this;
                this.$axios.get(this.$url+'firstpage',{
                    params:{
                        methods:'layoutproduct',
                    },
                }).then(function (res) {
                    that.pagedata = res.data;
                    that.pagedata.map(function(item) {
                        that.bloggroup[item.name] = item;
                    });

                });

            }
        },
        mounted() {
            this.loadgroups();
        },
        head () {
            return {
                title: this.$t('categoryproduct'),

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
  .mt-20{
    margin-top:300px;
  }
  .m-40{
    margin-top: -40px;
  }
</style>
