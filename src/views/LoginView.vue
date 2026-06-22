<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const { login } = useAuthStore()
</script>

<template>
  <div class="auth-container">
    <h2>PVA</h2>

    <div>
      <p>Please sign in to access your dashboard.</p>
      <button @click="login" class="btn-login">Sign in with Microsoft</button>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  font-family: sans-serif;
  padding: 2rem;
  max-width: 400px;
  margin: auto;
  text-align: center;
}
.profile-card {
  border: 1px solid #ccc;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 1rem;
}
button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  font-weight: bold;
}
.btn-login {
  background-color: #0078d4;
  color: white;
}
.btn-logout {
  background-color: #d83b01;
  color: white;
}
.btn-api {
  background-color: #107c41;
  color: white;
}
</style>
