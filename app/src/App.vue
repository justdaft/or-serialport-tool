
<template>
  <div class="">
    <router-view>
    </router-view>
  </div>
</template>

<script>

  import {version} from '../package.json';

  import LogoView from './components/Logo.vue';
  import MainView from './components/Main.vue';

  global.version = version;

  export default {
    name: 'AppView',

    components: {
      LogoView,
      MainView,
    },

    beforeCreate() {

    },

    mounted() {
      this.$router.push({ path: 'logo' });
    },
  };
</script>

<style scoped>
.valign-content {
  display:flex;
  justify-content:center;
  align-items: center;
}
</style>
