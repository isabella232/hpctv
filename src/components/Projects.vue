<template >
  <div class="projects">
    <header class="row dead-center text-center upper">
      <h1>Cheyenne's Featured Projects</h1>
    </header>

    <article class="row dead-center">
      <div class="case-container">
        <h2>
          Go behind the screens and explore what researchers around the country are working on.
        </h2>
      </div>
      <div class="case-container" v-for="(project, i) in featuredProjects" :key="project.name">
        <figure @click="openModal(i)">
          <img :src="project.heroImage" alt="">
          <div class="figure-overlay col dead-center">
            <img class="plus-icon" src="/static/icon/plus-x-icon.svg">
            <figcaption class="upper">{{ project.name }}</figcaption>
          </div>
        </figure>
      </div>

    </article>
    <big-modal v-if="modalIsOpen" :data="modalData" @modalBorderTapped="modalIsOpen = false">
    </big-modal>
    <dock-nav></dock-nav>
  </div>
</template>

<script>
import BigModal from './modals-navs/BigModal';
import DockNav from './modals-navs/DockNav';

export default {
  name: 'projects',
  components: {
    BigModal,
    DockNav
  },

  data() {
    return {
      modalIsOpen: false,
      modalData: '',
      featuredProjects: [
        {
          name: 'Wind Forecast Improvement',
          heroImage: '/static/img/featured-projects/wind-forecast.jpg',
          statData: [
            {
              statName: 'Core Hours',
              statNumber: 10000,
              iconPath: '/static/icon/core-hours-icon.svg'
            },
            {
              statName: 'Jobs',
              statNumber: 55,
              iconPath: '/static/icon/jobs-icon.svg'
            },
            {
              statName: 'Petaflops',
              statNumber: 55,
              iconPath: '/static/icon/performance-icon.svg'
            }
          ],
          mainContent: [
            {
              title: 'Slide 1 Title',
              body: 'Slide 1 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: '/static/img/modal-placeholder.jpg'
            },
            {
              title: 'Slide 2 Title',
              body: 'Slide 2 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: 'https://www.w3schools.com/html/mov_bbb.mp4'
            },
            {
              title: 'Slide 3 Title',
              body: 'Slide 3 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: '/static/img/modal-placeholder.jpg'
            }
          ]
        },
        {
          name: 'Understanding heliospheric Weather',
          heroImage: '/static/img/featured-projects/heliosphere.jpg',
          statData: [
            {
              statName: 'Core Hours',
              statNumber: 10000,
              iconPath: '/static/icon/core-hours-icon.svg'
            },
            {
              statName: 'Jobs',
              statNumber: 55,
              iconPath: '/static/icon/jobs-icon.svg'
            },
            {
              statName: 'Petaflops',
              statNumber: 55,
              iconPath: '/static/icon/performance-icon.svg'
            }
          ],
          mainContent: [
            {
              title: 'Slide 1 Title',
              body: 'Slide 1 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: '/static/img/modal-placeholder.jpg'
            },
            {
              title: 'Slide 2 Title',
              body: 'Slide 2 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: 'https://www.w3schools.com/html/mov_bbb.mp4'
            },
            {
              title: 'Slide 3 Title',
              body: 'Slide 3 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: '/static/img/modal-placeholder.jpg'
            }
          ]
        },
        {
          name: 'Predicting Climate Extremes',
          heroImage: '/static/img/featured-projects/climate-extremes.jpg',
          statData: [
            {
              statName: 'Core Hours',
              statNumber: 10000,
              iconPath: '/static/icon/core-hours-icon.svg'
            },
            {
              statName: 'Jobs',
              statNumber: 55,
              iconPath: '/static/icon/jobs-icon.svg'
            },
            {
              statName: 'Petaflops',
              statNumber: 55,
              iconPath: '/static/icon/performance-icon.svg'
            }
          ],
          mainContent: [
            {
              title: 'Slide 1 Title',
              body: 'Slide 1 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: '/static/img/modal-placeholder.jpg'
            },
            {
              title: 'Slide 2 Title',
              body: 'Slide 2 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: 'https://www.w3schools.com/html/mov_bbb.mp4'
            },
            {
              title: 'Slide 3 Title',
              body: 'Slide 3 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: '/static/img/modal-placeholder.jpg'
            }
          ]
        },
        {
          name: 'Wind Turbine Performance',
          heroImage: '/static/img/featured-projects/wind-turbine.jpg',
          statData: [
            {
              statName: 'Core Hours',
              statNumber: 10000,
              iconPath: '/static/icon/core-hours-icon.svg'
            },
            {
              statName: 'Jobs',
              statNumber: 55,
              iconPath: '/static/icon/jobs-icon.svg'
            },
            {
              statName: 'Petaflops',
              statNumber: 55,
              iconPath: '/static/icon/performance-icon.svg'
            }
          ],
          mainContent: [
            {
              title: 'Slide 1 Title',
              body: 'Slide 1 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: '/static/img/modal-placeholder.jpg'
            },
            {
              title: 'Slide 2 Title',
              body: 'Slide 2 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: 'https://www.w3schools.com/html/mov_bbb.mp4'
            },
            {
              title: 'Slide 3 Title',
              body: 'Slide 3 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: '/static/img/modal-placeholder.jpg'
            }
          ]
        },
        {
          name: 'Oceanic Atmospheric Forecasts',
          heroImage: '/static/img/featured-projects/oceanic-forecasts.jpg',
          statData: [
            {
              statName: 'Core Hours',
              statNumber: 10000,
              iconPath: '/static/icon/core-hours-icon.svg'
            },
            {
              statName: 'Jobs',
              statNumber: 55,
              iconPath: '/static/icon/jobs-icon.svg'
            },
            {
              statName: 'Petaflops',
              statNumber: 55,
              iconPath: '/static/icon/performance-icon.svg'
            }
          ],
          mainContent: [
            {
              title: 'Slide 1 Title',
              body: 'Slide 1 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: '/static/img/modal-placeholder.jpg'
            },
            {
              title: 'Slide 2 Title',
              body: 'Slide 2 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: 'https://www.w3schools.com/html/mov_bbb.mp4'
            },
            {
              title: 'Slide 3 Title',
              body: 'Slide 3 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
              media: '/static/img/modal-placeholder.jpg'
            }
          ]
        }
      ]
    };
  },

  methods: {
    openModal(i) {
      this.modalIsOpen = true;
      this.modalData = this.featuredProjects[i];
    }
  },
  created() {
    // remove any classes from the body and then add the page-specific class.
    document.body.classList = '';
    document.body.classList.add('projects-page');
  }
};
</script>

<style src="../scss/projects.scss" lang="scss"></style>