<template>
  <div>
      <div class="success-container">
        <div class="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h1 class="success-title">Order Placed Successfully!</h1>
        <p class="success-message">Thank you for your purchase. Your order has been confirmed.</p>
        <div class="success-details">
          <p>You will receive an email confirmation shortly.</p>
          <p>Order number: #{{ Math.random().toString(36).substr(2, 9) }}</p>
        </div>
        <NuxtLink to="/" class="success-button">Continue Shopping</NuxtLink>
      </div>  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>