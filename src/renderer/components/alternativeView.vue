<template>
  <v-layout row wrap justify-center id="wrapper">


    <v-flex xs12 md4  class="text-xs-center ">
      <v-card>
        <v-card-text>
          <v-select
          
          v-model="selectPort"
          :items="$store.state.Connection.listPorts"
          item-text="comName"
          :label="$t('connection.portSelect')"
          :no-data-text="$t('connection.portListEmpty')"
          >

        </v-select>
        <v-btn @click="getPorts" color="primary">get port</v-btn>
        <v-btn @click="connectSerial" color="warning">connect port</v-btn>
        <v-btn @click="closeSerial" color="warning">disconnect port</v-btn>
        <v-btn @click="writeSerial" color="warning">write to port</v-btn>
        <p> {{ $store.state.Connection.selectedPort }}</p>
        <p> {{  }}</p>
      </v-card-text>
    </v-card>


  </v-flex>

  <v-flex xs12 md4  class="text-xs-center ">
    <v-card>
      <v-card-text>
        <v-select
        v-model="selectPort"
        :items="$store.state.Connection.listPorts"
        item-text="comName"
        :label="$t('connection.portSelect')"
        :no-data-text="$t('connection.portListEmpty')"
        >

      </v-select>
      <v-btn @click="getPorts" color="primary">get port</v-btn>
      <v-btn @click="connectSerial" color="warning">connect port</v-btn>
      <v-btn @click="closeSerial" color="warning">disconnect port</v-btn>
      <v-btn @click="writeSerial" color="warning">write to port</v-btn>
      <p> {{ $store.state.Connection.selectedPort }}</p>
      <p> {{  }}</p>
    </v-card-text>
  </v-card>


</v-flex>
</v-layout>
</template>

<script>



import { mapGetters, mapActions, mapMutations } from 'vuex'
import * as serial from 'serialport'
import Readline from '@serialport/parser-readline'

export default {

  data:()=>({

  }),
  computed:{
    locales(){
      const local =[]
      for (const i in this.$i18n.messages){
        local.push(i)
      }
      return local
    },
    ...mapActions('Connection',[]),
    selectPort: {
      get(){
        return this.$store.state.Connection.selectedPort
      },
      set(value){
        this.$store.commit('Connection/selectPort', value);
      }
    },
    ...mapGetters('Connection',[
      'assignPort'
    ]),
  },
  methods: {
    ...mapActions('Connection',[
      'getPorts'
    ]),

    connectSerial(){
      let _this=this

      const parser =  _this.assignPort.pipe(new Readline({ delimiter: '\r\n' }))

      _this.assignPort.open(function (err) {
        if (err) {
          return console.log('Error opening port: ', err.message)
        }
      })

      parser.on('data',(data)=>{ console.log(data.toString())})
      // parser.on('data',(data)=>{ console.log('data ', data)})
    },
    closeSerial(){
      this.assignPort.close()
    },
    writeSerial(){
      this.assignPort.write('$$\r\n',(err)=>{
        console.log(err);
      })
    }
  },
  watch:{
  }
}
</script>

<style scoped>

</style>
