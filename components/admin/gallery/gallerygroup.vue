<template>
  <div class="container text-right pt-5">
    <div class="wmaster">


      <div>
        <a   @click="addgroup"  class="btn btn-success mr-3"  ><span class="icofont-ui-add text-white"></span></a>
        <a    @click="listgroup" class="btn btn-danger"  ><span class="icofont-list text-white"></span></a>

      </div>
      <div class="mt-4">
        <template v-if="mode=='listgroup'">
          <div class="row">
            <div v-for="(item,index) in list" :key="index" class="card border-light mb-3 mr-1" style="max-width: 18rem;">

              <div class="card-header">{{ item.name }}</div>

              <div class="card-body">

                <img v-if="item.image==null" class="card-img-top" :src="$storage+'media/Other/noimage.png'" :alt="item.name">
                <img v-if="item.image!=null" class="card-img-top" :src="$storage+'media/gallerygroup/'+item.id+'/thump/'+item.image" :alt="item.name">

              </div>
              <div class="card-footer text-muted">
                <a :href="'#gallerydetail#'+item.id"  class="btn btn-primary" :title="$t('imagemanager')"><span class="icofont-ui-image text-white"></span></a>
                <a @click="edit(index)" class="btn btn-secondary ml-4" :title="$t('edit')"><span class="icofont-ui-edit text-white"></span></a>
                <a   class="btn btn-danger ml-4" :title="$t('edit')"><span class="icofont-ui-delete text-white"></span></a>

              </div>
            </div>

          </div>

        </template>
        <template v-if="mode=='editgroup'">
          <form @submit.prevent="save">
            <div class="col-sm-12 col-xs-12">
              <label   v-text="$t('name')"></label>
              <div class="input-group mb-2">

                <input type="text"  v-model="group.name" class="form-control text-right"  placeholder="Name">
              </div>
            </div>
            <div class="col-sm-12 col-xs-12">
              <label   v-text="$t('url')"></label>
              <div class="input-group mb-2">

                <input type="text"  v-model="group.urlname" class="form-control text-right"  placeholder="url">
              </div>
            </div>
            <template v-if="group.id!=null">
              <div class="row">
                <div class="col-xs-12 col-sm-3">
                 <file-uploader
                    mode="gallerygroup"
                    v-on:filename="filenames"
                    :id='group.id'
                    name="thump"
                    :file="group.image"
                  ></file-uploader>
                </div>
                <div class="col-xs-12 col-sm-9">
             <tisseditor
                    :height="500"
                    :text="group.text"
                    v-on:myevent="doSomething"
                    :mode="'GalleryGroup'"></tisseditor>
                </div>
              </div>


            </template>
            <hr>
            <input type="submit" class="btn btn-success" :value="$t('save')">
          </form>
          <showerror v-if="error" :errors="error"></showerror>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
    import showerror from '../tools/Showerror';

   import Tisseditor from "../tools/Tisseditor";

 import FileUploader from "../tools/FileUploader";

    export default {
        name: "gallerygroup",
        components: {
            showerror,
            Tisseditor,
           FileUploader
        },
        data() {
            return {
                mode:'listgroup',
                list:[],
                group:{
                    id:null,
                    name:null,
                    urlname:null,
                    text:null,
                    image:null,

                },
                error:[]
            }
        },

        computed: {

        },

        methods: {
            filenames(e){
                this.group.image=e;

            },
            doSomething(e){
                this.group.text=e;
            },
            resetform(){
                this.group={
                    id:null,
                    name:null,
                    urlname:null,
                    text:null,
                    image:null,

                };
                this.error=[];
            },
            addgroup(){
                this.mode='editgroup';
                this.resetform();
            },
            listgroup(){
                this.mode='listgroup';
                this.loadlist();
            },
            edit(id){

                this.group=this.list[id];


                this.mode='editgroup';
            },
            loadlist(){
                let that=this;
                this.$axios.get(this.$url+'user/GalleryGroup',{
                    headers:{
                        Authorization:localStorage.token
                    }
                }).then(function (response) {
                    that.list=response.data;
                });
            },
            save(){
                let that=this;
                ;
                if(this.group.id==null){
                    this.$axios.post(this.$url+'user/GalleryGroup',this.group,{
                        headers:{
                            Authorization:localStorage.token
                        }
                    })
                        .then(function (response) {
                            that.$swal.fire(that.$t('Saved'));
                            that.error=[];

                        })
                        .catch((error) => {
                            that.error = error.response.data.errors;

                        });;

                }else {
                    this.$axios.put(this.$url+'user/GalleryGroup/'+this.group.id,this.group,{
                        headers:{
                            Authorization:localStorage.token
                        }
                    })
                        .then(function (response) {
                            that.$swal.fire(that.$t('Saved'));
                            that.error=[];

                        })
                        .catch((error) => {
                            that.error = error.response.data.errors;

                        });;
                }

            }
        },
        mounted() {
            this.listgroup();
        }
    }
</script>

<style scoped>

</style>
