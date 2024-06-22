import { AudioLoader, Audio } from 'three'
import { audioListener } from './camera'

import backgroundMusicFile from './sounds/background.ogg'

import click1SoundFile from './sounds/click1.ogg'
import click2SoundFile from './sounds/click2.ogg'
import click3SoundFile from './sounds/click3.ogg'

import wooshSoundFile from './sounds/woosh.ogg'

import airplane1SoundFile from './sounds/airplane1.ogg'

export const backgroundMusic = new Audio(audioListener)
export const click1Sound = new Audio(audioListener)
export const click2Sound = new Audio(audioListener)
export const click3Sound = new Audio(audioListener)
export const wooshSound = new Audio(audioListener)
export const airplane1Sound = new Audio(audioListener)

export const audioLoader = new AudioLoader()

audioLoader.load(
  backgroundMusicFile,
  (audioBuffer) => {
    backgroundMusic.setBuffer(audioBuffer)
    backgroundMusic.setLoop(true)
    backgroundMusic.setVolume(0)
  }
)

audioLoader.load(
  click1SoundFile,
  (audioBuffer) => {
    click1Sound.setBuffer(audioBuffer)
    click1Sound.setVolume(0.6)
  }
)

audioLoader.load(
  click1SoundFile,
  (audioBuffer) => {
    click2Sound.setBuffer(audioBuffer)
    click2Sound.setVolume(0.6)
  }
)

audioLoader.load(
  click1SoundFile,
  (audioBuffer) => {
    click3Sound.setBuffer(audioBuffer)
    click3Sound.setVolume(0.6)
  }
)

audioLoader.load(
  wooshSoundFile,
  (audioBuffer) => {
    wooshSound.setBuffer(audioBuffer)
    wooshSound.setVolume(0.2)
    wooshSound.setPlaybackRate(0.75)
  }
)

audioLoader.load(
  airplane1SoundFile,
  (audioBuffer) => {
    airplane1Sound.setBuffer(audioBuffer)
    airplane1Sound.setVolume(0)
    airplane1Sound.setLoop(true)
  }
)
