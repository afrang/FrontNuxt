<template>
<div class="p-4 text-right" dir="rtl">
  <form @submit.prevent="addaddress">
  <div class="row">

      <div class="col-sm-6 col-xs-12">
        <template v-if="liststate!=null">
          <label v-text="$t('selectyourstate')"></label>
          <v-select :key="1" v-on:input="changecitylist" dir="rtl" v-model="state"  :options="liststate"  label="name">

          </v-select>
        </template>
      </div>
      <div class="col-sm-6 col-xs-12">
        <template v-if="listcounty!=null">
          <label v-text="$t('countyselect')"></label>
          <v-select :key="2" v-on:input="changecounty" dir="rtl" v-model="county"  :options="listcounty"  label="name">

          </v-select>
        </template>

      </div>
      <div class="col-sm-6 col-xs-12">
        <template v-if="listcity!=null">
          <label v-text="$t('cityselect')"></label>
          <v-select :key="2"  dir="rtl" v-model="data.city"  :options="listcity"  label="name">

          </v-select>
        </template>
      </div>
      <template v-if='data.city!=null' >
        <div class="col-sm-12 form-group">
          <label v-text="$t('address')"></label>
          <textarea  class="form-control" v-model="data.address"></textarea>

          <small v-if="errors.address" class="form-text text-muted" v-text="errors.address"> </small>

        </div>

        <div class="col-sm-6 form-group">
          <label v-text="$t('plaquenumber')"></label>
          <input  class="form-control" v-model="data.no">
          <small v-if="errors.no" class="form-text text-muted" v-text="errors.no"> </small>

        </div>
        <div class="col-sm-12 form-group">
          <a @click="itsme" class="btn btn-primary btn-sm text-white" v-text="$t('Therecipientofmyorder')"></a>
        </div>
        <div class="col-sm-6 form-group">
          <label v-text="$t('postalcode')"></label>
          <input  class="form-control" :readonly="checkaddress" v-model="data.postalcode" placeholder="*****-*****">
        </div>
        <div class="col-sm-12 form-group">
          <label v-text="$t('name')"></label>
          <input  class="form-control" :readonly="checkaddress" v-model="data.name" placeholder="">
          <small v-if="errors.name" class="form-text text-muted" v-text="errors.name"> </small>

        </div>
        <div class="col-sm-12 form-group">
          <label v-text="$t('family')"></label>
          <input  class="form-control" :readonly="checkaddress" v-model="data.family" placeholder="">
          <small v-if="errors.family" class="form-text text-muted" v-text="errors.family"> </small>

        </div>

        <div class="col-sm-6 form-group">
          <label v-text="$t('mobile')"></label>
          <input  class="form-control" :readonly="checkaddress" v-model="data.mobile" placeholder="">
          <small v-if="errors.mobile" class="form-text text-muted" v-text="errors.mobile"> </small>

        </div>
        <div class="col-sm-6 form-group">
          <label v-text="$t('phone')"></label>
          <input  class="form-control" :readonly="checkaddress" v-model="data.phone" placeholder="">
          <small v-if="errors.phone" class="form-text text-muted" v-text="errors.phone"> </small>

        </div>
        <input type="submit" class="btn btn-primary btn-sm" :value="$t('save')">
      </template>



  </div>
  </form>
</div>
</template>

<script>
    export default {
        name: "editaddress",
        data(){
            return{
                checkaddress:false,
                liststate:null,
                listcounty:null,
                listcity:null,
                state:null,
                county:null,
                errors: [],

                data:{
                    city:null,
                    address:null,
                    no:null,
                    name:null,
                    family:null,
                    postalcode:null,
                    mobile:null,
                    phone:null,
                },
                userinfo:null
            }
        },

        methods:{
            itsme(){
              this.data.name=this.userinfo.name;
              this.data.mobile=this.userinfo.phone;
              this.data.phone=this.userinfo.mobile;
              this.data.family=this.userinfo.lastname;
            },
            getstate(){
                let that=this;

                this.$axios.post(this.$url+'statelist',null,
                    {
                        headers:{
                            Authorization:localStorage.token
                        }
                    })
                    .then(function (response) {
                        that.liststate=response.data;
                    })
            },
            changecounty(){
                let that=this;

                this.$axios.post(this.$url+'citylist',this.county,
                    {
                        headers:{
                            Authorization:localStorage.token
                        }
                    })
                    .then(function (response) {
                        that.listcity=response.data;
                        that.$forceUpdate();
                    })
            },
            loadprofile(){
                let that=this;
                this.$axios.get(this.$url+'user/profile',{headers:{Authorization:localStorage.token}})
                    .then(function (res) {
                            that.userinfo=res.data;
                        }
                    )

            },
            checkForm: function () {
                this.errors=new Object();
                if (!this.data.name) {
                    this.errors.name=this.$t("Namerequired");
                }
                if (!this.data.address) {
                    this.errors.address=this.$t("Addressrequired");
                }
                if (!this.data.city) {
                    this.errors.city=this.$t("cityrequired");
                }
               if (!this.data.no) {
                    this.errors.no=this.$t("norequired");
                }
               if (!this.data.postalcode) {
                    this.errors.postalcode=this.$t("postalcoderequired");
                }
               if (!this.data.phone) {
                    this.errors.phone=this.$t("phonerequired");
                }
               if (!this.data.mobile) {
                    this.errors.mobile=this.$t("mobilerequired");
                }

                if (!this.errors.length) {
                    return true;
                }
            },

                addaddress(){
                if(this.checkForm()){
                    let self=this;
                    self.$axios.post(this.$url+'Profile/AddressController',this.data,{
                        headers:{
                            Authorization:localStorage.token

                        }
                    })
                        .then(function (res) {
                            self.$emit('myevent', res.data.id);
                            }
                        )
                }

            },
            changecitylist(){
                let that=this;

                this.$axios.post(this.$url+'countylist',this.state,
                    {
                        headers:{
                            Authorization:localStorage.token
                        }
                    })
                    .then(function (response) {
                        that.listcounty=response.data;
                        that.$forceUpdate();
                    })
            },
        },
        mounted() {
            this.getstate();
            this.loadprofile();
        }
    }
</script>

<style scoped>

</style>
