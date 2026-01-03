<script>
  import { goto } from "$app/navigation";
  import { onDestroy, onMount } from "svelte";

  let timer
  let counter
  let count = 5

    onMount(()=>{
        timer = setTimeout(()=>{
            goto("/")
        },5000)

        counter = setInterval(()=>{
            count = count - 1
        },1000)
    })

    onDestroy(()=>{
        clearTimeout(timer)
        clearInterval(counter)
    })
</script>
<section class="w-full error min-h-screen flex items-center justify-center bg-secondary">
    <div class="card w-100 h-100 rounded-md flex items-center flex-col gap-4 justify-center p-8 bg-primary border border-slate-400/10 shadow-md shadow-blue-500">
        <h1 class="text-5xl text-slate-100">404</h1>
        <div class="counter bg-slate-800 rounded-full flex items-center justify-center text-slate-100 text-5xl w-20 h-20 p-4">
            {count}
        </div>
        <h1 class="text-2xl text-slate-300">Sayfa Bulunamadı</h1>
        <h1 class="text-xl text-slate-400">İstediğiniz sayfaya ulaşılamadı</h1>
        <a class="bg-blue-500 p-4 text-sm rounded-md text-white font-semibold mt-2 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-600" href="/">Anasayfaya Dön</a>
    </div>
</section>