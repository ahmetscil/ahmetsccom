<template>
  <b-skeleton-wrapper :loading="true">
    <template #loading>
      <b-row>
        <b-col lg="10" md="12" offset-lg="1" offset-md="0">
          <b-row class="asc_pariette-product-detail-box shadow">
            <b-col md="12" lg="8">
              <b-row>
                <b-col cols="1" class="p-0">
                  <b-skeleton width="50px" height="50px" class="mb-1" />
                  <b-skeleton width="50px" height="50px" class="mb-1" />
                  <b-skeleton width="50px" height="50px" class="mb-1" />
                  <b-skeleton width="50px" height="50px" class="mb-1" />
                </b-col>
                <b-col cols="11">
                  <div class="asc_pariette-product-carousel">
                    <b-skeleton width="100%" height="500px" />
                  </div>
                </b-col>
              </b-row>
            </b-col>
            <b-col md="12" lg="4" class="asc_pariette-product-detail-box-content">
              <b-skeleton width="85%" height="30px" class="mb-1" />
              <b-skeleton width="45%" height="25px" class="mb-1" />
              <b-skeleton width="55%" height="25px" class="mb-1" />
              <b-skeleton width="50%" height="25px" class="mb-1" />
              <b-skeleton width="55%" height="25px" class="mb-1" />
              <section>
                <b-skeleton width="60%" height="30px" class="mb-1" />
                <b-skeleton width="90%" height="22px" class="mb-1" />
                <b-skeleton width="85%" height="22px" class="mb-1" />
                <b-skeleton width="95%" height="22px" class="mb-1" />
                <b-skeleton width="90%" height="22px" class="mb-1" />
                <b-skeleton width="85%" height="22px" class="mb-1" />
                <b-skeleton width="95%" height="22px" class="mb-1" />
                <b-skeleton width="90%" height="22px" class="mb-1" />
                <b-skeleton width="85%" height="22px" class="mb-1" />
                <b-skeleton width="95%" height="22px" class="mb-1" />
              </section>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </template>
  </b-skeleton-wrapper>
</template>
