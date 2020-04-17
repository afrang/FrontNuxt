<template>
  <div class="w-100">

    <div v-if="validationErrors" class="w-100">
      <ul class="alert alert-danger text-center list-inline">
        <li class="h-50" v-for="(value, key) in validationErrors" :key="key"><pre>{{ $t(value) }}</pre></li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        computed: {
            validationErrors(){
                let errors = Object.values(this.errors);
                errors = errors.flat();
                return errors;
            }
        },
        name: "Showerror",
        props:['errors']
    }
</script>

<style scoped>

</style>
