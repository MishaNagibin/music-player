export namespace NsSounds {
    export interface Sound {
        id: number
        name: string
        artist: string
        image: string
        src: string
        duration?: string
        seconds?: number
    }

    export const TRACK_LIST: Sound[] = [
        {
            id: 1,
            name: "Скукочечно",
            artist: "DASHI",
            image: "1.jfif",
            src: "1.mp3",
        },
        {
            id: 2,
            name: "ДЕВА МАРИЯ",
            artist: "DASHI",
            image: "2.jfif",
            src: "2.mp3",
        },
        {
            id: 3,
            name: "HOLY MOMMY",
            artist: "DASHI",
            image: "3.jfif",
            src: "3.mp3",
        },
        {
            id: 4,
            name: "КРУЗЕР",
            artist: "DASHI",
            image: "4.jfif",
            src: "4.mp3",
        },
        {
            id: 5,
            name: "ХОЧУ",
            artist: "DASHI",
            image: "5.jfif",
            src: "5.mp3",
        },
        {
            id: 6,
            name: "Абу-Даби",
            artist: "DASHI",
            image: "6.jfif",
            src: "6.mp3",
        },
    ]
}
