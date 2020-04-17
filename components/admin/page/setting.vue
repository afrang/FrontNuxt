<template>
  <div class="pt-5">
    <div class="container  text-right wmaster " dir="rtl">
      <h4 v-text="$t('contactus')"></h4>
      <hr>
      <select>
        <option v-for="(item,index) in list" :key="index" :value="item.lang" v-text="item.lang"></option>
      </select>
      <form class="form row" dir="ltr" @submit.prevent="save" v-if="contacus!=null">

        <div class="col-sm-12 col-xs-12">
          <label class="sr-only" v-text="$t('webname')" ></label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <span class="icofont icofont-id"></span> | {{ $t('webname')    }}
              </div>
            </div>
            <input type="text" dir="rtl" v-model="contacus.webname" class="form-control"  placeholder="webname">
          </div>
        </div>
        <div class="col-sm-12 col-xs-12">
          <label class="sr-only" v-text="$t('title')" ></label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <span class="icofont icofont-id"></span> | {{ $t('title')    }}
              </div>
            </div>
            <input type="text" dir="rtl" v-model="contacus.wellcometext" class="form-control"  placeholder="title">
          </div>
        </div>
        <div class="col-sm-12 col-xs-12">
          <label class="sr-only" v-text="$t('keywords')" ></label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <span class="icofont icofont-id"></span> | {{ $t('keywords')    }}
              </div>
            </div>
            <textarea type="text" dir="rtl" v-model="contacus.keywords" class="form-control"  placeholder="keywords"></textarea>
          </div>
        </div>
        <div class="col-sm-12 col-xs-12 text-right" >
          <label class="sr-only" v-text="$t('description')" ></label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <span class="icofont icofont-id"></span> | {{ $t('description')    }}
              </div>
            </div>
            <textarea type="text" dir="rtl" v-model="contacus.description" class="form-control"  placeholder="description"></textarea>
          </div>
        </div>
        <div class="col-sm-12 col-xs-12 text-right" >
          <label v-text="$t('logo')"></label>
          <hr>

          <file-uploader class="col-sm-3 float-right"
                         mode="setting"
                         v-on:filename="filenames"
                         :id='contacus.id'
                         name="logo"
                         :file="contacus.logo"
                         :deletefile="true"
          ></file-uploader>
        </div>
        <hr>
        <div class="col-sm-12 mt-5">
          <input type="submit" class="btn btn-dark clearfix" :value="$t('save')">

        </div>
      </form>

    </div>
  </div>
</template>

<script>
    import FileUploader from "../tools/FileUploader";

    export default {
        name: "setting",
        data() {
            return {
                lang:[],
                list:[],
                langdefault:'fa',

            }
        },
        components: {
            FileUploader
        },
        computed: {
            contacus:function() {
                let that=this;
                let backdata;
                this.list.map(function(item) {
                    if(that.langdefault==item.lang){

                        backdata=item;

                    }
                });
                return backdata;
            }
        },
        methods: {
            filenames(e){
                this.contacus.logo=e;


            },
            save(){
                let that=this;
                this.$axios.put(this.$url+'user/SettingController/'+this.contacus.id,this.contacus,
                    {

                        headers:{
                            Authorization:localStorage.token
                        }
                    })
                    .then(function (response) {
                        that.$swal.fire(that.$t('Saved'));

                    });
            },
            loadsetting(){
                let that=this;
                this.$axios.get(this.$url+'user/SettingController',{

                    headers:{Authorization:localStorage.token}
                })   .then(function (response) {

                    that.list=response.data;


                });
            }
        },
        mounted() {
            //this.show();
            this.loadsetting();


        }

    }
</script>

<style scoped>
</style>
