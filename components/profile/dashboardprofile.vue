<template>
    <div v-if="user!=null">
      <div class="">
          <div class="mynavbar">
            <div>
              <div class="row myprfilethumpnail">
                <div class=" thumpnailuser col-sm-3">
                  <div class="">
                    <span  class="mypofilethump icofont-user-alt-7"></span>
                    <a  class="noliknblue" :href="menu[0].link"> <span class="icofont-gears icofont-2x"></span></a>
                  </div>
                </div>
                <div class="col-sm-9" >
                  <div >
                    <span v-text="user.name"></span>
                    <span v-text="user.lastname"></span>
                  </div>
                  <div >
                    <span v-text="user.phone"></span>
                  </div>
                </div>
              </div>
            </div>
            <ul>
              <li v-for="item in menu">
                  <a :href="item.link">
                    <span class="myicon" :class="item.icon"></span><span v-text="$t(item.name)"></span>
                  </a>
              </li>
            </ul>
          </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "dashboard",
        data() {
            return {
                user:null,
                menu:{
                    0:{
                        name:'dashboard',
                        link:'/profile',
                        icon:'icofont-dashboard-web'
                    },
                    1:{
                        name:'orders',
                        link:'/profile/orders',
                        icon:'icofont-list'
                    },
                    2:{
                        name:'favlist',
                        link:'/profile/comments',
                        icon:'icofont-heart'
                    },
                    3:{
                        name:'giftcard',
                        link:'/profile/giftard',
                        icon:'icofont-gift'
                    },
                    4:{
                        name:'address',
                        link:'/profile/address',
                        icon:'icofont-location-pin'
                    },
                    5:{
                        name:'profile',
                        link:'/profile/setting',
                        icon:'icofont-location-pin'
                    }
                }
            }
          },
        methods:{

            profileshow(){
                let that=this;

                this.$axios.get(this.$url+'user/profile',{headers:{Authorization:localStorage.token}})
                    .then(function (response) {
                        that.user=response.data;
                        if(response.data.roll!=null){
                            $nuxt.$router.push({name: 'dashboard'});
                        };
                        if(response.data.confrimmobile==0){

                            $nuxt.$router.push({path: 'profile/verify'});
                        }


                    }) .catch((error) => {
                    console.log(error.data);
                });


            },
        },
        mounted() {

            this.profileshow();
        }
    }
</script>
<style scoped>
  .mynavbar{
    background-color: red;

    width: 100%;
    overflow: hidden;
    float: right;
    right: 0px;
    text-align: right;
    border-radius: 0px;
    padding: 0px;
    background: #f9f9f9;

    box-shadow:  -20px -20px 60px #d4d4d4,
    20px 20px 60px #ffffff;
  }
  .mynavbar ul li{
    padding-right: 25px;
    padding-top: 20px;
    padding-bottom: 20px;
    list-style: none;
    direction: rtl;
    width: 100%;


    color: #333333;;
  }
  .mynavbar ul li:hover{
    font-weight: bold;

  }
  .mynavbar li a{
    color: #333333 !important;
    text-decoration: none;

  }
  .mynavbar ul li a span{
    font-size: 16px;
  }
  .mynavbar ul li a .myicon{
    padding-left: 15px;
  }
  .myprfilethumpnail div .mypofilethump{
    font-size: 25px;
    color: #333333;
  }
  .myprfilethumpnail{
    padding-top:25px;;
    direction: rtl;
    padding-right: 40px;
  }

  .mypofilethump{
    border: solid #a3a3a3;
    padding: 10px;
    font-size: 22px;
    color: #ffdd00  !important;
    border-radius: 90%;
    background-color: #a3a3a3;
  }
  .myprfilethumpnail div:nth-child(2) div:nth-child(1) {
    font-weight: bold;
    font-size: 15px;

  }
  .myprfilethumpnail div:nth-child(2) div:nth-child(2) {
    margin-top: -3px;
  }
  .myprfilethumpnail{
    background-color: #ffdd00;
    border-bottom:10px solid #676767;


  }
  .mynavbar div:nth-child(1){
    padding-bottom: 3px;
  }
  .mynavbar{
    height: 800px;
  }
  .noliknblue{
    text-decoration: none;
    color:black;
  }
</style>
