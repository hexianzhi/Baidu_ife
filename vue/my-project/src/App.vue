<template>
  <div id="app">
    <h1 v-html="title"></h1>
    <input v-model="newItem" @keyup.enter="addNew"/>
    <ul>
      <li v-for="item in items" v-bind:class="{finished: item.isFinished}" v-on:click="toggle(item)">
        {{item.label}}
      </li>
    </ul>

    <!--想传什么给子的话就直接塞在这里就ok，那还有其他地方吗？-->
    <p>msg from child: {{childMsg}}</p>
    <Header-component msgfromFather='fuck you srew' v-on:child-tell='listenBoy'></Header-component>
    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
  import Store from './components/storage'
  import HeaderComponent from './components/header.vue'

  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        title: '<span> fuck </span>fuck you',
        items: Store.fetch(),
        liclass: 'fuck',
        newItem: '',
        childMsg: ' will change'
      }
    },
    watch: {
      items: {
        handler: function (items) {
          Store.save(items)
        },
        deep: true
      }
    },

    components: {
      HeaderComponent
    },

    methods: {
      toggle: function (item) {
        item.isFinished = !item.isFinished
      },
      addNew: function () {
        this.items.push({
          label: this.newItem,
          isFinished: true
        })

        this.newItem = ''
      },
      listenBoy: function (msg) {
        this.childMsg = msg
      }
    }
  }
</script>

<style>
  .finished {
    text-decoration: underline;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
