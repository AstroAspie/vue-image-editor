<template>
  <div class="palette">
    <div
      v-for="tool in tools"
      :key="tool"
      :class="{ selected: selectedTool === tool }"
      @click="selectTool(tool)"
    >
      {{ tool }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolPalette',
  props: {
    tools: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedTool: null
    }
  },
  methods: {
    selectTool(tool) {
      this.selectedTool = tool
      this.$emit('selectTool', tool)
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