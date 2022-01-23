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
        id: 'yolo',
        src: gameMachine,
        onDone: 'end'
      },
    },
    end: {},
  },
})
