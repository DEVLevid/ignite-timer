import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycles, cyclesReducer } from '../reducers/cycles/reducer'
import {
  AddNewCycleAction,
  SetCurrenCycleActiveAsFinishedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'
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
  setCurrentCycleActiveAsFinished: () => void
  setSecondsPassed: (number: number) => void
  CreateNewCycle: (data: CreateCycleType) => void
  InterruptCurrentCycle: () => void
}
export const CyclesContext = createContext({} as CyclesContetxtType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@igniteTimer:cycles-state-1.0.0',
      )
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
      return initialState
    },
  )

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@igniteTimer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const [amountSecondsPast, setAmountSecondsPast] = useState<number>(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPast(seconds)
  }

  function setCurrentCycleActiveAsFinished() {
    dispatch(SetCurrenCycleActiveAsFinishedAction())
  }

  function InterruptCurrentCycle() {
    dispatch(InterruptCurrentCycle())
  }

  function CreateNewCycle(data: CreateCycleType) {
    const id = String(new Date().getTime())
    const newCycle: Cycles = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(AddNewCycleAction(newCycle))
    setAmountSecondsPast(0)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        setCurrentCycleActiveAsFinished,
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
