<template>
  <div class="overlay" :class="{ fade: alertImageFade }">
    <img class="alert-image" :src="alertImage" />
    <span v-if="alertText" class="text">
      <template v-for="(word, i) in alertText">
        <span v-if="word.animate" class="wiggle" :key="i">
          <span class="animated-letter" v-for="(l, n) in word.word" :key="`${i}-${n}`">{{l}}</span>
        </span>
        {{ word.extra }}
      </template>
    </span>
    <span v-if="alertSubText" class="sub-text">{{ alertSubText }}</span>
    <audio ref="alertPlayer" @ended="onEndAlert" />
    <audio ref="audioPlayer" @ended="onEnd" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { useHead } from "@vueuse/head";
import { LocationQueryValue, useRoute } from "vue-router";

type ActionEvent =
  | {
      event: "settings";
      payload: {};
    }
  | {
      event: "skip";
      payload: {};
    }
  | {
      event: "tts";
      payload: {
        wav_id: string | null;
        alert: null | {
          type: string;
          image: string;
          audio: string;
          text: string;
          sub_text: string;
        };
      };
    }
  | {
      event: "reload";
      payload: {};
    };

interface TtsAction {
  url: string | null;
  alert: null | {
    image_url: string;
    audio_url: string;
    text: string;
    sub_text: string;
  };
}

interface AlertWord {
  animate: boolean;
  word: string;
  extra: string;
}

let ENV: any;

export default defineComponent({
  setup() {
    useHead({
      bodyAttrs: {
        class: "overlay",
      },
    });

    const route = useRoute();

    let evtSource: EventSource;
    let reconnect: NodeJS.Timeout;
    let opened = false;

    const ttsQueue: TtsAction[] = [];

    const alertImageFade = ref(false);
    const alertImage = ref("");
    const alertText = ref([] as AlertWord[]);
    const alertSubText = ref("");
    const alertPlayer = ref((null as unknown) as HTMLAudioElement);

    const notFound = ref(false);
    const isConnected = ref(false);
    const audioPlayer = ref((null as unknown) as HTMLAudioElement);

    const i = setInterval(() => {
      if (!evtSource) isConnected.value = false;
      else {
        isConnected.value = evtSource.readyState === EventSource.OPEN;
      }
    }, 3000);

    watch(isConnected, () => {
      if (!isConnected.value && opened) {
        if (reconnect) clearTimeout(reconnect);
        reconnect = setTimeout(() => init(), 1500);
      }
    });

    const onError = (ev: Event) => {
      if (!opened) {
        notFound.value = true;
        cleanup();
        setTimeout(() => location.reload(), 5000);
      } else {
        if (reconnect) clearTimeout(reconnect);
        reconnect = setTimeout(() => init(), 1500);
      }
    };

    let action: TtsAction | undefined;
    let actionStartTime = 0;
    let waiting = false;
    let endReject = null as null | (() => void);

    const onEnd = async (skip?: boolean) => {
      try {
        if (skip !== true && action?.alert) {
          const diff = actionStartTime + 12000 - Date.now();
          if (diff > 0) {
            waiting = true;
            await new Promise((resolve, reject) => {
              endReject = reject;
              setTimeout(resolve, diff);
            }).finally(() => {
              endReject = null;
              waiting = false;
            });
          }
        }

        console.log("end triggered");
        if (!audioPlayer.value.paused) {
          audioPlayer.value.pause();
          audioPlayer.value.currentTime = 0;
          audioPlayer.value.src = "";
        }

        if (!alertPlayer.value.paused) {
          alertPlayer.value.pause();
          alertPlayer.value.currentTime = 0;
          alertPlayer.value.src = "";
        }

        if (alertImageFade.value) {
          alertImageFade.value = false;
          await new Promise((resolve, reject) => {
            endReject = reject;
            setTimeout(resolve, 400);
          }).finally(() => {
            endReject = null;
          });
          alertImage.value = "";
          alertText.value = [];
          alertSubText.value = "";
        }

        actionStartTime = 0;

        if (ttsQueue.length === 0) return;
        action = ttsQueue.shift()!;
        if (action.alert) {
          alertImage.value = action.alert.image_url;
          await new Promise((resolve, reject) => {
            endReject = reject;
            setTimeout(resolve, 400);
          }).finally(() => {
            endReject = null;
          });
          alertImageFade.value = true;
          
          const arr: AlertWord[] = [];
          let currentWord: AlertWord = {
            animate: false,
            word: "",
            extra: "",
          }

          const split = action.alert.text.split(" ");
          for (const word of split) {
            if (word.charAt(0) === '~') {
              if (currentWord.word || currentWord.extra) {
                currentWord.extra += " ";
                arr.push(currentWord);
              }
              currentWord = {
                animate: true,
                word: word.substr(1),
                extra: "",
              }
            } else {
              currentWord.extra += ` ${word}`
            }
          }

          if (currentWord.word || currentWord.extra) arr.push(currentWord);

          alertText.value = arr;
          alertSubText.value = action.alert.sub_text;

          alertPlayer.value.src = action.alert.audio_url;
          await alertPlayer.value.play();
        } else if (action.url) {
          audioPlayer.value.src = action.url;
          await audioPlayer.value.play();
          actionStartTime = Date.now();
        }
      } catch (e) {
        if (e) console.error(e);
      }
    };

    const onEndAlert = () => {
      if (!action) return onEnd();
      actionStartTime = Date.now();
      if (action.url) {
        audioPlayer.value.src = action.url;
        audioPlayer.value.play();
      } else {
        onEnd();
      }
    };

    const checkProcessing = () => {
      if (audioPlayer.value.paused && alertPlayer.value.paused && !waiting)
        onEnd();
    };

    const onAction = (ev: MessageEvent) => {
      const ae: ActionEvent = JSON.parse(ev.data);
      if (ae.event == "settings") {
      } else if (ae.event === "tts") {
        ttsQueue.push({
          url: ae.payload.wav_id
            ? `${ENV.API_URL}/v1/wav/${ae.payload.wav_id}.wav`
            : null,
          alert: ae.payload.alert
            ? {
                image_url: `${ENV.API_URL}/v1/alerts/${ae.payload.alert.type}/${ae.payload.alert.image}`,
                audio_url: `${ENV.API_URL}/v1/alerts/${ae.payload.alert.type}/${ae.payload.alert.audio}`,
                text: ae.payload.alert.text,
                sub_text: ae.payload.alert.sub_text,
              }
            : null,
        });
        checkProcessing();
      } else if (ae.event === "skip") {
        if (endReject) endReject();
        onEnd(true);
      } else if (ae.event === "reload") {
        window.location.reload();
      }
    };

    const onReady = (ev: MessageEvent) => {
      // console.log(ev);
    };

    const onOpen = (ev: Event) => {
      // console.log(ev);
      opened = true;
    };

    const cleanup = () => {
      if (evtSource) {
        evtSource.close();
        evtSource.removeEventListener("error", onError);
        // @ts-ignore
        evtSource.removeEventListener("ready", onReady);
        // @ts-ignore
        evtSource.removeEventListener("action", onAction);
        evtSource.removeEventListener("open", onOpen);
      }
    };

    const init = () => {
      console.log("starting eventsub");

      alertPlayer.value.volume = parseFloat((route.query.alertVolume as LocationQueryValue)?.toString() || "50")/100;
      audioPlayer.value.volume = parseFloat((route.query.ttsVolume as LocationQueryValue)?.toString() || "100")/100;

      cleanup();
      evtSource = new EventSource(`${ENV.API_URL}/v1/sse/${route.params.id}`);
      evtSource.addEventListener("error", onError);
      // @ts-ignore
      evtSource.addEventListener("ready", onReady);
      // @ts-ignore
      evtSource.addEventListener("action", onAction);
      evtSource.addEventListener("open", onOpen);
    };

    onMounted(() => init());

    onBeforeUnmount(() => {
      cleanup();
      if (reconnect) clearTimeout(reconnect);
      clearInterval(i);
    });

    return {
      onEndAlert,
      alertImageFade,
      alertImage,
      alertText,
      alertSubText,
      alertPlayer,
      notFound,
      audioPlayer,
      onEnd,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@scss/overlay.scss";
</style>
