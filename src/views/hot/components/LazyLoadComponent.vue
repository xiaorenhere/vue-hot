// LazyLoadComponent.vue
<template>
  <div ref="observerElement">
    <component v-if="isVisible" :is="actualComponent" />
  </div>
</template>

<script>
export default {
  props: {
    actualComponent: {
      type: [Object, Function],
      required: true,
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          observer.unobserve(this.$refs.observerElement);
        }
      });
    });

    observer.observe(this.$refs.observerElement);
  },
};
</script>

<style scoped>
/* Optional styling */
</style>
