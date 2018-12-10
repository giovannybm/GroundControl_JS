import * as serial from 'serialport'

const state = {
  count:0,
  listPorts: [],
  selectedPort:null,
  definePort:null
}

const getters= {

}

const actions = {
  getPorts: ({ commit }) => {
    serial.list((err, ports) =>{
      commit('getPorts', ports)
    })
  },
  assignPort: ({ commit }) => commit('assignPort')
}

const mutations = {

  getPorts (state, ports){
    state.listPorts = ports
  },
  selectPort (state, port){
    state.selectedPort = port
  },
  assignPort (state){
    state.definePort= new serial(state.selectedPort,{
      autoOpen: false,
      baudRate: 57600
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
