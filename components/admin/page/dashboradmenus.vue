<template>
  <div>
    <div class="row" >
      <div class="col-sm-11 row">
        <widgets  v-for="(item,index) in $parent.menu" :key="index" :menu="item" class="col-sm-3"></widgets>
      </div>
      <hr>



    </div>
  </div>

</template>

<script>
    import widgets from "../tools/widgets";
    export default {
        name: "dashboradmenus",
        components: {
            widgets},

    }
</script>

<style scoped>

</style>
