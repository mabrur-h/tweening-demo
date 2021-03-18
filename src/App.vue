<template>
  <div id="app">
    <img :width="250" :src="`/asian/${Math.abs(sliderValue-399)}.jpg`" class="frame"/>


      <div class="vent-outer">
          <div v-for="i in 80" :key="i">
              <div v-if="i*6 < sliderValue / 1.11"
                      class="vent" :style="`transform: rotate(${6*(i+1)}deg) translate(160px) rotate(90deg);`">
              </div>
          </div>
      </div>
    <figure class="dial">
      <round-slider
          class="rangeSlider"
          v-model="sliderValue"
          :max="maxValue"
          :min="1"
          :width="sliderWidth"
          :radius="radius"
          :start-angle="startAngle"
          pathColor="transparent"
          rangeColor="transparent"
          :change="changeRange()"
          line-cap="butt"
      ></round-slider>
      <div class="center">
          <span>{{ sliderValue }}</span>
      </div>
      <div class="wrapper">
        <div class="knob"   :style="`transform: rotate(${sliderValue/1.12}deg)`">
          <div class="handle"></div>
        </div>
      </div>
      <canvas ref="canvas" id="c" class="progress"></canvas>
    </figure>


    <div class="all-images" style="display: none; visibility: hidden">
      <img v-for="i in 399" :key="i"
          :width="250"
          :src="`/asian/${i+1}.jpg`"
          class="frame"/>
    </div>

  </div>
</template>

<script>
import RoundSlider from 'vue-round-slider'

export default {
  name: 'App',
  components: {
    RoundSlider
  },
  data() {
    return {
      ref: null,
      mdown: false,
      mPos: {
        x: 0,
        y: 0
      },
      elementPosition: {
        x: 0,
        y: 0
      },
      target: 0,
      steps: 6,
      radius: 135,
      maxDiff: 150,
      sliderValue: 360,
      maxValue: 400,
      currentVal: 1,
      sliderWidth: 10,
      startAngle: 90,
      vueCanvas: 2,
      ctx: null
    }
  },
  methods: {
    changeRange() {
      // this.drawRect()
    },


    incrementValue(val) {
      setInterval(() => {
        if (this.sliderValue >= 40 && this.sliderValue <= 360) {
          this.sliderValue--
        }
      },66);
    }
  },
  created() {
    setTimeout(this.incrementValue, 10000);
  },
  mounted() {
    let c = document.getElementById("c");
    console.log(c.getContext('2d'))
    this.vueCanvas = c.getContext('2d')
  },
}
</script>
<style>
.rs-animation .rs-transition {
  transition: none !important;
}
.vent-outer {
    position: absolute;
    width: 400px;
    height: 400px;
    left: 50%;
    margin-left: -240px;
    margin-top: -10px;
    transform: rotate(
            265deg
    );
}
.vent {
    width: 2px;
    height: 22px;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0 1px 3px 0px rgb(0 0 0 / 50%) inset;
    filter: drop-shadow(0 1px 1px rgba(255, 255, 255, 0.4));
    position: absolute;
    top: 60%;
    left: 50%;
    margin-top: -11px;
    margin-left: -5px;
}
.rangeSlider {
  position: absolute;
  margin-top: 40px;
  margin-left: 40px;
}
.frame {
  border: 1px solid gray
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html,
body {

}

body {
  background: #111;
}

.dial {
  position: absolute;
  width: 350px;
  height: 350px;
  display: block;
  left: 50%;
  margin-left: -175px;
  cursor: pointer;
}

.dial .wrapper {
  position: absolute;
  width: 300px;
  height: 300px;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -150px;
  border-radius: 300px;
  cursor: pointer;
  background: linear-gradient(-45deg, #171717 0%, #272727 100%);
  box-shadow: inset 0px 1px 1px 0px #999, 0px 0px 0px 4px black;
}

.dial .knob {
  position: absolute;
  width: 300px;
  height: 300px;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -150px;
  border-radius: 300px;
  cursor: pointer;
  -webkit-user-select: none;
}

.dial .center {
  position: absolute;
  background: #c5c8b3;
  width: 100px;
  height: 100px;
  left: 50%;
  top: 50%;
  border: 6px solid #1b1c1a;
  margin-left: -56px;
  margin-top: -56px;
  border-radius: 300px;
  color: white;
  z-index: 1;
  -webkit-user-select: none;
  box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 0.08), inset 0px 0px 10px 4px #6a6c60;
}

.dial .center span {
  position: relative;
  display: block;
  top: 40px;
  width: 100px;
  text-align: center;
  font-size: 24px;
  color: #454541;
  font-weight: bold;
  text-shadow: 0px 1px 0px #eee;
}

.dial .handle {
  position: absolute;
  background: #171717;
  width: 46px;
  height: 46px;
  left: 50%;
  top: 50%;
  margin-left: -23px;
  margin-top: -112px;
  border-radius: 46px;
  box-shadow: inset 0px 0px 6px 4px #1a1a1a, 1px 1px 2px 0px rgba(255, 255, 255, 0.2), inset 1px 2px 4px 2px rgba(0, 0, 0, 0.4), inset -8px -8px 6px 1px #222222;
}

.dial .indicator {
  position: absolute;
  background: #eeeadc;
  width: 10px;
  height: 10px;
  top: 12px;
  left: 50%;
  margin-left: -6px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 1px white;
}

.dial .progress {
  position: absolute;
  width: 120px;
  height: 120px;
}


</style>
