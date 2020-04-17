<template>
  <div class="tissbreadcarump">

    <ul>
      <li><span class="icofont-home"></span> {{ $t('dashboard')}} <span class="text-danger">/</span></li>
      <li class="activeed">fdf <span class="icofont-slashdot"></span></li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "breadcrump"
    }
</script>

<style scoped>
  .tissbreadcarump{
    position: fixed;
    z-index: 3;
    transform: rotate(90deg);
    top: 200px;
    right:-40px;

  }
  .tissbreadcarump ul li{ float: left;
    margin-right: 20px;

    list-style: none;

  }
  .activeed{
    color:blue;
  }

</style>
