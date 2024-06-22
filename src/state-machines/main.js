import { createMachine, interpret, assign } from 'xstate'
import { ref } from 'vue'

import { backgroundMusic } from '../sounds'

import { qualities } from '#/constants'

// TWEEN?
const toggleMusic = (music) => {
  if (!backgroundMusic.isPlaying) {
    backgroundMusic.play()
  }

  if (music) {
    backgroundMusic.gain.gain.setValueAtTime(0.2, backgroundMusic.context.currentTime)
    backgroundMusic.gain.gain.exponentialRampToValueAtTime(0.0001, backgroundMusic.context.currentTime + 2)
  } else {
    backgroundMusic.gain.gain.setValueAtTime(0.0001, backgroundMusic.context.currentTime)
    backgroundMusic.gain.gain.exponentialRampToValueAtTime(0.3, backgroundMusic.context.currentTime + 2)
  }
}

const toggleQuality = (quality) => {
  let index = qualities.findIndex((q) => q === quality)
  index = (index + 1) % qualities.length

  return qualities[index]
}

const storedContext = localStorage.getItem('atc-context')
const defaultContext = {
  difficulty: 0,
  music: false,
  quality: 'MEDIUM',
  settings: false,
}
const context = storedContext ? Object.assign({}, JSON.parse(storedContext), { settings: false, music: false }) : defaultContext

export const mainMachine = createMachine({
  id: 'main',
  initial: 'loading',
  context,
  states: {
    loading: {
      on: {
        INTRO_IN: 'introIn',
        EDIT_IN: 'editIn',
      },
    },
    editIn: {
      tags: 'edit',
      on: {
        DONE: 'editIdle',
      },
    },
    editIdle: {
      tags: 'edit',
    },
    introIn: {
      tags: 'intro',
      on: {
        DONE: 'introIdle',
      },
    },
    introIdle: {
      tags: 'intro',
      on: {
        INTRO_OUT: 'introOut',
        TOGGLE_MUSIC: {
          actions: ['toggleMusic'],
        },
        TOGGLE_QUALITY: {
          actions: ['toggleQuality'],
        },
        DIFFICULTY: {
          actions: ['setDifficulty'],
        },
        TOGGLE_SETTINGS: {
          actions: ['toggleSettings'],
        },
      },
    },
    introOut: {
      tags: 'intro',
      on: {
        DONE: 'gameIn',
      },
    },
    gameIn: {
      tags: 'board',
      on: {
        DONE: 'gamePlaying',
      },
    },
    gamePlaying: {
      tags: 'board',
      initial: 'playing',
      states: {
        playing: {
          on: {
            LOSE: 'lose',
            WIN: 'win',
            QUIT: 'quit',
          },
        },
        lose: {
          on: {
            DONE: '#main.gameOut',
          },
        },
        win: {
          on: {
            DONE: '#main.gameOut',
          },
        },
        quit: {
          on: {
            DONE: '#main.gameOut',
            CANCEL: 'playing',
          },
        },
      },
      on: {
        GAME_OUT: 'gameOut',
      },
    },
    gameOut: {
      tags: 'board',
      on: {
        DONE: 'introIn',
      },
    },
  },
}, {
  actions: {
    setDifficulty: assign({
      difficulty: (ctx) => (ctx.difficulty + 1) % 3,
    }),
    toggleMusic: assign({
      music: (ctx) => {
        toggleMusic(ctx.music)
        return !ctx.music
      },
    }),
    toggleQuality: assign({
      quality: (ctx) => {
        return toggleQuality(ctx.quality)
      },
    }),
    toggleSettings: assign({
      settings: (ctx) => !ctx.settings,
    }),
  },
})

export const service = interpret(mainMachine).start()
export const state = ref(service.state)

service.onTransition(newState => state.value = newState)
