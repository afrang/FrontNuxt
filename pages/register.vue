<template>
    <div class="l-back">
          <div class="loginbox animated ">
            <div class="lheader w-100">
              <img :src="$storage+'asset/icon/registerbanner.jpg'"  width="100%" >
            </div>
            <div class="ilogininput text-center w-100 pt-4" >
              <form @submit.prevent="save">
                <div class="text-center">
                  <h4 v-text='$t("register")'></h4>
                  <hr>
                </div>
                <div class="form-group text-center " >
                  <label v-text="$t('phone')"></label>
                  <div class="input-container">
                    <i class="icofont-phone-circle icofont-2x icon"></i>
                    <input aria-activedescendant="phoneHelp" class="input-field text-center" v-model="login.phone"  type="text" placeholder="09XXXXXXXXX" >
                  </div>
                  <small v-if="error" id="phoneHelp" class="form-text text-muted">
                    <span v-if="error.phone" v-text="$t(error.phone[0])" ></span>
                  </small>


                </div>
                <div class="form-group text-center " >
                  <label v-text="$t('password')"></label>
                  <div class="input-container">
                    <i v-if="type=='password'" @click="type='text'" :title="$t('showpassword')" class="icofont-eye icofont-2x icon"></i>
                    <i v-if="type=='text'" @click="type='password'"  :title="$t('hidepassword')"  class="icofont-eye-blocked icofont-2x icon"></i>
                    <input aria-activedescendant="passwordHelp" class="input-field text-center"  v-model="login.password"  :type="type" placeholder="*******" name="email">
                    </div>
                  <small v-if="error" id="passwordHelp" class="form-text text-muted">
                    <span v-if="error.password" v-text="$t(error.password[0])" ></span>
                  </small>

                </div>
                <div dir="rtl" style="font-size: 24px;">
                    <span class="icofont-close-circled  tiss-cursur" @click="login.accept=true" v-if="login.accept==false" style="font-size: 18px;"></span>
                    <span class="icofont-check-circled text-success tiss-cursur "  @click="login.accept=false"  v-if="login.accept==true"  style="font-size: 18px;"></span>
                  <a  target="_blank" href="/privacy" v-text="$t('privacy')"></a>

                  <span v-text="$t('and')"></span>
                  <a  target="_blank" href="/privacy" v-text="$t('terms')"></a>
                  <span v-text="$t('IreadtheuseofboomcositeservicesandIagreewithallitscases')"></span>
                </div>
              <input type="submit" class="btn btn-yellow mt-4" :value="$t('Register')">
              </form>
              <span class="mt-4" style="font-size: 20px;" v-html="$t('beforeregistered')"></span>
            </div>
          </div>
    </div>
</template>

<script>

    export default {
        name: "register",
        components:{

        },
        data(){
            return{
                login:{
                    phone:null,
                    password:null,
                    accept:false
                },
                error:null,
                type:'password'

            }
        },
        methods:{
          save() {
              let that=this;
              that.login.password_confirmation=this.login.password;

            this.$axios.post(this.$url+'register',this.login)
                  .then(function (response) {
                      console.log(response);
                  })
                  .catch(error => {
                     console.log(error.response);
                     that.error=error.response.data.errors;
                  })
          }


        },
        head () {
            return {
                title: this.$t('register'),

            }
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
