<template>
  <div>
    <md-whiteframe>
      <md-toolbar>
        <!-- <md-button class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button> -->

        <h2 class="md-title" style="flex: 1">Serialport</h2>

        <md-button class="md-icon-button" @click="openDevice">
          <md-icon>devices_other</md-icon>
        </md-button>

        <md-button class="md-icon-button" @click="onClicked">
          <md-icon>help</md-icon>
        </md-button>

        <md-button class="md-icon-button" @click='startDevice'>
          <md-icon>play_arrow</md-icon>
        </md-button>

        <md-button class="md-icon-button" @click='closeDevice'>
          <md-icon>close</md-icon>
        </md-button>

      </md-toolbar>
    </md-whiteframe>


    <md-whiteframe>

    </md-whiteframe>
      <md-layout md-gutter>
        <!-- left -->
        <md-layout md-flex-xsmall="100" md-flex-small="30" md-flex-medium="30">

          <md-input-container>
            <label for="serialport">Serialport</label>
            <md-select name="serialport" id="serialport" v-model="serialport"
              @change="onSerialportSelected">
              <template v-for="item in serialportList">
                <md-option v-bind:value="item.value">=={{item.label}}</md-option>
              </template>
            </md-select>
          </md-input-container>

          <md-input-container>
            <label for="baudrate">Baudrate</label>
            <md-select name="baudrate" id="baudrate" v-model="baudrate"
              @change="onBaudrateSelected">
              <template v-for="item in baudrateList">
                <md-option v-bind:value="item">=={{item}}</md-option>
              </template>
            </md-select>
          </md-input-container>



        </md-layout>
        <!-- main -->
        <md-layout md-flex-xsmall="100" md-flex-small="70" md-flex-medium="70">
          <textarea id="output" v-model='output' readonly="true"></textarea>
        </md-layout>
      </md-layout>
    <div class="">
      <md-layout md-gutter>

        <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="50">



        </md-layout>

        <!--
        <md-layout md-flex-xsmall="100" md-flex-small="33" md-flex-medium="25">
          <md-switch v-model="connect" id="connect" name="connect" class="md-primary"
            @change="onConnectChanged">
            {{connectStr}}
          </md-switch>
        </md-layout>
        <md-input-container>
          <label>Output</label>
          <md-textarea v-model="output"></md-textarea>
        </md-input-container>
        -->

      </md-layout>
    </div>

    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialogOpenDevice">
      <md-dialog-title>Open new device</md-dialog-title>

      <md-dialog-content>



      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialogOpenDevice')">Cancel</md-button>
        <md-button class="md-primary" @click="connectSerialport">Open</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-fab md-fab-bottom-right" @click.native="openDevice()">
      <md-icon>add</md-icon>
    </md-button>

  </div>
</template>


<script>
  //
  import Vue from 'vue';
  //
  global.Device = require('../lib/device.js').Device;
  global.Vue = Vue;

  var gDevice = new Device();

  export default {
    name: 'MainView',

    beforeCreate() {
      gDevice.getSerialportList();
      userCfg.set('foo', [1, 2, 3, {a:1, b:2}]);
      console.log(userCfg.get('foo'));
    },

    mounted() {

    },

    data() {
      return {
        value: '',
        connect: false,
        connectStr: '',

        lastOutput: '',
        output: __curdirname,

        bufData: new Buffer(0),

        serialport: '',
        baudrate: '',

        serialportList: gDevice.ports,
        baudrateList: gDevice.baudrates,
      }
    },

    computed: {
      // output: function() {
      //   var rc = '';
      //   if(this.bufData.length>0) {
      //     rc = gDevice.ab2str(this.bufData);
      //     this.lastOutput += rc;
      //     this.bufData = new Buffer(0);
      //   }
      //   return rc;
      // }
    },

    methods: {

      openDialog(ref) {
        this.$refs[ref].open();
      },
      closeDialog(ref) {
        this.$refs[ref].close();
      },

      openDevice() {
        gDevice.getSerialportList();
        gDevice.close();
        this.openDialog('dialogOpenDevice');
      },

      refreshDevice() {
        gDevice.getSerialportList();
      },

      startDevice() {
        var buf = new Buffer([
          0xcc, 0xdd, 0x10, 0x30, 0x31, 0x32
        ]);
        gDevice.send(buf);
      },

      closeDevice() {
        gDevice.close();
      },

      onDeviceData(buf) {
        var that = this;
        //logger.debug(buf);
        if(this.output.length>1024) this.output = '';

        this.output += buf.toString('hex');

        //this.bufData = Buffer.from(buf);
        //Vue.nextTick(function(){

        //});
      },

      onSerialportSelected(val) {
        logger.log('selected', val);
      },
      onBaudrateSelected(val) {
        logger.log('selected', val);
      },
      onConnectChanged(val, ev) {
        logger.log('changed', val, ev);
        if(val) {
          this.connectStr = 'Connected';
          this.connectSerialport();
        } else {
          this.connectStr = '';
        }
      },
      onClicked(ev) {
        this.$router.push({path: 'logo'});
      },

      connectSerialport() {
        this.closeDialog('dialogOpenDevice');

        logger.warn(">>Connect", this.serialport, this.baudrate);

        gDevice.onData = this.onDeviceData;

        gDevice.open({serialport:this.serialport, baudrate:this.baudrate});

      },


      onOpen() {
        logger.log('Opened');
      },
      onClose(type) {
        logger.log('Closed', type);
      },

    }

  }

</script>

<style>
#output {
  width: 100%;
  margin: auto;
  padding: auto;
  border: solid 1px #ccc;
}
</style>
