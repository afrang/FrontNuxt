<template>
  <div class="container pt-5  ">
    <div class="wmaster dir-rtl text-right" v-if="articlelist!=null">
      <h5 v-text="$t('articlegroup')">  </h5>
      <hr>
      <a @click="additem" :title="$t('addarticle')" class="btn btn-success   shadow btn-circle btn-xl  mr-3 text-white "><span class="icofont-plus"></span></a>
      <a @click="loadarticle"   :title="$t('addarticlegroup')" class="btn btn-danger  shadow btn-circle btn-xl  mr-3 text-white "><span class="icofont-list"></span></a>
      <hr>
      <div v-if="method=='list'">
        <div class="text-right row " dir="rtl">
          <div class="col-sm-6 col-xs-12 right pb-3" >
            <label v-text="$t('Group')"></label>
            <v-select  @input="changeselect"   class="col-sm-12 col-xs-12" dir="rtl" v-model="groupselect" :options="list" label="name"></v-select>

          </div>
          <div class="col-sm-4 col-xs-12 right pb-3" >
            <label v-text="$t('Search')"></label>
            <input type="search" v-model="search" class="form-control">

          </div>
          <div class="col-sm-2 col-xs-5">
            <label ></label>
            <div class="mt-2">
              <input @click="loadarticle()" type="button" class="btn btn-dark w-100" :value="$t('filter')">

            </div>
          </div>


        </div>


        <table class="table table-striped" dir="rtl">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" v-text="$t('name')"></th>
            <th scope="col"  v-text="$t('url')"></th>
            <th  class="text-center" scope="col" v-text="$t('edit')"></th>
            <th class="text-center" scope="col"  v-text="$t('del')"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in articlelist.data" :key="index">
            <th scope="row" v-text="index+1"></th>
            <td v-text="item.name"></td>
            <td v-text="item.url"></td>
            <td @click="edit(index)" class="text-center"><span class="icofont icofont-edit-alt"></span></td>
            <td @click="remove(item.id)" class="text-center"><span class="icofont icofont-delete-alt"></span></td>
          </tr>
          </tbody>
        </table>
        <template v-if="articlelist!=null">
          <paginate
            :page-count="articlelist.meta.last_page"
            :page-range="articlelist.meta.per_page"
            :margin-pages="2"
            :click-handler="clickCallback"
            :prev-text="$t('Prev')"
            :next-text="$t('Next')"
            :container-class="'pagination'"
            :page-class="'page-item'">
          </paginate>
        </template>


      </div>
      <div v-if="method=='additem'">
        <form @submit.prevent="saveform" dir="rtl">
          <div class="row">
            <div class="col-sm-6 col-xs-12">
              <label v-text="$t('name')"></label>
              <input  @keyup="urlcreate" class="form-control col-xs-12 col-sm-12 " v-model="blog.name">
              <label v-text="$t('url')"></label>
              <input  class="form-control col-xs-12 col-sm-12 " v-model="blog.url">
              <label v-text="$t('title')"></label>
              <input  class="form-control col-xs-12 col-sm-12 " v-model="blog.title">

              <label v-text="$t('Group')"></label>


            </div>
            <div class="col-sm-6 col-xs-12">

              <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
              <template v-if="blog.image=='1'">
                <img :src="$storage+'media/Articles/'+blog.id+'/thump.png'" class="img-thumbnail w-50">
              </template>

            </div>
          </div>
          <hr>
          <template v-if="blog.id">
            <tisseditor
              :id="blog.id"
              :text="blog.text"
              v-on:myevent="doSomething"
              :mode="'Blog'"></tisseditor>
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

          </template>

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
                error:[],
                tag:'',
                articlelist:null,
                group:null,
                file:'',
                groupselect:[],
                search:'',
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
                    title:null,
                    tag:null,
                    ordered:null
                },
                list:{},
                tags:[],
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
                    title:null,
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
                console.log(this.articlelist.data[0]);
                this.blog=this.articlelist.data[id];
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
                formData.append('title', this.blog.title);
                formData.append('url', this.blog.url);
                formData.append('keywords', this.blog.keywords);
                formData.append('description', this.blog.description);
                if(this.groupselect!=null){
                    formData.append('groups', this.groupselect.id);
                }

                formData.append('tag', JSON.stringify(this.tags));
                if(this.blog.id==null){
                    this.$axios.post( this.$url+'user/BlogArticle',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization:localStorage.token
                            }
                        }
                    ).then(function(){
                        //  that.listitem();
                    })
                        .catch((error) => {
                            that.error = error.response.data.errors;

                        });
                }else{
                    this.$axios.post(this.$url+'user/BlogArticleupdate/'+this.blog.id,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization:localStorage.token
                            }
                        }
                    ).then(function(res){
                        that.$swal.fire(that.$t('Saved'));
                    })
                        .catch((error) => {
                            that.error = error.response.data.errors;
                        });
                }


            },
            additem(){
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
                    that.loadgroup();
                    that.loadarticle();


                })

            },
            loadgroup(){
                let that=this;

                this.list.map(function (el) {

                    if(el.id==window.location.hash.substring(1).split('#')[1]){
                        that.groupselect=el;
                    }
                });

            },
            loadtag(){
                let that=this;
                this.$axios.get(this.$url+'user/Tag',
                    {headers:{Authorization:localStorage.token}}
                ).then(function(res){
                    that.taglist=res.data;

                })
            },
            clickCallback(pageNum){
                this.loadarticle(pageNum);

            },
            changeselect(page){

                this.loadarticle(1);
            },
            remove(id){
                let that=this;
                this.$swal.fire({
                    title: that.$t('Areyousure'),
                    text: that.$t('Youwontbeabletorevertthis'),
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: that.$t('cancel'),
                    confirmButtonText: that.$t('Yesdeleteit')
                }).then((result) => {
                    if (result.value) {
                        that.$axios.delete(this.$url + 'user/BlogArticle/' + id,
                            {
                                headers:
                                    {
                                        Authorization: localStorage.token
                                    }
                            })
                            .then(function (res) {
                                that.loadarticle();

                            });
                    }
                });
            },
            loadarticle(page=1){

                this.method='list';

                let that=this;
                let group='';

                if(this.groupselect.length!=0){
                    group=this.groupselect.id;
                }
                this.$axios.get(this.$url+'user/BlogArticle',
                    {
                        params: {
                            page: page,
                            group: group,
                            search: that.search
                        },
                        headers:{Authorization:localStorage.token}}
                ).then(function(res){
                    that.articlelist=res.data;

                })

            }


        },
        mounted() {
            this.listitem();
            this.loadtag();

            this.loadarticle(window.location.hash.substring(1).split('#')[1]);


        },
        head () {
            return {
                title: this.$t('ArticleList'),

            }
        }


    }
</script>

<style scoped>

</style>
