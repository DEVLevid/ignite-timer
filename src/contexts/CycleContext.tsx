import { ReactNode, createContext, useReducer, useState } from 'react'

interface Cycles {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CreateCycleType {
  task: string
  minutesAmount: number
}

interface CyclesContextProviderProps {
  children: ReactNode
}

interface CyclesContetxtType {
  cycles: Cycles[]
  activeCycle: Cycles | undefined
  activeCycleId: string | null
  amountSecondsPast: number
  setCurrentCycleActive: () => void
  setSecondsPassed: (number: number) => void
  CreateNewCycle: (data: CreateCycleType) => void
  InterruptCurrentCycle: () => void
}
export const CyclesContext = createContext({} as CyclesContetxtType)

interface CycleState {
  cycles: Cycles[]
  activeCycleId: string | null
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: CycleState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          }
        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
              } else {
                return cycle
              }
            }),
            activeCycleId: null,
          }
        case 'SET_CURRENT_CYCLE_ACTIVE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
            activeCycleId: null,
          }
        default:
          return state
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )
  const { cycles, activeCycleId } = cyclesState
  const [amountSecondsPast, setAmountSecondsPast] = useState<number>(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setCurrentCycleActive() {
    dispatch({
      type: 'SET_CURRENT_CYCLE_ACTIVE',
      payload: {
        activeCycleId,
      },
    })
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPast(seconds)
  }

  function InterruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })
  }

  function CreateNewCycle(data: CreateCycleType) {
    const id = String(new Date().getTime())
    const newCycle: Cycles = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })
    setAmountSecondsPast(0)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        setCurrentCycleActive,
        amountSecondsPast,
        setSecondsPassed,
        CreateNewCycle,
        InterruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
