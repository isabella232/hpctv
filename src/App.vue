<template>
<div id="app" class="col dead-center">

  <main class=" home-screen col ">
    <div class="intro-container">
      <nav>
        <ul class="row around middle text-center">
          <li class="col dead-center">
            <img src="https://placehold.it/50x50?text=icon" alt="">
            <span class="lime">text</span>
          </li>

          <li class="col dead-center">
            <img src="https://placehold.it/50x50?text=icon" alt="">
            <span class="lime">text</span>
          </li>

          <li class="col dead-center">
            <img src="https://placehold.it/50x50?text=icon" alt="">
            <span class="lime">text</span>
          </li>
        </ul>
      </nav>
      <div class="text-container text-center">

        <h1 class="col upper">
          <span class="lime">Meet Cheyenne:</span>
          <span>Built for Science, Built for Life</span>
        </h1>

        <p>
          Cheyenne may look like a traditional data storage facility, but it’s one of the world’s most powerful computing systems. Scientists from around the country use Cheyenne to collaboratively simulate and predict Earth’s greatest phenomena — from weather
          patterns and climate fluctuation to seismic activity and airflows — to better forecast changes and how to can prepare for them. Built to transform numerical concepts into tangible predictions, Cheyenne’s success relies on every cable and computer
          cluster working together at full capacity.
        </p>
      </div>

      <div class="row center">
        <button class="start-button upper">Start</button>
      </div>
    </div>
  </main>

  <footer class="app-footer">
    <ul class="sponsors row center">
      <li><img src="https://placehold.it/200x50" alt=""></li>
      <li><img src="https://placehold.it/200x50" alt=""></li>
      <li><img src="https://placehold.it/200x50" alt=""></li>
    </ul>
  </footer>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
$lime: #c8dc1e;
#app {
  width: 100%;
  min-height: 768px;
  height: 100vh;
  max-width: 1024px;
  overflow: hidden;
  font-family: sans-serif;
  box-sizing: border-box;
  margin: 0 auto;

  p {
    line-height: 1.5em;
  }

  .text-center {
    text-align: center;
  }

  .upper {
    text-transform: uppercase;
  }

  .lime {
    color: $lime;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }
}

.home-screen {
  color: white;

  .intro-container {
    background: grey;
    width: 60%;
    margin: 0 auto;
    // height: 390px;
    padding-bottom: 50px;

    h1 {
      .lime {
        font-size: 18px;
      }
      font-size: 24px;
      font-weight: 400;
    }

    .text-container {
      width: 80%;
      margin: 0 auto;
    }

    nav {
      margin-top: -50px;

      li {
        background-color: teal;
        width: 100px;
        height: 100px;
      }
    }
  }

  .start-button {
    height: 100px;
    width: 100px;
    background: $lime;
    color: dimgrey;
    font-size: 20px;
    border-radius: 50%;
    position: absolute;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
    outline: none;
    -webkit-appearance: none;
    border: none;

    &:active {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      background: darken($lime, 5%);
    }
  }
}
footer.app-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>