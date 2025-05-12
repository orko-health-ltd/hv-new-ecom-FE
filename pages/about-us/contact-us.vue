<template>
  <div>
     <div
      class="flex font-serif flex-col items-center justify-center w-full bg-[url('/assets/images/Cover-image-02.jpg')] bg-cover py-10 content h-[40vh] md:h-[57vh]"
    >
      <h1 class="text-3xl sm:text-4xl lg:text-6xl uppercase text-white tracking-widest">
       Contacts
      </h1>
    </div>
    <div class="bg-white flex justify-center items-center space-y-8 flex-col py-20">
      <h1 class="text-lg text-center md:text-4xl font-extralight font-serif">COMPLETE THE FORM TO GET IN TOUCH WITH US</h1>
      <form @submit.prevent="submitForm" class="w-full space-y-4 px-[10%]">

<UInput   size="lg" v-model="formData.name" required variant="outline" placeholder="Name" />
<UInput   size="lg" v-model="formData.email" required variant="outline" placeholder="Email" />
<UInput  size="lg" v-model="formData.phone" required variant="outline" placeholder="Phone Number" />
<UTextarea  size="lg" v-model="formData.message" variant="outline" placeholder="Message..." />
 <UButton label="Send" type="submit" size="lg" class="bg-gray-600 hover:bg-gray-800" block />
      </form>
      <h1 class="text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-primary-900">HALDA VALLEY CONTACTS</h1>
      <div class="grid text-primary-900 w-full gap-y-5 justify-center items-center grid-cols-1 md:grid-cols-3">
        <div class="flex space-y-6 flex-col justify-center items-center">
           <UIcon name="line-md:phone-call-twotone-loop" class="text-6xl " />
           <div class="text-center">
             <p>
              Customer Care
            </p>
            <h4 class="text-xl">T. +880 9678 800 473</h4>
            <h4 class="text-xl">esales@haldavalley.com</h4>
           </div>
           
        </div>
        <div class="flex space-y-6 flex-col justify-center items-center">
           <UIcon name="streamline:food-drinks-tea-cup-herbal-cook-tea-tisane-cup-drink-cooking-nutrition-mug-food" class="text-6xl animate-bounce text-primary-900" />
             <div class="text-center">
             <p>
              Tea Lounge Reservation
            </p>
            <h4 class="text-xl">T. +880 9678 800 522</h4>
            <h4 class="text-xl">esales@haldavalley.com</h4>
           </div>
        </div>
        <div class="flex space-y-6 flex-col justify-center items-center">
           <UIcon name="f7:cart-fill-badge-plus" class="text-6xl animate-pulse text-primary-900" />
             <div class="text-center">
             <p>
              Online Order Enquiries
            </p>
            <h4 class="text-xl">T. +880 9678 800 473</h4>
            <h4 class="text-xl">esales@haldavalley.com</h4>
           </div>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const toast = useToast()
const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: '',  
})
const submitForm = async () => {
  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: formData.value,
    })
    console.log(response)
    if (response?.success) {
      // Handle success
      toast.add({
        title: 'Form submitted successfully',
        color: 'green',
        timeout: 3000,
      })
      formData.value = {
        name: '',
        email: '',
        phone: '',
        message: '',
      }
    } else {
      // Handle error
      toast.add({
        title: 'Form submission failed',
        color: 'red',
        timeout: 3000,
      })
    }
  } catch (error) {
    // Handle error
  }
}
</script>



<style>

</style>
