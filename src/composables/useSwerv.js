import { useContext } from '@nuxtjs/composition-api'
import useSWRV from 'swrv'
import useSwrvState from '~/composables/useSwrvState'

const useSwerv = (apiUrl, options) => {
  const { $axios } = useContext()
  const fetcher = async key => await $axios.$get(key)

  const { data, error, isValidating, mutate } = useSWRV(
    apiUrl,
    fetcher,
    options
  )
  const { state, STATES } = useSwrvState(data, error, isValidating)

  return { data, error, isValidating, mutate, state, STATES }
}

export default useSwerv
