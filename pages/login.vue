<template>
  <div>
    <div class="loginbox animated ">
      <div class="lheader w-100">
        <img :src="$storage+'asset/icon/registerbanner.jpg'"  width="100%" >
      </div>
      <div class="ilogininput text-center w-100 pt-4" >
        <form @submit.prevent="save">
          <div class="text-center">
            <h4 v-text='$t("loginmember")'></h4>
            <hr>
          </div>
          <div class="form-group text-center " >
            <label v-text="$t('phone')"></label>
            <div class="input-container">
              <i class="icofont-phone-circle icofont-2x icon"></i>
              <input aria-activedescendant="phoneHelp" class="input-field text-center" v-model="user.email"  type="text" placeholder="09XXXXXXXXX" >
            </div>
            <small v-if="error" id="phoneHelp" class="form-text text-muted">
              <span v-if="error.email" v-text="$t(error.email[0])" ></span>
            </small>


          </div>
          <div class="form-group text-center " >
            <label v-text="$t('password')"></label>
            <div class="input-container">
              <i v-if="type=='password'" @click="type='text'" :title="$t('showpassword')" class="icofont-eye icofont-2x icon"></i>
              <i v-if="type=='text'" @click="type='password'"  :title="$t('hidepassword')"  class="icofont-eye-blocked icofont-2x icon"></i>
              <input aria-activedescendant="passwordHelp" class="input-field text-center"  v-model="user.password"  :type="type" placeholder="*******" name="email">
            </div>
            <small v-if="error" id="passwordHelp" class="form-text text-muted">
              <span v-if="error.password" v-text="$t(error.password[0])" ></span>
            </small>

          </div>

          <input type="submit" class="btn btn-yellow mt-4" :value="$t('Login')">
        </form>
        <div class="mt-4">
          <a href="/register" class="mt-5" style="font-size: 14px;" v-html="$t('register')"></a>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name:'Login',
        data() {
            return {
                token:null,
                user:{
                    email:null,
                    password:null
                },
                error:null,
                type:'password'
            }
        },
        watch: {
            token(newName) {

                localStorage.token ='Bearer '+newName;
                if(localStorage.token){
                    this.$router.push({name: 'profile'});
                }
            }
        },
        methods:{
            save(){
                let that=this;
                this.$axios.post(this.$url+'loginuser',this.user)
                    .then(function (response) {
                        that.token=response.data.data.token;
                    } ) .catch((error) => {
                    console.log(error.data);
                });
            },

        },
        mounted() {
            if(localStorage.token){
                $nuxt.$router.push({name: 'profile'});
            }
        }

    }
</script>

<style>
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
