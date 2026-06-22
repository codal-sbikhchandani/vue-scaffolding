<script setup lang="ts">
import TheDashboard from '@/components/TheDashboard.vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const { userAccount } = storeToRefs(authStore)
const { logout } = authStore
</script>

<template>
  <main>
    <TheDashboard />
    <div class="profile-card">
      <p>
        Welcome back, <strong>{{ userAccount?.name }}</strong
        >!
      </p>
      <p>Email: {{ userAccount?.username }}</p>

      <div class="actions">
        <button @click="logout" class="btn-logout">Logout</button>
      </div>
    </div>
  </main>
</template>
