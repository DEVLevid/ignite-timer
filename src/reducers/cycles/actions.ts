import { Cycles } from './reducer'

export enum ActionTypes {
  SET_CURRENT_CYCLE_ACTIVE_AS_FINISHED = 'SET_CURRENT_CYCLE_ACTIVE_AS_FINISHED',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
}

export function AddNewCycleAction(newCycle: Cycles) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function InterruptCurrentCyleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function SetCurrenCycleActiveAsFinishedAction() {
  return {
    type: ActionTypes.SET_CURRENT_CYCLE_ACTIVE_AS_FINISHED,
  }
}
