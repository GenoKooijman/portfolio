// src/composables/useHttp.ts
import { useNuxtApp } from '#app'

export function useHttp() {
  const { $http } = useNuxtApp()
  return $http
}