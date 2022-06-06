<template>
  <div
    v-show='loading'
  >
    <select-problem :nameRoom='classroom' :nameBuilding='$route.query.bName' :colorBuilding='$route.query.bColor' @selectedProblem='selected' />
  </div>
</template>

<script>
import SelectProblem from '~/components/reports/select-problem';
export default {
  name: 'reportar',
  components: { SelectProblem },
  data() {
    return {
      classroom: null,
      loading: false,
    }
  },
  methods:{
    async selected(data) {
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
  }
};
</script>

<style scoped>

</style>
