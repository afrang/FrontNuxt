<template>
  <div>

  <headers></headers>
  <div class="row" dir="rtl">

      <div class="col-sm-3 text-right " dir="rtl">
         <div class="m-3 mytextlist">
       <template v-if="callcat.to_color">
             <div>
               <h4 class="mytextfilter" v-text="$t('color')"></h4><hr>
             </div>
             <div class="container row" >
               <div class="col-xs-1" v-for="(item,index) in callcat.to_color" :key="index">
                 <div @click="colorselected(item.id)" :title="item.name" class="boxcolor" v-bind:style="{'background-color':item.code }"> </div>
                 <div  @click="colorselected(item.id)" style="margin-top: -35px; cursor: pointer; font-size: 30px;"  v-if="colorselect.includes(item.id)==true" class="text-center" ><span class="icofont-check"></span></div>
               </div>
             </div>
           </template>
          <template v-if="callcat.to_attr">
             <template v-for="(item,index) in callcat.to_attr "  >
               <div :key="index" v-if="item.filtered!=0" class="mt-4">

                 <template v-if="item.help==null">
                   <h4 class="mytextfilter" v-text="item.name"></h4><hr>

                 </template>
                 <template v-if="item.help!=null">
                   <h4 class="mytextfilter" >
                     <help :name="item.name" :help="item.help" :key="item.id"></help>
                   </h4><hr>

                 </template>
                 <template v-if="item.mode==4">
                   <ul class="mylistess">
                     <li v-for="(i,inx) in item.to_options" :key="'f'+inx">
                       <template v-if="attr[item.id]">
                         <span  v-if="attr[item.id][i.id]"  @click="delattr(item.id,i.name,i.id)"  style="font-size: 20px;color: green; "  class="icofont-checked" ></span>
                         <span  v-else style="font-size: 20px;color: red; " @click="checkattr(item.id,i.name,i.id)" class="icofont-close-line-squared-alt"></span>

                       </template>
                       <template v-else>
                         <span style="font-size: 20px;color: red; " @click="checkattr(item.id,i.name,i.id)" class="icofont-close-line-squared-alt"></span>

                       </template>
                       <span class="checkmark"></span>  |
                       <template v-if="i.help==null">
                         <span v-text="i.name"></span>
                       </template>
                       <template v-if="i.help!=null">
                         <help :name="i.name" :help="i.help" :key="item.id+i.id"></help>

                       </template>
                     </li>
                   </ul>
                 </template>
                 <template v-if="item.mode==3">
                   <ul class="mylistess">
                     <select class="form-control">
                       <option value="1" v-text="$t('have')"></option>
                       <option value="0" v-text="$t('doesnothave')"></option>
                     </select>
                   </ul>
                 </template>
               </div>
             </template>
           </template>
          <template v-if="callcat.to_feature">
             <template v-for="(item,index) in callcat.to_feature"  >
               <div :key="index" v-if="item.filtered!=0" class="mt-4">
                 <template v-if="item.help==null">
                   <h4 class="mytextfilter" v-text="item.name"></h4><hr>
                 </template>
                 <template v-if="item.help!=null">
                   <h4 class="mytextfilter" >
                     <help :name="item.name" :help="item.help" :key="item.id"></help>
                   </h4><hr>
                 </template>
                 <template v-if="item.mode==4">
                   <ul class="mylistess">
                     <li v-for="(i,inx) in item.to_options" :key="'ee'+inx">
                       <template v-if="faeat[item.id]">
                         <span  v-if="faeat[item.id][i.id]"  @click="delfeat(item.id,i.name,i.id)"  style="font-size: 20px;color: green; "  class="icofont-checked" ></span>
                         <span  v-else style="font-size: 20px;color: red; " @click="checkfeat(item.id,i.name,i.id)" class="icofont-close-line-squared-alt"></span>
                       </template>
                       <template v-else>
                         <span style="font-size: 20px;color: red; " @click="checkfeat(item.id,i.name,i.id)" class="icofont-close-line-squared-alt"></span>
                       </template>
                       <span class="checkmark"></span>  |
                       <template v-if="i.help==null">
                         <span v-text="i.name"></span>
                       </template>
                       <template v-if="i.help!=null">
                         <help :name="i.name" :help="i.help" :key="'e'+item.id+i.id"></help>
                       </template>
                     </li>
                   </ul>
                 </template>
                 <template v-if="item.mode==3">
                   <ul class="mylistess">
                     <select class="form-control">
                       <option value="1" v-text="$t('have')"></option>
                       <option value="0" v-text="$t('doesnothave')"></option>
                     </select>
                   </ul>
                 </template>

               </div>
             </template>
           </template>
         <div class="text-center">
             <a @click="search" class="btn btn-yellow m-4  text-right w-100" dir="rtl" >
               <span class="icofont-search"></span> |
               <span v-text="$t('search')"></span>
             </a>
           </div>
         </div>
       </div>
       <div class="categorys col-sm-9  ">
         <h1 class="text-right"><span v-text="callcat.name"></span></h1>
         <hr>
     <div class="container">
           <div class="card-columns " v-if="items!=null">
             <div class="card  cell   text-right" v-for="(item,index) in items.data" :key="index">
               <a class="mylink" :href="'/product/'+item.url">
                 <div class="  animated  ">
                   <span class="badge badge-success w-25 position-absolute m-1" v-text="item.model"></span>
                   <div class="img-hover-zoom">

                     <img class="card-img-top" style="width: 100%" :src="$storage+'media/Product/'+item.id+'/thump/'+item.image" :alt="item.name">
                   </div>
                   <div class="float-left"  style="margin-top:-15px; z-index: 5000; position: absolute; " v-if="item.color!=null">
                                             <span v-for="(colors,ind) in item.color" :key="ind">
                                                 <div  style="float: right; border-radius:16px; margin:3px;  width: 20px; height: 20px; display: inline-block;px;
                                                 overflow: hidden" :style="{background:colors.to_color.code}"></div>
                                             </span>
                   </div>
                   <div class="card-body">
                     <h4  v-text="item.name"></h4>
                     <h6 v-text="item.model"></h6>

                     <template v-if="item.status==1">
                       <a v-if="item.price!=0" href="#" class="btn btn-primary">
                         <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="item.price"></VueNumeric> <small v-text="$t('toman')"></small>

                       </a>
                       <a v-else v-text="$t('CallToAdmin')"></a>
                     </template>
                     <template v-if="item.status==2">
                       <a class="text-danger"  v-text="$t('unavailable')"></a>
                     </template>
                     <template v-if="item.status==0">
                       <a class="text-danger"  v-text="$t('Stopproduction')"></a>
                     </template>
                   </div>

                 </div>

               </a>
             </div>

           </div>

         </div>
       </div>
     </div>
    <div>


    </div>
    <footers class="mt-4 margittop"></footers>-->
  </div>

</template>

<script>
    import headers from "../../components/view/template/header";
    import footers from "../../components/view/template/footer";
    import help from "../../components/view/tools/help";
    import VueNumeric from 'vue-numeric';

    export default {
        name: "groups",
        components:{
            headers,footers,help,VueNumeric
        },
        data(){
            return{
                page:1,
                callcat:{},
                colorselect:[],
                someObject:null,
                compiler:{},
                attr:[],
                faeat:[],
                items:null,
                filter:{
                    group:null,
                    color:[],
                    fature:[],
                    attr:[]
                }

            }
        },
        computed:{
            filterobejct:function () {
                let object={};
                object.group=this.$route.params.groups;
                object.color=this.colorselect;
                return object;
            },
            asttrs:function () {
                return this.attr;
            },

        },
        watch: {

        },
        methods:{
            delattr(id,name,check){
                delete this.attr[id][check];

                this.$forceUpdate();  // Notice we have to use a $ here
                this.hashtgcreator();
            },
            delfeat(id,name,check){
                delete this.faeat[id][check];

                this.$forceUpdate();  // Notice we have to use a $ here
                this.hashtgcreator();
            },
            checkattr(id,name,check){
                let self=this;
                let item=[];
                if(!self.attr[id]){
                    Object.assign(self.attr,{[id]:{}})
                    self.attr[id]={};
                }
                const add ={ [check]: {
                        id:check,
                        name:name
                    }};
                self.attr[id]= Object.assign(self.attr[id],add);
                this.$forceUpdate();  // Notice we have to use a $ here
                this.hashtgcreator();

            },
            checkfeat(id,name,check){
                let self=this;
                let item=[];
                if(!self.faeat[id]){
                    Object.assign(self.faeat,{[id]:{}})
                    self.faeat[id]={};
                }
                const add ={ [check]: {
                        id:check,
                        name:name
                    }};
                self.faeat[id]= Object.assign(self.faeat[id],add);
                this.$forceUpdate();  // Notice we have to use a $ here
                //this.hashtgcreator();

            },
            colorselected(id){
                let n=this.colorselect.includes(id);

                if(n==true){
                    this.colorselect = this.colorselect.filter(item => item !== id);
                    this.hashtgcreator();

                }else{

                    this.colorselect.push(id);
                    this.hashtgcreator();
                };
            },
            callcate(){
                let that=this;
              try {
                  this.$axios.get(this.$url+'pgroup/'+that.$route.params.groups)
                      .then(function (res) {
                          that.callcat=res.data;


                      })
              }finally {
                  this.search();
              }


            },
            compilered:function () {

                let hashtag=window.location.hash.split('#');
                let self=this;
                if(hashtag['1']!=null){
                    let splited=hashtag['1'].split('&');
                    splited.map(function (item) {
                        if(item!=""){
                            let keys=item.split('=');
                            if(keys[0]=='feature'){
                                let attr=keys[1].split(',');
                                keys[1].split(',').map(function (myattr){
                                    if(myattr!=''){
                                        myattr=myattr.replace(';','');
                                        let attrs=myattr.split(':');
                                        let mydata=attrs[1].split('+');
                                        Object.assign(self.faeat,{[attrs[0]]:{}})
                                        mydata.forEach(function (key) {
                                            if(key!=''){
                                                const add ={ [key]: {
                                                        id:key,
                                                        name:''
                                                    }};
                                                Object.assign(self.faeat[attrs[0]],add);
                                            }
                                        })
                                    }
                                });

                            };
                            if(keys[0]=='attr'){
                                let attr=keys[1].split(',');
                                keys[1].split(',').map(function (myattr){
                                    if(myattr!=''){
                                        myattr=myattr.replace(';','');
                                        let attrs=myattr.split(':');
                                        let mydata=attrs[1].split('+');
                                        Object.assign(self.attr,{[attrs[0]]:{}})
                                        mydata.forEach(function (key) {
                                            if(key!=''){
                                                const add ={ [key]: {
                                                        id:key,
                                                        name:''
                                                    }};
                                                Object.assign(self.attr[attrs[0]],add);
                                            }
                                        })
                                    }
                                });

                            };
                            if(keys[0]=='color'){
                                keys[1].split(',').map(function (color){
                                    if(color!=''){
                                        self.colorselect.push(parseInt(color));
                                    }
                                });
                            }
                        }
                    })
                };
            },
            hashtgcreator() {
                let hashtag=null;
                let that=this;
                if(this.filterobejct.color){
                    hashtag='&color='
                    this.filterobejct.color.map(function (item) {
                        hashtag=hashtag+item+',';
                    })
                }
                if(this.filterobejct.color!=null){
                    hashtag='&color='
                    this.filterobejct.color.map(function (item) {
                        hashtag=hashtag+item+',';
                    })
                }
                if(this.attr.length!=0){
                    hashtag=hashtag+"&attr=";
                    this.attr.map(function (item,index) {
                        hashtag=hashtag+index+':';
                        if(item.length!=0){

                            Object.values(that.attr[index]).map(function (m,index) {
                                hashtag=hashtag+m.id+'+'
                                //    hashtag=m+'+'
                            });
                        }
                        hashtag=hashtag+';';
                    })
                    hashtag=hashtag+',';
                }
                if(this.attr.length!=0){
                    hashtag=hashtag+"&feature=";
                    this.faeat.map(function (item,index) {
                        hashtag=hashtag+index+':';
                        if(item.length!=0){

                            Object.values(that.faeat[index]).map(function (m,index) {
                                hashtag=hashtag+m.id+'+'
                                //    hashtag=m+'+'
                            });
                        }
                        hashtag=hashtag+';';
                    })
                    hashtag=hashtag+',';
                }
                window.location.hash=hashtag;
            },
            search(){
                let that=this;
                let data={
                    group:this.$route.params.groups
                }
                this.$axios.get(this.$url+'psearch',{
                    params: {
                        page: this.page,
                        attr:this.attr,
                        group:this.$route.params.groups,
                        feature:this.faeat,
                        color:this.colorselect,
                        mode:'listpage'
                    },
                })

                    .then(function (res) {
                        that.items=res.data;
                    })
            }
        },
        mounted() {
            this.callcate();
            this.compilered();

        }
    }
</script>
<style scoped  lang="scss">
  .btn-yellow{
    background-color: yellow;
    color: #333333 !important;
    border: dashed 1px #2970e0;
  }
  .categorys h1 span{
    font-size: 34px;
    color: #666666;
    font-weight: bold;
  }
  .boxcolor{
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 4px;
    cursor: pointer;
    border: solid 1px rgba(69, 69, 69, 0.31);
    margin: 2px;
  }
  .mytextfilter{
    font-size: 20px;
    font-weight: bold;
    color:gray;
  }
  .myst{
    width: 15px;
    background-color: #fff;
    height: 15px;
    border: none;
  }
  .mylistess li{list-style: none;}
  .margittop{ margin-top: 220px !important;}


  .img-hover-zoom {
    overflow: hidden; /* [1.2] Hide the overflowing of child elements */
  }

  /* [2] Transition property for smooth transformation of images */
  .img-hover-zoom img {
    transition: transform 2s ease;
  }

  /* [3] Finally, transforming the image when container gets hovered */
  .img-hover-zoom:hover img {
    transform: scale(1.1);
  }
  .mylink{
    color:#333333;;
  }
  .mylink:hover{
    text-decoration: none;
  }
</style>
