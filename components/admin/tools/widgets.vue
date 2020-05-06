<template>
  <div  v-if="menu.child" >
    <div :class="'wmaster '+ minimizeclass " :style="bordered">
      <div class="wheader" :style="styleObject" dir="rtl">
        <div class="float-left">
          <span @click="minimize"  v-if="this.minimizeclass!='scale-out-ver-top'" class="icofont-minus"></span>
          <span @click="maximize"  v-if="this.minimizeclass=='scale-out-ver-top'" class="icofont-maximize"></span>
        </div>
        <div  :class="menu.icon + ' headerwicon'"></div>  <span v-text="menu.title"></span>

      </div>
      <div :class="'wnasters '">

        <ul class="wlistapplication">
          <template  v-if="menu.child">
            <li v-for="(item,index) in menu.child" :key="index"  >
              <a :href="item.href" class="wmyhref">
                <span v-text="item.title"></span> <span :class="item.icon"></span>
              </a>

            </li>


          </template>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "widgets",
        props:{
            menu:{
            },
            headcolor: {
                type: String,
                default: 'green'
            }

        },
        methods:{
            minimize(){
                this.minimizeclass= 'scale-out-ver-top';

            },
            maximize(){
                this.minimizeclass= '';

            }
        },
        data(){
            return{

                wmyheader:null,
                minimizeclass:null,
                styleObject: {

                },
                bordered:{

                }
            }
        }

    }
</script>

<style  scoped>
  .wmyhref{
    color:#333;
  }
  .wmyhref:hover{
    color:darkblue;
    text-decoration: none;
    font-weight: bold;;
  }
  .wlistapplication li{
    color:#383d41;
    padding-top: 5px;
    padding-bottom:5px;
  }
  .headerwicon{
    font-size: 100px;
    position: absolute;
    right: 60%;
    top:60px;
    opacity: 0.7;
    color: #9ae0c3;
  }
  .wlistapplication li:hover{
    color:#000;
    cursor: pointer;
  }
  .scale-out-ver-top {
    animation: scale-out-ver-top 1s  forwards	 ;
  }

  .wheader{
    color:#444;
    padding: 7px;
    padding-right: 10px;
    text-align: right;

    border-bottom: solid 1pt #cdcdcd;

  }
  .wnasters{

  }
  .wlistapplication{
    text-align: right;
    padding-right:20px;

    list-style: none;
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 5px;

  }
  .wmaster{
    margin-top: 8px;
    height: 200px;
    background-color: #ffff;
    -webkit-box-shadow: -4px 6px 5px -4px rgba(176,173,176,1);
    -moz-box-shadow: -4px 6px 5px -4px rgba(176,173,176,1);
    box-shadow: -4px 6px 5px -4px rgba(176,173,176,1);
    border-radius: 15px;
    overflow: hidden;

  }

  @keyframes scale-out-ver-top {
    0% {
      height: auto;
    }

    100% {
      height: 40px;
    }
  }

</style>
