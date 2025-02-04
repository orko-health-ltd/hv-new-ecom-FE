<template>
  <div class="flex items-center h-screen justify-center">
    <div class="flex flex-col space-y-6 justify-center items-center w-[550px]">
      <img class="w-[250px]" src="/assets/images/logo/Halda-Valley-Logo-03.png" alt="">
    
      <p class="text-primary-900 font-extralight ">
       Feedback Form 
      </p>
      <div class="w-full space-y-3">
<UInput color="primary"  size="lg" variant="outline" placeholder="Name" />
<UInput color="primary" size="lg" variant="outline" placeholder="Email" />
<UInput color="primary" size="lg" variant="outline" placeholder="Contact No" />
  <USelect
    placeholder="Select Gift Pack" size="xl" color="primary"
    :options="['United States', 'Canada', 'Mexico']"
  />
<UTextarea color="primary" size="lg" variant="outline" placeholder="Message..." />
 <UCheckbox  name="notifications" label="I certify that, Halda Valley may use my details for their marketing or promotion purpose. But they can't sell the information to other third party company." />
 <UButton label="Submit" class="bg-primary-900" block />
      </div>
    </div>
    
    
  </div>
</template>

<script lang="ts" setup>

</script>



<style>
.primary {
  color:antiquewhite
}
</style>
