<template>
  <div class="demo">
    <div class="container">
      <h1>AdmiralBulldog TTS-Voices</h1>
      <details open>
        <summary class="h2">Usage Guide</summary>
        <ul>
          <li>
            Anything overly sexual or hateful will result in being permabanned.
          </li>
          <li>You can have a maximum of 5 different voice swaps.</li>
          <!-- <li>You can add a maximum of 15 different sound bytes.</li> -->
          <li>
            If your message is too obnoxious or annoying it can be skipped
            without refund.
          </li>
          <li>You can change voice by doing voice + ":"</li>
          <!-- <li>You can insert a sound byte by "(" + soundbyte + ")"</li> -->
          <li>
            By default some words are changed to help the model pronounce it
            better, you can disable feature by wrapping whatever you want to say
            in backtick characters. Example: `hello`
          </li>
          <li>
            <h3>Subscriptions</h3>
            <p>
              The following voice brackets, indicate when the voices become unlocked.
            </p>
            <p>It also is when the voice is unlocked.</p>
            <p>
              i.e. a 3 month sub cannot use rae's voice until they are a 41
              month sub but a 56 month sub can use rae's voice.
            </p>
            <p>
              The default voice for subscriptions is obama.
            </p>
            <ul>
              <li>
                Voices enabled by default: narr1, narr2, narr3, ann1, bull, obama
              </li>
              <li>At 10 months of subscription you unlock arno</li>
              <li>At 13 months of subscription you unlock lac</li>
              <li>At 16 months of subscription you unlock krab</li>
              <li>At 22 months of subscription you unlock glad</li>
              <li>At 41 months of subscription you unlock rae</li>
              <li>At 56 months of subscription you unlock</li>
            </ul>
          </li>
          <li>
            <h3>Bits and Donations</h3>
            <p>Every 100 bits = 1 Euro.</p>
            <p>The default voice for donations is bull</p>
            <p>
              All bit emotes are stripped. Such as Cheer100 or PogChamp1000.
            </p>
            <ul>
              <li>
                3 Euro and above enables narr1, narr2, narr3, ann1, bull, obama,
                arno, krab
              </li>
              <li>6 Euro and above enables Lacari & Glados</li>
              <li>10 Euro and above enables Rae & Pooh</li>
            </ul>
          </li>
        </ul>
      </details>
      <details open>
        <summary class="h2">Avaliable Voices</summary>
        <div class="voices">
          <div class="voice" @click.prevent="onClick">
            <details>
              <summary @mousedown.prevent>rae: Raeyei</summary>
              <p @click.stop>
                <PlayButton
                  @click="playing !== 0 ? (playing = 0) : (playing = -1)"
                  :paused="playing !== 0"
                />rae: bulldog is my best friend.
              </p>
              <audio
                src="@voices/rae-example.wav"
                ref="audio-0"
                @ended="playing = -1"
              />
            </details>
          </div>
          <div class="voice" @click.prevent="onClick">
            <details>
              <summary @mousedown.prevent>bull: Bulldog</summary>
              <p @click.stop>
                <PlayButton
                  @click="playing !== 1 ? (playing = 1) : (playing = -1)"
                  :paused="playing !== 1"
                />bull: i am infact half chinese.
              </p>
              <audio
                src="@voices/bull-example.wav"
                ref="audio-1"
                @ended="playing = -1"
              />
            </details>
          </div>
          <div class="voice" @click.prevent="onClick">
            <details>
              <summary @mousedown.prevent>lac: Lacari</summary>
              <p @click.stop>
                <PlayButton
                  @click="playing !== 2 ? (playing = 2) : (playing = -1)"
                  :paused="playing !== 2"
                />lac: i promise i will play it today no scam this time.
              </p>
              <audio
                src="@voices/lac-example.wav"
                ref="audio-2"
                @ended="playing = -1"
              />
            </details>
          </div>
          <div class="voice" @click.prevent="onClick">
            <details>
              <summary @mousedown.prevent>ann1: Announcer</summary>
              <p @click.stop>
                <PlayButton
                  @click="playing !== 3 ? (playing = 3) : (playing = -1)"
                  :paused="playing !== 3"
                />ann1: in the left we have a fat man.
              </p>
              <audio
                src="@voices/ann1-example.wav"
                ref="audio-3"
                @ended="playing = -1"
              />
            </details>
          </div>
          <div class="voice" @click.prevent="onClick">
            <details>
              <summary @mousedown.prevent>krab: Mr Krabs</summary>
              <p @click.stop>
                <PlayButton
                  @click="playing !== 4 ? (playing = 4) : (playing = -1)"
                  :paused="playing !== 4"
                />krab: GIMME YOUR MONEY!
              </p>
              <audio
                src="@voices/krab-example.wav"
                ref="audio-4"
                @ended="playing = -1"
              />
            </details>
          </div>
          <div class="voice" @click.prevent="onClick">
            <details>
              <summary @mousedown.prevent>glad: GladOS</summary>
              <p @click.stop>
                <PlayButton
                  @click="playing !== 5 ? (playing = 5) : (playing = -1)"
                  :paused="playing !== 5"
                />glad: Here Come The Test Results, You Are A Horrible Person.
              </p>
              <audio
                src="@voices/glad-example.wav"
                ref="audio-5"
                @ended="playing = -1"
              />
            </details>
          </div>
          <div class="voice" @click.prevent="onClick">
            <details>
              <summary @mousedown.prevent>arno: Arnold</summary>
              <p @click.stop>
                <PlayButton
                  @click="playing !== 6 ? (playing = 6) : (playing = -1)"
                  :paused="playing !== 6"
                />arno: I need your clothes, your boots, and your motorcycle.
              </p>
              <audio
                src="@voices/arno-example.wav"
                ref="audio-6"
                @ended="playing = -1"
              />
            </details>
          </div>
          <div class="voice" @click.prevent="onClick">
            <details>
              <summary @mousedown.prevent>pooh: Winnie The Pooh</summary>
              <p @click.stop>
                <PlayButton
                  @click="playing !== 7 ? (playing = 7) : (playing = -1)"
                  :paused="playing !== 7"
                />pooh: I love china.
              </p>
              <audio
                src="@voices/pooh-example.wav"
                ref="audio-7"
                @ended="playing = -1"
              />
            </details>
          </div>
          <div class="voice" @click.prevent="onClick">
            <details>
              <summary @mousedown.prevent>narr1: Narrator</summary>
              <p @click.stop>
                <PlayButton
                  @click="playing !== 8 ? (playing = 8) : (playing = -1)"
                  :paused="playing !== 8"
                />narr1: I am reading a book on your mother.
              </p>
              <audio
                src="@voices/narr1-example.wav"
                ref="audio-8"
                @ended="playing = -1"
              />
            </details>
          </div>
          <div class="voice" @click.prevent="onClick">
            <details>
              <summary @mousedown.prevent>narr2: Narrator 2</summary>
              <p @click.stop>
                <PlayButton
                  @click="playing !== 9 ? (playing = 9) : (playing = -1)"
                  :paused="playing !== 9"
                />narr2: I am reading a book on your sister.
              </p>
              <audio
                src="@voices/narr2-example.wav"
                ref="audio-9"
                @ended="playing = -1"
              />
            </details>
          </div>
          <div class="voice" @click.prevent="onClick">
            <details>
              <summary @mousedown.prevent>narr3: Narrator 3</summary>
              <p @click.stop>
                <PlayButton
                  @click="playing !== 10 ? (playing = 10) : (playing = -1)"
                  :paused="playing !== 10"
                />narr3: I fucked your mom yesterday Troy. She liked it.
              </p>
              <audio
                src="@voices/narr3-example.wav"
                ref="audio-10"
                @ended="playing = -1"
              />
            </details>
          </div>
          <div class="voice" @click.prevent="onClick">
            <details>
              <summary @mousedown.prevent>obama: Obama</summary>
              <p @click.stop>
                <PlayButton
                  @click="playing !== 11 ? (playing = 11) : (playing = -1)"
                  :paused="playing !== 11"
                />obama: My fellow americans we must pull up our pants and
                endure the lash of the spanking.
              </p>
              <audio
                src="@voices/obama-example.wav"
                ref="audio-11"
                @ended="playing = -1"
              />
            </details>
          </div>
          <div class="voice" @click.prevent="onClick">
            <details>
              <summary @mousedown.prevent>Multi Voice</summary>
              <p @click.stop>
                <PlayButton
                  @click="playing !== 12 ? (playing = 12) : (playing = -1)"
                  :paused="playing !== 12"
                />bull: oh shit. i'm sorry. lac: sorry for what.
              </p>
              <audio
                src="@voices/ohshit-example.wav"
                ref="audio-12"
                @ended="playing = -1"
              />
            </details>
          </div>
          <!-- <div class="voice" @click.prevent="onClick">
            <details>
              <summary @mousedown.prevent>poki: Pokimane</summary>
              <p @click.stop>
                <PlayButton
                  @click="playing !== 12 ? (playing = 12) : (playing = -1)"
                  :paused="playing !== 12"
                />poki: thank you so much for the tier 3 devon 
              </p>
              <audio src="@voices/poki-example.wav" ref="audio-12" @ended="playing = -1" />
            </details>
          </div> -->
        </div>
      </details>
      <!-- <details open>
        <summary class="h2">Avaliable SoundBytes</summary>
        <div class="voices">
          <div class="voice" @click.prevent="onClick" >
            <details>
              <summary @mousedown.prevent>bark</summary>
              <p @click.stop>
                rae: bulldog is my best friend.
              </p>
            </details>
          </div>
        </div>
      </details> -->
    </div>
    <div class="footer">
      <p>
        All code is public and avaliable on
        <a href="https://github.com/AdmiralBulldogTv">GitHub</a>
      </p>
      <p>
        If there are any issues contact
        <a href="https://discordapp.com/users/383195095610163200">Troy#0003</a>
        on discord.
      </p>
      <p>
        Made by with &lt;3 by <a href="https://komodohype.dev">Troy</a> and
        <a href="https://github.com/intro23">Intro233</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import PlayButton from "@/components/PlayButton.vue";

export default defineComponent({
  components: { PlayButton },
  setup() {
    const playing = ref(-1);
    const refs = {
      "audio-0": ref((null as unknown) as HTMLAudioElement),
      "audio-1": ref((null as unknown) as HTMLAudioElement),
      "audio-2": ref((null as unknown) as HTMLAudioElement),
      "audio-3": ref((null as unknown) as HTMLAudioElement),
      "audio-4": ref((null as unknown) as HTMLAudioElement),
      "audio-5": ref((null as unknown) as HTMLAudioElement),
      "audio-6": ref((null as unknown) as HTMLAudioElement),
      "audio-7": ref((null as unknown) as HTMLAudioElement),
      "audio-8": ref((null as unknown) as HTMLAudioElement),
      "audio-9": ref((null as unknown) as HTMLAudioElement),
      "audio-10": ref((null as unknown) as HTMLAudioElement),
      "audio-11": ref((null as unknown) as HTMLAudioElement),
      "audio-12": ref((null as unknown) as HTMLAudioElement),
    };

    watch(playing, (newValue, oldValue) => {
      if (oldValue !== -1) {
        const oldKey = `audio-${oldValue}` as keyof typeof refs;
        refs[oldKey].value.pause();
        refs[oldKey].value.currentTime = 0;
      }
      if (newValue !== -1) {
        const newKey = `audio-${newValue}` as keyof typeof refs;
        console.log(newKey);
        refs[newKey].value.currentTime = 0;
        refs[newKey].value.play();
      }
    });

    return {
      ...refs,
      playing,
      onClick(e: MouseEvent) {
        let target = e.target as HTMLElement;
        while (!target.classList.contains("voice")) {
          target = target.parentElement!;
        }
        const details = target.children[0] as HTMLDetailsElement;
        details.open = !details.open;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@scss/home.scss";
</style>
