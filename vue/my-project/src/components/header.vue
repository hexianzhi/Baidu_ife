<template>
  <div>
    <h1>{{fuck}}</h1>
    <button v-on:click="clickMe">Cilck</button>
  </div>

</template>


<script>
  export default {

//      ES6的写法
    data () {
      return {
        fuck: 'fuck you'
      }
    },

    props: ['msgfromFather'],

    methods: {
      clickMe: function () {
//        alert(this.msgfromFather)
        this.$emit('child-tell', this.fuck)
      }
    }
  }
</script>


<!--scoped 是局部的意思，否则作用全局-->
<style scoped>

</style>
