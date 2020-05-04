<template>
    <div>
      <headers></headers>
      <hr>
      <dashboardprofile></dashboardprofile>
      <hr>

    </div>
</template>

<script>
  import dashboardprofile from "../../components/profile/dashboardprofile";
  import Headers from "../../components/view/template/header";
  import Footers from "../../components/view/template/footer";
    export default {
        name: "index.vue",

        components:{
            Footers,
            Headers,
            dashboardprofile
        }
    }
</script>

<style scoped>
.boxes{
  width: 100%;
  min-height: 100px;
}
</style>
