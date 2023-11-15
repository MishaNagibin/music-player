<script lang="ts" setup>
import { Howl } from "howler"
import { NsSounds } from "@/namespaces/NsSounds"

const data = reactive({
        isPlaying: false,
        track: undefined as Howl | undefined,
        trackList: NsSounds.TRACK_LIST as NsSounds.Sound[],
        playingTrackID: undefined as number | undefined,
        volume: "1",
        isMute: false,
        timer: 0,
        intervalID: undefined as number | undefined,
    }),
    currentTrack = computed((): NsSounds.Sound | undefined => {
        return data.trackList.find((t) => t.id === data.playingTrackID)
    }),
    methods = {
        play(id: number) {
            if (data.playingTrackID !== id) {
                methods.stop()
                data.playingTrackID = id
                methods.playPauseTrack()
            } else {
                methods.playPauseTrack()
            }
        },
        stop() {
            if (data.isPlaying && data.track !== undefined) {
                data.track.stop()
                data.track = undefined
                data.isPlaying = false
            } else {
                data.track = undefined
                data.isPlaying = false
            }
        },
        playPauseTrack() {
            if (data.track) {
                if (data.isPlaying) {
                    clearInterval(data.intervalID)
                    data.track.pause()
                } else {
                    methods.startTimer()
                    data.track.play()
                }
                data.isPlaying = !data.isPlaying
            } else {
                if (data.playingTrackID === undefined) {
                    data.playingTrackID = data.trackList[0].id
                }
                data.track = new Howl({
                    src: [currentTrack.value?.src ?? data.trackList[0].src],
                    autoplay: true,
                    volume: data.volume,
                    mute: data.isMute,
                    onend: () => {
                        methods.resetTimer()
                        methods.toggleAudio()
                    },
                })
                data.isPlaying = true
                methods.resetTimer()
                methods.startTimer()
            }
        },
        async getTrackDuration(track: NsSounds.Sound) {
            const sound = new Howl({
                src: [track.src],
            })
            await new Promise((resolve) => sound.once("load", resolve)).then(() => {
                const seconds = +Number(sound.duration()).toFixed()
                track.seconds = seconds
                track.duration = times.convert(seconds)
            })
        },
        toggleAudio(isBack: boolean = false) {
            if (data.playingTrackID !== undefined) {
                methods.stop()
                const currentIndex = data.trackList.findIndex((t) => t.id === data.playingTrackID)
                const lastIndex = data.trackList.length - 1
                const index = isBack
                    ? currentIndex - 1 < 0
                        ? lastIndex
                        : currentIndex - 1
                    : currentIndex + 1 > lastIndex
                    ? 0
                    : currentIndex + 1
                data.playingTrackID = data.trackList[index].id
                methods.playPauseTrack()
            }
        },
        startTimer() {
            data.intervalID = window.setInterval(() => {
                data.timer++
            }, 1000)
        },
        resetTimer() {
            clearInterval(data.intervalID)
            data.timer = 0
        },
    }

watch(
    () => data.volume,
    (n) => {
        if (data.track !== undefined) {
            data.track.volume(+n)
        }
    },
)
watch(
    () => data.isMute,
    (n) => {
        if (data.track !== undefined) {
            data.track.mute(n)
        }
    },
)

onBeforeMount(() => {
    data.trackList.forEach((t) => {
        methods.getTrackDuration(t)
    })
})
</script>

<template>
    <div class="index">
        <div class="track-list">
            <Track
                v-for="(t, i) of data.trackList"
                :key="i"
                :is-playing="data.isPlaying"
                :is-current="data.playingTrackID === t.id"
                :item="t"
                @play="methods.play"
            />
        </div>
        <ControlsPanel
            :is-playing="data.isPlaying"
            :is-mute="data.isMute"
            :current-track="currentTrack"
            :timer="data.timer"
            :playing-track-i-d="data.playingTrackID"
            @change-mute="data.isMute = !data.isMute"
            @change-volume="(val) => (data.volume = val)"
            @toggle-audio="(val) => methods.toggleAudio(val)"
            @play-pause-track="methods.playPauseTrack"
        />
    </div>
</template>

<style lang="scss" scoped>
.index {
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-bottom: 0;
    box-sizing: border-box;
    padding-bottom: 115px;

    & > .track-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
}

@media screen and (max-width: 768px) {
    .index {
        padding: 10px;
        padding-bottom: 75px;

        & > .track-list {
            gap: 10px;
        }
    }
}

@media screen and (max-width: 400px) {
    .index {
        padding-left: 4px;
        padding-right: 4px;
        padding-bottom: 105px;
    }
}
</style>
