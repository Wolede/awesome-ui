import { ref, watchEffect } from '@nuxtjs/composition-api'
import { API_STATES } from '~/services/constants'

type objWithValue = { value : any }

const useSwrvState = (data: objWithValue, error: objWithValue, isValidating: objWithValue) => {
  const STATES = API_STATES
  const state = ref(STATES.IDLE) //idle by default

  watchEffect(() => {
    if (data.value && isValidating.value) {
      state.value = STATES.REVALIDATING
      return
    }
    if (data.value && error.value) {
      state.value = STATES.STALE_IF_ERROR
      return
    }
    if (data.value === undefined && !error.value) {
      state.value = STATES.LOADING
      return
    }
    if (data.value && !error.value) {
      state.value = STATES.SUCCESS
      return
    }
    if (data.value === undefined && error) {
      state.value = STATES.ERROR
      return
    }
  })

  return {
    state,
    STATES,
  }
}

export default useSwrvState
