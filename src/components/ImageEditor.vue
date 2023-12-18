<template>
  <div id="image-editor">
    <h1>Image Editor</h1>
    <canvas ref="canvas" @mousedown="startDrawing" @mouseup="stopDrawing" @mousemove="draw" @mouseleave="stopDrawing"></canvas>
    <div class="controls">
      <div class="palette">
        <div v-for="colour in colour_palette" :key="colour" :style="palette_style(colour)" @click="selectBrushColour"></div>
      </div>
      <div class="export-btn">
        <button @click="saveImage">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageEditor',
  components: {},
  data() {
    return {
      canvas: null,
      ctx: null,
      isDrawing: false,
      brush_colour: null,
      direction: true,
      
      colour_palette: [
          '#FF0000',
          '#0000FF',
          '#000',
      ]
    }
  },
  mounted() {
    this.brush_colour = this.colour_palette[0]
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')
    const image = new Image()
    image.src = '/demo_image.png'
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = 20
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
    }
  },
  watch: {
    brush_colour() {
      this.ctx.strokeStyle = this.brush_colour
    },
    canvas() {
      this.updateCanvas();
    },
  },
  methods: {
    updateCanvas() {
      let lastTime = 0;
      const vendors = ['webkit', 'moz'];
      for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
      }

      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
          const currTime = new Date().getTime();
          const timeToCall = Math.max(0, 16 - (currTime - lastTime));
          const id = window.setTimeout(function () {
                callback(currTime + timeToCall);
              },
              timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
      }
      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
          clearTimeout(id);
        };
      }
    },
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      if (this.image) {
        this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)
      }
    },
    startDrawing(e) {
      this.isDrawing = true
      this.ctx.beginPath()
      this.ctx.moveTo(e.offsetX, e.offsetY)
    },
    draw(e) {
      if (!this.isDrawing) return
      this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`
      this.ctx.beginPath()
      // account for canvas size (70% of parent)
      const x = e.offsetX / 0.7
      const y = e.offsetY / 0.7
      this.ctx.moveTo(x, y)
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
    },
    stopDrawing() {
      this.isDrawing = false
    },
    selectBrushColour(e) {
      this.brush_colour = e.target.style.backgroundColor
      this.ctx.strokeStyle = this.brush_colour
    },
    palette_style(colour) {
      return {
        backgroundColor: colour,
        border: this.brush_colour === colour ? 'solid 2px #000' : 'none',
      }
    },
    saveImage() {
      const data = this.canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = data
      a.download = 'image.png'
      a.click()
    },
  },
}
</script>

<style scoped>
#image-editor {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

canvas {
  background: #fff;
  display: block;
  margin: 0 auto;
  border: solid 1px #000;
  width: 70%;
  height: 70%;
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.palette {
  display: flex;
  justify-content: space-between;
  width: 200px;
  height: 50px;
  border: solid 1px #000;
}

.palette div {
  width: 30px;
  height: 30px;
  margin: 10px;
  cursor: pointer;
}

.export-btn {
  width: 100px;
  height: 50px;
  margin-left: 20px;
}

.export-btn button {
  width: 100%;
  height: 100%;
  cursor: pointer;
  color: white;
  background-color: #2c3e50;
  font-size: 14px;
}
</style>