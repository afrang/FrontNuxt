<template>
  <div>
    <no-ssr>
    <vue-dropzone  @vdropzone-complete="showitem"  ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
    <template v-if="showthump==true">
      <img v-if="file!=null" class="img-thumbnail w-100" :src="$storage+'media/'+this.mode+'/'+this.id+'/thump/'+this.file" >

    </template>
    <template v-if="deletefile==true">
      <span @click="deleteitem" v-if="file!=null" class="icofont-ui-delete tiss-cursur"></span>
    </template>
    </no-ssr>
  </div>

</template>

<script>
    import Dropzone from 'nuxt-dropzone'
    import 'nuxt-dropzone/dropzone.css'
    import NoSSR from 'vue-no-ssr'

    export default {
        name: "FileUploader",
        components: {
            vueDropzone: Dropzone,
            'no-ssr': NoSSR
        },
        props:{
            mode:{
                type:String,
                default: 'Public'
            },
            id:{
                type:Number,
                default: 1
            },
            name:{
                type:String,
                default:'thump'
            },
            file:{
                type:String,
                default:null
            },
            showthump:{
                type:Boolean,
                default:true
            },
            deletefile:{
                type:Boolean,
                default:true
            },
        },
        watch: {
            file:function (val) {
                this.$emit('filename', val);
            }
        },
        computed:{

        },
        data() {
            return {
                dropzoneOptions: {
                    scrollable:true,
                    width:'100%',
                    minWidth:'100%',
                    height:'100%',
                    minHeight:'100%',
                    resizable:true,
                    url: this.$url+'user/fileupload',
                    maxFilesize: 20.0,
                    params:{
                        mode:this.mode,
                        id:this.id,
                        name:this.name,
                        random:this.random
                    },
                    dictDefaultMessage:this.$t('uploadyourfile'),
                    headers: {
                        Authorization: localStorage.token
                    }
                },
            }
        },
        methods: {
            showitem(file) {
                this.$refs.myVueDropzone.removeFile(file);
                console.log(file.xhr.responseText);
                this.file = file.xhr.response;

            },
            deleteitem() {
                let that=this;
                this.$axios.delete(this.$url + 'user/fileupload/' + this.file,
                    {
                        data:{
                            mode:this.mode,
                            id:this.id,
                            file:this.file,
                        },

                        headers: {
                            Authorization: localStorage.token
                        }

                    })
                    .then(function (response) {
                        that.file=null;
                    });

            }
        }

    }
</script>

<style scoped>

</style>
