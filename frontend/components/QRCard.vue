<template>
  <v-card
    class='mx-auto'
    max-width='344'
  >
    <v-toolbar :color='room.edificiocolor' height='20px'/>

    <v-toolbar height='60%'>
      <v-row>
        <v-col>
          <v-card-title
            class='justify-center d-flex ml-auto mr-auto text-center'
            style='word-break: break-word'
          >

            {{ room.edificioname }}
          </v-card-title>
          <v-card-subtitle
            class='justify-center d-flex ml-auto mr-auto text-center text-h6'
          >
            {{room.salaname}}
          </v-card-subtitle>
        </v-col>
      </v-row>
    </v-toolbar>

    <v-card-text class='pa-0'>
      <QRGeneration :QRroute='{id: room.id, bName: room.edificioname, bColor: room.edificiocolor}' :classRoomName='room.salaname' :showLink='false' />
    </v-card-text>

  </v-card>
</template>

<script>
//TODO: alinear bien el boton de editar
export default {
  props: ['room'],
  data: () => {
    return {};
  },
  methods:{
    objectToParams(object){
      //https://es.stackoverflow.com/questions/132352/como-convertir-un-objeto-en-una-cadena-de-par%C3%A1metros-codificada-para-url
      var pares = Object.entries(object);
      var paresConRepe = [].concat.apply([],pares.map(
          ([key, val])=>(val instanceof Array ? val.map(v=>[`${key}[]`,v]) :
              val && val.toJSON ? [[key, val.toJSON()]] :
              val instanceof Object ? Object.entries(val).map(([k,v])=>[`${key}[${k}]`,v]) :
              [[key, val]]
          )
      ));
      return paresConRepe;
    },
  },
};
</script>

<style scoped>
</style>
