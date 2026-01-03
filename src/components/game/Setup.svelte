<script>
  import { goto } from "$app/navigation";
  import { game } from "@/stores/game";
  import { redirect } from "@sveltejs/kit";
  import { onDestroy, onMount } from "svelte";

  let level = "";

  let name = "";

  let error = 0;

  let timer;

  let alreadyGame = 0;

  onMount(() => {
    level = $game.level
    name = $game.nick
    checkCondition(level);
    
    if ($game.status == 1) {
      alreadyGame = 1
      timer = setTimeout(()=>{
          goto("/oyun/oyna");
          return;
        }, 5000)
      }

  });

  onDestroy(()=>{
    clearTimeout(timer)
  })

  const selectColor = (color) => {
    level = color;
  };

  let redClass = "";
  let orangeClass = "";
  let grayClass = "";
  let yellowClass = "";

  const selectedMap = {
    red: "border-4 border-red-300 shadow-xl shadow-red-300/40",
    orange: "border-4 border-orange-300 shadow-xl shadow-orange-300/40",
    gray: "border-4 border-gray-300 shadow-xl shadow-gray-300/40",
    yellow: "border-4 border-yellow-300 shadow-xl shadow-yellow-300/40",
  };

  const checkCondition = (color) => {
    redClass = "";
    orangeClass = "";
    grayClass = "";
    yellowClass = "";

    if (color === "red") redClass = selectedMap.red;
    if (color === "orange") orangeClass = selectedMap.orange;
    if (color === "gray") grayClass = selectedMap.gray;
    if (color === "yellow") yellowClass = selectedMap.yellow;
  };

  const initGame = () => {
    if (name != "" && level != "") {
      error = 0;
      game.set({
        nick: name,
        level,
        status: 1,
      });
      goto("/oyun/oyna");
    } else {
      error = 1;
    }
  };
</script>

<section class="flex items-center justify-center w-full game">
  <div
    class="bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 w-100 min-h-120 p-8 flex flex-col gap-2 items-center rounded-lg"
  >
    {#if alreadyGame == 0 }
    <h1 class="text-4xl font-semibold mb-4 p-4 border-b border-slate-400/10">
      Oyun Ayarları
    </h1>

    <div class="flex flex-col gap-2 w-full">
      <span class="text-lg">Rumuz Seçin:</span>
      <input
        type="text"
        bind:value={name}
        placeholder="Örneğin: G3 Piyade Tüfeği"
        class="border border-slate-400/10 outline-0 rounded-md p-2 mb-2 text-slate-100 bg-transparent"
      />
    </div>

    <div class="w-full">
      <span class="text-lg">Seviye Seçin:</span>

      <div
        class="levels flex gap-2 mt-2 border border-slate-400/10 rounded-lg p-4"
      >
        <button
          on:click={() => {
            selectColor("red");
            checkCondition("red");
          }}
          class={`bg-red-500 text-red-500 rounded-full w-10 h-10 cursor-pointer select-none ${redClass}`}
          >1</button
        >
        <button
          on:click={() => {
            selectColor("orange");
            checkCondition("orange");
          }}
          class={`bg-orange-500 text-orange-500 rounded-full w-10 h-10 cursor-pointer select-none ${orangeClass}`}
          >2</button
        >
        <button
          on:click={() => {
            selectColor("gray");
            checkCondition("gray");
          }}
          class={`bg-gray-500 text-gray-500 rounded-full w-10 h-10 cursor-pointer select-none ${grayClass}`}
          >3</button
        >
        <button
          on:click={() => {
            selectColor("yellow");
            checkCondition("yellow");
          }}
          class={`bg-yellow-500 text-yellow-500 rounded-full w-10 h-10 cursor-pointer select-none ${yellowClass}`}
          >4</button
        >
      </div>
    </div>

    <span class="text-slate-400 text-xs"
      >İpucu: Renklere göre zorluk değişir en zoru kırmızıdır!</span
    >

    <div class="border-b border-slate-400/10 w-full p-2"></div>

    {#if error}
      <div
        class="bg-red-500/40 w-full rounded-md p-3 border-2 shadow-md my-3 shadow-red-500 border-red-700 text-slate-100"
      >
        Lütfen boş alan bırakmayınız!
      </div>
    {/if}

    <div class="grid grid-cols-1 md:grid-cols-10 w-full gap-4">
      <button
        on:click={initGame}
        class="md:col-span-7 col-span-1 bg-indigo-500/40 cursor-pointer hover:bg-indigo-500 transition-all duration-300 p-4 rounded-md shadow-md font-semibold grid"
        >Oyuna Başla</button
      >
      <a
        href="/"
        class="md:col-span-3 col-span-1 bg-slate-500/40 cursor-pointer hover:bg-slate-500 transition-all duration-300 p-4 rounded-md shadow-md font-semibold text-center tracking-wider grid"
        >Geri</a
      >
    </div>

    {:else}
      <div class="w-full h-full flex items-center justify-center text-slate-100 text-2xl text-center">Zaten bir oyundasınız yeni bir oyun oluşturmak için lütfen önceki oyununuzu bitiriniz!</div>
      <button on:click={()=> { goto("/oyun/oyna")}} class="bg-indigo-600 transition-all duration-300 hover:bg-indigo-700 hover:scale-105 text-slate-100 font-semibold p-2 rounded-md shadow-md cursor-pointer w-full ">Beni Yönlendir!</button>

    {/if}

  </div>
</section>
