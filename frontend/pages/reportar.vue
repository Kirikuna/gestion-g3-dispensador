<template>
  <div
    v-if='show'
  >
    <select-problem :nameRoom='classroom' :nameBuilding='$route.query.bName' :colorBuilding='$route.query.bColor' @selectedProblem='selected' />
  </div>
  <div
    v-else-if='otherProblem'
  >
      <other-problem :nameRoom='classroom' :nameBuilding='$route.query.bName' :colorBuilding='$route.query.bColor' @otherProblem='problem'/>
  </div>
  <div
    v-else
  >
    <h1>Información no encontrada</h1>
  </div>
</template>

<script>
import SelectProblem from '~/components/reports/select-problem';
import OtherProblem from '~/components/reports/other-problem';
export default {
  name: 'reportar',
  components: { SelectProblem, OtherProblem },
  data() {
    return {
      classroom: null,
      show: true,
      otherProblem: false,
    }
  },
  methods:{
    async selected(data) {
      if (data !== undefined) {
        if (data !== 'Otro problema') {
          await this.$axios.put(`${process.env.NUXT_ENV_BACKEND}/sala/report-sala/${this.$route.query.id}`, {report: data});
          this.$router.push({name: "index"});
        } else {
          this.otherProblem = true;
          this.show = false;
          console.log(this.otherProblem);
          console.log(this.show);
        }
      }
    },
    async problem(data) {
      if (data !== undefined) {
        await this.$axios.put(`${process.env.NUXT_ENV_BACKEND}/sala/report-sala/${this.$route.query.id}`, {report: data});
        this.$router.push({name: "index"});
      }
    },
  },
  async mounted() {
    this.loading = false;
    await this.$axios.get(`${process.env.NUXT_ENV_BACKEND}/sala/get-sala/${this.$route.query.id}`)
      .then(data => {
        this.classroom = data.data.data.Name;
      }).catch(e => {
        console.log(e);
      });
    this.loading = true;
  },
  /*async beforeMount() {
    await this.$axios.get(`${process.env.NUXT_ENV_BACKEND}/sala/sala-exists/${this.$route.query.id}`, {edificioName: this.$route.query.bName}).then(data => {
      const mess = data.data.message;
      console.log(data);
      this.show = mess === 'Sala exists';
    })
  }*/
};
</script>

<style scoped>

</style>
