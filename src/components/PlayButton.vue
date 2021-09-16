<template>
  <button>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style="enable-background: new 0 0 512 512"
      xml:space="preserve"
      width="1em"
      height="1em"
    >
      <g v-if="paused">
        <path
          style="fill: #7bd9bf"
          d="M488.727,0H256H23.273C10.42,0,0,10.42,0,23.273v465.455C0,501.58,10.42,512,23.273,512H256h232.727
        C501.58,512,512,501.58,512,488.727V23.273C512,10.42,501.58,0,488.727,0z"
        />
        <polygon
          style="fill: #305557"
          points="367.632,236.266 256,166.495 256,166.495 	"
        />
        <path
          style="fill: #305557"
          d="M256,345.505l111.632-69.769L256,345.505z"
        />
        <path
          style="fill: #66b4ba"
          d="M200.068,380.463c-3.767,2.354-8.048,3.537-12.336,3.537c-3.88,0-7.765-0.968-11.281-2.917
        c-7.401-4.101-11.992-11.895-11.992-20.356V151.273c0-8.46,4.591-16.255,11.992-20.356c7.402-4.102,16.443-3.863,23.617,0.619
        L256,166.495V0H23.273C10.42,0,0,10.42,0,23.273v465.455C0,501.58,10.42,512,23.273,512H256V345.505L200.068,380.463z"
        />
        <path
          style="fill: #549498"
          d="M367.632,236.266L256,166.495l-55.932-34.957c-7.174-4.482-16.215-4.721-23.617-0.619
        c-7.399,4.099-11.99,11.894-11.99,20.354v209.455c0,8.46,4.591,16.254,11.992,20.356c3.516,1.949,7.401,2.917,11.281,2.917
        c4.288,0,8.569-1.184,12.336-3.537L256,345.505l111.632-69.769c6.805-4.253,10.938-11.711,10.938-19.735
        C378.57,247.977,374.436,240.519,367.632,236.266z"
        />
      </g>
      <g v-else>
        <rect style="fill: rgb(102, 180, 186)" width="512" height="512" />
        <rect x="256" style="fill: #7bd9bf" width="256" height="512" />
        <rect
          x="310.857"
          y="146.286"
          style="fill: #305557"
          width="73.143"
          height="219.429"
        />
        <rect
          x="128"
          y="146.286"
          style="fill: #305557"
          width="73.143"
          height="219.429"
        />
      </g>
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    paused: Boolean,
  },
  setup(props) {
    const paused = computed(() => props.paused);

    return {
      paused,
    };
  },
});
</script>

<style lang="scss" scoped>
button {
  font: inherit;
  background-color: transparent;
  border: 0;
  font-size: 2em;
  vertical-align: -0.3em;
  cursor: pointer;
  overflow: hidden;
  border-radius: 0.25em;
  * {
    pointer-events: none;
  }
}
</style>
