<template>
  <div class=" container  pt-4 text-right " >
    <div class=" wmaster "  style="min-height: 500px;" dir="rtl">
      <h2 v-text="$t('cityoption')"></h2>
      <hr>

      <button class="btn btn-primary tiss-cursur" @click="loadlist"><span class="icofont-listing-box"></span> |  <span v-text="$t('listspecialcity')"></span><span></span></button>

      <div class="mt-4" v-if="mode=='add'">
        <div class="row">
          <div class="col-sm-4 col-xs-12">
            <template v-if="liststate!=null">
              <label v-text="$t('selectyourstate')"></label>
              <v-select :key="1" v-on:input="changecitylist" dir="rtl" v-model="savedata.state"  :options="liststate"  label="name">

              </v-select>
            </template>
          </div>
          <div class="col-sm-4 col-xs-12">
            <template v-if="listcounty!=null">
              <label v-text="$t('countyselect')"></label>
              <v-select :key="2" v-on:input="changecounty" dir="rtl" v-model="savedata.county"  :options="listcounty"  label="name">

              </v-select>
            </template>

          </div>
          <div class="col-sm-4 col-xs-12">
            <template v-if="listcity!=null">
              <label v-text="$t('cityselect')"></label>
              <v-select :key="2"  dir="rtl" v-model="savedata.city"  :options="listcity"  label="name">

              </v-select>
            </template>
          </div>
          <div class="col-sm-4 mt-3" v-if="savedata.city!=null" >
            <div class="form-group">
              <label ><span class="icofont-free-delivery icofont-3x" style="font-size: 20px;"></span><span v-text="$t('fastsending')"></span></label>
              <select v-model="savedata.fastsending" class="form-control">
                <option value="1" v-text="$t('true')"></option>
                <option value="0" v-text="$t('false')"></option>
              </select>
            </div>
          </div>
          <div class="col-sm-4 mt-3" v-if="savedata.city!=null" >
            <div class="form-group">
              <label ><span class="icofont-free-delivery icofont-2x" style="font-size: 20px;"></span><span v-text="$t('freedelivery')"></span></label>
              <select v-model="savedata.free" class="form-control">
                <option value="1" v-text="$t('true')"></option>
                <option value="0" v-text="$t('false')"></option>
              </select>
            </div>
          </div>
          <div class="col-sm-4 mt-3" v-if="savedata.city!=null" >
            <input class="btn btn-primary mt-4" @click="addtolist" :value="$t('Add')">
          </div>
        </div>


      </div>
      <hr>
      <table class="table">
        <thead>
          <td>#</td>
          <td v-text="$t('name')"></td>
          <td v-text="$t('city')">d</td>
          <td v-text="$t('county')">d</td>
          <td v-text="$t('fastsending')">d</td>
          <td v-text="$t('freedelivery')"></td>
          <td v-text="$t('delete')"></td>
        </thead>
        <tr v-for="(item,index) in listpost">
          <td v-text="index+1"></td>
          <td v-text="item.to_city.name"></td>
          <td v-text="item.to_city.to_shahrestan.name"></td>
          <td v-text="item.to_city.to_ostan.name"></td>
          <td><template v-if="item.free==1"><span class="icofont-check-circled icofont-3x text-success" style="font-size: 20px;"></span></template></td>
          <td><template v-if="item.fastsending==1"><span class="icofont-check-circled icofont-3x text-success" style="font-size: 20px;"></span></template></td>
          <td @click="del(item.id)"><span class="icofont-ui-delete text-danger tiss-cursur" style="font-size: 20px;" ></span></td>
        </tr>


      </table>
    </div>
    <hr>
  </div>
</template>

<script>

    export default {
        name: "citypost",
        data(){
            return{
                mode:'add',
                listpost:null,
                liststate:null,
                listcounty:null,
                listcity:null,
                savedata:{
                    state:null,
                    county:null,
                    city:null,
                    free:false,
                    fastsending:false

                }
            }
        },

        methods:{
            del(id){
                let that=this;
              this.$axios.delete(this.$url+'user/delivery/'+id,{
                  headers:{
                      Authorization:localStorage.token
                  }
              }) .then(function (response) {
                  that.loadlist();
              })
            },
            loadlist(){
                let that=this;
                this.$axios.get(this.$url+'user/delivery',{
                    headers:{
                        Authorization:localStorage.token
                    }
                })
                    .then(function (response) {
                        that.listpost=response.data;
                    })
            },
            addtolist(){
                let that=this;
                this.$axios.post(this.$url+'user/delivery',this.savedata,{
                    headers:{
                        Authorization:localStorage.token
                    }
                })
                    .then(function (response) {
                        that.loadlist();
                    })
            },
            changecitylist(){
                let that=this;

                this.$axios.post(this.$url+'countylist',this.savedata.state,
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

            changecounty(){
                let that=this;

                this.$axios.post(this.$url+'citylist',this.savedata.county,
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
            }
        },
        mounted() {
            this.getstate();
            this.loadlist();
        }
    }
</script>

<style scoped>

</style>
