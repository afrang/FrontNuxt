<template>
  <div>

    <nuxt />
    <v-select  />

  </div>
</template>

<style>
  @import "~/assets/icofont/icofont.min.css";

  html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}


html *{font-family: Samim;}

::-webkit-scrollbar{width:9px}::-webkit-scrollbar-track{background:#cccccc;border-radius:2px}::-webkit-scrollbar-thumb{background:#000000;border-radius:-2px}

/* sign in FORM */
#logreg-forms{
  width:412px;
  margin:10vh auto;
  background-color:#f3f3f3;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
#logreg-forms form {
  width: 100%;
  max-width: 410px;
  padding: 15px;
  margin: auto;
}
#logreg-forms .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
#logreg-forms .form-control:focus { z-index: 2; }
#logreg-forms .form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
#logreg-forms .form-signin input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

#logreg-forms .social-login{
  width:390px;
  margin:0 auto;
  margin-bottom: 14px;
}
#logreg-forms .social-btn{
  font-weight: 100;
  color:white;
  width:190px;
  font-size: 0.9rem;
}

#logreg-forms a{
  display: block;
  padding-top:10px;
  color:lightseagreen;
}

#logreg-form .lines{
  width:200px;
  border:1px solid red;
}


#logreg-forms button[type="submit"]{ margin-top:10px; }

#logreg-forms .facebook-btn{  background-color:#3C589C; }

#logreg-forms .google-btn{ background-color: #DF4B3B; }

#logreg-forms .form-reset, #logreg-forms .form-signup{ display: none; }

#logreg-forms .form-signup .social-btn{ width:210px; }

#logreg-forms .form-signup input { margin-bottom: 2px;}

.form-signup .social-login{
  width:210px !important;
  margin: 0 auto;
}

/* Mobile */

@media screen and (max-width:500px){
  #logreg-forms{
    width:300px;
  }

  #logreg-forms  .social-login{
    width:200px;
    margin:0 auto;
    margin-bottom: 10px;
  }
  #logreg-forms  .social-btn{
    font-size: 1.3rem;
    font-weight: 100;
    color:white;
    width:200px;
    height: 56px;

  }
  #logreg-forms .social-btn:nth-child(1){
    margin-bottom: 5px;
  }
  #logreg-forms .social-btn span{
    display: none;
  }
  #logreg-forms  .facebook-btn:after{
    content:'Facebook';
  }

  #logreg-forms  .google-btn:after{
    content:'Google+';
  }

}
</style>
