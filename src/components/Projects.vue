<template >
  <div class="projects">
    <header class="row dead-center text-center upper page-header">
      <h1>Cheyenne's Featured Projects</h1>
    </header>

    <main class="col dead-center">
      <div class="wrapper">

        <div class=" row row-1 ">
          <div class="case-container text-block">
            <h2>
              {{ vuex.headerTileCopy }}
            </h2>
          </div>
          <div class="case-container" v-if="i < 2" v-for="(project, i) in vuex.featuredProjects" :key="project.name">
            <figure @click="openModal(i)">
              <img :src="project.heroImage" alt="">
              <div class="figure-overlay col dead-center">
                <img class="plus-icon" src="/static/icon/plus-x-icon.svg">
                <figcaption class="upper">{{ project.name }}</figcaption>
              </div>
            </figure>
          </div>
        </div>

        <div class="row row-2">
          <div class="case-container" v-if="i >= 2" v-for="(project, i) in vuex.featuredProjects" :key="project.name">
            <figure @click="openModal(i)">
              <img :src="project.heroImage" alt="">
              <div class="figure-overlay col dead-center">
                <img class="plus-icon" src="/static/icon/plus-x-icon.svg">
                <figcaption class="upper">{{ project.name }}</figcaption>
              </div>
            </figure>
          </div>
        </div>
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
    <dock-nav />

  </div>
</template>

<script>
import SlideUpModal from './modals-navs/SlideUpModal';
import BigModal from './modals-navs/BigModal';
import DockNav from './modals-navs/DockNav';
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
    },
    apiConfig() {
      return this.$store.state.apiConfig;
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
    },

    async getTableData() {
      response = await axios.get('report/projectlog?daysAgo=30', this.apiConfig);
      return response.data.entries;
    },

    beginAutoplay(){
      const page = this;
      const router = this.$router;

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
    document.body.classList = '';
    document.body.classList.add('projects-page');
    axios
      .get('report/projectlog?daysAgo=30', this.apiConfig)
      .then(response => {
        if (response.status === 200) {
          this.tableData = response.data.entries;
        }
      })
      .catch(err => {
        return error;
      });
  },

  mounted() {
    // Check to see if the log should be open on start via # in url.
    if (this.$route.hash === '#log') {
      const projectlog = this.$children.find(component => {
        return component.title == 'Project Log';
      });
      projectlog.legendIsOpen = true;
    }
  }
};
</script>

<style src="../scss/projects.scss" lang="scss"></style>