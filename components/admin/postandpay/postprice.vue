<template>
  <div class=" container  pt-4 text-right " >
    <div class="wmaster">
      <h2 v-text="$t('inovicesetting')"></h2>
      <hr>

    <form @submit.prevent="save" class="form row" dir="rtl">
      <div class="form-group  col-sm-4 col-xs-12">
        <label v-text="$t('minfreepost')"></label>
        <money dir="ltr"  class="form-control" v-model="data.minfreepost" v-bind="money"></money>
      </div>
      <div class="form-group  col-sm-4 col-xs-12">
        <label v-text="$t('postprice')"></label>
        <money dir="ltr"  class="form-control" v-model="data.postprice" v-bind="money"></money>
      </div>
      <div class="form-group  col-sm-4 col-xs-12">
        <label v-text="$t('taxpercent')"></label>|<span class="text-danger">%</span>
        <money dir="ltr"  class="form-control" v-model="data.taxpercent" v-bind="money"></money>
      </div>
      <div class="form-group  col-sm-4 col-xs-12">
        <label v-text="$t('offpercent')"></label>|<span class="text-danger">%</span>
        <input min="0" max="100" class="form-control" type="number" v-model="data.offpercent" >

      </div>
      <div class="form-group  col-sm-4 col-xs-12">
        <label v-text="$t('offweekend')"></label>
        <money dir="ltr"  class="form-control" v-model="data.offweekend" v-bind="money"></money>

      </div>
      <div class="form-group  col-sm-4 col-xs-12">
        <label v-text="$t('fastpostprice')"></label>
        <money dir="ltr"   class="form-control" v-model="data.fastpostprice" v-bind="money"></money>
      </div>
      <div class="form-group  col-sm-12 col-xs-12">
        <label v-text="$t('topdesc')"></label>
        <textarea class="form-control" v-model="data.topdesc"></textarea>
      </div>
      <div class="form-group  col-sm-12 col-xs-12">
        <label v-text="$t('bottomdesc')"></label>
        <textarea class="form-control" v-model="data.bottomdesc"></textarea>
      </div>

      <div class="form-group  col-sm-12 col-xs-12">
        <label v-text="$t('morningtextpost')"></label>
        <textarea class="form-control" v-model="data.morning"></textarea>
      </div>
      <div class="form-group  col-sm-12 col-xs-12">
        <label v-text="$t('afternoontextpost')"></label>
        <textarea class="form-control" v-model="data.afternoom"></textarea>
      </div>
      <div class="form-group  col-sm-12 col-xs-12">
        <input type="submit" class="btn btn-success w-50" :value="$t('save')">
      </div>
    </form>
    </div>
  </div>
</template>

<script>

    import {Money} from 'v-money';
    export default {
        name: "postprice",
        components:{
            Money
        },
        data(){

            return{
                money: {
                    decimal: ',',
                    thousands: '.',
                    prefix: '',
                    suffix: '',
                    precision: 0,
                    masked: false
                },
                data:{
                    minfreepost:0,
                    postprice:0,
                    taxpercent:0,
                    offweekend:0,
                    fastpostprice:0,
                    topdesc:null,
                    bottomdesc:null,

                }
            }
        },
        methods:{
            save(){
              let self=this;
                this.$axios.put(this.$url+'user/deliveryprice/1',self.data,{
                    headers:{
                        Authorization:localStorage.token
                    }
                })                    .then(function (res) {
                        self.$swal.fire(self.$t('Saved'));
                    });
            },
           loaddata(){
               let that=this;
               this.$axios.get(this.$url+'user/deliveryprice/1',{
                   headers:{
                       Authorization:localStorage.token
                   }
               })
                   .then(function (res) {
                       that.data=res.data;

                   })
           }
        },
        mounted() {
            this.loaddata();
        }
    }
</script>

<style scoped>

</style>
