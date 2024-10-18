<template>
    <header class=" w-full grid grid-cols-2 pb-4 bg-opacity-5 mx-auto bg-slate-500">
      <NuxtLink to="/" class="col-start-1 pl-6 pt-2 grid grid-rows-2 grid-cols-3 w-[15%]">
        <h1 class="text-3xl row-start-1">Geno</h1>
        <h2 class="text-3xl row-start-2 col-start-2">Kooijman</h2>
      </NuxtLink>
      <div class="float-right col-start-2 grid grid-cols-3  pt-6 ">
            <NuxtLink to="/" class="text-lg m-4 group relative w-max text-gray-800 hover:text-gray-900 transform transition duration-500 hover:scale-125  ">
                <span>Home</span>
                <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-gray-700 group-hover:w-full"></span>
            </NuxtLink>
            <NuxtLink to="/about" class="text-lg m-4 group relative w-max text-gray-800 hover:text-gray-900 transform transition duration-500 hover:scale-125  ">
                <span>About</span>
                <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-gray-700 group-hover:w-full"></span>
            </NuxtLink>
            <NuxtLink to="/" class="text-lg m-4 group relative w-max text-gray-800 hover:text-gray-900 transform transition duration-500 hover:scale-125  ">
                <span>Contact</span>
                <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-gray-700 group-hover:w-full"></span>
            </NuxtLink>
        </div>
    </header>
  </template>