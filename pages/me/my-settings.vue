<template>
  <div>
    <h1>
      {{ $t('my.settings') }}
    </h1>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'my',
  computed: mapState(['myStore', 'locale']),
  mounted () {
  }
}
</script>
<style lang="sass">

</style>
