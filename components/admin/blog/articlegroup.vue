<template>
  <div class="container pt-5  ">
    <div class="wmaster dir-rtl text-right">
      <h5 v-text="$t('articlegroup')">  </h5>
      <hr>
      <a @click="additem"   :title="$t('addarticlegroup')" class="btn btn-success   shadow btn-circle btn-xl  mr-3 text-white "><span class="icofont-plus"></span></a>
      <a @click="listitem"   :title="$t('addarticlegroup')" class="btn btn-danger  shadow btn-circle btn-xl  mr-3 text-white "><span class="icofont-list"></span></a>
      <hr>

      <div v-if="method=='list'">

        <table class="table table-striped" dir="rtl">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" v-text="$t('name')"></th>
            <th scope="col"  v-text="$t('url')"></th>
            <th  class="text-center" scope="col" v-text="$t('edit')"></th>
            <th  class="text-center" scope="col" v-text="$t('MangeArticle')"></th>
            <th class="text-center" scope="col"  v-text="$t('del')"></th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="(item,index) in list" :key="index">
            <th scope="row" v-text="index+1"></th>
            <td v-text="item.name"></td>
            <td v-text="item.url"></td>
            <td @click="edit(index)" class="text-center"><span class="icofont icofont-edit-alt"></span></td>
            <td  class="text-center"><a :href="'#articlelist#'+item.id" class="icofont icofont-ui-folder"></a></td>
            <td class="text-center"><span class="icofont icofont-delete-alt"></span></td>
          </tr>

          </tbody>
        </table>


      </div>
      <div v-if="method=='additem'">
        <form @submit.prevent="saveform" dir="rtl">
          <div class="row">
            <div class="col-sm-6 col-xs-12">
              <label v-text="$t('name')"></label>
              <input  @keyup="urlcreate" class="form-control col-xs-12 col-sm-12 " v-model="blog.name">
              <label v-text="$t('url')"></label>
              <input  class="form-control col-xs-12 col-sm-12 " v-model="blog.url">

            </div>
            <div class="col-sm-6 col-xs-12">

              <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
              <template v-if="blog.image=='1'">
                <img :src="$storage+'media/BlogGroup/'+blog.id+'/thump.png'" class="img-thumbnail w-50">
              </template>

            </div>
          </div>
          <hr>
          <template v-if="blog.id">
            <tisseditor
              :key="componentkey"
              :keynumber="componentkey"
              :text="blog.text"
                         v-on:myevent="doSomething"
                         :mode="'BlogGroup'"></tisseditor>

          </template>
          <label v-text="$t('keywords')"></label>
          <textarea  class="form-control col-xs-12 col-sm-12 " v-model="blog.keywords"></textarea>
          <label v-text="$t('Description')"></label>
          <textarea  class="form-control col-xs-12 col-sm-12 " v-model="blog.description"></textarea>
          <label v-text="$t('tag')"></label>
     <vue-tags-input class="col-xs-12"
                          v-model="tag"
                          :tags="tags"
                          @tags-changed="newTags => tags = newTags"

                          :autocomplete-items="filteredItems"
          />
          <showerror :errors="error"></showerror>

          <input type="submit" class="btn btn-success mt-5" :value="$t('submit')">

        </form>


      </div>
    </div>

  </div>
</template>

<script>

    import Tisseditor from "../tools/Tisseditor";
    import Showerror from "../tools/Showerror";
    export default {
        name: "articlegroup",
        components:{
            Showerror,
            Tisseditor
        },
        data(){
            return {
                componentkey:1,
                error:[],
                tag:'',
                groupselect:null,

                file:'',
                method:'list',
                blog:{
                    id:null,
                    name:null,
                    image:null,
                    publish:1,
                    text:null,
                    url:null,
                    keywords:null,
                    description:null,
                    tag:null,
                    ordered:null
                },
                list:{},
                tags:[]
            }
        },

        taglist:[],
        computed: {
            filteredItems() {
                return this.autocompleteItems.filter(i => {
                    return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
                });
            },
            autocompleteItems(){
                let b=[];
                this.taglist.forEach(function (item) {
                    b.push({text:item.name});

                });
                return b;
            },

            taggenerator(){
                let b=[];
                this.blog.totags.forEach(function(item){
                    b.push(item.name);
                });
                return b;
            }
        },
        watch: {

        },
        methods: {
            resetform(){
                this.tags=[];
                this.blog={
                    id:null,
                    name:null,
                    image:null,
                    publish:1,
                    text:null,
                    url:null,
                    keywords:null,
                    description:null,
                    tag:null,
                    ordered:null
                };
            },
            doSomething(e){
                this.blog.text=e;
            },
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
            },

            urlcreate(){
                if(this.blog.id==null){
                    let str=this.blog.name;
                    this.blog.url=str.replace(/#| /g,'_');

                };
            },
            edit(id){
                this.componentkey=this.componentkey+1;

                this.blog=this.list[id];
                this.tags=this.taggenerator;
                this.method='additem';
            },
            saveform(){
                let that=this;
                this.blog.tag=this.tag;
                let formData = new FormData();
                formData.append('file', this.file);
                formData.append('name', this.blog.name);
                formData.append('publish', this.blog.publish);
                formData.append('text', this.blog.text);
                formData.append('url', this.blog.url);
                formData.append('keywords', this.blog.keywords);
                formData.append('description', this.blog.description);
                formData.append('tag', JSON.stringify(this.tags));
                if(this.blog.id==null){
                    this.$axios.post( this.$url+'user/Bloggroup',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization:localStorage.token
                            }
                        }
                    ).then(function(){
                        that.listitem();
                    })
                        .catch((error) => {
                            that.error = error.response.data.errors;

                        });
                }else{
                    this.$axios.post(this.$url+'user/Blobggroupupdate/'+this.blog.id,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization:localStorage.token
                            }
                        }
                    ).then(function(){
                        // that.listitem();
                    })
                        .catch((error) => {
                            that.error = error.response.data.errors;

                        });
                }


            },
            additem(){
                this.componentkey=this.componentkey+1;
                this.resetform();
                this.method='additem';

            },
            listitem(){
                this.method='list';
                let that=this;
                this.$axios.get(this.$url+'user/Bloggroup',
                    {headers:{Authorization:localStorage.token}}
                ).then(function(res){
                    that.list=res.data.data;

                })

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
            this.listitem();
            this.loadtag();
        },
        head () {
            return {
                title: this.$t('ArticleGroup'),

            }
        }

    }
</script>

<style scoped>

</style>
