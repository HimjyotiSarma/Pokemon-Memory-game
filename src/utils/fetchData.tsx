import axios, { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { PokemonAPIResponse } from './types'

// interface ParamsType {
//   [key: string]: string | number
// }

// interface ExtraDependencies {
//   [key: string]: string | number | boolean
// }
// Interface for request parameters
interface ParamsType {
  limit?: number
  offset?: number
  // Add other relevant parameters as needed
}

// Interface for extra dependencies
interface ExtraDependencies {
  gameOver?: boolean
  // Add other dependencies that might affect data fetching
}

type JSONValue = string | number | boolean | JSONObject | null

interface JSONObject {
  [x: string]: JSONValue
}

const useFetchData = (
  url: string,
  params: ParamsType,
  extraDependencies: ExtraDependencies = {}
) => {
  const [data, setData] = useState<PokemonAPIResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(url, {
          params: { ...params },
          signal: controller.signal,
        })
        setData(response.data)
        setError(null)
      } catch (error) {
        if (axios.isCancel(error)) {
          console.warn('Request Cancelled : ', error)
        } else if (error instanceof AxiosError) {
          setError(
            error.response?.data ||
              error.message ||
              'Unknown Error when fetching data from API'
          )
        } else {
          setError(
            'Unknown Error Occured. Please check the request and try again'
          )
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => controller.abort()
  }, [url, JSON.stringify(params), JSON.stringify(extraDependencies)])

  return { data, error, loading }
}

const fetchFromApi = async (url: string, params: ParamsType) => {
  try {
    const response: AxiosResponse = await axios.get(url, {
      params,
    })
    const data = response.data
    const result = data.results
    return result
  } catch (error) {
    console.error(error)
  }
}

export { useFetchData, fetchFromApi }
