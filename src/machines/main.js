import { createMachine } from 'xstate'
import { gameMachine } from './game'

export const machine = () => createMachine({
  id: 'main',
  initial: 'loading',
  states: {
    loading: {
      on: {
        'IDLE': 'idle',
      },
    },
    idle: {
      on: {
        'START': 'start',
      },
    },
    start: {
      invoke: {
        id: 'gameMachine',
        src: gameMachine,
        onDone: 'idle'
      },
    },
    end: {},
  },
})
