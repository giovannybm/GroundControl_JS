<template>

  <v-container grid-list-md >

    <v-layout row wrap pa-2>

      <v-btn color="primary" @click="updatePath">/</v-btn>
      <v-btn color="primary" @click="joinPath('..')">..</v-btn>

    </v-layout>

    <v-layout row wrap pa-2>
      <v-text-field
      v-bind:value="dirPath"
      @change="dirPath=$event"
      label="Regular"
      ></v-text-field>
    </v-layout>
    <v-layout row wrap>

      <v-flex  v-if="listDir" v-for="i in listDir" sm4 md3 xl2 :key="`${i.name}`">
        <v-hover>
          <v-card
          slot-scope="{ hover }"
          :color="`${hover ? 'grey' : 'transparent'}`"
          ripple
          href="#"
          flat
          @click.native="joinPath(i.isDirectory() ? `${i.name}` : '')">




          <v-layout row wrap>

            <v-flex xs2>
              <v-icon large v-text="i.isFile() ? 'mdi-file' : 'mdi-folder'"></v-icon>
            </v-flex>

            <v-flex xs9 class="text-truncate">
              {{i.name}}
              <!-- <div>Folder: {{i.isDirectory()}}</div>
              <div>File: {{i.isFile()}}</div>
              <div>Character Device: {{i.isCharacterDevice()}}</div>
              <div>Block Device: {{i.isBlockDevice()}}</div>
              <div>FIFO: {{i.isFIFO()}}</div>
              <div>Socket: {{i.isSocket()}}</div>
              <div>SL: {{i.isSymbolicLink()}}</div> -->
            </v-flex>

          </v-layout>

        </v-card>
      </v-hover>
    </v-flex>
  </v-data-iterator>

</v-layout>

</v-container>

</template>
<script>
import readdir from 'fs-readdir-with-file-types'
import path from 'path'
import * as _ from 'lodash'

export default {
  data: ()=>({
    sortDir:false,
    dirPath:'/',
    dataList:[]
  }),
  computed:{
    listDir:{
      get: function () {
        return _.orderBy(this.dataList,[(i)=> i.isDirectory() ],['desc'])
      },
      set: function () {
      }
    }
  },
  methods:{
    evalFileType:()=>{
      return new Promise((resolve, reject)=>{
        setTimeout(function(){
          resolve("¡Éxito!");
        }, 250);
      })},
      returnTest:function(e){
        console.log(e);
      },

      updatePath:function(){
        this.dirPath='/'

      },
      joinPath: function(e){
        this.dirPath = path.join(this.dirPath,e)

      }
    },
    watch:{
      dirPath: function(){
        readdir(this.dirPath)
        .then((e)=>{
          this.dataList=e

        })
      }
    },
    mounted(){

      this.dirPath=process.resourcesPath

    }
  }
  </script>
  <style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
  }
  </style>
