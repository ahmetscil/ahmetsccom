<template>
  <div class="asc_pariette-page-notfound">
    <h1>
      {{ $t('product.notFound') }}
    </h1>
    <p>
      {{ $t('product.notFoundText') }}
    </p>
    <div class="asc_pariette-page-notfound-overflow">
      <b-row>
        <b-col
          v-for="x in 20"
          :key="x"
          xl="3"
          lg="6"
          md="6"
          sm="12"
          class="asc_pariette-page-notfound mb-5"
        >
          <div class="asc_pariette-page-notfound-box" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<style lang="sass">
.asc_pariette-page-notfound
  & h1
    font-size: 50px
    font-weight: 600
    letter-spacing: -0.06rem
  & p
    font-size: 20px
    font-weight: 400
    letter-spacing: -0.06rem
.asc_pariette-page-notfound-overflow
  width: 100%
  height: 65vh
  overflow: hidden
  .asc_pariette-page-notfound
    .asc_pariette-page-notfound-box
      margin-bottom: 2rem
      width: 100%
      position: relative
      height: 360px
      overflow: hidden
      background: linear-gradient(180deg, #ffffff, #dddddd)
      display: block
      border-radius: 10px
    &:nth-child(2n+1)
      .asc_pariette-page-notfound-box
        height: 250px
    &:nth-child(2n+3)
      .asc_pariette-page-notfound-box
        margin-top: -120px
        height: 270px
</style>
