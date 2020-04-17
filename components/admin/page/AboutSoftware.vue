<template>
  <div dir="rtl">

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#dashborad">Home</a></li>
        <li class="breadcrumb-item active"  aria-current="page">AboutUs</li>
      </ol>
    </nav>
    <div class="boxinformation  jumbotron jumbotron-fluid" >
      <h4>About Us</h4>
      <div class="row">
        <div class="col-sm-2 col-xs-6">
          <img src="~/assets/asset/admin/afrangdev.png" width="70%">
        </div>
        <div class="col-sm-2 col-xs-6">
          <img src="~/assets/asset/admin/tiss.png" width="70%">
        </div>
        <div class="col-sm-2 col-xs-6">
          <img src="~/assets/asset/admin/tissengine.png" width="70%">
        </div>
      </div>
      <hr>
      <div class="abouttext">
        <h5>Tiss Engine 2</h5>
        <p>© 2001-2020 AfrangArt. All right reserved.</p>
        <p>AfrangrArt, the AfrangArt and  Tiss Engine either registered trad marks or tarnarjes of Afrang.dev </p>
        <p>Created With Laravel , VueJs, PHP </p>
        <p>Graphic and Programming: Esmail Poryosef</p>
        <p>Email: info@afrangart.com </p>
        <p>Website:  www.afrangart.com  www.afrang.dev</p>
        <p>Support Call: +98(912)7689580</p>
      </div>


    </div>
  </div>
</template>

<script>
    export default {
        name: "AboutSoftware"
    }
</script>

<style scoped>
  .boxinformation h4{
    font-size: 120px;
    position: absolute;
    font-weight: bold;
    color:#E4E5EA;;
    margin-top: -120px;
    margin-left: -80px;
  }
  .boxinformation{
    margin-top: 100px;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    border: solid 1px #eee;
    padding: 3%;

  }
  .abouttext p{
    font-size: 14px;
    line-height: 10px;
  }
  .abouttext h5{
    margin-top: 40px;
    margin-bottom: 30px;
    color: orange;
  }

</style>
