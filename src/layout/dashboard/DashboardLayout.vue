<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" :name="$t('sidebar.dashboard')" icon="tim-icons icon-chart-pie-36"/>
        <sidebar-link to="/request" :name="$t('Requests')" icon="tim-icons icon-atom"/>
        <sidebar-link to="/profile" :name="$t('sidebar.userProfile')" icon="tim-icons icon-single-02"/>
         <sidebar-link to="/signout" :name="$t('SignOut')" icon="tim-icons icon-atom"/>
         <sidebar-link to="/adminaccess" :name="$t('AdminAccess')" icon="tim-icons icon-atom"/>
         <sidebar-link to="/logs" :name="$t('Logs')" icon="tim-icons icon-atom"/>
      </template>
    </side-bar>
    <div class="main-panel">
      
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";

import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
