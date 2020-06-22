<template >
  <div class="projects">
    <header class="text-center upper page-header">
      <h1>Cheyenne's Featured Projects</h1>
    </header>

    <main class="grid">
      <div class="case-container text-block">
        <h2 class="text-center">
          {{ vuex.headerTileCopy }}
        </h2>
      </div>
      <div class="case-container" v-for="(project, index) in vuex.featuredProjects" :key="project.name" @click="openModal(index)">
        <img :src="project.heroImage" alt="">
        <figure class="figure-overlay">
          <img class="plus-icon" src="../assets/icon/plus-x-icon.svg" alt="expand">
          <figcaption class="upper text-center">{{ project.name }}</figcaption>
        </figure>
      </div>
    </main>
    <big-modal v-if="modalIsOpen" :data="modalData" @modalBorderTapped="modalIsOpen = false" ref="bigModal"/>
    <SlideUpModal title="Project Log" ref="projectLog">
      <div class="container">
        <div class="intro">
          <p class="lime upper">What Cheyenne is Working on</p>
          <p>Explore the complete list of projects currently running on the supercomputer.</p>
        </div>
        <TableComponent :data="tableData" sort-by="coreHours" sort-order="desc">
          <TableColumn show="title" label="Name"></TableColumn>
          <TableColumn show="jobs" label="Jobs" data-type="numeric"></TableColumn>
          <TableColumn show="coreHours" label="Core Hours" data-type="numeric"></TableColumn>
          <TableColumn show="facility" label="Facility"></TableColumn>
          <TableColumn show="areaOfInterestGroup" label="Area of Study"></TableColumn>
          <TableColumn show="organization" label="Organization"></TableColumn>
        </TableComponent>
      </div>
    </SlideUpModal>
    <DockNav ref="nav" />

  </div>
</template>

<script>
import SlideUpModal from '../components/modals-navs/SlideUpModal';
import BigModal from '../components/modals-navs/BigModal';
import DockNav from '../components/modals-navs/DockNav';
import { TableComponent, TableColumn } from 'vue-table-component';
import axios from 'axios';

export default {
  name: 'projects',
  components: {
    BigModal,
    DockNav,
    SlideUpModal,
    TableComponent,
    TableColumn
  },

  data() {
    return {
      modalIsOpen: false,
      modalData: '',
      tableData: []
    };
  },

  computed: {
    vuex() {
      return this.$store.state.projects;
    }
  },

  methods: {
    /**
     * Opens a full screen modal and passes the data based on it's position in the array.
     * @param { Number } i the position in the array. Passed automatically by Vue Template.
     */
    openModal(i) {
      this.modalIsOpen = true;
      this.modalData = this.vuex.featuredProjects[i];
      document.querySelector('body').classList.add('freeze');
      document.querySelector('html').classList.add('freeze');
    },

    async getTableData() {
      const response = await axios.get('/data/report_projectlog_days_ago_30.json');
      return response.data.entries;
    },

    beginAutoplay(){
      const page = this;

      this.automate([
        {delay: 3000, trigger(){ page.$refs.projectLog.legendIsOpen = true}},
        {delay: 15000, trigger(){ page.$refs.projectLog.legendIsOpen = false}},
        {delay: 3000, trigger(){ page.openModal(0)}},
        {delay: 30000, trigger(){ page.$refs.bigModal.handleExternalNav(1) }},
        {delay: 20000, trigger(){ page.$refs.bigModal.$refs.article.scroll({top:300, behavior: 'smooth'}) }},
        {delay: 40000, trigger(){ page.$refs.bigModal.handleExitTap() }},

        {delay: 3000, trigger(){ page.openModal(1)}},
        {delay: 30000, trigger(){ page.$refs.bigModal.handleExternalNav(1) }},
        {delay: 20000, trigger(){ page.$refs.bigModal.$refs.article.scroll({top:400, behavior: 'smooth'}) }},
        {delay: 40000, trigger(){ page.$refs.bigModal.handleExitTap() }},

        {delay: 3000, trigger(){ page.openModal(2)}},
        {delay: 30000, trigger(){ page.$refs.bigModal.handleExternalNav(1) }},
        {delay: 60000, trigger(){ page.$refs.bigModal.handleExitTap() }},

        {delay: 3000, trigger(){ page.openModal(3)}},
        {delay: 30000, trigger(){ page.$refs.bigModal.handleExternalNav(1) }},
        {delay: 90000, trigger(){ page.$refs.bigModal.handleExitTap() }},

        {delay: 3000, trigger(){ page.openModal(4)}},
        {delay: 30000, trigger(){ page.$refs.bigModal.handleExternalNav(1) }},
        {delay: 20000, trigger(){ page.$refs.bigModal.$refs.article.scroll({top:400, behavior: 'smooth'}) }},
        {delay: 40000, trigger(){ page.$refs.bigModal.handleExitTap() }},

        {delay: 0, trigger(){ 
          page.$store.state.home.showSplash = true;
          page.$store.commit('clearTimers');
          }
        },
        {delay: 2000, trigger(){
          window.localStorage.setItem('autoPlay', true);
          window.location = '/';
          }},
      ])
    }
  },
  created() {
    // remove any classes from the body and then add the page-specific class.
    document.body.classList.remove('home-page', 'projects-page', 'specs-page', 'live-data-page');
    document.body.classList.add('projects-page');
    axios
      .get('/data/report_projectlog_days_ago_30.json')
      .then(response => {
        if (response.status === 200) {
          this.tableData = response.data.entries;
        }
      })
      .catch((error) => {
        return error;
      });
  },

  mounted() {
    // Check to see if the log should be open on start via # in url.
    if (this.$route.hash === '#log') {
      const projectlog = this.$children.find(component => {
        return component.title === 'Project Log';
      });
      projectlog.legendIsOpen = true;
    }
  }
};
</script>

<style src="../assets/scss/projects.scss" lang="scss"></style>