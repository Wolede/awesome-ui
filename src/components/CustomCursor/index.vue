<template>
  <div>
    <div class="circle-cursor circle-cursor--inner" ref="innerCursor"></div>

    <div class="circle-cursor circle-cursor--outer" ref="outerCursor"></div>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  data() {
    return {
      innerEl: undefined,
      outerEl: undefined,
      outerCursorBox: undefined,
      outerCursorSpeed: 0,
      easing: false,
      clientX: -100,
      clientY: -100,
      showCursor: false,
      isStuck: undefined,
      outerCursorOriginals: undefined,
    }
  },
  methods: {
    initCursor() {
      // set the starting position of the cursor outside of the screen
      this.innerEl = this.$refs.outerCursor.previousElementSibling
      this.outerEl = this.$refs.innerCursor.nextElementSibling
      this.outerCursorBox = this.outerEl.getBoundingClientRect()
    },
    unveilCursor() {
      gsap.set(this.innerEl, {
        x: this.clientX,
        y: this.clientY,
      })
      gsap.set(this.outerEl, {
        x: this.clientX - this.outerCursorBox.width / 2,
        y: this.clientY - this.outerCursorBox.height / 2,
      })
      setTimeout(() => {
        this.outerCursorSpeed = 0.2
      }, 100)
      this.showCursor = true
    },
    animateCursor() {
      const render = () => {
        gsap.set(this.innerEl, {
          x: this.clientX,
          y: this.clientY,
        })
        if (!this.isStuck) {
          gsap.to(this.outerEl, {
            duration: this.outerCursorSpeed,
            x: this.clientX - this.outerCursorBox.width / 2,
            y: this.clientY - this.outerCursorBox.height / 2,
          })
        }
        if (this.showCursor) {
          document.removeEventListener('mousemove', this.unveilCursor)
        }
        requestAnimationFrame(render)
      }
      requestAnimationFrame(render)
    },
    animateHovers() {
      // hover style
      const hoverStyle = gsap.to(this.outerEl, {
        backgroundColor: this.$vuetify.theme.themes.light.secondary.base,
        opacity: 0.7,
        duration: 0.3,
        paused: true,
        // ease: this.easing,
      })

      const handleMouseEnter = () => {
        this.outerCursorSpeed = 0
        gsap.set(this.innerEl, { opacity: 0 })
        hoverStyle.play()
      }

      const handleMouseLeave = () => {
        this.outerCursorSpeed = 0.2
        gsap.set(this.innerEl, { opacity: 1 })
        hoverStyle.reverse()
      }

      // usage of styles
      const linkItems = document.querySelectorAll('a')
      linkItems.forEach(item => {
        item.addEventListener('mouseenter', handleMouseEnter)
        item.addEventListener('mouseleave', handleMouseLeave)
      })

      const ButtonItems = document.querySelectorAll('button')
      ButtonItems.forEach(item => {
        item.addEventListener('mouseenter', handleMouseEnter)
        item.addEventListener('mouseleave', handleMouseLeave)
      })
    },
  },
  mounted() {
    this.initCursor()
    // add listener to track the current mouse position
    document.addEventListener('mousemove', this.unveilCursor)
    document.addEventListener('mousemove', e => {
      this.clientX = e.clientX
      this.clientY = e.clientY
    })
    this.animateCursor()
    this.animateHovers()
  },
}
</script>

<style lang="scss" scoped>
.circle-cursor {
  @media screen and (max-width: 600px) {
    display: none;
  }
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  border-radius: 50%;
  &--outer {
    width: 30px;
    height: 30px;
    border: 2px solid var(--v-secondary-base);
    z-index: 12000;
    //   opacity: 0.2;
  }
  &--inner {
    width: 5px;
    height: 5px;
    left: -2.5px;
    top: -2.5px;
    z-index: 11000;
    background: var(--v-primary-base);
  }
}
</style>
