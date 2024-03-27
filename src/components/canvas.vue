<template>
    <div class="container d-flex flex-column justify-content-center" style="height: 100vh;">
      <div class="row d-flex flex-row align-content-stretch">
        <div class="col-10">
          <canvas ref="canvas" width="600" height="480" class="border border-dark"
                  @mousedown="handleMouseDown"
                  @mousemove="handleMouseMove"
                  @mouseup="handleMouseUp"
                  @mouseleave="handleMouseUp"
                  @touchstart="handleTouchStart"
                  @touchmove="handleTouchMove"
                  @touchend="handleTouchEnd">
          </canvas>
        </div>
        <div class="col-2">
            <div class="color-panel d-grid gap-3">
                <div class="width d-flex flex-column justify-content-between">
                    <button class="btn btn-info mb-1" disabled>文字大小</button>
                    <div class="linesize">
                        <button class="btn btn-outline-secondary rounded-circl" @click="changeLineWidth(5)">小</button>
                        <button class="btn btn-outline-secondary rounded-circl" @click="changeLineWidth(10)">中</button>
                        <button class="btn btn-outline-secondary rounded-circl" @click="changeLineWidth(15)">大</button>
                    </div>
                </div>
                <div class="color d-flex flex-column justify-content-center d-grid gap-1">
                    <button class="btn btn-info" disabled>顏色選盤</button>
                    <button class="btn btn-dark rounded-circl B-black" @click.prevent="setcolor('#000000')" @touchend="this.brushColor='#000000'">黑色</button>
                    <button class="btn btn-success rounded-circl" @click="setcolor('#198754')" @touchend="this.brushColor='#198754'">綠色</button>
                    <button class="btn btn-danger rounded-circl" @click="setcolor('#DC3545')" @touchstart="this.brushColor='#DC3545'">紅色</button>
                    <button class="btn btn-primary" @click="setcolor('#0D6EFD')" @touchend="this.brushColor='#0D6EFD'">藍色</button>
                    <button class="btn btn-warning" @click="setcolor('#FFC107')" @touchend="this.brushColor='#FFC107'">黃色</button>    
                </div>
                
                <button class="btn btn-danger" @click="clearCanvas" @touchend="clearCanvas">清空</button>
            </div>
            
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import 'bootstrap/dist/css/bootstrap.css'

  export default {
    name: 'CanvasDrawing',
    data() {
      return {
        brushSize: 5,
        brushColor: '#198754',
        isDrawing: false,
        lastX: 0,
        lastY: 0,
        ctx: null,
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        prevPinchDistance: 0,
      }
    },
    mounted() {
        this.ctx = this.$refs.canvas.getContext('2d');
        this.initCanvas()
    },
    methods: {
        setcolor(color){
            this.brushColor = color;
        },
        changeLineWidth(width){
            this.brushSize = width;
        },
        initCanvas() {
            this.ctx.lineWidth = this.brushSize
            this.ctx.lineJoin = 'round'
            this.ctx.lineCap = 'round'
            this.ctx.strokeStyle = this.brushColor
        },
        handleMouseDown(event) {
            this.isDrawing = true
            this.ctx.beginPath()
            const rect = this.$refs.canvas.getBoundingClientRect()
            const x = (event.clientX - rect.left - this.offsetX) / this.scale
            const y = (event.clientY - rect.top - this.offsetY) / this.scale
            this.ctx.moveTo(x, y)
            this.lastX = x
            this.lastY = y
        },
        handleMouseMove(event) {
            if (!this.isDrawing) return
            const rect = this.$refs.canvas.getBoundingClientRect()
            const x = (event.clientX - rect.left - this.offsetX) / this.scale
            const y = (event.clientY - rect.top - this.offsetY) / this.scale
            this.ctx.lineTo(x, y)
            this.ctx.lineWidth = this.brushSize
            this.ctx.strokeStyle = this.brushColor
            this.ctx.stroke()
            this.lastX = x
            this.lastY = y
        },
        handleMouseUp() {
            this.isDrawing = false
            this.ctx.closePath()
        },
        handleTouchStart(event) {
            event.preventDefault()
            if (event.touches.length === 1) {
                this.isDrawing = true
                this.ctx.beginPath()
                const rect = this.$refs.canvas.getBoundingClientRect()
                const x = (event.touches[0].clientX - rect.left - this.offsetX) / this.scale
                const y = (event.touches[0].clientY - rect.top - this.offsetY) / this.scale
                this.ctx.moveTo(x, y)
                this.lastX = x
                this.lastY = y
            } else if (event.touches.length === 2) {
                this.prevPinchDistance = Math.hypot(
                event.touches[0].clientX - event.touches[1].clientX,
                event.touches[0].clientY - event.touches[1].clientY
                )
            }
        },
        handleTouchMove(event) {
            event.preventDefault()
            if (event.touches.length === 1 && this.isDrawing) {
                const rect = this.$refs.canvas.getBoundingClientRect()
                const x = (event.touches[0].clientX - rect.left - this.offsetX) / this.scale
                const y = (event.touches[0].clientY - rect.top - this.offsetY) / this.scale
                this.ctx.lineTo(x, y)
                this.ctx.lineWidth = this.brushSize
                this.ctx.strokeStyle = this.brushColor
                this.ctx.stroke()
                this.lastX = x
                this.lastY = y
            } else if (event.touches.length === 2) {
                const currentPinchDistance = Math.hypot(
                    event.touches[0].clientX - event.touches[1].clientX,
                    event.touches[0].clientY - event.touches[1].clientY
                )
                const deltaScale = currentPinchDistance / this.prevPinchDistance
                this.scale *= deltaScale
                this.prevPinchDistance = currentPinchDistance
            } else if (event.touches.length === 3) {
                const dx = event.touches[0].clientX - event.touches[2].clientX
                const dy = event.touches[0].clientY - event.touches[2].clientY
                this.offsetX += dx / this.scale
                this.offsetY += dy / this.scale
            }
        },
        handleTouchEnd() {
            this.isDrawing = false
            this.ctx.closePath()
        },
        clearCanvas() {
            this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
        },
    },
}
</script>
  
  <style lang="scss" scoped>
  canvas {
    display: block;
    margin: 0 auto;
  }
  .color-panel{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>