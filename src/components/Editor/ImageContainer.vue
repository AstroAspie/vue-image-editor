<template>
  <div class="image-container">
    <div class="image">
      <canvas ref="canvas" :width="width" :height="height"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageContainer',
  props: {
    image: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      imageObj: null
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')
    this.imageObj = new Image()
    this.imageObj.src = this.image
    this.imageObj.onload = () => {
      this.ctx.drawImage(this.imageObj, 0, 0, this.width, this.height)
    }
  },
  methods: {
    drawLine(startX, startY, endX, endY, color) {
      this.ctx.beginPath()
      this.ctx.moveTo(startX, startY)
      this.ctx.lineTo(endX, endY)
      this.ctx.strokeStyle = color
      this.ctx.stroke()
    },
    drawCircle(x, y, radius, color) {
      this.ctx.beginPath()
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
      this.ctx.fillStyle = color
      this.ctx.fill()
    },
    drawRectangle(x, y, width, height, color) {
      this.ctx.fillStyle = color
      this.ctx.fillRect(x, y, width, height)
    },
    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.ctx.drawImage(this.imageObj, 0, 0, this.width, this.height)
    }
  }
}
</script>

<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
}
</style>