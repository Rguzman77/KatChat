<script>
  import { writable } from 'svelte/store';
  import { fade } from 'svelte/transition';
  import { Alert } from "flowbite-svelte"
  import { APP_STATUS, appStatus } from "../store.ts"
  import { Button } from "flowbite-svelte"
  import StepUpload from "./StepUpload.svelte"
  import StepLoading from "./StepLoading.svelte"
  import StepChat from "./StepChat.svelte"
  import logo from "../assets/logo.png?url";
  import { onMount } from 'svelte';
 

  const showButton = writable(true);

  function handleClick() {
    showButton.set(false);
  }
  onMount(() => {
    const animatedDiv = document.getElementById('animatedDiv');
    if (animatedDiv) {
      animatedDiv.children[0].classList.remove('translate-x-full');
      animatedDiv.children[1].classList.remove('translate-x-full');
    }
  });
  
</script>

{#if $showButton}
<div class="flex flex-col justify-center items-center w-[80vw] min-h-screen"
     >
     <div
      id="animatedDiv"
      class="w-[80vw] max-w-[700px] transition-opacity duration-3000 ease-in-out flex flex-col sm:flex-row justify-center items-center sm:items-start"
    >
      <h1
        class="w-2/3 text-6xl opacity-70 font-bold text-center pb-10 transform translate-x-full transition-transform duration-1000 ease-in-out"
      >
        Upload a PDF and ask Kat about it!
      </h1>
      <img
        src={logo}
        class="w-60 mx-auto mb-8 transform translate-x-full transition-transform duration-1000 ease-in-out hidden sm:block"
        alt="Kat Chat Logo"
      />
    </div>
  <Button 
      id="animatedButton"
      color="dark"
      class="transition-opacity duration-3000 ease-in-out"
  on:click={handleClick}>
  Begin here! 📕
  </Button>
</div>
{:else}
  <div>
  {#if $appStatus === APP_STATUS.INIT}
    <div 
    in:fade={{ duration: 1000 }}>
    <StepUpload />
  </div>
  {:else if $appStatus === APP_STATUS.LOADING}
    <StepLoading />
  {:else if $appStatus === APP_STATUS.ERROR}
    <Alert >
      <span class="font-medium">Something went wrong</span>
    </Alert>
  {:else if $appStatus === APP_STATUS.CHAT_MODE}
    <StepChat />
  {:else}
    <Alert>
      <span class="font-medium">Unknown action</span>
    </Alert>
  {/if}
  </div>
{/if}