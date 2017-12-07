<template>
  <section class="slide-up-modal" :class="{open: legendIsOpen}">
    <header @click="legendIsOpen = !legendIsOpen">
      <h3>
        <img src="/static/icon/plus-x-icon.svg" width="24">
        <span class="upper">{{title}}</span>
      </h3>
    </header>
    <legend class="legend">
      <dl class="legend-list col wrap">
        <div class="legend-item" v-for="term in terms" :key="term.title">
          <dt class="upper lime">{{ term.title }}</dt>
          <dd>
            {{ term.definition }}
          </dd>
        </div>
      </dl>
    </legend>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: 'Legend',
      terms: [
        {
          title: 'Supercomputer',
          definition: 'A computer built to handle intense computational demands and enormous datasets.'
        },
        {
          title: 'Project',
          definition: 'An individual scientific study Cheyenne works on. Each project may have many “jobs.”'
        },
        {
          title: 'Job',
          definition: 'A discrete amount of scientific work that runs on Cheyenne when space is available. Scientists may break complicated computational experiments into many jobs, often to reach a stopping point within a time limit. '
        },
        {
          title: 'Core Hours',
          definition: 'The number of cores used in a computational task multiplied by the duration of the task in hours. Core hours measure the “shares” of computer time consumed by different projects and jobs. Cheyenne delivers over 1.2 billion core hours to scientific projects each year. '
        },
        {
          title: 'Node',
          definition: 'Each node could be considered its own computer. Cheyenne uses a combination of 4,032 nodes to generate its incredible computing power. Computing jobs may run on one or more nodes.'
        },
        {
          title: 'Processor',
          definition: "The silicon “chip” that performs a computer's calculations or operations. Each of Cheyenne’s 4,032 nodes has two Intel “Broadwell” processors, and each processor has 18 cores."
        },
        {
          title: 'Core',
          definition: 'A small, single processing unit that receives instructions and performs calculations. Each core handles a piece of a larger, more complex scientific simulation. Cheyenne has over 145,000 total cores, with 18 cores on each processor.'
        },
        {
          title: 'Flops',
          definition: 'Copy not yet finalized.'
        }
      ],
      legendIsOpen: false
    };
  }
};
</script>

<style lang="scss"  src="../../scss/slide-up-modal.scss" scoped>

</style>
