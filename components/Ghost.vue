<template>
  <b-skeleton-wrapper :loading="true">
    <template #loading>
      <b-row>
        <b-col
          v-for="i in 50"
          :key="i"
          :xl="rows"
          lg="6"
          md="6"
          sm="12"
        >
          <b-skeleton width="100%" height="260px" style="margin-bottom: 0.5rem" />
          <b-skeleton width="70%" height="17px" style="margin-bottom: 5px" />
          <b-skeleton width="90%" height="17px" style="margin-bottom: 17px" />
          <b-skeleton width="30%" height="16px" style="margin-bottom: 3.5rem" />
        </b-col>
      </b-row>
    </template>
  </b-skeleton-wrapper>
</template>
<script>
export default {
  props: {
    rows: {
      type: Number,
      default: 3
    }
  }
}
</script>
