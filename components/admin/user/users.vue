<template>
  <div class="container    pt-5  text-right" dir="rtl">
    <div class="wmaster">
      <h5>{{ $t('Users') }} </h5>
      <hr>
      <div class="mb-4">
        <a @click="mylist" :title="$t('Edit')" class="btn btn-primary  shadow  btn-circle btn-xl btn-ci text-white mr-4" ><span class="icofont-list"></span> </a>
        <a  @click="additem"  :title="$t('Add')"  class="btn btn-success   shadow btn-circle btn-xl  mr-3 text-white " ><span class="icofont-plus"></span> </a>
      </div>
      <template v-if="mode=='additem'">
        <form class="form row" @submit.prevent="saveform">
          <div class="form-group col-sm-6 col-xs-12">
            <label for="name" v-text="$t('name')+'*'"></label>
            <input required type="name" v-model="user.name" class="form-control" :placeholder="$t('name')" id="name">
          </div>
          <div  class="form-group col-sm-6 col-xs-12">
            <label for="lastname" v-text="$t('lastname')+'*'"></label>
            <input required type="text" dir="ltr" v-model="user.lastname" class="form-control" :placeholder="$t('natioanlcode')" id="lastname">
          </div>
          <div class="form-group col-sm-6 col-xs-12">
            <label for="password" v-text="$t('password')"></label>
            <input  type="password" dir="ltr" v-model="password" class="form-control" :placeholder="$t('password')" id="password">
          </div>
          <div class="form-group col-sm-6 col-xs-12">
            <label for="confirmpassword" v-text="$t('confirmpassword')"></label>
            <input  type="password" dir="ltr" v-model="confirmpassword" class="form-control" :placeholder="$t('confirmpassword')" id="confirmpassword">
          </div>


          <div  class="form-group col-sm-6 col-xs-12">
            <label  v-text="$t('gender')"></label>


          </div>

          <div  class="form-group col-sm-6 col-xs-12">
            <label for="email" v-text="$t('Emailaddress')+'*'"></label>
            <input  required type="email" dir="ltr" v-model="user.email" class="form-control" :placeholder="$t('Emailaddress')" id="email">
          </div>

          <div  class="form-group col-sm-6 col-xs-12">
            <label v-text="$t('Province')"></label>
            <v-select dir="rtl" v-model="state"  :options="Province" label="name">

            </v-select>


          </div>

          <div  class="form-group col-sm-6 col-xs-12">

            <label  v-text="$t('city')"></label>
            <template v-if="state!=null">
              <v-select dir="rtl" v-model="user.city"  :options="state.Cities" label="name"></v-select>
            </template>

            <template v-if="state==null">
              <div>
                <mark>{{ $t('pleasefirstselectProvince') }}</mark>

              </div>
            </template>


          </div>

          <div  class="form-group col-sm-6 col-xs-12">
            <label  v-text="$t('mobile')"></label>
            <div dir="ltr">
              <VuePhoneNumberInput    @update="updatePhoneNumber" :required="true"  v-model="user.mobile" :translations="translations" :default-country-code="'IR'" :only-countries="['IR']"  />

            </div>

          </div>

          <div  class="form-group col-sm-6 col-xs-12">
            <label  v-text="$t('natioanlcode')"></label>
            <nationalcode ></nationalcode>

          </div>

          <div  class="form-group col-sm-6 col-xs-12">
            <label for="phone" v-text="$t('phone')"></label>
            <input type="text" dir="ltr" v-model="user.phone" class="form-control" :placeholder="$t('phone')" id="phone">
          </div>

          <div  class="form-group col-sm-6 col-xs-12">
            <label for="fax" v-text="$t('fax')"></label>
            <input type="text" dir="ltr" v-model="user.fax" class="form-control" :placeholder="$t('fax')" id="fax">
          </div>

          <div class="form-group col-sm-6 col-xs-12">
            <label  v-text="$t('birthday')"></label>
            <date-picker v-model="user.birthday"></date-picker>
          </div>

          <div class="form-group col-sm-6 col-xs-12">
            <label  v-text="$t('post')"></label>
            <template v-if="rolllist!=null">
              <v-select dir="rtl" v-model="user.roll"  :options="rolllist" label="name"></v-select>
            </template>

          </div>

          <div class="form-group col-12">
            <label for="address" v-text="$t('address')"></label>
            <textarea   v-model="user.address" class="w-100 form-control" :placeholder="$t('address')" id="address"></textarea>
          </div>




          <input type="submit" class="form-control"  :value="$t('submit')">

        </form>
        <showerror v-if="error" :errors="error"></showerror>

      </template>

      <template v-if="mode=='list'">
        <input v-model="search" class="form-control col-sm-6 col-xs-12">
        <table class="table  table-striped">
          <caption>{{ $t('Users') }}</caption>

          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" v-text="$t('name')"></th>
            <th scope="col" v-text="$t('email')"></th>
            <th scope="col" v-text="$t('post')"></th>

            <th scope="col" v-text="$t('mobile')"></th>
            <th  class="text-center" scope="col" v-text="$t('action')"></th>
          </tr>
          </thead>
          <tbody v-if="lists!=null">
          <tr v-for="(item,index) in lists.data"  :key="index">
            <th scope="row" v-text="index+1"></th>
            <td v-text="item.name +' '+item.lastname"></td>
            <td v-text="item.email"></td>
            <td v-text="item.toroll.name"></td>
            <td v-text="item.mobile"></td>
            <td class="text-center" >
              <button  @click="edit(index)" class="btn btn-success icofont-ui-edit"></button>
              <button  @click="del(item.id)" class="btn btn-danger mr-2 icofont-ui-delete"></button>
            </td>
          </tr>

          </tbody>
        </table>
        <template  v-if="lists!=null">
          <paginate
            :page-count="lists.last_page"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickCallback"
            :prev-text="$t('Prev')"
            :next-text="$t('Next')"
            :container-class="'pagination'"
            :page-class="'page-item'">
          </paginate>
        </template>

      </template>

    </div>

  </div>
</template>

<script>
    import Nationalcode from "../../view/tools/Nationalcode.vue";
    import Province from '../../JSON/Province';
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import showerror from "../tools/Showerror";

    export default {
        name: "users",
        components: {
            Nationalcode,
            VuePhoneNumberInput,
            showerror,
        },
        data() {
            return {
                search:null,
                error:null,
                translations:{
                    countrySelectorLabel: this.$t('countrySelectorLabel'),
                    countrySelectorError: this.$t('countrySelectorError'),
                    phoneNumberLabel: this.$t('phoneNumberLabel'),
                    example:this.$t('example')
                },
                mobile:null,
                phone:null,
                state:null,
                confirmpassword:null,
                password:null,
                Province :Province,
                lists: null,
                mode:'list',
                genderlist:
                    [
                        {
                            id:1,
                            name:this.$t('men')
                        }
                        ,
                        {
                            id:2,
                            name:this.$t('woman')
                        }
                    ],
                rolllist:null,
                edit(id){
                    this.resetform();
                    this.user=this.lists.data[id];
                    this.user.roll=this.lists.data[id].toroll;
                    this.state=this.lists.data[id].state;
                    this.mode='additem';

                },
                user:{
                    id:null,
                    name:null,
                    email:null,
                    mobile:null,
                    confrimmobile:null,
                    confrimcode:null,
                    natioanlcode:null,
                    lastname:null,
                    city:null,
                    phone:null,
                    fax:null,
                    address:null,
                    birthday:null,
                    roll:null,
                    gender:null,
                    state:null,

                },

            }
        },
        methods: {
            updatePhoneNumber(data) {
                this.mobile = data.nationalNumber;
            },
            resetform(){
                this.password=null;
                this.password_confirmation=null;
                this.user={
                    id:null,
                    name:null,
                    email:null,
                    mobile:null,
                    confrimmobile:null,
                    confrimcode:null,
                    natioanlcode:null,
                    lastname:null,
                    city:null,
                    phone:null,
                    fax:null,
                    address:null,
                    birthday:null,
                    roll:null,
                    gender:null,
                }
            },
            saveform(){

                let that=this;
                let data=this.user;
                data.password_confirmation=this.confirmpassword;
                data.password=this.password;
                data.mobile=this.mobile;
                data.state=this.state;
                this.error=null;

                if(this.user.id==null){
                    this.$axios.post(this.$url+'user/Users',data,{
                        headers:{
                            Authorization:localStorage.token
                        }
                    }).then(function (res) {
                        that.mylist();
                        that.mode='list';

                    }) .catch((error) => {
                        that.error = error.response.data.errors;
                    });
                }else{
                    this.$axios.put(this.$url+'user/Users/'+data.id,data,{
                        headers:{
                            Authorization:localStorage.token
                        }
                    }).then(function (res) {
                        that.mylist();

                    }) .catch((error) => {
                        that.error = error.response.data.errors;

                    });
                }

            },
            additem(){
                let that=this;
                this.resetform();
                that.mode='additem';

            },
            clickCallback(pageNum){
                this.mylist(pageNum);

            },
            mylist(page=1){
                let that=this;
                this.$axios.get(this.$url+'user/Users',{
                    params: {
                        page: page
                    },
                    headers:{Authorization:localStorage.token}
                })
                    .then(function (response) {
                        console.log(response.data);
                        that.lists = response.data;
                        that.mode='list';

                    });
                this.$axios.get(this.$url+'user/Roles',{headers:{Authorization:localStorage.token}})
                    .then(function (response) {
                        that.rolllist = response.data;

                        that.mode='list';

                    });

            }

        },
        mounted() {
            this.mylist();

        }
    }
</script>

<style scoped>
  .wmaster{
    padding: 25px;
    margin-top: 8px;
    background-color: #ffff;
    -webkit-box-shadow: -4px 6px 5px -4px rgba(176,173,176,1);
    -moz-box-shadow: -4px 6px 5px -4px rgba(176,173,176,1);
    box-shadow: -4px 6px 5px -4px rgba(176,173,176,1);
    border-radius: 15px;
    overflow: hidden;

  }
</style>
