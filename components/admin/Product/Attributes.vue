<template>
  <div class="container text-right pt-5  " dir="rtl">
    <div class="wmaster ">
      <div class="right text-right pt-4">
        <h4 @click="loadmodel" v-text="$t('feature')"></h4>
        <a @click="loadlist" class="btn btn-primary text-white m-2 icofont-list"> <span v-text="$t('List')"></span> </a>
        <a @click="addlist" class="btn btn-primary text-white m-2 icofont-ui-add" > <span v-text="$t('Add')"></span> </a>
      </div>
      <template v-if="mode=='itemedit'">
        <h4 v-text="$t('itemfor')+detail.name"></h4>
        <form @submit.prevent="saveitem">
          <div class="col-sm-6 col-xs-12 text-right">
            <label   v-text="$t('name')"></label>
            <div class="input-group mb-2">
              <input type="text"  v-model="item.name" class="form-control text-right"  :placeholder="$t('name')">
            </div>
          </div>
          <template v-if="item.id!=null">
            <div class="row">
              <div class="col-sm-6 col-xs-12 text-right">
                <label   v-text="$t('icon')"></label> <small :class="detail.icon"></small>
                <div class="input-group mb-2 icofont-">
                  <input type="text"   v-model="item.icon" class="form-control text-right"  placeholder="icofont-...">
                </div>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <label   v-text="$t('picture')"></label>
                <file-uploader
                  :key="1"
                  mode="AttrProductitem"
                  v-on:filename="filenamesitem"
                  :id='item.id'
                  name="thump"
                  :file="item.image"
                ></file-uploader>
              </div>
              <div class="col-sm-8">
                <label   v-text="$t('help')"></label>
                <tisseditor
                  :key="2"
                  :text="item.help"
                  v-on:myevent="doSomethingitem"
                  :mode="'AttrProductitem'"></tisseditor>
              </div>
            </div>
          </template>
          <input type="submit" :value="$t('save')" class="btn btn-success ">
          <input type="button" :value="$t('back')"  @click="backtomain" class="btn btn-primary mr-4 ">
          <showerror :errors="error"></showerror>


        </form>
      </template>
      <template v-if="mode=='list'">
        <div class="list-group">
          <a  v-for="(item,index) in list" :key="index" class="list-group-item list-group-item-action flex-column align-items-start ">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1" v-text="item.name"></h5>
              <small>
                <span @click="edit(index)" class="btn btn-success icofont-edit"></span>
              </small>
            </div>
          </a>
        </div>
      </template>
      <template v-if="mode=='edit'">
        <form @submit.prevent="save">
          <div class="col-sm-6 col-xs-12 text-right">
            <label   v-text="$t('name')"></label>
            <div class="input-group mb-2">

              <input type="text"  v-model="detail.name" class="form-control text-right"  :placeholder="$t('name')">
            </div>
          </div>

          <template v-if="detail.id!=null">
            <div class="row">
              <div class="col-sm-6 col-xs-12 text-right">
                <label   v-text="$t('unit')"></label>
                <div class="input-group mb-2 icofont-">

                  <input type="text"   v-model="detail.unit" class="form-control text-right"  placeholder="unit">
                </div>
              </div>
              <div class="col-sm-6 col-xs-12 text-right">
                <label   v-text="$t('icon')"></label> <small :class="detail.icon"></small>
                <div class="input-group mb-2 icofont-">
                  <input type="text"   v-model="detail.icon" class="form-control text-right"  placeholder="icofont-...">

                </div>
              </div>

              <hr>
              <div class="col-sm-6">
                <label   v-text="$t('mode')"></label>
                <select class="form-control" v-model="detail.mode">
                  <template v-for="(item,index) in model">
                    <option  :key="index" v-if="item.id==4" :value="item.id" v-text="$t(item.name)"></option>

                  </template>
                </select>

              </div>
              <div class="col-sm-6">
                <label   v-text="$t('filtermode')"></label>
                <select class="form-control" v-model="detail.filtered">
                  <option value="0" v-text="$t('no')"></option>
                  <option value="1" v-text="$t('yes')"></option>
                </select>

              </div>
              <div class="col-sm-6">
                <label   v-text="$t('pricemode')"></label>
                <select class="form-control" v-model="detail.pricemode">
                  <option value="0" v-text="$t('mainprice')"></option>
                  <option value="1" v-text="$t('addtoprice')"></option>
                </select>

              </div>
              <div class="col-sm-12">
                <template v-if="detail.mode==4">
                  <label   v-text="$t('options')"></label>
                  <div>
                    <a @click="additem(item.id)" class="btn btn-success text-white" v-text="$t('additem')"></a>
                    <hr>
                    <ul class="list-group">
                      <li v-for="(items,index) in detail.to_options" :key="index" class="list-group-item">
                        <span v-text="items.name" ></span>
                        <div class="float-left" >
                          <span   @click="edititem(index)" class="icofont-ui-edit" ></span>
                          <span   @click="deleteitem(items.id,detail.id)" class="icofont-ui-delete ml-4" ></span>
                        </div>
                      </li>
                    </ul>
                  </div>

                </template>
              </div>

            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <label   v-text="$t('picture')"></label>

                <file-uploader
                  :key="2"
                  mode="Attrprodcut"
                  v-on:filename="filenames"
                  :id='detail.id'
                  name="thump"
                  :file="detail.image"
                ></file-uploader>
              </div>
              <div class="col-sm-8">
                <label   v-text="$t('help')"></label>

                <tisseditor
                  :key="2"
                  :text="detail.help"
                  v-on:myevent="doSomething"
                  :mode="'Attrprodcut'"></tisseditor>
              </div>
            </div>
          </template>
          <input type="submit" :value="$t('save')" class="btn btn-success ">
          <showerror :errors="error"></showerror>


        </form>

      </template>
    </div>

  </div>
</template>

<script>
    import Tisseditor from "../tools/Tisseditor";
    import FileUploader from "../tools/FileUploader";
    import showerror from "../tools/Showerror";
    export default {
        name: "Attributes",
        data() {
            return {


                mode:'list',
                error:[],
                list:null,
                model:null,
                detail:{
                    id:null,
                    name:null,
                    mode:null,
                    icon:null,
                    unit:null,
                    image:null,
                    help:null,
                    pricemode:null,

                },
                itemlist:null,
                item:{
                    id:null,
                    parent:null,
                    icon:null,
                    image:null,
                    help:null,
                }
            }
        },
        components: {
            showerror,Tisseditor,FileUploader
        },
        methods: {
            /* Item Option */
            deleteitem(e,index){
                let that=this;
                this.$axios.delete(this.$url+'user/AttrProductitem/'+e,
                    {
                        headers:{
                            Authorization:localStorage.token
                        }
                    }).then(function (response) {

                    that.reloaddetail();


                });
            },
            reloaddetail(){
                let that=this;
                this.$axios(this.$url+'user/Attrprodcut/'+this.detail.id,
                    {
                        headers:{
                            Authorization:localStorage.token
                        }
                    })
                    .then(function (response) {
                        that.detail=response.data;
                    });
            },
            backtomain(){
                this.mode='edit';
            },
            edititem(e){
                this.item=this.detail.to_options[e];
                this.mode='itemedit';
            },
            additem(){
                this.itemreset();
                this.item.parent=this.detail.id;
                this.mode='itemedit';

            },
            itemreset(){
                this.item={
                    id:null,
                    parent:null,
                    icon:null,
                    image:null,
                    help:null,
                }
            },
            filenamesitem(e){
                this.item.image=e;

            },
            doSomethingitem(e){
                this.item.help=e;
            },
            /* End Item Option */
            doSomething(e){
                this.detail.help=e;
            },
            filenames(e){
                this.detail.image=e;

            },
            saveitem(){
                let that=this;
                if(this.item.id==null){

                    this.$axios.post(this.$url+'user/AttrProductitem',this.item,
                        {
                            headers:{
                                Authorization:localStorage.token
                            }
                        }).then(function (response) {
                        that.error=[];
                        that.item=response.data;
                        that.reloaddetail();

                    }).catch((error) => {
                        that.error = error.response.data.errors;

                    });;
                }else{
                    this.$axios.put(this.$url+'user/AttrProductitem/'+this.item.id,this.item,
                        {
                            headers:{
                                Authorization:localStorage.token
                            }
                        }).then(function (response) {

                        that.error=[];
                        that.item=response.data;
                        that.$swal.fire(that.$t('Saved'));


                    }).catch((error) => {
                        that.error = error.response.data.errors;

                    });;
                }

            },
            save(){
                let that=this;
                if(this.detail.id==null){

                    this.$axios.post(this.$url+'user/Attrprodcut',this.detail,
                        {
                            headers:{
                                Authorization:localStorage.token
                            }
                        }).then(function (response) {
                        that.error=[];

                        that.resetlist();
                        that.mode='list';

                    }).catch((error) => {
                        that.error = error.response.data.errors;

                    });;
                }else{
                    this.$axios.put(this.$url+'user/Attrprodcut/'+this.detail.id,this.detail,
                        {
                            headers:{
                                Authorization:localStorage.token
                            }
                        }).then(function (response) {
                      that.error=[];
                        that.detail=response.data;

                    }).catch((error) => {
                        that.error = error.response.data.errors;

                    });;
                }

            },
            loadlistall(){
                let that=this;
                this.$axios.get(this.$url+'user/Attrprodcut',{
                    headers:{
                        Authorization:localStorage.token
                    }
                }) .then(function (response) {
                    that.list=response.data;

                });
            },
            loadlist(){
                this.loadlistall();
                this.mode='list';

            },
            addlist(){
                this.resetlist();
                this.mode='edit';

            },
            edit(x){
                this.resetlist();
                this.mode='edit';
                this.detail=this.list[x];

            },
            resetlist(){
                this.detail={
                    id:null,
                    name:null,
                    mode:null,
                    icon:null,
                    unit:null,
                    image:null,
                    help:null,

                }
            },
            loadmodel(){
                let that=this;
                this.$axios.get(this.$url+'user/ModelAttrController',{

                    headers:{
                        Authorization:localStorage.token
                    }
                })
                    .then(function (response) {
                        that.model=response.data;
                    });

            }


        },
        mounted() {
            this.mode='list';
            this.loadmodel();
            this.loadlist();
        }
    }
</script>

<style scoped>

</style>
