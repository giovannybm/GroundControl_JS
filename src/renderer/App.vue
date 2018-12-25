<template >

  <v-app id="inspire" >
    <v-toolbar
    class="window-drag"
    color="primary"
    height="32px"
    flat
    dark
    fixed
    style="z-index:2;"
    >
    <v-toolbar-title class="body-1 font-weight-regular" >Groundcontrol JS v1.0.0</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon small class="window-button" @click="minimize" >
      <v-icon>mdi-window-minimize</v-icon>
    </v-btn>

    <v-btn icon small class="window-button" @click="isMax=!isMax">
      <v-icon  v-html="isMax ? 'mdi-window-restore' : 'mdi-window-maximize'">mdi-window-close</v-icon>
    </v-btn>

    <v-btn icon small class="window-button" @click="close">
      <v-icon>close</v-icon>
    </v-btn>

  </v-toolbar>
  <router-view ></router-view>
  <v-bottom-nav
  transition="slide-x-transition"
  :active.sync="bottomNav"


  :value="true"
  router
  color="darkTheme"
  >
  <v-btn to="/" flat color="primary" dark>
    <span>{{$t('panelDashboard')}}</span>
    <v-icon>mdi-vector-circle</v-icon>
  </v-btn>
  <v-btn to="/2" flat color="primary" dark>
    <span>{{$t('panelActions')}}</span>
    <v-icon>mdi-view-dashboard</v-icon>
  </v-btn>
  <v-btn  to="/3" flat color="primary" dark>
    <span>{{$t('panelSettings')}}</span>
    <v-icon>mdi-settings</v-icon>
  </v-btn>

</v-bottom-nav>
</v-app>

</template>

<script>
const pjson = require('../../package.json')
import { mapGetters, mapActions } from 'vuex'
import * as electron from 'electron'
// import * as express from 'express'
// import * as fs from 'fs'
// import * as fsreaddir from 'fs-readdir-with-file-types'
// import {callbackify} from 'util'




// electron.remote.globalShortcut.register('CommandOrControl+Shift+K', () => {
//   electron.remote.BrowserWindow.getFocusedWindow().webContents.openDevTools()
// })




// console.log(menu);
window.addEventListener('beforeunload', () => {
  electron.remote.globalShortcut.unregisterAll()
})

// remote.BrowserWindow.setMenu(null)

export default {
  name: 'control_js',
  data: () => ({
    bottomNav: 'recent',
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
