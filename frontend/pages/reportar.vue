<template>
  <div>
    <select-problem :nameRoom='classroom' :nameBuilding='$route.query.bName' :colorBuilding='$route.query.bColor' @selectedProblem='selected'></select-problem>
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
    }
  },
  methods:{
    selected(data) {
      if (data !== undefined)
        console.log(data);
    },
  },
  async mounted() {
    await this.$axios.get(`${process.env.NUXT_ENV_BACKEND}/sala/get-sala/${this.$route.query.id}`)
      .then(data => {
        this.classroom = data.data.data.Name;
        console.log(this.classroom);
      }).catch(e => {
        console.log(e);
      });
  }
};
</script>

<style scoped>

</style>
