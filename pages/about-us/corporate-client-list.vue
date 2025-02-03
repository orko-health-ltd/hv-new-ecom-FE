<template>
  <div>
      <div
      class="flex font-serif flex-col items-center  justify-center w-full bg-[url('/assets/images/home/bg-discover.jpg')] bg-cover py-10 h-[40vh]"
    >
      <h1 class="text-[47px] uppercase text-white tracking-widest">Corporate Client List</h1>
    </div>
    <div class="bg-white">
      <div class="flex justify-center py-5 items-center gap-3">
       
        <button @click="selectedCategory = category" class="px-3 py-2" :class="selectedCategory.name == category.name ? 'border-2 border-gray-500 rounded-lg':''" v-for="category in categories" :key="category">{{ category.name }}</button>
      </div>

      <div  v-if="selectedCategory.name == 'All'" class="grid grid-cols-5 px-[10%] gap-3">
        <div v-for="client in categories.flatMap(category=>category.clients)" :key="client">
          <img  :src="client.img" alt="">
         
        </div>
        </div>
        <div v-else class="grid grid-cols-5 px-[10%] gap-3">
        <div  v-for="client in selectedCategory.clients" :key="client">
          <img  :src="client.img" alt="">
         
        </div>
        </div>
        
      
    </div>
    
  </div>
</template>

<script lang="ts" setup>
const images = import.meta.glob("~/assets/images/clients/*", { eager: true });
const categories = [
  {
    name: 'All',
    clients :[]
  },

  {
    name: 'Bank & Finance',
    clients: [
      {
        name: 'City Bank',
        img: images["/assets/images/clients/city.png"].default,
      },
      {
        name: 'HSBC Bank',
        img:images["/assets/images/clients/hsbc.png"].default
      },
      {
        name: 'EBL Bank',
        img:images["/assets/images/clients/ebl.png"].default
      },
      {
        name: 'Union Bank',
        img:images["/assets/images/clients/unionbank.png"].default
      },
      {
        name: 'SIBL Bank',
        img:images["/assets/images/clients/sibl.png"].default
      },
      {
        name: 'AIBL Bank',
        img:images["/assets/images/clients/aibl.png"].default
      },
      {
        name: 'Prime Bank',
        img:images["/assets/images/clients/primebank.png"].default
      },
      {
        name: 'NRB Bank',
        img:images["/assets/images/clients/nrbc.png"].default
      },
      {
        name: 'Bkash',
        img:images["/assets/images/clients/bkash.png"].default
      },
      {
        name: 'Upay',
        img:images["/assets/images/clients/upay.png"].default
      },
      {
        name: 'Nagad',
        img:images["/assets/images/clients/nagad.png"].default
      },
      {
        name: 'IDLC',
        img:images["/assets/images/clients/idlc.png"].default
      },
      {
        name: 'Brac Bank',
        img:images["/assets/images/clients/brac-bank.png"].default
      },
    ]
  },
  {
    name: 'Pharma',
    clients:[]
  },
  {
    name: 'Auto Mobile',
    clients:[]
  },
  {
    name: 'Steel',
    clients:[]
  },
  {
    name: 'Telecom',
    clients:[]
  },
  {
    name: 'Insurance',
    clients:[]
  },
  {
    name: 'EE & IT',
    clients:[]
  },
  {
    name: 'Hotel',
    clients:[]
  },
  {
    name: 'Others',
    clients:[]
  },
]
const selectedCategory = ref({ 
  name: 'All',
    clients :[]
  })
</script>



<style>

</style>
