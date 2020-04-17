<template>
  <div class="container pt-4" dir="rtl">
    <div class="text-right wmaster">
      <h4 v-text="$t('groupproducnt')"></h4>
      <hr>
      <a @click="add" class="btn btn-success icofont-ui-add p-3 text-white"></a>
      <a @click="listgroup" class="btn btn-success icofont-listing-box  mr-4 p-3 text-white"></a>
      <a v-if="pages.length!=1" @click="topitem(prev)" class="btn btn-success icofont-arrow-up  mr-4 p-3 text-white"></a>
      <hr>
      <template v-if="mode=='list'">
        <table class="table table-striped" dir="rtl">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" v-text="$t('name')"></th>
            <th scope="col"  v-text="$t('url')"></th>
            <th scope="col"  v-text="$t('up')"></th>
            <th scope="col"  v-text="$t('down')"></th>
            <th  class="text-center" scope="col" v-text="$t('edit')"></th>
            <th class=" text-center"   scope="col"  v-text="$t('sub')"></th>
            <th class="text-center" scope="col"  v-text="$t('del')"></th>
          </tr>
          </thead>
          <tbody v-if="list!=null">
          <tr v-for="(item,index) in list.data" :key="index">
            <th scope="row" v-text="index+1"></th>
            <td v-text="item.name"></td>
            <td v-text="item.url"></td>
            <td @click="uped(item.id)" class="icofont-arrow-up"></td>
            <td @click="downed(item.id)"  class="icofont-arrow-down  "></td>
            <td @click="edit(item.id)" class="text-center"><span class="icofont icofont-edit-alt"></span></td>
            <td @click="subitem(item.id)" class="text-center"><span class="icofont icofont-sub-listing"></span></td>
            <td @click="removeitem(item.id)" class="text-center"><span class="icofont icofont-delete-alt"></span></td>
          </tr>
          </tbody>
        </table>
        <template  v-if="list!=null">

        <paginate
          :page-count="list.from"
          :page-range="list.per_page"
          :margin-pages="2"
          :click-handler="clickCallback"
          :prev-text="$t('Prev')"
          :next-text="$t('Next')"
          :container-class="'pagination'"
          :page-class="'page-item'">
        </paginate>

        </template>
      </template>

      <template v-if="mode=='add'">
        <h6 v-text="$t('EditGroup')"></h6>
        <form @submit.prevent="save">
          <div class="row">
            <div class="form-group col-sm-6 col-xs-12">
              <label  v-text="$t('name')"></label>
              <input @keyup="urlcreate" type="text" v-model="group.name" class="form-control" :placeholder="$t('name')">
              <small  class="form-text text-muted"></small>
            </div>

            <div class="form-group col-sm-6 col-xs-12">
              <label v-text="$t('url')"></label>
              <input   type="text" v-model="group.url" class="form-control"  :placeholder="$t('url')">
              <small  class="form-text text-muted"></small>
            </div>


            <template v-if="group.id!=null">
              <div class="form-group col-sm-6 col-xs-12">
                <label v-text="$t('title')"></label>
                <input   type="text" v-model="group.title" class="form-control"  :placeholder="$t('title')">
                <small  class="form-text text-muted"></small>
              </div>
              <div class="form-group col-sm-6 col-xs-12">
                <label v-text="$t('pricemode')"></label>
                <select class="form-control" v-model="group.pricemode">
                  <option v-for="(item,index) in pricemode" :key="index" :value="index" v-text="item.name"></option>
                </select>
                <small  class="form-text text-muted"></small>
              </div>
              <template v-if="group.pricemode==2">
                <div class="col-sm-3 col-xs-12" dir="ltr">
                  <label class="sr-only" v-text="$t('minwidth')" ></label>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <span class="icofont icofont-text-width"></span> | {{ $t('minwidth')    }}
                      </div>
                    </div>
                    <input type="text" v-model="group.minwidth" class="form-control"  >
                    <small  class="form-text text-muted" v-text="$t('CM')"></small>

                  </div>
                </div>
                <div class="col-sm-3 col-xs-12" dir="ltr">
                  <label class="sr-only" v-text="$t('maxwidth')" ></label>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <span class="icofont icofont-maximize"></span> | {{ $t('maxwidth')    }}
                      </div>
                    </div>
                    <input type="text" v-model="group.maxwidth" class="form-control"  >
                    <small  class="form-text text-muted" v-text="$t('CM')"></small>

                  </div>
                </div>
                <div class="col-sm-3 col-xs-12" dir="ltr">
                  <label class="sr-only" v-text="$t('minheight')" ></label>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <span class="icofont icofont-text-height"></span> | {{ $t('minheight')    }}
                      </div>
                    </div>
                    <input type="text" v-model="group.minheight" class="form-control"  >
                    <small  class="form-text text-muted" v-text="$t('CM')"></small>

                  </div>
                </div>
                <div class="col-sm-3 col-xs-12" dir="ltr">
                  <label class="sr-only" v-text="$t('maxheight')" ></label>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <span class="icofont icofont-maximize"></span> | {{ $t('maxheight')    }}
                      </div>
                    </div>
                    <input type="text" v-model="group.maxheight" class="form-control"  >
                    <small  class="form-text text-muted" v-text="$t('CM')"></small>

                  </div>
                </div>
                <div class="col-sm-6 col-xs-12" dir="ltr">
                  <label class="sr-only" v-text="$t('arealimit')" ></label>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <span class="icofont icofont-text-width"></span> | {{ $t('arealimit')    }}
                      </div>
                    </div>
                    <input type="text" v-model="group.arealimit" class="form-control">
                    <small  class="form-text text-muted" v-text="$t('CM')"></small>

                  </div>
                </div>
                <div class="col-sm-12 col-xs-12" dir="ltr">
                  <label class="sr-only" v-text="$t('areaerror')" ></label>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <span class="icofont icofont-maximize"></span> | {{ $t('areaerror')    }}
                      </div>
                    </div>
                    <textarea type="text" v-model="group.areaerror" class="form-control text-right"></textarea>

                  </div>
                </div>

              </template>
              <div class="form-group col-sm-12 col-xs-12">
                <label v-text="$t('keywords')"></label>
                <textarea   type="text" v-model="group.keywords" class="form-control"  :placeholder="$t('keywords')"></textarea>
                <small  class="form-text text-muted"></small>
              </div>
              <div class="form-group col-sm-12 col-xs-12">
                <label v-text="$t('description')"></label>
                <textarea   type="text" v-model="group.description" class="form-control"  :placeholder="$t('description')"></textarea>
                <small  class="form-text text-muted"></small>
              </div>
              <div class="form-group col-sm-12 col-xs-12">
                <label v-text="$t('color')"></label>
                <multiselect
                  @tag="addTag"
                  v-model="colorselect"
                  :multiple="true"
                  :taggable="true"
                  label="name"
                  track-by="code"
                  :options="color"></multiselect>
                <small  class="form-text text-muted"></small>
              </div>
              <div class="form-group col-sm-12 col-xs-12">

                <label v-text="$t('tags')"></label>

                <vue-tags-input class="col-xs-12"
                                :key="1"
                                v-model="tag"
                                :tags="tags"
                                @tags-changed="newTags => tags = newTags"
                                :autocomplete-items="filteredItems"
                />                                <small  class="form-text text-muted"></small>
              </div>
              <div class="form-group col-sm-12 col-xs-12">

                <label v-text="$t('features')"></label>

                <vue-tags-input class="col-xs-12"
                                :key="1"
                                v-model="fae"
                                :tags="feas"
                                :placeholder="$t('addfeature')"
                                @tags-changed="newTags => feas = newTags"
                                :autocomplete-items="filteredItemsfeas"
                />                                <small  class="form-text text-muted"></small>
              </div>
              <div class="form-group col-sm-12 col-xs-12">

                <label v-text="$t('attrbiute')"></label>

                <vue-tags-input class="col-xs-12"
                                :placeholder="$t('addattr')"
                                :key="2"
                                v-model="attr"
                                :tags="attrs"
                                @tags-changed="newTags => attrs = newTags"
                                :autocomplete-items="filteredItemsattr"
                />

              </div>
              <div class="form-group col-sm-8 col-xs-12">
                <label v-text="$t('text')"></label>

                <tisseditor  :text="group.text"
                             :keys="1"

                             :id="group.id"
                             v-on:myevent="dotext"
                             :mode="'GroupProduct'"></tisseditor>
              </div>
              <div class="form-group">
                <label v-text="$t('thump')"></label>
                <file-uploader
                  :key="1"
                  mode="GroupProduct"
                  v-on:filename="thumpsave"
                  :id='group.id'
                  name="thump"
                  :file="group.thump"
                ></file-uploader>
              </div>
              <div class="form-group col-sm-12 col-xs-12">
                <label v-text="$t('seotext')"></label>

                <tisseditor  :text="group.seotext"
                             :keys="2"
                             :id="group.id"
                             v-on:myevent="doseotext"
                             :mode="'GroupProduct'"></tisseditor>
              </div>

            </template>
            <div class="clearfix col-sm-12">
              <input type="submit" :value="$t('save')" class="btn btn-dark">
              <input type="btn" :value="$t('backtolist')" class="btn mr-4 btn-danger">

            </div>
          </div>
        </form>
      </template>
    </div>
    <showerror :errors="error"></showerror>


  </div>

</template>

<script>


    import FileUploader from "../tools/FileUploader";
    import Tisseditor from "../tools/Tisseditor";
  //  import Multiselect from 'vue-multiselect';

    import Showerror from "../tools/Tisseditor";
    export default {
        name: "productgroup",
        components: {Showerror,Tisseditor,FileUploader},
        data(){
            return{
                sub:0,
                prev:0,
                pages:[0],
                mode:null,
                colorselect:[],
                error:[],
                group: {
                    id: null,
                    name: null,
                    sub: 0,
                    url: null,
                    menuitem: 1,
                    keywords: null,
                    description: null,
                    text: null,
                    seotext: null,
                    icon: null,
                    thump: null,
                    title: null,
                    pricemode: 1,
                    minwidth: 100,
                    maxwidth: 500,
                    minheight: 500,
                    maxheight: 500,
                    arealimit: 50,
                    areaerror: null,
                },
                pricemode:{
                    1:{
                        name:this.$t('normal')
                    },
                    2:{
                        name:this.$t('metterbase')
                    }
                },

                list:[],
                color:[],
                options: ['Select option', 'options', 'selected', 'mulitple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched'],


                Attrlist:[],
                attrs:[],
                attr:'',

                taglist:[],
                tags:[],
                tag:'',

                fealist:[],
                feas:[],
                fea:null
            }
        },
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
                this.group.to_tags.forEach(function(item){
                    b.push(item.name);
                });
                return b;
            },

            filteredItemsfeas() {
                return this.autocompleteItemsfeas.filter(i => {
                    return i.text;
                });
            },

            autocompleteItemsfeas(){
                let b=[];
                this.fealist.forEach(function (item) {
                    b.push({text:item.name});

                });
                return b;
            },
            feasgenerator(){
                let b=[];
                this.group.to_feature.forEach(function(item){
                    b.push(item.name);
                });
                return b;
            },


            filteredItemsattr() {
                return this.autocompleteItemsattr.filter(i => {
                    return i.text.toLowerCase().indexOf(this.attr.toLowerCase()) !== -1;
                });
            },
            autocompleteItemsattr(){
                let b=[];
                this.Attrlist.forEach(function (item) {
                    b.push({text:item.name});

                });
                return b;
            },
            attrgenerator(){
                let b=[];
                this.group.to_attr.forEach(function(item){
                    b.push(item.name);
                });
                return b;
            }
        },
        methods:{
            topitem(id){

                let last=this.pages[this.pages.length - 2];
                this.sub=last;
                this.pages.pop();
                this.loadlist();

            },
            subitem(id){
                this.prev=this.sub;
                this.sub=id;
                this.pages.push(id);

                this.loadlist();
            },
            customLabel({name,code}){
                return `${name}`;

            },
            addTag (newTag) {
                const tag = {
                    name: newTag,
                    code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
                }
                this.options.push(tag)
                this.value.push(tag)
            },
            resetform(){
                this.group={
                    id:null,
                    name:null,
                    sub:0,
                    url:null,
                    menuitem:1,
                    keywords:null,
                    description:null,
                    text:null,
                    seotext:null,
                    icon:null,
                    thump:null,
                    title:null,
                }
            },
            dotext(e){
                this.group.text=e;
            },
            doseotext(e){
                this.group.seotext=e;
            },
            add(){
                this.resetform();
                this.mode='add';

            },
            thumpsave(e){
                this.group.thump=e;
            },
            save(){
                let that=this;
                if(this.group.id==null){
                    this.group.sub=that.sub;

                    this.$axios.post( this.$url+'user/pgroup',
                        this.group,
                        {
                            headers: {
                                Authorization:localStorage.token
                            }
                        }
                    ).then(function(res){
                        that.group=res.data;
                        that.$swal.fire(that.$t('Saved'));
                    })
                        .catch((error) => {
                            that.error = error.response.data.errors;

                        });
                }else{
                    this.group.tag=JSON.stringify(this.tags);
                    this.group.fea=JSON.stringify(this.feas);
                    this.group.attrs=JSON.stringify(this.attrs);
                    this.group.color=JSON.stringify(this.colorselect);
                    this.group.sub=that.sub;
                    this.$axios.put( this.$url+'user/pgroup/'+this.group.id,
                        this.group,
                        {
                            headers: {
                                Authorization:localStorage.token
                            }
                        }
                    ).then(function(res){
                        //  that.group=res.data;
                        that.$swal.fire(that.$t('Saved'));
                    })
                        .catch((error) => {
                            that.error = error.response.data.errors;
                        });

                }
            },
            urlcreate(){
                if(this.group.id==null){
                    let str=this.group.name;
                    this.group.url=str.replace(/#| /g,'_');

                };
            },
            listgroup(){
                this.loadlist();
                this.mode='list';

            },
            clickCallback(pageNum){
                this.loadlist(pageNum);
            },
            edit(i){
                let that=this;
                this.resetform();
                this.$axios.get(this.$url+'user/pgroup/'+i,{

                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.group=res.data;
                    that.tags=that.taggenerator;
                    that.attrs=that.attrgenerator;
                    that.feas=that.feasgenerator;
                    that.colorselect=res.data.to_color;
                    that.mode='add';
                })

            },
            loadattr(){
                let that=this;
                this.$axios.get(this.$url+'user/Feature',{
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.fealist=res.data;
                });
                this.$axios.get(this.$url+'user/Attrprodcut',{
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.Attrlist=res.data;
                });
                this.$axios.get(this.$url+'user/color',{
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.color=res.data;
                });
                this.$axios.get(this.$url+'user/Tag',{
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.taglist=res.data;
                });
            },
            removeitem(id){
                let that=this;
                this.$axios.delete(this.$url+'user/pgroup/'+id,{
                    params:{
                        id:id
                    },
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.loadlist();
                })
                    .catch((error) => {
                        that.error = error.response.data.errors;

                    });
            },
            loadlist(page=1){

                let that=this;
                this.$axios.get(this.$url+'user/pgroup',{
                    params: {
                        page: page,
                        sub:that.sub
                    },
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.list=res.data;
                })
                    .catch((error) => {
                        that.error = error.response.data.errors;

                    });
            },
            uped(e){
                let that=this;
                this.$axios.get(this.$url+'user/pgroupDetailup/'+e,
                    {
                        headers: {
                            Authorization: localStorage.token
                        }
                    })
                    .then(function(res){
                        that.loadlist();


                    });
            },
            downed(e){
                let that=this;
                this.$axios.get(this.$url+'user/pgroupDetailup/'+e,
                    {
                        headers: {
                            Authorization: localStorage.token
                        }
                    })
                    .then(function(res){
                        that.loadlist();


                    });
            },
        },
        mounted() {
            this.mode='list';
            this.loadlist();
            this.loadattr();

        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style  scoped>

</style>
