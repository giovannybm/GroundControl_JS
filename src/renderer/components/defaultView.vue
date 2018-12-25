<template>
  <v-container fluid  >
    <svg  class="wrapper" ref="draw2" style="z-index:0;">
    </svg>
    <v-layout>
      <v-flex md4 sm6 class="pa-2">
        <v-toolbar
        dense
        floating
        >
        <v-btn @click="getPorts" icon>
          <v-icon color="primary">mdi-refresh</v-icon>
        </v-btn>
        <v-select
        v-model="selectPort"
        :items="$store.state.Connection.listPorts"
        item-text="comName"
        :label="$t('connectionSelector')"
        :no-data-text="$t('connectionSelectorEmpty')"
        >
      </v-select>
      <v-btn icon>
        <v-icon color="primary">my_location</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="primary">more_vert</v-icon>
      </v-btn>
    </v-toolbar>
  </v-flex>
</v-layout>
<v-layout row wrap>
  <v-flex xs12 sm4 md2 sm2>
    <v-card  tile flat color="transparent">
      <v-btn icon large flat>
        <v-icon dark>mdi-arrow-top-left-bold-outline</v-icon>
      </v-btn>
      <v-btn icon large flat>
        <v-icon dark>mdi-arrow-up-bold-outline</v-icon>
      </v-btn>
      <v-btn icon large flat>
        <v-icon dark>mdi-arrow-top-right-bold-outline</v-icon>
      </v-btn>
    </v-card>
  </v-flex>
</v-layout>
<v-layout row wrap>
  <v-flex xs12 sm4 md2 sm2>
    <v-card  tile flat color="transparent">
      <v-btn icon large flat>
        <v-icon dark>mdi-arrow-left-bold-outline</v-icon>
      </v-btn>
      <v-btn icon large flat>
        <v-icon dark>mdi-circle-medium</v-icon>
      </v-btn>
      <v-btn icon large flat>
        <v-icon dark>mdi-arrow-right-bold-outline</v-icon>
      </v-btn>
    </v-card>
  </v-flex>
</v-layout>
<v-layout row wrap>
  <v-flex xs12 sm4 md2 sm2>
    <v-card  tile flat color="transparent">
      <v-btn icon large flat>
        <v-icon dark>mdi-arrow-bottom-left-bold-outline</v-icon>
      </v-btn>
      <v-btn icon large flat>
        <v-icon dark>mdi-arrow-down-bold-outline</v-icon>
      </v-btn>
      <v-btn icon large flat>
        <v-icon dark>mdi-arrow-bottom-right-bold-outline</v-icon>
      </v-btn>
    </v-card>
  </v-flex>
</v-layout>

</v-container>

</template>
<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'

import * as gcode2svg from 'gcode2svg'
import * as serial from 'serialport'
import * as svglib from 'svg.js'
import * as panZoom from 'svg.panzoom.js'

import fs from 'fs'

export default {
  data: () => ({
    svgWidth:null,
    svgHeight:null,
    activeBtn: 1,
    showNav: true
  }),
  computed:{
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
    openPort: function() {
      return  serial(this.$store.state.Connection.selectedPort)
    }
  },
  watch:{

  },
  methods:{
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
    writeSerial(){
      this.assignPort.write('$$\r\n',(err)=>{
        console.log(err);
      })
    },
    closeSerial(){
      this.assignPort.close()
    },
    notification(){
      const notification = {
        title: 'Basic Notification',
        body: 'Short Message Part'
      }
      new window.Notification(notification.title, notification)
    },
    draw() {


      let _this=this
      // const svgPath = fs.readFileSync('./static/Wikipedia_logo.svg')

      // var s = Snap(this.$refs.draw1)
      // // console.log(svgPath.toString());
      // var bigCircle = s.circle(150, 150, 100)

      const draw = new svglib(this.$refs.draw2)
      // .viewbox(0, 0, 250, 250)
      .size("100%", "100%")
      .panZoom({zoomMin: 0.5, zoomMax: 10, zoomFactor: 0.1})

      var pattern = draw.pattern(30, 30, function(add) {
        // add.rect(20,20).fill('#f06')
        add.line(0, 0, 0, 30).stroke({ width: .8, color: _this.$vuetify.theme.primary})
        add.line(0, 0, 30, 0).stroke({ width: .8, color: _this.$vuetify.theme.primary })
        // add.rect(10,10).move(10,10).fill('#fff')
      })
      // draw.polygon('0,0 100,0 100,100 0,100 0,0').fill('none').stroke({ width: 1 }).move(0, 0)
      draw.rect(1000, 600).move(20, 20).radius(0).fill(pattern).stroke({ width: 1, color:_this.$vuetify.theme.primary })
      // draw.svg(svgPath.toString())
    },

    onResize(){
      this.svgWidth=this.$refs.maincard.clientWidth
      this.svgHeight=this.$refs.maincard.clientHeight
      console.log(this.svgWidth);

    }
  },
  mounted: function(){
    // this.onResize()
    this.draw()
    this.getPorts()
    this.notification()
  }


}
</script>
<style scoped>
img {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.wrapper{
  position: absolute;
  left: 0px;
  top: 0px;

}
</style>
