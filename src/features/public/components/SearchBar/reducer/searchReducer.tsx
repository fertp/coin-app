export interface SearchState {
  isOpen: boolean
  query: string
  selected: number
}

export type SearchActions =
  | { type: 'openInput' }
  | { type: 'closeInput' }
  | { type: 'setQuery'; payload: { value: string } }
  | { type: 'setSelected'; payload: { value: number } }
  | { type: 'incrementSelected'; payload: { length: number } }
  | { type: 'decrementSelected' }

export const initialState = {
  isOpen: false,
  query: '',
  selected: -1
}

export const searchReducer = (state: SearchState, action: SearchActions): SearchState => {
  switch (action.type) {
    case 'openInput':
      return {
        ...state,
        isOpen: true
      }

    case 'closeInput':
      return initialState

    case 'setQuery':
      if (action.payload.value === '') {
        return {
          ...state,
          query: '',
          selected: -1
        }
      }
      return {
        ...state,
        query: action.payload.value
      }

    case 'setSelected':
      return {
        ...state,
        selected: action.payload.value
      }

    case 'decrementSelected':
      return {
        ...state,
        selected: state.selected < 0 ? -1 : state.selected - 1
      }

    case 'incrementSelected':
      return {
        ...state,
        selected: Math.min(state.selected + 1, action.payload.length - 1)
      }

    default:
      return state
  }
}
