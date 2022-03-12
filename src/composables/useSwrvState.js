import { ref, watchEffect } from '@nuxtjs/composition-api'
import { API_STATES } from '~/services/constants'

const useSwrvState = (data, error, isValidating) => {
  const STATES = API_STATES
  const state = ref(STATES.IDLE)

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
