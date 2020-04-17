<template>
  <div>
    <input  v-model="value" class="form-control" v-bind:class="classObject" dir="ltr">
  </div>
</template>

<script>
    export default {
        props:['value'],
        name: "Nationalcode",
        data() {
            return {
                isActive: true,
                error: null,


            }
        },
        computed: {
            classObject: function () {

                if(this.mycode==false){
                    return 'btn-danger';
                }else{
                    return  'btn-success';
                }

            },
            mycode: function () {
                let code = this.value;
                if(code==null) return false;

                var L=code.length;

                if(L<10 || parseInt(code,10)==0) return false;
                code=('0000'+code).substr(L+4-10);
                if(parseInt(code.substr(3,6),10)==0) return false;
                var c=parseInt(code.substr(9,1),10);
                var s=0;
                for(var i=0;i<9;i++)
                    s+=parseInt(code.substr(i,1),10)*(10-i);
                s=s%11;
                return (s<2 && c==s) || (s>=2 && c==(11-s));
                return true;
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
