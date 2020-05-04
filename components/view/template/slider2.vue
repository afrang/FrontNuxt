<template>
  <div>
    <vue-flux
      :options="vfOptions"
      :images="vfImages"
      :transitions="vfTransitions"
      :captions="vfCaptions"
      ref="slider">
      <template v-slot:preloader>
        <flux-preloader />
      </template>

      <template v-if="caption!=false" v-slot:caption>
        <flux-caption />
      </template>

      <template  v-if="controls!=false"  v-slot:controls>
        <flux-controls />
      </template>

      <template  v-if="pagination!=false" v-slot:pagination>
        <flux-pagination />
      </template>

      <template v-if="index!=false" v-slot:index>
        <flux-index />
      </template>
    </vue-flux>

  </div>
</template>

<script>
    import {
        VueFlux,
        FluxCaption,
        FluxControls,
        FluxIndex,
        FluxPagination,
        FluxPreloader
    } from 'vue-flux';
    export default {
        name: "slider2",
        components: {
            VueFlux,
            FluxCaption,
            FluxControls,
            FluxIndex,
            FluxPagination,
            FluxPreloader,
        },
        props:{
            name:{
                type:String,
                default:null

            },
            id:{
                type:String,
                default: null
            },
            caption:{
                type:Boolean,
                default: false
            },
            controls:{
                type:Boolean,
                default: true
            },
            pagination:{
                type:Boolean,
                default: true
            },
            index:{
                type:Boolean,
                default: false
            }
        },
        data: () => ({
            vfOptions: {
                autoplay: true
            },
            vfImages: [ ],
            vfTransitions: [ 'fade', 'cube', 'book' ],
            vfCaptions: [],
            data:null
        }),
        watch:{
            data:function (mydata) {
                let self=this;
                mydata.todetail.map(function (value,key) {
                    self.vfImages.push(self.$storage+'media/gallery/'+value.id+'/orginal/'+value.file);
                    self.vfCaptions.push(value.name);
                });
            }
        },
        methods:{
            loaddata(){
                let that=this;

                this.$axios.get(this.$url+'slider',{
                    params:{
                        url:this.name,
                        id:this.id
                    }
                }).then(function (res) {
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
