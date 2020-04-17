<template>
  <div class="container pt-4" dir="rtl">
    <div class="text-right wmaster">
      <h4 @click="loadgroup" v-text="$t('groupnamegallery')+': '+group.name"></h4>
      <hr>
      <span @click="additem" class="btn btn-success icofont-plus"></span>


      <div v-if="item.id!=null">

        <div >
          <div class="mt-4">
            <div class="row">
              <div class="col-sm-6 col-xs-12">
                <label v-text="$t('name')"></label>
                <input type="text" class="form-control" v-model="item.name" placeholder="name" >


                <label v-text="$t('description')"></label>
                <textarea type="text" class="form-control" v-model="item.text" placeholder="..." ></textarea>
                <label v-text="$t('publish')"></label>
                <select class="form-control w-50" v-model="item.publish">
                  <option value="1" v-text="$t('publish')"></option>
                  <option value="0" v-text="$t('unpublish')"></option>
                </select>
                <input   :value="$t('save')" @click="update" type="button" class="btn btn-primary mt-4">


              </div>

              <div class="col-sm-6 col-xs-12">
                <img v-if="item.file!=null" class="card-img-top" :src="$storage+'media/gallery/'+item.id+'/thump/'+item.file" :alt="item.name">

                <file-uploader
                  mode="gallery"
                  v-on:filename="filenames"
                  :id='item.id'
                  name="image"
                  :showthump="false"
                  :deletefile="false"
                ></file-uploader>

              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
    <hr>
    <div class="row " v-if="item.id==null">
      <div v-for="(item,index) in group.todetail" :key="index" class="card border-light mb-3 mr-1 col-sm-2" >

        <div class="card-header text-right">
          {{ item.name }}
          <span class="badge badge-success left " v-text="index+1"></span>

        </div>

        <div class="card-body">

          <img v-if="item.file==null" class="card-img-top" :src="$storage+'media/Other/noimage.png'" :alt="item.name">
          <img v-if="item.file!=null" class="card-img-top" :src="$storage+'media/gallery/'+item.id+'/thump/'+item.file" :alt="item.name">

        </div>
        <div class="card-footer text-muted text-center">
          <span @click="del(item.id)" class="btn btn-danger icofont-ui-delete  mr-1" ></span>
          <span @click="edit(index)" class="btn btn-success icofont-ui-edit mr-1" ></span>
          <div class="mt-3">
            <span @click="up(item.id)" class="btn btn-primary icofont-arrow-right mr-1" ></span>
            <span @click="down(item.id)" class="btn btn-primary icofont-arrow-left mr-1" ></span>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
    import FileUploader from "../tools/FileUploader";

    export default {
        name: "gallerydetail",
        data(){
            return{
                id:null,
                group:[],
                itemadd:false,
                item:{
                    id:null,
                    name:null,
                    file:null,
                    orders:null,
                    publish:null,
                    text:null,
                    parent:null

                }
            }
        },
        components: {
            FileUploader
        },
        methods: {
            reset(){
                this.item={
                    id:null,
                    name:null,
                    file:null,
                    orders:null,
                    publish:null,
                    text:null,
                    parent:this.group.id

                }
            },
            additem(){
                this.reset();
                let that=this;
                this.$axios.post(this.$url + 'user/GalleryDetail',this.item,
                    {
                        headers: {
                            Authorization: localStorage.token
                        }
                    }
                ).then(function(res){
                    that.item=res.data;
                    that.itemadd=false;

                });
            },
            edit(index){
                alert(index);
                this.reset();
                console.log(this.group);
                this.item=this.group.todetail[index];
                this.itemadd=false;
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0;

            },
            update(){
                let that=this;
                if(that.item.file==null){
                    this.$swal.fire(that.$t('Youmustuploadfile'));
                    return false;
                }
                this.$axios.put(this.$url + 'user/GalleryDetail/'+this.item.id,this.item,
                    {
                        headers: {
                            Authorization: localStorage.token
                        }
                    }
                ).then(function(res){
                    that.item=res.data;
                    that.loadgroup();
                    that.reset();

                });
            },
            del(id){
                let that=this;
                this.$axios.delete(this.$url+'user/GalleryDetail/'+id,{
                    headers: {
                        Authorization: localStorage.token
                    }
                }).then(function (res) {
                    that.loadgroup();

                });

            },
            updatepic(){
                let that=this;
                if(that.item.file==null){
                    this.$swal.fire(that.$t('Youmustuploadfile'));
                    return false;
                }
                this.$axios.put(this.$url + 'user/GalleryDetail/'+this.item.id,this.item,
                    {
                        headers: {
                            Authorization: localStorage.token
                        }
                    }
                ).then(function(res){
                    that.item=res.data;
                    that.loadgroup();


                });
            },
            up(e){
                let that=this;
                this.$axios.get(this.$url+'user/GalleryDetailup/'+e,
                    {
                        headers: {
                            Authorization: localStorage.token
                        }
                    })
                    .then(function(res){
                        that.loadgroup();


                    });
            },
            down(e){
                let that=this;
                this.$axios.get(this.$url+'user/GalleryDetaildown/'+e,
                    {
                        headers: {
                            Authorization: localStorage.token
                        }
                    })
                    .then(function(res){
                        that.loadgroup();


                    });
            },
            filenames(e){
                let that=this;
                that.item.file=e;
                that.updatepic()


            },
            loadgroup() {
                this.id = window.location.hash.substring(1).split('#')[1];
                let that = this;
                this.$axios.get(this.$url + 'user/GalleryGroup/' + this.id, {
                    headers: {
                        Authorization: localStorage.token
                    }
                }).then(function (response) {
                    that.group=response.data;
                    that.item.parent=response.data.id;

                });

            }

        },
        mounted() {
            this.loadgroup();
        }
    }
</script>

<style scoped>

</style>
