<template>
  <div class="container">
    <div style="padding-top: 100px">
      <div>
        100%
      </div>
    </div>
    <div>
      <div
        v-for="(col,index) in 2"
        :key="index"
        w="6"
      >
        50%
      </div>
    </div>
    <div>
      <div
        v-for="(col,index) in 6"
        :key="index"
        lg="2"
        sm="6"
        xs="1"
        w="1"
      >
        res
      </div>
    </div>
    <div style="height: 50000px" />
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
