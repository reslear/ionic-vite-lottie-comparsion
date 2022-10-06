<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ionic Vite - Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div>
        <h2>Dynamic import</h2>
        <ion-button @click="startDynamicLoadModule()">Start</ion-button>
        <div v-if="dynamicLoadModule.json">
          <div>time: {{ dynamicLoadModule.time }}ms</div>
        </div>
      </div>

      <div>
        <h2>Dot Lottie Player</h2>
        <ion-button @click="startDotLottiePlayer()">Start</ion-button>

        <div v-if="dotLottiePlayer.display">
          <div>time: {{ dotLottiePlayer.time }}ms</div>

          <lottie-player
            ref="dotLottiePlayerRef"
            autoplay
            controls
            loop
            mode="normal"
            :src="dotLottiePlayer.jsonFileUrl"
            style="width: 320px"
            @ready="endDotLottiePlayer()"
          ></lottie-player>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonContent,
  IonButton,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import { reactive, ref, shallowReactive, shallowRef } from 'vue'
import * as LottiePlayer from '@lottiefiles/lottie-player'

const jsonFile = '../assets/private-events.json'

function getFileUrl() {
  const url = new URL(jsonFile, import.meta.url).href
  return `${url}?${+new Date()}`
}

const dynamicLoadModule = shallowReactive({
  json: '',
  time: 0,
})

const dotLottiePlayer = shallowReactive({
  startTime: 0,
  time: 0,
  display: false,
  jsonFileUrl: '',
})
const dotLottiePlayerRef = ref()

// output with Module Dynamic Load
// dist/assets/private-events.408775f5.js   711.97 KiB / gzip: 42.89 KiB
async function startDynamicLoadModule() {
  const start = window.performance.now()

  await import('../assets/private-events.json').then((module) => {
    dynamicLoadModule.json = JSON.stringify(module.default)
  })

  const end = window.performance.now()
  dynamicLoadModule.time = Math.round(end - start)
}

async function startDotLottiePlayer() {
  Object.assign(dotLottiePlayer, {
    startTime: window.performance.now(),
    display: true,
    jsonFileUrl: getFileUrl(),
  })
}

async function endDotLottiePlayer() {
  const end = window.performance.now()
  dotLottiePlayer.time = Math.round(end - dotLottiePlayer.startTime)
}
</script>

<style></style>
