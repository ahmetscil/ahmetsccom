<template>
  <div class="asc_pariette-breadcrumb shadow">
    <b-container fluid>
      <b-row>
        <b-col lg="10" md="12" offset-lg="1" offset-md="0">
          <b-breadcrumb>
            <b-breadcrumb-item :to="localePath({ name: 'index' })">{{ $t('nav.home') }}</b-breadcrumb-item>
            <b-breadcrumb-item v-if="where.categories" :to="localePath({ name: 'products-collection', params: {'collection': where.categories[0].slug} })" :title="where.categories[0].title">{{ where.categories[0].title }}</b-breadcrumb-item>
            <b-breadcrumb-item active :title="where.title">{{ where.title }}</b-breadcrumb-item>
          </b-breadcrumb>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  props: {
    where: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-breadcrumb
    width: 100%
    background: rgba(255,255,255,.9)
    .breadcrumb
      background: none
      margin-bottom: 0
      font-size: 12px
      color: #000
      & a
        color: #3d6e47
</style>
