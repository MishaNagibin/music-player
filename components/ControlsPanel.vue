<script lang="ts" setup>
import type { NsSounds } from "@/namespaces/NsSounds"

const data = reactive({
        volume: "1",
    }),
    props = defineProps<{
        isPlaying: boolean
        isMute: boolean
        currentTrack: undefined | NsSounds.Sound
        timer: number
        playingTrackID: undefined | number
    }>(),
    emits = defineEmits<{
        (e: "change-mute"): void
        (e: "change-volume", val: string): void
        (e: "toggleAudio", val?: boolean): void
        (e: "playPauseTrack"): void
    }>(),
    volumeName = computed((): string => {
        const vol = Number(data.volume)
        return props.isMute ? "mute" : vol < 0.01 ? "off" : vol > 0.75 ? "high" : vol > 0.35 ? "medium" : "low"
    })

watch(
    () => data.volume,
    (n) => {
        emits("change-volume", n)
    },
)
</script>

<template>
    <div class="controls-panel">
        <progress
            :max="currentTrack !== undefined ? currentTrack.seconds : 0"
            :value="timer"
            :data-before="currentTrack !== undefined ? times.convert(timer) : ''"
            :data-after="currentTrack?.duration"
        />
        <div class="controls">
            <span
                :class="['icon', 'play-back', { disabled: playingTrackID === undefined }]"
                @click="emits('toggleAudio', true)"
            />
            <span
                :class="['icon', { play: !isPlaying, pause: isPlaying }]"
                @click="emits('playPauseTrack')"
            />
            <span
                :class="['icon', 'play-forward', { disabled: playingTrackID === undefined }]"
                @click="emits('toggleAudio')"
            />
            <Track
                v-if="currentTrack !== undefined"
                :item="currentTrack"
                :is-playing="isPlaying"
                is-current
                is-preview
            />
            <div class="volume">
                <span
                    :class="['icon', `volume-${volumeName}`]"
                    @click="emits('change-mute')"
                />
                <input
                    v-model="data.volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.controls-panel {
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0 20px;
    padding-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    gap: 10px;
    background-color: map-get($base, contrast);

    & > progress[value] {
        display: flex;
        width: 100%;
        height: 20px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        position: relative;

        &::after,
        &::before {
            position: absolute;
            color: map-get($base, contrast);
        }

        &::before {
            content: attr(data-before);
            left: 5px;
        }

        &::after {
            content: attr(data-after);
            right: 5px;
        }

        &::-webkit-progress-inner-element {
            overflow: hidden;
            background-position: inherit;
        }

        &::-webkit-progress-bar {
            width: 100%;
            height: 20px;
            background-color: map-get($neutral, 80);
        }

        &::-webkit-progress-value {
            background-color: map-get($primary, 80);
        }
    }

    & > .controls {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 15px;
        height: 55px;

        & > .icon {
            width: 40px;
            height: 40px;
            background-color: map-get($neutral, 80);

            &.disabled {
                background-color: map-get($neutral, 40);
                cursor: not-allowed;
            }

            @media screen and (min-width: 769px) {
                &:not(.disabled) {
                    &:hover {
                        background-color: map-get($primary, 100);
                        cursor: pointer;
                    }
                }
            }
        }

        & > .volume {
            margin-left: auto;
            display: flex;
            align-items: center;
            gap: 5px;

            & > input {
                width: 100%;
            }

            & > .icon {
                width: 40px;
                height: 40px;
                background-color: map-get($neutral, 80);

                @media screen and (min-width: 769px) {
                    &:hover {
                        background-color: map-get($primary, 100);
                        cursor: pointer;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .controls-panel {
        gap: 5px;
        padding: 0;

        & > progress[value] {
            height: 10px;
            line-height: 10px;

            &::after,
            &::before {
                font-size: 10px;
            }
        }

        & > .controls {
            gap: 10px;
            height: 45px;

            & > .icon {
                width: 25px;
                height: 25px;
            }

            & > .volume {
                max-width: 30%;

                & > .icon {
                    width: 25px;
                    height: 25px;
                }
            }
        }
    }
}

@media screen and (max-width: 400px) {
    .controls-panel {
        padding-bottom: 10px;

        & > .controls {
            flex-wrap: wrap;
            height: 65px;

            & > .track {
                margin-left: auto;
            }

            & > .volume {
                max-width: unset;
                width: 100%;
            }
        }
    }
}

@media screen and (max-width: 300px) {
    .controls-panel {
        & > .controls {
            gap: 5px;
        }
    }
}
</style>
