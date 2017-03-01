<template>
  <div class="logo valign-content">
    <div class="">
      <md-theme md-name="blue" >
        <md-layout md-align="center">

          <md-layout md-flex="90" md-align="center">
            <img src="./assets/serialport.svg.png" style="height:100px;"/>
          </md-layout>

          <md-layout md-flex="90" md-align="center">
            <span class="md-display-1" style="padding-top:20px;">orSerialPort Tool</span>
          </md-layout>

        </md-layout>

        <md-layout md-align="center">
          <md-layout md-flex="90" md-align="center">
            <div class="" style="padding-top:20px;">
              v{{version}}
            </div>
          </md-layout>

          <md-layout md-flex="90" md-align="center">
            <div class="" style="padding-top:50px;">
              <md-button class="md-raised" @click="onEnterClicked">Enter</md-button>
            </div>
          </md-layout>

        </md-layout>
      </md-theme>
    </div>
  </div>
</template>

<script>


export default {
  name: 'LogoView',

  data: () => {
    return {
      version: global.version,
    }
  },

  mounted() {
    // var self = this;
    // setTimeout(function(){
    //
    // }, 1000*2);
  },

  methods: {
    onEnterClicked(ev) {
      this.$router.push({path: 'main'});
    },
  }
}

</script>

<style>
.center {
  text-align: center;
}
.logo {
  color: #787878;
  height: 100vh;
}
</style>
