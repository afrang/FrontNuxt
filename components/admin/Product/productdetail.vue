<template>
  <div class="container pt-4">
    <!-- Modal -->

    <div class="wmaster text-right" dir="rtl">
      <modal   :scrollable="true"   height="auto" name="edirprice" dir="ltr" :key="'mip2'"  >
        <div class="modal-content" v-if="editprice!=null">
          <div class="modal-body text-right">
            <label v-text="$t('price')"></label>
            <money dir="ltr"  class="form-control" v-model="editprice.price" v-bind="money"></money>
            <label v-text="$t('discount')"></label>
            <money dir="ltr"  class="form-control" v-model="editprice.discount" v-bind="money"></money>
            <label v-text="$t('percent')"></label>
            <input class="form-control w-24" type="number" min="0" max="100" v-model="editprice.percent">
            <input @click="savepriceattr" type="submit" class="form-control btn btn-secondary mt-4" :value="$t('save')">
          </div>
        </div>

      </modal>
      <modal   :scrollable="true"   height="auto" name="editfeature" dir="ltr" :key="'mi2'"  >
        <div class="modal-content" v-if="editfeature!=null">
          <div class="modal-header text-right" dir="rtl" >
            <span v-text="editfeature.to_attr.name" ></span>
          </div>
          <div class="modal-body">
            <template v-if="editfeature.to_attr.mode==1">
              <tisseditor  :key="'esmailso'+4"  :text="editfeature.value" v-on:myevent="featurevalue"   :mode="'Product'"></tisseditor>
            </template>
            <template v-if="editfeature.to_attr.mode==2">
              <input type="number" class="form-control" v-model="editfeature.value">
            </template>
            <template v-if="editfeature.to_attr.mode==3">
            <template v-if="booleanhave">
              <select class="form-control" v-model="editfeature.value" dir="rtl">
                <option v-for="(item,index) in booleanhave" :key="'per'+index" :value="index" v-text="item"></option>
              </select>
            </template>

            </template>

            <template v-if="editfeature.to_attr.mode==4">
              <template v-if="editfeature!=null">
                <select class="form-control" v-model="editfeature.value" dir="rtl">
                  <option v-for="(item,index) in editfeature.to_attr.to_options" :key="'pser'+index" :value="item.id" v-text="item.name"></option>
                </select>
              </template>

            </template>
            <input @click="savevaluefeature" type="button" class="btn mt-4 btn-primary" :value="$t('save')">
          </div>
        </div>
      </modal>
      <modal   :scrollable="true"   height="auto" name="hello-world" dir="ltr" :key="'mi'"  >
        <div class="modal-content">
          <div class="modal-header text-right" >
            <h5 class="modal-title text-right w-100" dir="rtl" v-text="$t('coloroption')"></h5>
          </div>
          <div class="modal-body">
            <form  @submit.prevent="savecolor"  dir="rtl" v-if="coloredit!=null" class="form text-right row" >
              <div class="form-group col-sm-12">
                <a   class="btn   text-white m-1 w-100 text-right" >
                  <div  class="btncolor" :style="{ 'background-color': coloredit['to_color']['code'] }"></div>
                  <a v-text="coloredit['to_color']['name']" style="color: #333;" class="text-black"></a>

                </a>
              </div>
              <div class="form-group container col-sm-6 ">
                <label v-text="$t('existing')"></label>
                <select v-model="coloredit.existing" class="form-control">
                  <option value="1" v-text="$t('yes')"></option>
                  <option value="0" v-text="$t('no')"></option>
                </select>
                <hr>
                <button  type="submit" class="btn btn-primary" v-text="$t('save')"></button>
              </div>
              <div class="form-group col-sm-6">
                <file-uploader
                  :key="'fa'+1"
                  mode="Product"
                  v-on:filename="iamgemanagers"
                  :id='product.id'
                  :showthump="true"
                  :name=coloredit.color
                  :deletefile="true"
                  :file="coloredit.image"
                ></file-uploader>
              </div>
            </form>
          </div>
        </div>
      </modal>

      <h4 v-text="$t('product')"></h4>
      <hr>
      <a @click="add" class="btn btn-success icofont-ui-add p-3 text-white"></a>
      <a @click="listproduct()" class="btn btn-success icofont-listing-box  mr-4 p-3 text-white"></a>
      <hr>
      <p @click="listgroup"  v-text="mode"></p>

      <template v-if="mode=='list'">

        <table class="table  table-striped">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" v-text="$t('name')"></th>
            <th scope="col" v-text="$t('model')"></th>
            <th scope="col" v-text="$t('group')"></th>
            <th  class="text-center" scope="col" v-text="$t('action')"></th>
          </tr>
          </thead>
          <tbody v-if="listitems!=null">
          <tr v-for="(item,index) in listitems.data"  :key="'far'+index">
            <th scope="row" v-text="index+1"></th>
            <td v-text="item.name"></td>
            <td v-text="item.model"></td>
            <td v-text="item.group"></td>
            <td class="text-center" >
              <button  @click="edit(item.id)" class="btn btn-success icofont-ui-edit"></button>
              <button  @click="del(item.id)" class="btn btn-danger mr-2 icofont-ui-delete"></button>
            </td>
          </tr>

          </tbody>
        </table>
      </template>
      <template v-if="mode=='edit'">

        <form @submit.prevent="save" class="row">

          <div class="form-group col-sm-6 col-xs-12">
            <label  v-text="$t('name')"></label>
            <input @keyup="urlcreate" type="text" v-model="product.name" class="form-control" :placeholder="$t('name')">
            <small  class="form-text text-muted"></small>
          </div>
          <div class="form-group col-sm-6 col-xs-12">
            <label v-text="$t('url')"></label>
            <input   type="text" v-model="product.url" class="form-control"  :placeholder="$t('url')">
            <small  class="form-text text-muted"></small>
          </div>
          <div class="form-group col-sm-6 col-xs-12" v-if="product.id==null">
            <label v-text="$t('group')"></label>
            <select v-model="product.parent" class="form-control">
              <template v-if="group!=null">
                <template v-for="(item,index) in group" >
                  <option  v-if="item.to_sub.length==0" :key="'fars'+index" :value="item.id" v-text="item.name"></option>
                  <optgroup   v-if="item.to_sub.length!=0"  :key="'farsi'+index"  :label="item.name">
                    <option v-for="(items,index2) in item.to_sub" :key="'farsia'+index2"  :value="items.id" v-text="items.name"></option>
                  </optgroup>

                </template>
              </template>


            </select>
            <small  class="form-text text-muted"></small>
          </div>
          <div class="container" v-if="product.id!=null">
            <br>

            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#home" v-text="$t('specifications')" ></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#menu1"  v-text="$t('images')" ></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#menu2"  @click="loadattrprice" v-text="$t('PricingFeature')"></a>
              </li>

              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#menu3"   @click="loadattr"  v-text="$t('Attribute')"></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="loadcolor" data-toggle="tab" href="#menu4"   v-text="$t('colormanager')"></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#review"   v-text="$t('description')"></a>
              </li>
            </ul>


            <div class="tab-content ">
              <div id="home" class="container tab-pane active pb-5"><br>
                <h3  v-text="$t('specifications')"></h3>
                <div class="row">
                  <div class="form-group col-sm-6 col-xs-12">
                    <label v-text="$t('title')"></label>
                    <input   type="text" v-model="product.title" class="form-control"  :placeholder="$t('title')">
                    <small  class="form-text text-muted"></small>
                  </div>
                  <div class="form-group col-sm-6 col-xs-12">
                    <label v-text="$t('model')"></label>
                    <input   type="text" v-model="product.model" class="form-control"  :placeholder="$t('model')">
                    <small  class="form-text text-muted"></small>
                  </div>

                  <div class="form-group col-sm-6 col-xs-12">
                    <label v-text="$t('status')"></label>


                    <select class="form-control" v-model="product.status">
                      <option v-for="(item,index) in status" :key="'farsian'+index" :value="index" v-text="item"></option>
                    </select>
                    <small  class="form-text text-muted"></small>

                  </div>


                  <div class="form-group col-sm-6 col-xs-12">
                    <label v-text="$t('special')"></label>
                    <select class="form-control" v-model="product.special">
                      <option v-for="(item,index) in special" :key="'p'+index" :value="index" v-text="item"></option>
                    </select>
                    <small  class="form-text text-muted"></small>
                  </div>
                  <div class="form-group col-sm-6 col-xs-12">
                    <label v-text="$t('discount')"></label>
                    <select class="form-control" v-model="product.special">
                      <option v-for="(item,index) in booleanarray" :key="'pe'+index" :value="index" v-text="item"></option>
                    </select>
                    <small  class="form-text text-muted"></small>
                  </div>
                  <div class="form-group col-sm-6 col-xs-12">
                    <label v-text="$t('expressdelivery')"></label>
                    <select class="form-control" v-model="product.expressdelivery">
                      <option v-for="(item,index) in booleanarray" :key="'per'+index" :value="index" v-text="item"></option>
                    </select>
                    <small  class="form-text text-muted"></small>
                  </div>

                  <div class="form-group col-sm-12 col-xs-12">
                    <vue-tags-input
                                    class="col-xs-12"
                                    :key="'pers'+1"
                                    v-model="tag"
                                    :tags="tags"
                                    @tags-changed="newTags => tags = newTags"
                                    :autocomplete-items="filteredItems"
                    />
                    <h3 v-text="$t('abstract')"></h3>
                    <p>
                      <tisseditor  :key="'pers'+1"  :text="product.morecomment" v-on:myevent="morecommentedit"   :mode="'Product'"></tisseditor>
                    </p>
                  </div>
                </div>
              </div>
              <div id="menu1" class="container tab-pane fade"><br>
                <h3  @click="loadimage" v-text="$t('images')"></h3>
                <div class="row">
                  <div class="col-sm-3">
                    <file-uploader
                      :key="'persi'+1"
                      mode="Product"
                      v-on:filename="addpicture"
                      :id='product.id'
                      :showthump="false"
                      name="random"
                      :deletefile="false"
                      :file="group.thump"
                    ></file-uploader>
                  </div>
                  <div class="col-sm-8 pb-5 ">
                    <div class="row">
                      <template v-if="imagelist!=null">
                      <div  v-for="(item,index) in imagelist" :key="'persia'+index" class="col-sm-4  mt-2 col-xs-12">
                        <div class="card"  >
                          <img class="card-img-top" :src="$storage+'media/Product/'+product.id+'/thump/'+item.file" alt="Card image cap">
                          <div class="card-body">
                            <a @click="delimage(item.id)" class="btn btn-primary icofont-2x icofont-ui-delete" ></a> |
                            <a v-if="item.master==0" @click="masterimg(item.id)" :title="$t('masteriamge')" class=" btn btn-danger  icofont-2x icofont-toggle-off"></a>
                            <a   v-if="item.master==1"   :title="$t('masteriamge')" class=" btn btn-primary  icofont-2x icofont-toggle-on"></a>
                          </div>
                        </div>
                      </div>
                      </template>
                    </div>
                  </div>
                </div>
                <p>

                </p>
              </div>
              <div id="menu4" class="container tab-pane fade"><br>
                <h3 v-text="$t('colormanager')"></h3>
                <hr>
                <label v-text="$t('modecolor')"></label>
                <select v-model="product.colormode" class="form-control">
                  <option value="1" v-text="$t('includedcolor')"></option>
                  <option value="2" v-text="$t('colortypecolor')"></option>
                </select>
                <h4  v-text="$t('listcolor')"></h4>
                <ul class="row mylistcolor">
                  <template v-if="product.to_group.to_color">
                    <li class="col-sm-2  "  @click="addtocolorexist(item.id)"  v-for="(item,index) in product.to_group.to_color" :key="'persian'+index"  >
                      <div  class="btn text-white m-1 w-100 text-right" >
                        <div  class="btncolor" :style="{ 'background-color': item.code }"></div>
                        <a class="icofont-ui-add"></a> |

                        <a v-text="item.name"></a>
                      </div>
                    </li>
                  </template>

                </ul>

                <hr>
                <h4 v-text="$t('listexist')"></h4>
                <hr>
                <ul class="row mylistcolor">
                  <li class="col-sm-4  w-100 text-right "  v-for="(item,index) in listcolor" :key="'es'+index"  >
                    <span @click="colororderup(item.id)" class="icofont-arrow-right float-right btn text-white m-1"></span>
                    <a   class="btn   text-white " >
                      <div  class="btncolor" :style="{ 'background-color': item.to_color.code }"></div>
                      <a  @click="editcolor(index)"  class="icofont-ui-edit"></a> |
                      <span @click="deletecolor(item.id)" class="icofont-ui-delete "></span>

                      | <a v-text="item.to_color.name"></a>
                    </a>
                    <span @click="colororderdown(item.id)" class="icofont-arrow-left float-left btn text-white  m-1 "></span>


                  </li>
                </ul>
              </div>

              <div id="menu2" class="container tab-pane fade"><br>

                <h2 v-text="$t('fatureandprice')"></h2>
                <div class="row">
                  <div class="col-sm-5 col-xs-12">
                    <label v-text="$t('price')"></label>
                    <money dir="ltr"  class="form-control" v-model="price" v-bind="money"></money>
                  </div>
                  <div class="col-sm-5 col-xs-12">
                    <label v-text="$t('pricediscount')"></label>
                    <money dir="ltr"  class="form-control" v-model="discount" v-bind="money"></money>
                  </div>
                  <div class="col-sm-2 col-xs-12">
                    <label v-text="$t('percent')"></label>
                    %  <input class="form-control w-100" type="number" min="0" max="100" v-model="percent">

                    <input type="button" class="btn btn-primary mt-4" @click="newpricesubmit" :value="$t('save')">

                  </div>
                </div>
                <hr>
                <div class="container">
                  <h4 v-text="$t('otherprice')"></h4>
                  <div class="row" v-if="product.to_group.to_attr">
                    <template v-for="(item,index) in product.to_group.to_attr">
                      <div v-if="!featurepriceselected.includes(item.id)" @click="addpriceattr(item.id)" :key="'feat'+index" class="tiss-cursur   m-4">
                        <span class="icofont-plus-square"></span>  <span>{{ item.name }}</span>
                      </div>
                    </template>
                    <hr>
                  </div>
                  <div class="">
                    <h3 v-text="$t('include')"></h3>
                    <hr>
                    <ul v-if="listporductattr!=null">
                      <li v-for="(item,index) in listporductattr" :key="'attr'+index" >
                        <label class="text-success">
                          <span @click="delattrprice(item.id)" class="icofont-ui-delete"></span> |
                          <span v-text="item.to_attr.name"></span>
                          <template v-if="pricemode==0">
                            | <i class="text-white" v-text="$t('mainprice')"></i>
                          </template>
                          <template v-else>
                            | <i class="text-white" v-text="$t('addtoprice')"></i>
                          </template>
                        </label>
                        <table class="table table-dark">
                          <thead>
                          <td v-text="$t('name')"></td>
                          <td v-text="$t('status')"></td>
                          <td v-text="$t('price')"></td>
                          <td v-text="$t('discount')"></td>
                          <td v-text="$t('percent')"></td>
                          <td v-text="$t('delete')"></td>
                          </thead>
                          <template v-if="item.to_attr.to_options">
                            <tr v-for="(opt,indexs) in item.to_attr.to_options" :key="'optpr'+indexs">
                              <td><span ><label  v-text="opt.name"></label></span>
                                <template  v-if="!item.to_option_value.find(obj => obj.parent == opt.id)" >
                                  | <span @click="addfeatureopt(item.id,opt)" class="icofont-plus-square"></span>
                                </template>


                              </td>
                              <td>
                                <template v-if="item.to_option_value.find(obj => obj.parent == opt.id)">

                                  <span class="icofont-check"></span>
                                </template>
                                <template v-else>
                                  <span class="icofont-not-allowed"></span>
                                </template>
                              </td>
                              <td>
                                <div>
                                  <template  v-if="item.to_option_value.find(obj => obj.parent == opt.id)" >
                                    <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="item.to_option_value.find(obj => obj.parent == opt.id).to_price.price"></VueNumeric> <small v-text="$t('toman')"></small>
                                  </template>
                                </div>
                              </td>
                              <td>
                                <div>
                                  <template  v-if="item.to_option_value.find(obj => obj.parent == opt.id)" >
                                    <VueNumeric  dir="rtl" :read-only="true"  separator="," v-model="item.to_option_value.find(obj => obj.parent == opt.id).to_price.discount"></VueNumeric> <small v-text="$t('toman')"></small>
                                  </template>
                                </div>
                              </td>
                              <td>
                                <div>
                                  <template  v-if="item.to_option_value.find(obj => obj.parent == opt.id)" >
                                    {{ item.to_option_value.find(obj => obj.parent == opt.id).to_price.percent}}
                                  </template>
                                </div>
                              </td>
                              <td>
                                <template  v-if="item.to_option_value.find(obj => obj.parent == opt.id)" >

                                  <span  @click="delitemprice(item.to_option_value.find(obj => obj.parent == opt.id).id)" class="btn btn-sm btn-secondary mr-2  icofont-delete-alt"></span>
                                  <span  @click="edititemprice(item.to_option_value.find(obj => obj.parent == opt.id).to_price)" class="btn btn-sm btn-secondary  mr-2 icofont-edit-alt"></span>
                                </template>
                              </td>
                            </tr>

                          </template>
                        </table>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div id="menu3" class="container tab-pane fade"><br>
                <h3 v-text="$t('feature')"></h3>
                <hr>
                <div class="container">
                  <h3 v-text="$t('youcanuse')"></h3>

                  <div class="row">
                    <template v-if="product.to_group.to_feature">
                      <template v-for="(item,index) in product.to_group.to_feature">
                        <div v-if="!featureselected.includes(item.id)"  @click="addattr(item.id)" :key="'esmai'+index" class="tiss-cursur   m-4">
                          <span class="icofont-plus-square"></span>  <span>{{ item.name }}</span>
                        </div>
                      </template>
                    </template>


                  </div>
                  <hr>
                  <div>
                    <h3 v-text="$t('include')"></h3>
                    <hr>
                    <ul v-if="listporductdetail!=null">
                      <li v-for="(item,index) in listporductdetail" :key="'attr'+index" >
                        <label class="text-success">
                          <span @click="editattr(index)" class="icofont-ui-edit"></span> |
                          <span @click="delattr(item.id)" class="icofont-ui-delete"></span> |
                          <span  v-text="item.to_attr.name"></span></label>
                        <template v-if="item.to_attr.mode==1">
                          <div v-html="item.value" class="box-text"></div>
                        </template>
                        <template v-if="item.to_attr.mode==2">
                          :  <span  v-text="item.value"></span><span v-text="item.unit"></span>
                        </template>
                        <template v-if="item.to_attr.mode==3">
                          :  <span v-if='item.value=="1"' v-text="$t('have')"></span>
                          <span v-if='item.value=="0"' v-text="$t('nothaving')"></span>
                        </template>
                        <template v-if="item.to_attr.mode==4" >
                          <template v-if="item.value!=null">
                            : {{ item.to_attr.to_options.find( obj => obj.id ==item.value).name }}

                          </template>
                        </template>

                      </li>
                    </ul>
                  </div>


                </div>
              </div>
              <div id="review" class="container tab-pane fade"><br>

                <h3 v-text="$t('review')"></h3>
                <p>
                  <tisseditor :key="'esmail'+2" :text="product.review" v-on:myevent="reviewedit"   :mode="'Product'"></tisseditor>
                </p>
                <h3 v-text="$t('description')"></h3>
                <p>
                  <tisseditor   :key="'esmails'+1"  :text="product.description" v-on:myevent="descriptionedit"   :mode="'Product'"></tisseditor>
                </p>
                <h3 v-text="$t('help')"></h3>
                <p>
                  <tisseditor  :key="'esmailso'+4"  :text="product.help" v-on:myevent="helpedit"   :mode="'Product'"></tisseditor>
                </p>
              </div>

            </div>
          </div>
          <div class="col-sm-12">
            <input type="submit" class="btn btn-primary" :value="$t('save')">
          </div>
        </form>

      </template>
    </div>
    <showerror v-if="error!=null" :errors="error"></showerror>
  </div>
</template>

<script>
    import Showerror from "../tools/Showerror";
    import Tisseditor from "../tools/Tisseditor";
    import FileUploader from "../tools/FileUploader";
    import {Money} from 'v-money';
    import VueNumeric from 'vue-numeric';

    export default {
        name: "productdetail",
        components:{
            Showerror,
            Tisseditor,
            FileUploader,
            Money,
          //  VueVueTagsInput,
            VueNumeric
        },
        data() {
            return {

                tags:[],
                tag:'',
                money: {
                    decimal: ',',
                    thousands: '.',
                    prefix: '',
                    suffix: '',
                    precision: 0,
                    masked: false
                },
                taglist:null,
                price:0,
                discount:0,
                mode:'edit',
                listcolor:[],
                pricelist:'',
                group:null,
                attr:[],
                coloredit:null,
                fea:[],
                optionsfea:[],
                optionattr:[],
                error:null,
                listitems:null,
                optionsattr:[],
                imagelist:null,
                editfeature:null,

                product:{
                    id:null,
                    name:null,
                    url:null,
                    parent:null
                },
                status:{
                    0:this.$t('inactive'),
                    1:this.$t('active'),
                    2:this.$t('unavailable'),
                },
                special:{
                    0:this.$t('normal'),
                    1:this.$t('special'),

                },
                booleanarray:{
                    0:this.$t('no'),
                    1:this.$t('yes'),

                },
                booleanhave:{
                    0:this.$t('nothaving'),
                    1:this.$t('have'),

                },
                listporductdetail:null,
                listporductattr:null,
                editprice:null

            }
        },

        watch: {
            product:function (data) {
                let that=this;
              if(data.to_price){
                  data.to_price.filter(function (attr) {
                      if(attr.attr==0){
                          that.price=attr.price;
                          that.discount=attr.discount;
                          that.percent=attr.percent;
                      }
                  })
              }

            }
        },
        computed:{
            featurepriceselected(){
                let marray=[];
                if(this.listporductattr!=null){
                    this.listporductattr.map(function (item){
                        marray.push(item.to_attr.id);
                    });
                }
                return marray;
            },
            featureselected(){
                let marray=[];
                if(this.listporductdetail!=null){
                    this.listporductdetail.map(function (item){
                        console.log(item.to_attr.id);
                        marray.push(item.to_attr.id);
                    });
                }
                return marray;
            },
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
                this.product.to_tag.forEach(function(item){
                    b.push(item.name);
                });
                return b;
            },
        },

        methods:{
            addfeatureopt(parent,myoption){
                let that=this;
                let data={
                    attr:parent,
                    id:myoption.id,
                };
                this.$axios.post(this.$url+'user/popt',data,{
                    headers:{
                        Authorization: localStorage.token
                    }
                }).then(function () {
                    that.loadattrprice();
                })
            },
            colororderup(id){
                let self=this;
                this.$axios.get(this.$url+'user/colororderup/'+id,{
                    headers:{
                        Authorization: localStorage.token
                    }
                }).then(function (res) {
                    self.loadcolor();
                });
            },
            deletecolor(id){
                let self=this;
                this.$axios.delete(this.$url+'user/pcolor/'+id,{
                    headers:{
                        Authorization: localStorage.token
                    }
                }).then(function (res) {
                    self.loadcolor();
                });
            },
            colororderdown(id){
                let self=this;
                this.$axios.get(this.$url+'user/colororderdown/'+id,{
                    headers:{
                        Authorization: localStorage.token
                    }
                }).then(function (res) {
                    self.loadcolor();
                });
            },
            editcolor(id){
                this.coloredit=this.listcolor[id];
                console.log(this.coloredit);
                this.$forceUpdate();  // Notice we have to use a $ here
                this.$modal.show('hello-world');

            },
            addtocolorexist(color){
                let data= {
                    color: color,
                    id: this.product.id
                };
                let that=this;
                this.$axios.post(this.$url+'user/pcolor',data,{
                    headers: {
                        Authorization: localStorage.token
                    }
                }).then(function(res){
                    that.loadcolor();
                })
            },
            loadcolor(){
                let self=this;
                this.$axios.get(this.$url+'user/pcolor/'+this.product.id,{
                    headers:{
                        Authorization: localStorage.token

                    }
                }).then(function (res) {
                    self.listcolor=res.data;
                });

            },
            newpricesubmit(){
                let data={
                    id:this.product.id,
                    price:this.price,
                    discount:this.discount,
                    percent:this.percent,
                    attr:0,
                };
                this.$axios.post(this.$url+'user/pprice',data, {
                    headers: {
                        Authorization: localStorage.token
                    }
                });
            },
            // Attr Controller

            clickoptattr(id,parent,event){

                let data={
                    attr:parent,
                    options:id,
                    product:this.product.id
                };
                if(this.$refs['opt'+id][1]['checked']==true){
                    data.value=1;
                }else{
                    data.value=0;
                }

                this.$axios.post(this.$url+'user/popt',data, {
                    headers: {
                        Authorization: localStorage.token
                    }
                });
            },

            // End Attr Controller
            iamgemanagers(e){
                this.coloredit.image=e;
            },
            savecolor(){
                let that=this;
                this.$axios.put(this.$url+'user/pcolor/'+this.product.id,this.coloredit,{
                    headers:{
                        Authorization: localStorage.token

                    }
                }) .then(function (res) {
                });
            },
            addpicture(e){
                let that=this;
                let data={
                    product:this.product.id,
                    image:e
                }

                this.$axios.post(this.$url+'user/pimage',data,{
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.loadimage();
                })
            },
            masterimg(id){
                let that=this;
                let data={

                };
                this.$axios.put(this.$url+'user/pimage/'+id,data,
                    {
                        headers:{
                            Authorization:localStorage.token
                        }
                    }).then(function (response) {
                    that.loadimage();

                });

            },
            delimage(id){
                let that=this;
                this.$axios.delete(this.$url+'user/pimage/'+id,{
                    headers:{
                        Authorization:localStorage.token

                    }
                }).then(function(res){
                    that.loadimage();
                });
            },
            loadimage(){
                let that=this;

                this.$axios.get(this.$url+'user/pimage',{
                    params:{
                        id:that.product.id
                    },
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.imagelist=res.data;
                })
            },
            reviewedit(e){
                this.product.review=e;
            },
            morecommentedit(e){
                this.product.morecomment=e;
            },
            descriptionedit(e){
                this.product.description=e;
            },
            helpedit(e){
                this.product.help=e;
            },
            featurevalue(e){
                this.editfeature.value=e;
            },
            urlcreate(){
                if(this.product.id==null){
                    let str=this.product.name;
                    this.product.url=str.replace(/#| /g,'_');

                };
            },
            save(){
                let that=this;
                if(this.product.id==null){
                    this.$axios.post(this.$url+'user/pdetail',this.product,{
                        headers: {
                            Authorization:localStorage.token
                        }
                    }).then(function(res){
                        that.mode='edit';
                    })
                        .catch((error) => {
                            that.error = error.response.data.errors;

                        });
                }else{

                }
                if(this.product.id!=null){
                    this.product.tag=JSON.stringify(this.tags);

                    this.$axios.put(this.$url+'user/pdetail/'+this.product.id,this.product,{
                        headers: {
                            Authorization:localStorage.token
                        }
                    }).then(function(res){
                        that.$swal.fire(that.$t('Saved'));
                    })
                        .catch((error) => {
                            that.error = error.response.data.errors;

                        });
                }

            },
            addattr(id){
                let that=this;
                let data={
                    id:id,
                    product:this.product.id,
                    value:null
                }
                this.$axios.post(this.$url+'user/pfeature',data,{
                    headers: {
                        Authorization:localStorage.token
                    }

                })
                    .then(function (res) {
                        that.loadattr();
                    });
            },
            addpriceattr(id){
                let that=this;
                let data={
                    id:id,
                    product:this.product.id,
                    value:null
                }
                this.$axios.post(this.$url+'user/pattr',data,{
                    headers: {
                        Authorization:localStorage.token
                    }

                })
                    .then(function (res) {
                        that.loadattrprice();
                    });
            },
            editattr(index){
                this.editfeature=this.listporductdetail[index];
                this.$modal.show('editfeature');

            },
            delattr(id){
                let that=this;
                this.$axios.delete(this.$url+'user/pfeature/'+id,{
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function (res) {
                    that.loadattr();
                })
            },
            delattrprice(id){
                let that=this;
                this.$axios.delete(this.$url+'user/pattr/'+id,{
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function (res) {
                    that.loadattrprice();
                });
            },
            loadattr(){
                let that=this;
                this.$axios.get(this.$url+'user/pfeature/'+this.product.id,{
                    headers: {
                        Authorization:localStorage.token
                    }

                })
                    .then(function (res) {
                        console.log(res.data);
                        that.listporductdetail=res.data;
                    })
            },
            loadattrprice(){
                let that=this;
                this.$axios.get(this.$url+'user/pattr/'+this.product.id,{
                    headers: {
                        Authorization:localStorage.token
                    }

                })
                    .then(function (res) {
                        that.listporductattr=res.data;
                    })
            },
            edititemprice(price){
                this.editprice=price;
                this.$modal.show('edirprice');

            },
            delitemprice(id){
                let that=this;
                this.$axios.delete(this.$url+'user/popt/'+id,{
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function (red) {
                    that.loadattrprice();
                })
            },
            savepriceattr(){
                let that=this;
                this.$axios.put(this.$url+'user/pprice/'+this.editprice.id,this.editprice,{
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function (res) {
                    that.$modal.hide('edirprice');

                })
            },
            savevaluefeature(){
                let that=this;
                this.$axios.put(this.$url+'user/pfeature/'+this.editfeature.id,this.editfeature,{
                    headers: {
                        Authorization:localStorage.token
                    }

                }).then(function (res) {
                    that.loadattr();
                    that.$modal.hide('editfeature');
                })
            },
            resetform(){
                this.product={
                    id:null,
                    name:null,
                    url:null,
                    parent:null
                }
                this.price=null;
                this.discount=null;
                this.percent=null;
            },
            add(){
                this.resetform();
                this.mode='edit';

            },
            edit(id){
                let that=this;
                this.$axios.get(this.$url+'user/pdetail/'+id,{
                    headers: {
                        Authorization:localStorage.token
                    }

                }).then(function(res){
                    that.product=res.data;
                    that.imagelist=res.data.to_image;
                    that.tags=that.taggenerator;

                    that.mode='edit';
                    /**/
                });
            },

            listgroup(){

                let that=this;
                this.$axios.get(this.$url+'user/Tag',{
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.taglist=res.data;
                });
                this.$axios.get(this.$url+'user/pgroup/create',{

                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.group=res.data;
                })
                    .catch((error) => {
                        that.error = error.response.data.errors;

                    });
            },
            listproduct(page='1',name='',group=''){
                this.resetform();
                this.mode='list';
                let that=this;
                this.$axios.get(this.$url+'user/pdetail',{
                    params:{
                        page: page,
                        name: name,
                        group: group,
                    },
                    headers: {
                        Authorization:localStorage.token
                    }
                }).then(function(res){
                    that.listitems=res.data;

                })
                    .catch((error) => {
                        that.error = error.response.data.errors;

                    });
            },
        },
        mounted() {
            this.mode='list';
            this.listgroup();
            this.listproduct();

        }
    }
</script>

<style scoped>

  /* The container */
  .mychecker {
    display: block;
    position: relative;
    padding-right: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 20px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    direction: rtl;
  }

  /* Hide the browser's default checkbox */
  .mychecker input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    right: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }

  /* On mouse-over, add a grey background color */
  .mychecker:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .mychecker input:checked ~ .checkmark {
    background-color: #2196F3;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .mychecker input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .mychecker .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .btncolor{
    display:inline-block;width: 10px; height: 10px; overflow: hidden;
    margin-right: 10px;
    margin-left: 10px;
    border-radius: 45px;
  }
  .mylistcolor li{
    list-style: none;
  }
  .tiss-cursur:hover{
    font-weight: bold;
  }
  .box-text{
    border: solid 1px rgba(255, 255, 255, 0.02);
    padding: 15px;
    margin-top: 5px;
    border-radius: 45px;

  }
</style>
