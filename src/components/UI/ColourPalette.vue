<template>
  <div></div>
</template>

<script>
export default {
  name: 'ColourPalette',
  props: {
    colors: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedColor: null
    }
  },
  methods: {
    selectColor(color) {
      this.selectedColor = color
      this.$emit('selectColor', color)
    }
  }
}
</script>

<style scoped>
.palette {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
}
</style>