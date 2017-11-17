<template>
  <div class="specs">
    <header class="text-center upper grey">
    <h1>Supercomputer Superspecs</h1>
    <span class="lime">Tap + for details</span>
    </header>
    <main class="supercomputer">
      <small-modal></small-modal>
    </main>
  </div>
</template>

<script>
import SmallModal from './Small-Modal'

export default {
  name: 'specs',
  components: {
    SmallModal
  }
}
</script>

<style src="../scss/specs.scss" lang="scss"></style>