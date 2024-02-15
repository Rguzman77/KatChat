<script>
  import { Input, Label, Spinner } from "flowbite-svelte"
  import { appStatusInfo, setAppStatusError } from "../store"
  import { afterUpdate } from "svelte";
  const { url, pages, id } = $appStatusInfo

  let answer = ""
  let loading = false
  let answerContainer;

afterUpdate(() => {
  if (answer) {
    answerContainer.scrollIntoView({ behavior: 'smooth' });
  }
});

  const numOfImagesToShow = Math.min(pages, 4)
  const images = Array.from({ length: numOfImagesToShow }, (_, i) => {
    const page = i + 1
    return url
      .replace("/upload/", `/upload/w_400,h_540,c_fill,pg_${page}/`)
      .replace(".pdf", ".jpg")
  })

  const handleSubmit = async (event) => {
    event.preventDefault()

    loading = true
    answer = ""
    const question = event.target.question.value

    const searchParams = new URLSearchParams()
    searchParams.append("id", id)
    searchParams.append("question", question)

    try {
      const eventSource = new EventSource(`/api/ask?${searchParams.toString()}`)

      eventSource.onmessage = (event) => {
        loading = false
        const incomingData = JSON.parse(event.data)

        if (incomingData === "__END__") {
          eventSource.close()
          return
        }

        answer += incomingData
      }
    } catch (e) {
      setAppStatusError()
    } finally {
      loading = false
    }
  }
</script>
<div class="-mt-[80px]">
  <div class="grid sm:grid-cols-4 grid-cols-2 gap-2">
    {#each images as image}
      <img
        class="rounded w-full h-auto aspect-[400/540]"
        src={image}
        alt="PDF page"
      />
    {/each}
  </div>

  <div class="mt-8 w-full">
    <Label for="question" class="block text-lg mb-2">Write your question here 👇</Label>
    <form class="relative flex items-center" on:submit={handleSubmit}>
      <Input class="w-full h-[7vh] placeholder-neutral-950 pr-10" id="question" required placeholder="¿What is this text about? 🤔"></Input>
      <button type="submit" class="absolute right-5 mr-2">
        <svg class="h-6 w-6 fill-current text-gray-500" fill="#000000" width="800px" height="800px" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" id="arrow">
          <path d="M8.29289 2.29289C8.68342 1.90237 9.31658 1.90237 9.70711 2.29289L14.2071 6.79289C14.5976 7.18342 14.5976 7.81658 14.2071 8.20711L9.70711 12.7071C9.31658 13.0976 8.68342 13.0976 8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L11 8.5H1.5C0.947715 8.5 0.5 8.05228 0.5 7.5C0.5 6.94772 0.947715 6.5 1.5 6.5H11L8.29289 3.70711C7.90237 3.31658 7.90237 2.68342 8.29289 2.29289Z"/>
        </svg>
      </button>
    </form>
  </div>

  {#if loading}
    <div class="mt-10 flex justify-center items-center flex-col gap-y-2">
      <Spinner />
      <p class="opacity-75">Waiting for an answer</p>
    </div>  
  {/if}

  {#if answer}
    <div bind:this={answerContainer} class="mt-8 py-4 px-2 rounded-md bg-white bg-opacity-30">
      <p class="font-medium text-lg">Kat:</p>
      <div class="overflow-y-auto max-h-full">
        <p class='h-auto text-lg font-medium'>{answer}</p>
      </div>
    </div>
    {/if}
</div>
