<script lang="ts" setup>
import type { NsSounds } from "@/namespaces/NsSounds"

const props = defineProps<{
        item: NsSounds.Sound
        isPlaying: boolean
        isCurrent: boolean
        isPreview?: boolean
    }>(),
    emits = defineEmits<{ (e: "play", id: number): void }>()
</script>

<template>
    <div
        :class="['track', { preview: isPreview }]"
        @click="emits('play', item.id)"
    >
        <div
            v-if="!isPreview"
            class="index"
        >
            <span
                v-if="isCurrent && isPlaying"
                class="bubble"
            />
            <span :class="['id', { hidden: isCurrent && isPlaying }]">{{ item.id }}</span>
            <span
                :class="[
                    'icon',
                    {
                        'play-circle': !isCurrent || (isCurrent && !isPlaying),
                        'pause-circle': isCurrent && isPlaying,
                    },
                ]"
            />
        </div>
        <img :src="item.image" />
        <div class="name">
            <span class="name">{{ item.name }}</span>
            <span class="artist">{{ item.artist }}</span>
        </div>
        <span
            v-if="!isPreview"
            class="duration"
        >
            {{ item.duration }}
        </span>
    </div>
</template>

<style lang="scss" scoped>
.track {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 2px solid transparent;
    transition: border-color 0.3s ease-in-out;
    user-select: none;

    & > .index {
        min-width: 40px;
        font-size: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        & > .hidden {
            display: none;
        }

        & > .icon {
            display: none;
            width: 40px;
            height: 40px;
            transition: 0.3s ease-in-out;
            background-color: map-get($primary, 100);
        }

        & > .bubble {
            display: block;
            position: absolute;
            width: 25px;
            height: 25px;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            border-radius: 50%;
            background-color: map-get($primary, 100);
            animation: bubble_out 0.6s ease-in-out infinite both;
        }
    }

    & > img {
        max-width: 100px;
        max-height: 100px;
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }

    & > .name {
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-size: 18px;

        & > span {
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
        & > .name {
            font-weight: 700;
        }
    }

    & > .duration {
        font-size: 18px;
        margin-left: auto;
        color: map-get($neutral, 100);
    }

    @media screen and (min-width: 769px) {
        &:not(.preview) {
            &:hover {
                border-color: map-get($primary, 100);
                cursor: pointer;
                & > .index {
                    & > .bubble {
                        display: none;
                    }

                    & > .id {
                        display: none;
                    }

                    & > .icon {
                        display: block;
                    }
                }
            }
        }
    }

    &.preview {
        padding: 0;

        & > img {
            max-width: 50px;
            max-height: 50px;
        }

        & > .name {
            font-size: 16px;
            max-width: 450px;
        }
    }
}

@media screen and (max-width: 768px) {
    .track {
        padding: 5px;
        gap: 10px;
        border: none;
        -webkit-tap-highlight-color: transparent;

        & > * {
            pointer-events: none;
        }

        & > .index {
            min-width: 20px;
            font-size: 20px;

            & > .icon {
                width: 25px;
                height: 25px;
            }

            & > .bubble {
                width: 15px;
                height: 15px;
            }
        }

        & > img {
            max-width: 60px;
            max-height: 60px;
        }

        & > .name,
        & > .duration {
            font-size: 16px;
        }

        &.preview {
            & > img {
                max-width: 30px;
                max-height: 30px;
            }

            & > .name {
                font-size: 12px;
                line-height: 13px;
                gap: 4px;
            }
        }
    }
}

@media screen and (max-width: 500px) {
    .track {
        &.preview {
            & > .name {
                max-width: 250px;
            }
        }
    }
}

@media screen and (max-width: 400px) {
    .track {
        padding: 0;
        gap: 5px;

        & > .index {
            min-width: 18px;
            font-size: 18px;

            & > .bubble {
                width: 15px;
                height: 15px;
            }
        }

        & > img {
            max-width: 40px;
            max-height: 40px;
        }

        & > .name,
        & > .duration {
            font-size: 14px;
            gap: 3px;
        }

        &.preview {
            & > .name {
                max-width: 150px;
            }
        }
    }
}

@keyframes bubble_out {
    0%,
    100% {
        -webkit-transform: scale(0.66);
        transform: scale(0.66);
    }
    50% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}
</style>
