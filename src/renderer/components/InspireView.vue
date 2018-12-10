<template>
  <v-layout  height="300px" ref="wrap" column justify-center>
    <v-flex>
      <v-card height="600px">
        <v-card-text ref="drawing">

    </v-card-text>
    </v-card>
    </v-flex>

  </v-layout>
</template>
<script>
import * as gcode2svg from 'gcode2svg'
import * as serial from 'serialport'
import * as svglib from 'svg.js'
import * as panZoom from 'svg.panzoom.js'

// var draw = svglib('drawing').size(300, 130)
//
// var polygon = draw.polygon('50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40')
// polygon.fill('#f06').move(20, 20)
export default {
  computed:{
    openPort: function() {
      return  serial(this.$store.state.Connection.selectedPort)
    }
    },
    methods:{
      closeSerial(){
        console.log(serial(this.$store.state.Connection.selectedPort));
      },
      draw(){
        const draw = svglib(this.$refs.drawing).size(this.$refs.wrap.clientWidth, this.$refs.wrap.clientHeight).panZoom({zoomMin: 0.5, zoomMax: 20})

    var pattern = draw.pattern(2, 2, function(add) {
      // add.rect(20,20).fill('#f06')
      add.line(0, 0, 0, 20).stroke({ width: .5 })
      add.line(0, 0, 20, 0).stroke({ width: .5 })
      // add.rect(10,10).move(10,10).fill('#fff')
    })
    draw.polygon('0,0 100,0 100,100 0,100 0,0').fill('none').stroke({ width: 1 }).move(20, 20)
    draw.rect(100, 100).move(20, 20).radius(0).fill(pattern)
      }
    },
    mounted: function(){
this.draw()
console.log(this.$refs.wrap.clientWidth);
console.log(this.$refs.wrap.clientHeight);
    }


}
</script>
<style scoped>
  img {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
</style>
