<template>
  <div>
    <audio ref="audioPlayer" @ended="onEnd" @error="onEnd" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";

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
        wav_id: string;
        transcription: {
          [x: number]: {
            speaker: string;
            text: string;
          };
        };
      };
    }
  | {
      event: "reload";
      payload: {};
    };

interface TtsAction {
  url: string;
  transcription: {
    [x: number]: {
      speaker: string;
      text: string;
    };
  };
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

    const notFound = ref(false);
    const isConnected = ref(false);
    const audioPlayer = ref((null as unknown) as HTMLAudioElement);

    const i = setInterval(() => {
      if (!evtSource) isConnected.value = false;
      else {
        isConnected.value = evtSource.readyState === EventSource.OPEN
      }
    }, 3000);

    watch(isConnected, () => {
      if (!isConnected.value && opened) {
        if (reconnect) clearTimeout(reconnect)
        reconnect = setTimeout(() => init(), 1500);
      }
    })

    const onError = (ev: Event) => {
      if (!opened) {
        notFound.value = true;
        cleanup();
        setTimeout(() => location.reload(), 5000);
      } else {
        if (reconnect) clearTimeout(reconnect)
        reconnect = setTimeout(() => init(), 1500);
      }
    };

    const onEnd = () => {
      audioPlayer.value.pause();
      audioPlayer.value.currentTime = 0;
      audioPlayer.value.src = "";
      if (ttsQueue.length === 0) return;
      const action = ttsQueue.shift()!;
      audioPlayer.value.src = action.url;
      audioPlayer.value.play();
    };

    const checkProcessing = () => {
      if (audioPlayer.value.paused) onEnd();
    };

    const onAction = (ev: MessageEvent) => {
      const ae: ActionEvent = JSON.parse(ev.data);
      if (ae.event == "settings") {
      } else if (ae.event === "tts") {
        ttsQueue.push({
          url: `${ENV.API_URL}/v1/wav/${ae.payload.wav_id}.wav`,
          transcription: ae.payload.transcription,
        });
        checkProcessing();
      } else if (ae.event === "skip") {
        onEnd();
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
      console.log("starting eventsub")
      cleanup();
      evtSource = new EventSource(
        `${ENV.API_URL}/v1/sse/${route.params.id}`
      );
      evtSource.addEventListener("error", onError);
      // @ts-ignore
      evtSource.addEventListener("ready", onReady);
      // @ts-ignore
      evtSource.addEventListener("action", onAction);
      evtSource.addEventListener("open", onOpen);
    };

    const ttsQueue: TtsAction[] = [];

    onMounted(() => init());

    onBeforeUnmount(() => {
      cleanup();
      if (reconnect) clearTimeout(reconnect);
      clearInterval(i);
    });

    return {
      notFound,
      audioPlayer,
      onEnd,
    };
  },
});
</script>

<style lang="scss" scoped></style>
