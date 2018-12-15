<template>

  <v-layout  row wrap >

    <v-flex xs12 sm12  md9 lg9 xl11 d-flex ref="maincard">

      <!-- <v-card  class="elevation-4"  v-resize="onResize"> -->

        <svg height="50%" width="100%" ref="draw2">

        </svg>

      <!-- </v-card> -->
    </v-flex>
    <v-flex xs12 sm12 md3 lg3 xl2 d-flex>
      <v-card  elevation-0>

      </v-card>
    </v-flex>
  </v-layout>

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
    svgHeight:null
  }),
  computed:{
    openPort: function() {
      return  serial(this.$store.state.Connection.selectedPort)
    },
    ...mapGetters('Connection',[
      'assignPort'
    ]),

  },
  watch:{

  },
  methods:{
    closeSerial(){
      this.assignPort.close()
    },
    draw() {


let _this=this
const svgPath = fs.readFileSync('./static/Wikipedia_logo.svg')

      // var s = Snap(this.$refs.draw1)
      // // console.log(svgPath.toString());
      // var bigCircle = s.circle(150, 150, 100)

      const draw = new svglib(this.$refs.draw2)
      .viewbox(0, 0, 200, 200)
      .size("100%", "50%")
      .panZoom({zoomMin: 0.5, zoomMax: 10})

      var pattern = draw.pattern(4, 4, function(add) {
        // add.rect(20,20).fill('#f06')
        add.line(0, 0, 0, 20).stroke({ width: .5, color: _this.$vuetify.theme.primary})
        add.line(0, 0, 20, 0).stroke({ width: .5, color: _this.$vuetify.theme.primary })
        // add.rect(10,10).move(10,10).fill('#fff')
      })
      // draw.polygon('0,0 100,0 100,100 0,100 0,0').fill('none').stroke({ width: 1 }).move(0, 0)
      draw.rect(200, 105).move(0, 0).radius(0).fill(pattern).stroke({ width: 1, color:_this.$vuetify.theme.primary })
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
console.log(this.$vuetify.theme.primary)
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
  height: 100vh;
  width: 100vw;
}
</style>
