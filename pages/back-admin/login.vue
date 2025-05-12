<template>
  <div class="bg-[url('assets/images/bg.webp')] h-screen">
    <div
      class="flex flex-col justify-center items-center bg-black/40 backdrop-blur-none bg-opacity-40 h-screen"
    >
      <nuxt-link to="/">
        <img src="assets/images/logo/hv-logo-white.png" class="w-80" alt=""
      /></nuxt-link>
      <Card class="w-full max-w-sm">
        <CardHeader>
          <!-- <CardTitle class="text-center flex flex-col justify-center items-center">
         
          Login
        </CardTitle> -->
        </CardHeader>
        <CardContent class="w-full">
          <form @submit.prevent="handleLogin">
            <div class="grid w-full items-center gap-4">
              <div class="flex flex-col space-y-1.5">
                <Label for="email">Email</Label>
                <Input
                  key="email"
                  id="email"
                  placeholder="Email"
                  type="email"
                  v-model="form.email"
                />
              </div>
              <div class="flex flex-col space-y-1.5">
                <Label for="password">Password</Label>
                <Input
                  key="password"
                  id="password"
                  placeholder="Password"
                  type="password"
                  v-model="form.password"
                />
                <div class="flex items-center space-x-2">
                  <Checkbox id="remember" v-model="remember" />
                  <Label for="remember">Remember me</Label>
                </div>
              </div>
              <div class="flex flex-col space-y-1.5">
                <Button type="submit" class="w-full">
                  <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <p>
            <span class="text-primary">Forgot password?</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Loader2 } from 'lucide-vue-next'

const auth = useAuthStore()
const loading = ref(false)

const form = ref({
  email: '',
  password: '',
  remember: false,
})
const remember = ref(false)
const handleLogin = async () => {
  try {
    loading.value = true
    const login = await auth.login(
      form.value.email,
      form.value.password,
      remember.value
    )
    console.log(login)
    if (login) {
      navigateTo('/back-admin')
    }
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}
definePageMeta({
  layout: false,
})
</script>

<style></style>
