<template>
  <div class="a group transform-gpu cursor-pointer">
    <div class="relative bg-stage transition-transform duration-300 group-hover:rotate-x-10 ease-boing">
      <div class="z relative py-[0.4em] px-[1em] bg-gradient-to-br rounded-lg flex items-center justify-center font-callout" :class="[bg, textSize]">
        <slot></slot>
        <div class="foo absolute top-1/2 left-1/2 w-full h-full py-[0.4em] px-[1em] -translate-x-1/2 -translate-y-1/2"><slot></slot></div>
        <div class="foo absolute top-1/2 left-1/2 w-full h-full py-[0.4em] px-[1em] -translate-x-1/2 -translate-y-1/2"><slot></slot></div>
        <div class="foo absolute top-1/2 left-1/2 w-full h-full py-[0.4em] px-[1em] -translate-x-1/2 -translate-y-1/2"><slot></slot></div>
        <div class="foo absolute top-1/2 left-1/2 w-full h-full py-[0.4em] px-[1em] -translate-x-1/2 -translate-y-1/2"><slot></slot></div>
        <div class="foo absolute top-1/2 left-1/2 w-full h-full py-[0.4em] px-[1em] -translate-x-1/2 -translate-y-1/2"><slot></slot></div>
      </div>
      <div class="z absolute inset-0 rounded-lg outline outline-3" :class="[border]"></div>
      <div class="z absolute inset-0 rounded-lg outline outline-3" :class="[border2]"></div>
      <div class="z absolute inset-0 rounded-lg outline outline-3" :class="[border2]"></div>
      <div class="z absolute inset-0 rounded-lg outline outline-3" :class="[border2]"></div>
    </div>
    <!-- <button class="relative b group cursor-pointer transform-gpu hover:scale-110 transition-transform duration-500 p-2">
      <div class="button-stage font-callout text-gray-100 text-3xl transition-transform duration-500 group-hover:rotate-x-20" :style="styles">
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="button-layer"></div>
        <div class="opacity-0">
          <slot></slot>
        </div>
      </div>
    </button> -->
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  text: String,
  color: String,
  size: {
    type: String,
  },
})

// test commit
const { text, color, size } = toRefs(props)

const bg = computed(() => {
  if (color.value === 'green') {
    return 'from-violet-400 to-purple-500'
  } else {
    return 'from-cyan-400 to-sky-500'
  }
})

const border = computed(() => {
  if (color.value === 'green') {
    return 'bg-violet-600 outline-violet-600'
  } else {
    return 'from-cyan-600 outline-cyan-600'
  }
})

const border2 = computed(() => {
  if (color.value === 'green') {
    return 'outline-violet-800'
  } else {
    return 'outline-cyan-800'
  }
})

const textSize = computed(() => {
  return size.value === 'sm' ? 'text-lg' : size.value === 'lg' ? 'text-3xl' : 'text-xl'
})

const styles = computed(() => ({
  '--text': `"${text.value}"`,
}))

const test = computed(() => {
  if (color.value === 'green') {
    return '#6d28d9'
  }

  return '#0369a1'
})
</script>

<style>
.a {
  perspective: 100vw;
  transform-style: preserve-3d;
}

.b {
  perspective: 100vw;
  transform-style: preserve-3d;
}

.button-stage {
  position: relative;
  transform-style: preserve-3d;
  /* transform: rotateY(10deg) translateZ(0); */
}

.bg-stage {
  position: relative;
  transform-style: preserve-3d;
  /* transform: rotateY(10deg) translateZ(0); */
}

.button-layer {
  /* font: 4rem/0.95 "Carter One", "Domgle", Futura, "Roboto", "Trebuchet MS", Helvetica, sans-serif; */
  /* width: 100%; */
  /* height: 100%; */
  /* position: absolute; */
  /* top: 50%; */
  /* left: 50%; */
  color: var(--text);
  transform-style: preserve-3d;
  /* transform: rotateY(10deg) translateZ(0); */
}

.button-layer:after {
  /* font: 4rem/0.95 "Carter One", "Domgle", Futura, "Roboto", "Trebuchet MS", Helvetica, sans-serif; */
  content: var(--text);
  white-space: pre;
  text-align: center;
  /* height: 100%; */
  /* width: 100%; */
  position: absolute;
  left: 0;
  /* top: 50px; */
  /* letter-spacing: -2px; */
  text-shadow: 4px 0 10px rgba(0, 0, 0, 0.13);
}

.button-layer:nth-child(1):after {
  transform: translateZ(0px);
}

.button-layer:nth-child(2):after {
  /* transform: translateZ(-1.5px); */
  transform: translateZ(-0.03em);
}

.button-layer:nth-child(3):after {
  transform: translateZ(-0.06em);
}

.button-layer:nth-child(4):after {
  transform: translateZ(-0.09em);
}

.button-layer:nth-child(5):after {
  transform: translateZ(-0.12em);
}

.button-layer:nth-child(6):after {
  transform: translateZ(-0.15em);
}

.button-layer:nth-child(7):after {
  transform: translateZ(-0.18em);
}

.button-layer:nth-child(8):after {
  transform: translateZ(-0.21em);
}

.button-layer:nth-child(9):after {
  transform: translateZ(-0.24em);
}

.button-layer:nth-child(10):after {
  transform: translateZ(-0.27em);
}

.button-layer:nth-child(11):after {
  transform: translateZ(-0.3em);
}

.button-layer:nth-child(12):after {
  transform: translateZ(-0.33em);
}

.button-layer:nth-child(13):after {
  transform: translateZ(-0.36em);
}

.button-layer:nth-child(14):after {
  transform: translateZ(-0.39em);
}

.button-layer:nth-child(15):after {
  transform: translateZ(-0.42em);
}

.button-layer:nth-child(16):after {
  transform: translateZ(-0.45em);
}

.button-layer:nth-child(17):after {
  transform: translateZ(-0.48em);
}

.button-layer:nth-child(18):after {
  transform: translateZ(-0.51em);
}

.button-layer:nth-child(19):after {
  transform: translateZ(-0.54em);
}

.button-layer:nth-child(20):after {
  transform: translateZ(-0.57em);
}

.button-layer:nth-child(n+10):after {
  -webkit-text-stroke: 0.06em rgba(0, 0, 0, 0.25);
}
/* 1.5 = 0.03 */
.button-layer:nth-child(n+11):after {
  -webkit-text-stroke: 0.3em v-bind(test);
  text-shadow: 0.12em 0 0.12em #00366b, 0.1em 0.1em 0.1em #002951, 0 0.12em 0.12em #00366b;
}

.button-layer:nth-child(n+12):after {
  -webkit-text-stroke: 0.3em #0077ea;
}

.button-layer:last-child:after {
  -webkit-text-stroke: 0.4em rgba(0, 0, 0, 0.1);
}

.button-layer:first-child:after {
  color: #fff;
  text-shadow: none;
}


.z, .foo {
  transform-style: preserve-3d;
}

.z {
  background-color: v-bind(test);
}

.z:nth-child(1) {
  transform: translateZ(-5px) ;
}

.z:nth-child(2) {
  /* background: #cccccc; */
  /* outline: 4px solid #0369a1; */
  transform: translateZ(-10px);
}

.z:nth-child(3) {
  /* background: #eeeeee; */
  /* outline: 4px solid #0c4a6e; */
  transform: translateZ(-15px);
}

.z:nth-child(4) {
  /* background: #eeeeee; */
  /* outline: 4px solid #0c4a6e; */
  transform: translateZ(-20px);
}

.z:nth-child(5) {
  /* background: #eeeeee; */
  /* outline: 4px solid #0c4a6e; */
  transform: translateZ(-25px);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.9);
}

.foo:nth-child(1) {
  -webkit-text-stroke: 4px v-bind(test);
  transform: translateZ(3px) translateX(-50%) translateY(-50%);
  text-shadow: 0 0 10px rgba(0, 0, 0, .5);
}

.foo:nth-child(2) {
  -webkit-text-stroke: 4px v-bind(test);
  transform: translateZ(6px) translateX(-50%) translateY(-50%);
  text-shadow: 0 0 5px rgba(0, 0, 0, .5);
}

.foo:nth-child(3) {
  -webkit-text-stroke: 4px v-bind(test);
  transform: translateZ(9px) translateX(-50%) translateY(-50%);
}

.foo:nth-child(4) {
  -webkit-text-stroke: 4px v-bind(test);
  transform: translateZ(12px) translateX(-50%) translateY(-50%);
}

.foo:nth-child(5) {
  color: white;
  transform: translateZ(15px) translateX(-50%) translateY(-50%);
}
</style>
