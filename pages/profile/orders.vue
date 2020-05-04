<template>
  <div>

    <headers></headers>
    <hr>
    <dashboardprofile></dashboardprofile>
    <hr>
    <div class="container">
      <form>

        <div class="row" dir="rtl">
          <div class="form-group col-xs-6 col-sm-3">
            <label><span v-text="$t('PriceMode')"></span></label>
            <select v-model="filtered.payment" class="form-control">
              <option value="0" v-text="$t('All')"></option>
              <option value="1" v-text="$t('Payonthespot')"></option>
              <option value="2" v-text="$t('paymentinoivce')"></option>
            </select>
          </div>
          <div class="form-group col-xs-6 col-sm-3">
            <label><span v-text="$t('invoicenumber')"></span></label>
            <input dir="ltr" v-model="filtered.tracknumber" class="form-control" >
          </div>
          <div class="form-group col-xs-6 col-sm-3">
            <label><span v-text="'..'"></span></label>
            <input type="submit" dir="ltr"  class="btn btn-dark w-100" :value="$t('filtered')" >
          </div>
        </div>
      </form>
      <hr>
      <table class="table table-striped" dir="rtl">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div @click="loadinvoice">FUCK DAY</div>
    <pre>{{ listinvoice }}</pre>

  </div>
</template>

<script>
    import dashboardprofile from "../../components/profile/dashboardprofile";
    import Headers from "../../components/view/template/header";
    import Footers from "../../components/view/template/footer";
    export default {
        name: "orders",
        components:{
            Footers,
            Headers,
            dashboardprofile
        },
        data(){
            return{
                filtered:{
                    payment:null,
                    tracknumber:'BC',
                    page:1,

                },
                listinvoice:[],

            }
        },
        methods:{
            loadinvoice(){
                let self=this;
                this.$axios.get(this.$url+'Profile/invoice',{
                    params:{
                       payment:self.filtered.payment,
                       page:self.filtered.page,
                       tracknumber:self.filtered.tracknumber
                    },
                    headers:{Authorization:localStorage.token}
                }).then(function (res) {
                    self.listinvoice=res.data;
                })

            }
        },
        mounted() {
            this.loadinvoice();
        }
    }
</script>

<style scoped>

</style>
