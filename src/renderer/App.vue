<template>

    <v-app>
      <v-navigation-drawer
      v-model="drawer"
      fixed
      dark
      clipped
      app
      width="60"
      >
      <v-list>
          <v-list-tile
            router
            :to="item.to"
            :key="i"
            v-for="(item, i) in items"
            exact
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
</v-list>
    </v-navigation-drawer>
    <v-toolbar  class="window-drag" color="primary" height="32" dark flat app absolute clipped-left>
      <v-toolbar-side-icon class="window-button" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="font-weight-regular subheading">Title {{isMax}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <div class="window-button">
        <v-btn small @click="minimize" icon>
          <v-icon small>mdi-window-minimize</v-icon>
        </v-btn>

        <v-btn small @click="isMax=!isMax" icon>
          <v-icon small v-html="isMax ? 'mdi-window-restore' : 'mdi-window-maximize'"></v-icon>
        </v-btn>

        <v-btn small @click="close" icon>
          <v-icon small>mdi-window-close</v-icon>
        </v-btn>
      </div>

    </v-toolbar>
    <v-content>
      <v-container grid-list-xs,sm,md,lg,xl>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>

</template>

<script>
const pjson = require('../../package.json')
import { mapGetters, mapActions } from 'vuex'
import * as electron from 'electron'


import { remote } from 'electron'

remote.globalShortcut.register('CommandOrControl+Shift+I', () => {
  remote.BrowserWindow.getFocusedWindow().webContents.openDevTools()
})

window.addEventListener('beforeunload', () => {
  remote.globalShortcut.unregisterAll()
})



export default {
  name: 'control_js',
  data: () => ({
    isMax:null,
    clipped: false,
    drawer: true,
    fixed: false,
    items: [
      { icon: 'apps', title: 'Welcome', to: '/' },
      { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: 'Vuetify.js'
  }),
  methods:{
    appversion(){
      console.log(electron.remote.BrowserWindow);
    },
    minimize(){
      electron.remote.getCurrentWindow().minimize()
    },
    close(){
      electron.remote.getCurrentWindow().close()
    }
  },
  watch: {
    isMax:function(){
      if(this.isMax){
        electron.remote.getCurrentWindow().maximize();
      }else {
        electron.remote.getCurrentWindow().restore();
      }
    }
  },
  mounted:function(){
    let _this = this
    _this.isMax = electron.remote.getCurrentWindow().isMaximized();
    electron.remote.getCurrentWindow().addListener('maximize',function(){
      _this.isMax=true
    });
    electron.remote.getCurrentWindow().addListener('unmaximize',function(){
      _this.isMax=false
    });
      // this.$store.dispatch('setSerialport/getPorts')
  }
}
</script>

<style>
/* Global CSS */

::-webkit-scrollbar { display: none; }

body {
  -webkit-user-select: none;
  -webkit-user-drag: none;
}
.window-button{
  -webkit-app-region: no-drag;
}
.window-drag{
  -webkit-app-region: drag;

}

</style>
