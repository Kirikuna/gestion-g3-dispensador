<template>
  <div>
    <v-row>
      <v-col cols='12' v-for='building in buildings' :key='building' md='4' sm='6'>
        <building-card :building='building' />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default',
  data: () => {
    return {
      buildings: [
        {
          name: 'Edificio Verde',
          color: '#2abf4d',
          rooms: [
            {
              name: 'Laboratorio 1',
              available: true,
            },
            {
              name: 'Laboratorio 2',
              available: false,
            },
          ],
        },
        {
          name: 'Edificio Naranjo',
          color: '#F57127',
          rooms: [
            {
              name: 'Sala 21',
              available: false,
            },
            {
              name: 'Sala 22',
              available: true,
            },
          ],
        },
        {
          name: 'Edificio Rojo',
          color: '#FA5151',
          rooms: [
            {
              name: 'Sala E1',
              available: true,
            },
            {
              name: 'Sala E2',
              available: false,
            },
          ],
        },
      ],
    };
  },
};
</script>
