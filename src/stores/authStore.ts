import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  PublicClientApplication,
  type AccountInfo,
  type Configuration,
  type RedirectRequest,
} from '@azure/msal-browser'

const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_TENANT_ID}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
  },
}

const msalInstance = new PublicClientApplication(msalConfig)
const loginRequest: RedirectRequest = { scopes: ['User.Read'] }

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const userAccount = ref<AccountInfo>()
  const isInitialized = ref(false)

  const userEmail = computed(() => userAccount.value?.username || '')
  const displayName = computed(() => userAccount.value?.name || '')

  const initAuth = async () => {
    if (isInitialized.value) return

    await msalInstance.initialize()

    try {
      const handleRedirectResponse = await msalInstance.handleRedirectPromise()
      if (handleRedirectResponse) {
        msalInstance.setActiveAccount(handleRedirectResponse.account)
      }
    } catch (error) {
      console.error('Entra ID Redirect execution fault:', error)
    }

    const accounts = msalInstance.getAllAccounts()
    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0] as AccountInfo)
      userAccount.value = accounts[0]
      isAuthenticated.value = true
    }

    isInitialized.value = true
  }

  const login = async () => {
    try {
      await msalInstance.loginRedirect(loginRequest)
    } catch (error) {
      console.error('Login redirect initialization failed:', error)
    }
  }

  const logout = async () => {
    try {
      await msalInstance.logoutRedirect({
        account: msalInstance.getActiveAccount(),
      })
      userAccount.value = undefined
      isAuthenticated.value = false
    } catch (error) {
      console.error('Logout redirect failed:', error)
    }
  }

  const getToken = async (): Promise<string | null> => {
    try {
      const activeAccount = msalInstance.getActiveAccount()
      if (!activeAccount) throw new Error('No active MSAL account context found.')

      const tokenResponse = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: activeAccount,
      })
      return tokenResponse.accessToken
    } catch (error) {
      console.warn('Token expired:', error)
      return null
    }
  }

  return {
    isAuthenticated,
    userAccount,
    isInitialized,
    userEmail,
    displayName,
    initAuth,
    login,
    logout,
    getToken,
  }
})
