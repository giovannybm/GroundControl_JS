<template>
  <v-layout row wrap justify-center id="wrapper">


    <v-flex xs12 md4  class="text-xs-center ">
      <v-card>
        <v-card-text>
          <v-select
          v-bind:value="$store.state.Connection.selectedPort"
          :items="$store.state.Connection.listPorts"
          item-text="comName"
          label="Standard"

          @change="statechange"
          >


        </v-select>
        <v-btn @click="getPorts" color="primary">get port</v-btn>
        <v-btn @click="connectSerial" color="warning">connect port</v-btn>
        <v-btn @click="closeSerial" color="warning">disconnect port</v-btn>
        <p> {{ $store.state.Connection.selectedPort }}</p>
        <p> {{  }}</p>
      </v-card-text>
    </v-card>

  </v-flex>

  <v-flex >

  </v-flex>
</v-layout>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import * as serial from 'serialport'
export default {

  data:()=>({
    value:{comName:'port serial'}
  }),
  computed:{
    openPort: function() {
      return new serial( this.$store.state.Connection.selectedPort,{
        autoOpen: false,
        baudRate: 57600
      })}
    },
    methods: {
      ...mapActions('Connection',[
        'getPorts',
        'assignPort'
      ]),
      statechange(e){
        this.$store.commit('Connection/selectPort', e)
      },
      connectSerial(){
        // this.$store.commit('Connection/assignPort')
        let _this=this
        _this.openPort.open(function (err) {
          if (err) {
            return console.log('Error opening port: ', err.message)
          }

          // Because there's no callback to write, write errors will be emitted on the port:
          _this.openPort.write('main screen turn on')
        })

        _this.openPort.on('data', function (data) {
          console.log('Data:', data)
        })
      },
      closeSerial(){
        this.openPort.close()
      }
    },
    watch:{
    }
  }
  </script>

  <style scoped>

  {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo
  {
    max-width: 100%;
  }

  .link-btn
  {
    width: 150px;
  }
  </style>
