<template>
    <div v-if="user!=null">
      <div class="loginbox animated ">
        <div class="lheader w-100">
          <img :src="$storage+'asset/icon/verify.jpg'"  width="100%" >
        </div>
        <div class="ilogininput text-center w-100 pt-4" >
          <template v-if="mode==1">
            <form @submit.prevent="save" dir="rtl">
              <div class="text-center">
                <h4 v-text='$t("verifyyourphone")'></h4>
                <hr>
              </div>
              <div class="form-group text-center " >
                <label v-text="$t('phone')"></label>
                <div class="input-container">
                  <i class="icofont-phone-circle icofont-2x icon"></i>
                  <input  class="input-field text-center" disabled readonly v-model="user.phone"  type="text" placeholder="09XXXXXXXXX" >
                </div>
              </div>
              <div class="form-group text-center " >
                <label v-text="$t('name')"></label>
                <div class="input-container">
                  <i class="icofont-user-alt-1 icofont-2x icon"></i>
                  <input required class="input-field  text-right"  v-model="user.name"  type="text" placeholder="" >
                </div>
              </div>
              <div class="form-group text-center " >
                <label v-text="$t('lastname')"></label>
                <div class="input-container">
                  <i class="icofont-user-alt-1 icofont-2x icon"></i>
                  <input required class="input-field text-right"  v-model="user.lastname"  type="text" placeholder="" >
                </div>
              </div>
              <div class="form-group text-center " >
                <label v-text="$t('verifycode')"></label>
                <div class="input-container">
                  <i class="icofont-mobile-phone icofont-2x icon"></i>
                  <input required class="input-field text-left"  v-model="verifycode"  type="text" placeholder="" >
                </div>
              </div>


              <input type="submit" class="btn btn-yellow mt-4" :value="$t('Accept')">
            </form>
          </template>
          <template v-else-if="mode=2">
            <form @submit.prevent="savenewmobie">
              <div class="text-center">
                <h4 v-text='$t("verifyyourphone")'></h4>
                <hr>
              </div>
              <div class="form-group text-center " >
                <label v-text="$t('currentphone')"></label>
                <div class="input-container">
                  <i class="icofont-phone-circle icofont-2x icon"></i>
                  <input  class="input-field text-center" disabled readonly v-model="user.phone"  type="text" placeholder="" >
                </div>
              </div>
              <div class="form-group text-center " >
                <label v-text="$t('newmobile')"></label>
                <div class="input-container">
                  <i class="icofont-phone-circle icofont-2x icon"></i>
                  <input  class="input-field text-center"  v-model="newmobile"  type="text" placeholder="" >
                </div>
              </div>
              <input type="submit" class="btn btn-yellow mt-4" :value="$t('save')">

            </form>
          </template>

          <div class="mt-4">
            <a v-if="mode==1" @click="mode=2"  class="mt-5" style="font-size: 14px;" v-html="$t('changemobilephone')"></a>
            <a v-if="mode==2"  @click="mode=1" class="mt-5" style="font-size: 14px;" v-html="$t('backtoverify')"></a>

          </div>
        </div>
      </div>
      <pre>{{ error }}</pre>
    </div>
</template>

<script>
    export default {
        name: "completedregister",
        data(){
            return{
                error:null,
                user:{
                    name:null,
                    password:null
                },
                verifycode:null,
                newmobile:null,
                mode:1,


            }
        },
        methods:{
            savenewmobie(){
                let that=this;
                let data={
                    phone:that.newmobile
                };
              this.$axios.put(this.$url+'Profile/phone/'+that.newmobile,data,{
                    headers:{Authorization:localStorage.token}
                }).then(function (respone) {
                    $nuxt.$router.push({name: 'login'});

                }).catch((error) => {
                    that.error=error.response.data.errors;
                });

            },
            save(){
              let that=this;
              let data=this.user;

             data.verifycode=this.verifycode;
              this.$axios.post(this.$url+'Profile/CompletedRegister',data,{
                  headers:{Authorization:localStorage.token}
              })
                  .then(function (respone) {

                  }).catch((error) => {
                  that.error=error.response.data.errors;
              });
            },
            profileshow(){
                let that=this;

                this.$axios.get(this.$url+'user/profile',{headers:{Authorization:localStorage.token}})
                    .then(function (response) {
                        that.user=response.data;
                        if(response.data.roll!=null){
                            $nuxt.$router.push({name: 'dashboard'});
                        }


                    }) .catch((error) => {
                    that.error=error.response.data.errors;
                });


            },
        },
        mounted() {
            this.profileshow();

        }
    }
</script>

<style scoped>
  .loginbox * h4{
    font-size: 25px;
  }
  .l-back{
    text-align: center;


  }
  .l-back * label
  {
    font-size: 16px;
  }
  .loginbox{
    margin-right: auto;
    margin-left: auto;
    width: 30%;


    margin-top: 10em;
    background-color: #ffffff;

    -webkit-box-shadow: -2px 6px 80px -15px rgba(219,219,219,1);
    -moz-box-shadow: -2px 6px 80px -15px rgba(219,219,219,1);
    box-shadow: -2px 6px 80px -15px rgba(219,219,219,1);
    border-radius: 15px;



  }
  * {box-sizing: border-box;}

  /* Style the input container */
  .input-container {
    display: flex;
    width: 100%;
    margin-bottom: 15px;

  }

  /* Style the form icons */
  .icon {
    padding: 10px;
    background: #feff14;
    color: #151515;
    min-width: 50px;
    text-align: center;
  }

  /* Style the input fields */
  .input-field {
    width: 100%;
    padding: 10px;
    outline: none;
  }

  .input-field:focus {
    border: 2px solid dodgerblue;
  }

  /* Set a style for the submit button */
  .btn {
    background-color: dodgerblue;
    color: white;
    padding: 15px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
  }

  .btn:hover {
    opacity: 1;
  }
  .lheader{

    background-color: black;
  }
  .ilogininput{
    padding: 25px;
  }
  .btn-yellow{
    background-color: #333333;
    color: #f2ea1b;
  }
</style>
