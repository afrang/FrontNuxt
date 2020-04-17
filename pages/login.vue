<template>
  <div>
    <div id="logreg-forms">
      <form class="form-signin" @submit.prevent="loginuser">
        <h1 class="h3 mb-3 font-weight-normal" style="text-align: center">     <h1>{{ $t('signin') }}</h1>
        </h1>

        <input type="text" v-model="user.email" id="inputEmail" class="form-control text-center" :placeholder="$t('Email_or_phone')"  autofocus="">
        <input type="password" v-model="user.password" id="inputPassword" class="form-control text-center" :placeholder="$t('Password')" >

        <button class="btn btn-success btn-block" type="submit"><i class="fas fa-sign-in-alt"></i>  {{ $t('Signin') }} </button>
        <a href="#" id="forgot_pswd" v-text="$t('Forgotpassword')"></a>
        <hr>
        <!-- <p>Don't have an account!</p>  -->
<!--
        <router-link class="btn btn-primary btn-block  text-white"  type="button"  to="register"><i class="fas fa-user-plus"></i> {{ $t('SignupNewAccount') }} </router-link>
-->

      </form>
      <p style="text-align:center">{{ $t('OR') }}   </p>

      <div class="social-login pb-5">

        <button class="btn google-btn social-btn w-100 "  type="button"><span><i class="fab fa-google-plus-g"></i> <span v-text="$t('Sign_in_with_Google')"></span></span> </button>
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
                    email:'afrangart@gmail.com',
                    password:'13660205'
                }
            }
        },
        watch: {
            token(newName) {

                localStorage.token ='Bearer '+newName;
                if(localStorage.token){
                    this.$router.push({name: 'dashboard'});
                }
            }
        },
        methods:{
            loginuser(){
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
                $nuxt.$router.push({name: 'dashboard'});
            }
        }

    }
</script>

<style>

</style>
