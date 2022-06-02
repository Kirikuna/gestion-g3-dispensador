<template>
  <div>
    <select-problem nameRoom='Sala 22' nameBuilding='Edificio naranjo' colorBuilding='orange' @selectedProblem='selected'></select-problem>
  </div>
</template>

<script>
import SelectProblem from '~/components/reports/select-problem';
export default {
  name: 'reportar',
  components: { SelectProblem },
  methods:{
    selected(data) {
      if (data !== undefined)
        console.log(data);
    },
  }
};
</script>

<style scoped>

</style>
