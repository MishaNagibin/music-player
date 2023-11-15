function convert(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    const minutesString = `${minutes}`.padStart(2, "0")
    const secondsString = `${remainingSeconds}`.padStart(2, "0")

    return `${minutesString}:${secondsString}`
}

export default {
    convert,
}
