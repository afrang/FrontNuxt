<template>
  <div class="container pt-4 text-right " dir="rtl">
    <div class="wmaster" v-if="mydata!=null">
      <form @submit.prevent="save" dir="rtl" class="row">
        <input type="submit" class="btn mt-4  mb-4 btn-primary" :value="$t('save')">

        <div class="form-group col-sm-12 col-xs-12" >
          <label  @click="loadadata()"  v-text="$t('FirstSlider')"></label>
      <template v-if="mydata.sliders.data!=null">
          <v-select  @input="pluskeycomponent()" dir="rtl" v-model="mydata.sliders.data"  :options="sliders" label="name" ></v-select>
      </template>
          <template v-if="mydata.sliders.data!=null">
            <slider1 :key="kecomponent" :name="mydata.sliders.data.urlname"></slider1>

          </template>
        </div>
        <div class="col-sm-6">
          <label v-text="$t('OffSectionSlider')"></label>
          <template v-if="mydata.offsliders.data!=null">
          <v-select  @input="pluskeycomponent()"  dir="rtl" v-model="mydata.offsliders.data"  :options="sliders" label="name" ></v-select>
          </template>
          <template v-if="mydata.offsliders.data!=null">
            <slider1   height="200px"  :key="kecomponent" :name="mydata.offsliders.data.urlname"></slider1>

          </template>
        </div>
        <div class="col-sm-6 row">
          <div class="col-sm-6">
            <label v-text="$t('Off')"></label>
            <file-uploader
              mode="firspage"
              v-on:filename="img1"
              :id='1'
              name="img1"
              :file="mydata.img1.data"
            ></file-uploader>
            <date-picker v-model="mydata.counter2.start"  type="datetime" :label="$t('start')" />

            <date-picker v-model="mydata.counter2.end"  type="datetime" :disabled="!mydata.counter2.start" :min="mydata.counter2.start">
              <div slot="label">
                <span v-text="$t('end')"></span>
              </div>
            </date-picker>
            <span :title="$t('cleattime')" @click="mydata.counter2.start=null,mydata.counter2.end=null" class="icofont-eraser"></span>

            <input type="text" v-model="mydata.urlbox1.data" class="form-control" placeholder="url">
          </div>
          <div class="col-sm-6">
            <label  v-text="$t('Off')"></label>
            <file-uploader
              mode="firspage"
              v-on:filename="img2"
              :id='1'
              name="img2"
              :file="mydata.img2.data"
            ></file-uploader>
            <date-picker v-model="mydata.counter.start"   type="datetime" :label="$t('start')" />

            <date-picker v-model="mydata.counter.end"   type="datetime" :disabled="!mydata.counter.start" :min="mydata.counter.start">
              <div slot="label">
                <span v-text="$t('end')"></span>
              </div>
            </date-picker>
            <span :title="$t('cleattime')" @click="mydata.counter.start=null,mydata.counter.end=null" class="icofont-eraser red-tex"></span>

            <input type="text" v-model="mydata.urlbox2.data" class="form-control" placeholder="url">
          </div>
        </div>
        <div class="col-sm-12">
          <h4 v-text="$t('PrdocutSliderwithtags')"></h4>
          <hr>
          <select class="form-control" v-model="mydata.tagslider.data" >
            <option v-for="(data,index) in taglist" :key="index" :value="data.id" v-text="data.name"></option>
          </select>
        </div>

        <div class="col-sm-12">
          <h4 v-text="$t('SpecailProdcut')"></h4>
          <hr>
        </div>

        <div class="col-sm-6 row">
          <div class="col-sm-6">
            <label  v-text="$t('Product1')"></label>
            <template v-if="mydata.pr1.data!=null">
           <v-select dir="rtl" v-model="mydata.pr1.data"  :options="products"  label="model">
              <template      v-slot:option="option">
                <div>{{ option.name }}     {{ option.model }}</div>
                <small>{{ option.to_group.name }}</small>
              </template>
            </v-select>
            </template>
          </div>
          <div class="col-sm-6">
            <label  v-text="$t('Product2')"></label>
            <template v-if="mydata.pr2.data!=null">
         <v-select dir="rtl" v-model="mydata.pr2.data"  :options="products"  label="model">
              <template      v-slot:option="option">
                <div>{{ option.name }}     {{ option.model }}</div>
                <small>{{ option.to_group.name }}</small>
              </template>
            </v-select>
            </template>
          </div>
          <div class="col-sm-6">
            <label  v-text="$t('Product3')"></label>
            <template v-if="mydata.pr3.data!=null">

           <v-select dir="rtl" v-model="mydata.pr3.data"  :options="products"  label="model">
              <template      v-slot:option="option">
              <div>{{ option.name }}     {{ option.model }}</div>
              <small>{{ option.to_group.name }}</small>
            </template>
            </v-select>
            </template>

          </div>
          <div class="col-sm-6">
            <label  v-text="$t('Product4')"></label>
            <template v-if="mydata.pr4.data!=null">

             <v-select dir="rtl" v-model="mydata.pr4.data"  :options="products"  label="model">
              <template      v-slot:option="option">
                <div>{{ option.name }}     {{ option.model }}</div>
                <small>{{ option.to_group.name }}</small>
              </template>
            </v-select>
            </template>
          </div>
        </div>
        <div class="col-sm-6">
          <label @click="loadadata" v-text="$t('SpecailProduct')"></label>
          <file-uploader
            :mode="this.modelpage"
            v-on:filename="special"
            :id='1'
            name="special"
            :file="mydata.special.data"
          ></file-uploader>
          <label  v-text="$t('Product')"></label>
          <template v-if="mydata.prs.data!=null">

          <v-select dir="rtl" v-model="mydata.prs.data"  :options="products"  label="model">
            <template      v-slot:option="option">
              <div>{{ option.name }}     {{ option.model }}</div>
              <small>{{ option.to_group.name }}</small>
            </template>
          </v-select>
          </template>

        </div>
        <input type="submit" class="btn mt-4  mb-4 btn-primary" :value="$t('save')">


        <div class="col-sm-12">

          <h4 v-text="$t('Blog')"></h4>
          <hr>
        </div>
        <div class="col-sm-6 row">
          <div class="col-sm-6">
            <file-uploader
              :mode="this.modelpage"
              v-on:filename="b2img"
              :id='1'
              name="b2img"
              :file="mydata.b2img.data"
            ></file-uploader>
            <template v-if="mydata.b2.data!=null">

              <vue-select dir="rtl" v-model="mydata.b2.data"  :options="artilces"  label="name">
              <template      v-slot:option="option">
                <div>{{ option.name }}  </div>
                <small style="color:blue;">{{ option.to_article.name }}</small>
              </template>
            </vue-select>
            </template>
          </div>
          <div class="col-sm-6">
            <file-uploader
              :mode="this.modelpage"
              v-on:filename="b3img"
              :id='1'
              name="b3img"
              :file="mydata.b3img.data"
            ></file-uploader>
            <template v-if="mydata.b3.data!=null">

             <v-select dir="rtl" v-model="mydata.b3.data"  :options="artilces"  label="name">
              <template      v-slot:option="option">
                <div>{{ option.name }}  </div>
                <small style="color:blue;">{{ option.to_article.name }}</small>
              </template>
            </v-select>
            </template>
          </div>
          <div class="col-sm-12">
            <file-uploader
              :mode="this.modelpage"
              v-on:filename="b4img"
              :id='1'
              name="b4img"
              :file="mydata.b4img.data"
            ></file-uploader>
            <template v-if="mydata.b4.data!=null">

            <v-select dir="rtl" v-model="mydata.b4.data"  :options="artilces"  label="name">
              <template      v-slot:option="option">
                <div>{{ option.name }}  </div>
                <small style="color:blue;">{{ option.to_article.name }}</small>
              </template>
            </v-select>
            </template>
          </div>
        </div>
        <div class="col-sm-6">
          <file-uploader
            :mode="this.modelpage"
            v-on:filename="b1img"
            :id='1'
            name="b1img"
            :file="mydata.b1img.data"
          ></file-uploader>
          <template v-if="mydata.b1.data!=null">

          <v-select dir="rtl" v-model="mydata.b1.data"  :options="artilces"  label="name">
            <template      v-slot:option="option">
              <div>{{ option.name }}  </div>
              <small style="color:blue;">{{ option.to_article.name }}</small>
            </template>
          </v-select>
          </template>
        </div>
        <div class="col-sm-12 row mt-3">

          <div class="col-sm-8">
            <h4 v-text="$t('AboutUs')"></h4>
            <hr>
            <tisseditor
              :height="500"
              :text="mydata.about.data"
              v-on:myevent="doSomething"
              :mode="this.modelpage"></tisseditor>
          </div>
          <div class="col-sm-4">
            <h4 v-text="$t('AboutIMG')"></h4>
            <hr>
            <file-uploader
              :mode="this.modelpage"
              v-on:filename="aboutimg"
              :id='1'
              name="aboutimg"
              :file="mydata.aboutimg.data"
            ></file-uploader>
          </div>
          <div class="col-sm-12">
            <file-uploader
              :mode="this.modelpage"
              v-on:filename="footerimg"
              :id='1'
              name="footerimg"
              :file="mydata.footerimg.data"
            ></file-uploader>
          </div>
        </div>
        <input type="submit" class="btn mt-4 btn-primary" :value="$t('save')">
      </form>

    </div>

  </div>
</template>

<script>
    import FileUploader from "../tools/FileUploader";
    import Tisseditor from "../tools/Tisseditor";
    import slider1 from "../../view/tools/slider1";
    export default {
        name: "firstpage",
        components: {
            FileUploader,Tisseditor,slider1,


        },
        data() {
            return {
                kecomponent:0,
                rawdata:{},
                modelpage:'firstpage',
                taglist:null,
                mydata:{

                    mode:'firstpage',
                    lang:'fa',
                    img1:{
                        data:null,
                        mode:'img'
                    },
                    img2:{
                        data:null,
                        mode:'img'
                    },
                    offsliders:{
                        data:null,
                        mode:'slider'
                    },
                    sliders:{
                        data:null,
                        mode:'slider'
                    },
                    urlbox1:{
                        data:null,
                        mode:'text'
                    },
                    urlbox2:{
                        data:null,
                        mode:'text'
                    },
                    url1:{
                        data:null,
                        mode:'text'
                    },
                    url2:{
                        data:null,
                        mode:'text'
                    },
                    b1img:{
                        data:null,
                        mode:'img'
                    },
                    b2img:{
                        data:null,
                        mode:'img'
                    },
                    b3img:{
                        data:null,
                        mode:'img'
                    },
                    b4img:{
                        data:null,
                        mode:'img'
                    },
                    b1:{
                        data:null,
                        mode:'article'
                    },
                    b2:{
                        data:null,
                        mode:'article'
                    },
                    b3:{
                        data:null,
                        mode:'article'
                    },
                    b4:{
                        data:null,
                        mode:'article'
                    },
                    pr1:{
                        data:null,
                        mode:'product'
                    },
                    prs:{
                        data:null,
                        mode:'product'
                    },
                    pr2:{
                        data:null,
                        mode:'product'
                    },
                    pr3:{
                        data:null,
                        mode:'product'
                    },
                    special:{
                        data:null,
                        mode:'img'
                    },
                    pr4:{
                        data:null,
                        mode:'product'
                    },
                    aboutimg:{
                        data:null,
                        mode:'img'
                    },
                    about:{
                        data:null,
                        mode:'longtext'
                    },
                    footerimg:{
                        data:null,
                        mode:'img'
                    },
                    tagslider:{
                        data:null,
                        mode:'tag'
                    },

                    counter:{
                        start:null,
                        end:null,
                        mode:'timepicker'
                    },
                    counter2:{
                        start:null,
                        end:null,
                        mode:'timepicker'
                    },
                },
                sliders:{},
                products:{},
                artilces:{}

            }
        },
        watch:{
            rawdata:function (item) {
                let that=this;
                item.map(function (items) {
                    if(items.model=="slider"){
                        that.sliders.map(function (m) {
                            if(m.id==items.image){
                                that.mydata[items.name].data=m;
                            }

                        });
                    }
                    if(items.model=="timepicker"){
                        that.mydata[items.name].start=items.text;
                        that.mydata[items.name].end=items.image;
                    }
                    if(items.model=="tag"){
                        that.mydata[items.name].data=items.image;
                    }
                    if(items.model=="img"){
                        that.mydata[items.name].data=items.image;
                    }
                    if(items.model=="text"){
                        that.mydata[items.name].data=items.text;
                    }
                    if(items.model=="longtext"){
                        that.mydata[items.name].data=items.text;
                    }

                    if(items.model=="product"){
                        that.products.map(function (m) {

                            if(m.id==items.image){
                                that.mydata[items.name].data=m;
                            }

                        });
                    }
                    if(items.model=="article"){
                        that.artilces.map(function (m) {

                            if(m.id==items.image){
                                that.mydata[items.name].data=m;
                            }

                        });
                    }
                });
            }


        },

        methods:{
            pluskeycomponent(){

                this.kecomponent=this.kecomponent+1;
            },
            doSomething(e){

                this.mydata.about.data=e;
            },
            img1(e){

                this.mydata.img1.data=e;
            },
            img2(e){

                this.mydata.img2.data=e;
            },
            aboutimg(e){

                this.mydata.aboutimg.data=e;
            },
            special(e){

                this.mydata.special.data=e;
            },
            b1img(e){

                this.mydata.b1img.data=e;
            },
            b2img(e){

                this.mydata.b2img.data=e;
            },
            b3img(e){

                this.mydata.b3img.data=e;
            },
            b4img(e){

                this.mydata.b4img.data=e;
            },
            footerimg(e){

                this.mydata.footerimg.data=e;
            },
            loadadata(){
                let that=this;
                this.$axios.get(this.$url+'user/GalleryGroup',{
                    headers:{
                        Authorization:localStorage.token
                    }
                }).then(function (response) {
                    that.sliders=response.data;
                });
                this.$axios.get(this.$url+'user/pdetail/create',{
                    headers:{
                        Authorization:localStorage.token
                    }
                }).then(function (response) {
                    that.products=response.data;
                });
                this.$axios.get(this.$url+'user/BlogArticle/create',{

                    headers:{
                        Authorization:localStorage.token
                    }
                }).then(function (response) {
                    that.artilces=response.data;
                });
                this.$axios.get(this.$url+'user/FirstPageSetting/'+this.modelpage,{
                    params:{
                        lang:that.mydata.lang
                    },
                    headers:{
                        Authorization:localStorage.token
                    }
                }).then(function (response) {
                    that.rawdata=response.data;
                });
            },
            save(){
                let that=this;
                this.$axios.post(this.$url+'user/FirstPageSetting',this.mydata,{
                    params:{
                        lang:that.mydata.lang
                    },
                    headers:{
                        Authorization:localStorage.token
                    }
                }).then(function (response) {
                    that.$swal.fire(that.$t('saved'));
                });

            },
            loadtag(){
                let that=this;
                this.$axios.get(this.$url+'user/Tag',
                    {headers:{Authorization:localStorage.token}}
                ).then(function(res){
                    that.taglist=res.data;

                })
            }
        },
        mounted() {
            this.loadadata();
            this.loadtag();
        }
    }
</script>

<style scoped>

</style>
