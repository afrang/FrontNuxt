<template>
  <div class="container pt-5 ">
    <div class="text-right wmaster dir-rtl text-right">
      <h4 @click="loaditem" v-text="$t('colormanager')"></h4>
      <hr>
      <a @click="additem" class="btn btn-dark"><span class="icofont-ui-add text-white"></span></a>
      <div class="mt-4">
        <form @submit.prevent="save" class="text-center" dir="rtl">
          <div class="row">
            <div class="col-sm-3">
              <label v-text="$t('name')"></label>  <input class="form-control" v-model="color.name" type="text">

            </div>
            <div class="col-sm-3">
              <label v-text="$t('color')"></label>  <input   class="form-control" v-model="color.code" type="color">

            </div>
            <div class="text-center mt-2  col-sm-3">
              <input type="submit" class="btn btn-success mt-4" :value="myevent">
            </div>
          </div>
        </form>
      </div>
      <Showerror v-if="error!=null"  :errors="error"></Showerror>

      <div class="mt-4" v-if="list!=null">
                <span v-for="(item,index) in list" :key="index" class="badge badge-secondary p-3 tiss-cursur mr-1" :style="{
                    'background-color':item.code +' !important'
                }" >
                    <span v-text="item.name"></span> |
                    <span class="icofont-edit " @click="edit(index)"></span> |
                    <span class="icofont-delete-alt" @click="del(item.id)"></span>
                </span>

      </div>
    </div>


  </div>
</template>

<script>
    import Showerror from "../tools/Showerror";
    export default {
        components: {Showerror},
        component:{
            Showerror
        },
        name: "color",
        data(){
            return{
                error:null,
                color:{
                    id:null,
                    code:null,
                    name:null,
                    pattern:null
                },
                list:null,
                myevent:this.$t('Add')
            }
        },
        methods:{
            additem(){
                this.resetitem();
            },
            edit(x){
                this.color=this.list[x];
                this.myevent=this.$t('edit')
            },
            del(item){
                let that=this;
                this.$axios.delete(this.$url+'user/color/'+item,{
                    headers:{
                        Authorization:localStorage.token
                    }
                }) .then(function (res) {
                    that.loaditem();
                })
            },
            resetitem(){
                this.color={
                    id:null,
                    color:null,
                    name:null,
                    pattern:null
                };
                this.myevent=this.$t('Add');
            },
            loaditem(){
                let that=this;
                this.$axios.get(this.$url+'user/color',{ headers:{Authorization:localStorage.token}})
                    .then(function (res) {
                        that.list=res.data;
                    })
            },
            save(){
                let that=this;
                if(this.color.id==null){
                    this.$axios.post(this.$url+'user/color',this.color,{
                        headers:{
                            Authorization:localStorage.token
                        }
                    })
                        .then(function (response) {
                            that.resetitem();
                            that.loaditem();
                        }) .catch((error) => {
                        that.error = error.response.data.errors;
                    });
                }else{
                    this.$axios.put(this.$url+'user/color/'+this.color.id,this.color,{
                        headers:{
                            Authorization:localStorage.token
                        }
                    })
                        .then(function (response) {
                            that.resetitem();
                            that.loaditem();
                        }) .catch((error) => {
                        that.error = error.response.data.errors;
                    });
                }

            }
        },
        mounted() {
            this.loaditem();
        }
    }
</script>

<style scoped>

</style>
