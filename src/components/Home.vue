<template>
  <div class="col dead-center">
    <div class="video-container">
      <video autoplay muted loop playsinline id="bg-video">
        <source src="/static/video/intro.mp4" type="video/mp4"></source>
      </video>
    </div>
    <main class=" home-screen col dead-center">
      <div class="intro-container">
        <nav>
          <ul class="row around middle text-center">
            <li>
              <router-link to="specs" class="col middle around">
                <img src="/static/icon/performance-icon.svg" alt="">
                <span class="lime upper">Specs</span>
              </router-link>
            </li>

            <li>
              <router-link to="implications" class="col middle around">
                <img src="/static/icon/real-time-data-icon.svg" alt="">
                <span class="lime upper">Live Data</span>
              </router-link>
            </li>

            <li>
              <router-link to="case-studies" class="col middle around">
                <img src="/static/icon/projects-icon.svg" alt="">
                <span class="lime upper">Projects</span>
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="text-container text-center">

          <h1 class="col upper">
            <span class="lime">Meet Cheyenne:</span>
            <span>Built for Science, Applied to Life.</span>
          </h1>

          <p>
            Cheyenne may look like a traditional data storage facility, but it’s one of the world’s most powerful computing systems. Scientists from around the country use Cheyenne to collaboratively simulate and predict Earth’s greatest phenomena — from weather patterns and climate fluctuation to seismic activity and airflows — to better forecast changes and how to can prepare for them. Built to transform numerical concepts into tangible predictions, Cheyenne’s success relies on every cable and computer cluster working together at full capacity.
          </p>
        </div>

        <div class="row center">
          <button class="start-button upper">Start</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',

  created() {
    // remove any classes from the body and then add the page-specific class.
    document.body.classList = '';
    document.body.classList.add('home-page');
  }
};
</script>

<style src="../scss/home.scss" lang="scss">

</style>