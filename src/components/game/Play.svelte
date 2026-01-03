<script>
  import { goto } from "$app/navigation";
  import { game } from "@/stores/game";
  import { onMount, tick } from "svelte";
  import FaSmile from "svelte-icons/fa/FaSmile.svelte";

  let counter;
  let count = 5;

  let questions = [];
  let list = [];

  let test = $game.sTest != null ? $game.sTest : [];
  let loading = false;
  let error = "";

  const LEVEL_MAP = {
    red: "kirmizi",
    gray: "gri",
    orange: "turuncu",
    yellow: "sari",
  };

  const fetchQuestions = async (level) => {
    const dataLevel = LEVEL_MAP[level];
    if (!dataLevel) throw new Error(`Geçersiz level: ${level}`);

    const url = `https://raw.githubusercontent.com/z3dex/oyunresim/refs/heads/main/${dataLevel}.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    return await res.json();
  };

  const fetchList = async () => {
    const url = `https://raw.githubusercontent.com/z3dex/oyunresim/refs/heads/main/liste.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    return await res.json();
  };

  const randomInteger = (maxInclusive) =>
    Math.floor(Math.random() * (maxInclusive + 1));

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  let ranumbers = [];

  const addTestQuestion = () => {
    if (!questions?.length) return;
    if (!list?.orgutler?.length) return;
    if (ranumbers.length >= questions.length) return;
    if (test.length >= 20) return;

    const random = randomInteger(questions.length - 1);
    if (ranumbers.includes(random)) return;

    ranumbers.push(random);

    const correctOrgut = questions[random]["orgut"];

    let wrongOrgut = null;
    for (let tries = 0; tries < 30; tries++) {
      const idx = randomInteger(list.orgutler.length - 1);
      const candidate = list.orgutler[idx]?.orgut_adi;
      if (candidate && candidate !== correctOrgut) {
        wrongOrgut = candidate;
        break;
      }
    }
    if (!wrongOrgut) return;

    const entries = shuffle([
      [correctOrgut, true],
      [wrongOrgut, false],
    ]);

    const answersObj = Object.fromEntries(entries);
    const answers = [answersObj];

    test.push([questions[random], answers]);
  };

  let started = 0;
  let activeQuest = $game.stuckQuestion != null ? $game.stuckQuestion : 0;

  let result = null;

  let corrects = $game.sCorrects != null ? $game.sCorrects : 0;
  let wrongs = $game.sWrongs != null ? $game.sWrongs : 0;

  let finished = 0;

  const startGame = () => {
    if (test.length === 0) {
      while (test.length < 20) addTestQuestion();
    }
    started = 1;
  };

  const skip = (key = "", value = "") => {
    if (value == true) {
      corrects++;
      result = 1;
    } else {
      wrongs++;
      result = 0;
    }
  };

  const directSkip = () => {
    result = null;
    activeQuest = activeQuest + 1;
    if (activeQuest == 20) finished = 1;
  };

  $: percent = corrects * 5;

  $: ratioClass =
    percent >= 70
      ? "text-green-500"
      : percent >= 60
        ? "text-orange-500"
        : percent >= 50
          ? "text-yellow-500"
          : "text-red-500";

  let haltSync = false;

  $: if (!haltSync) {
    game.update((g) => ({
      ...g,
      sCorrects: corrects,
      sWrongs: wrongs,
      stuckQuestion: activeQuest,
      sTest: test,
    }));
  }

  const finishIt = async () => {
    haltSync = true;

    game.update(() => ({
      status: 0,
      nick: $game.nick,
      level: $game.level,
      sCorrects: 0,
      sWrongs: 0,
      stuckQuestion: 0,
      sTest: null,
    }));

    await tick();
    await goto("/");
  };

  onMount(() => {
    if ($game.status !== 1) {
      goto("/oyun/kur");
      return;
    }

    const hasProgress = Array.isArray($game.sTest) && $game.sTest.length > 0;

    if (hasProgress) {
      count = 0;
      started = 1;
      activeQuest = $game.stuckQuestion != null ? $game.stuckQuestion : 0;
    } else {
      count = 5;
      counter = setInterval(() => {
        count = Math.max(0, count - 1);
      }, 1000);
    }

    (async () => {
      loading = true;
      error = "";
      try {
        questions = await fetchQuestions($game.level);
        list = await fetchList();

        if (!hasProgress && test.length === 0) {
          while (test.length < 20) addTestQuestion();
        }
      } catch (e) {
        error = e?.message ?? "Bir hata oluştu";
        questions = [];
        list = [];
      } finally {
        loading = false;
      }
    })();

    return () => clearInterval(counter);
  });

  $: if (count === 0 && counter) {
    clearInterval(counter);
    counter = null;
  }
</script>

<div
  class={`bg-secondary p-4 my-10 w-120 h-200 mx-auto shadow-lg relative rounded-md flex flex-col justify-center gap-2 items-center shadow-${$game.level}-800 game`}
>
  {#if count > 0}
    <span
      class="bg-primary rounded-full w-60 h-60 flex items-center justify-center text-8xl border border-slate-400/10"
    >
      {count}
    </span>
  {/if}

  {#if count <= 0 && started != 1}
    <button
      on:click={startGame}
      class="outline-none border-o bg-indigo-500 text-slate-100 font-semibold p-4 rounded-md transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-indigo-600"
    >
      Oyunu Oluştur
    </button>
    <span class="text-slate-400 text-sm"
      >Bilgilendirme! Bu oyunda 20 soru olacaktır</span
    >
  {/if}

  {#if started === 1}
    <h1 class="text-slate-100 font-semibold text-3xl">Hangi Örgütten?</h1>

    <div
      class="absolute left-0 top-0 bg-slate-800/30 flex justify-between items-center p-4 rounded-md w-full h-16"
    >
      <span
        class="bg-slate-900 p-2 gap-2 flex items-center justify-center rounded-lg text-sm text-slate-100 ring-1 ring-slate-700/60 shadow-xlate-800"
      >
        <p>Zorluk:</p>
        <div class={`h-4 w-4 rounded-full bg-${$game.level}-500`}></div>
      </span>

      <span
        class="bg-slate-900 p-2 gap-2 flex items-center justify-center rounded-lg text-sm text-slate-100 ring-1 ring-slate-700/60 shadow-xlate-800"
      >
        <p>Rumuzunuz: <b>{$game.nick}</b></p>
      </span>
    </div>

    {#if test[activeQuest] && finished !== 1}
      <div
        class="flex flex-col items-center justify-center gap-2 border border-slate-400/10 p-2 rounded-md w-full shadow-md"
      >
        <img class="w-80 h-80" src={test[activeQuest][0].resim} alt="" />

        <div class="flex items-center gap-3">
          <span
            class="bg-green-900/10 p-2 gap-2 flex items-center justify-center rounded-lg text-sm text-slate-100 ring-1 ring-green-700/60 shadow-xlate-800"
          >
            {corrects}/{test.length}
          </span>

          <span
            class="text-slate-400 text-sm bg-slate-800 p-2 rounded-md border border-slate-400/10 shadow-md my-2"
          >
            {activeQuest + 1}/{test.length}
          </span>

          <span
            class="bg-red-900/10 p-2 gap-2 flex items-center justify-center rounded-lg text-sm text-slate-100 ring-1 ring-red-700/60 shadow-xlate-800"
          >
            {wrongs}/{test.length}
          </span>
        </div>

        <span class="text-slate-100 text-xl text-center">
          {test[activeQuest][0].ad} {test[activeQuest][0].soyadi}
        </span>

        <div class="flex gap-2 my-2">
          <span
            class="bg-slate-900 p-2 gap-2 flex items-center justify-center rounded-lg text-sm text-slate-100 ring-1 ring-slate-700/60 shadow-xlate-800"
          >
            <p>Doğum Yeri: <b>{test[activeQuest][0].dogumYeri}</b></p>
          </span>

          <span
            class="bg-slate-900 p-2 gap-2 flex items-center justify-center rounded-lg text-sm text-slate-100 ring-1 ring-slate-700/60 shadow-xlate-800"
          >
            <p>Doğum Tarihi: <b>{test[activeQuest][0].dogumTarihi}</b></p>
          </span>
        </div>

        {#if result != null}
          {#if result == 1}
            <div
              class="bg-green-500 w-full p-4 my-2 rounded-md text-md shadow-md flex items-center font-semibold"
            >
              Doğru işaretleme yaptın
            </div>
          {:else}
            <div
              class="bg-red-500 w-full p-4 my-2 rounded-md text-md shadow-md flex items-center font-semibold"
            >
              Hatalı işaretleme yaptın
            </div>
          {/if}
        {/if}

        {#if result == null}
          <div class="flex justify-between w-full items-center">
            <div class="options flex gap-2 w-full">
              {#each Object.entries(test[activeQuest][1][0]) as [key, value]}
                <button
                  on:click={() => skip(key, value)}
                  class="cursor-pointer inline-flex items-center text-md flex-1 justify-center bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 p-2 rounded-md"
                >
                  {key}
                </button>
              {/each}
            </div>
          </div>
        {:else}
          <button
            on:click={directSkip}
            class="cursor-pointer inline-flex items-center text-md flex-1 justify-center bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 p-2 rounded-md"
          >
            {activeQuest < 19 ? "Sonraki Soruya Geç" : "Testi Bitir"}
          </button>
        {/if}
      </div>
    {:else}
      <div
        class="my-8 flex flex-col gap-2 items-center justify-center border border-slate-400/10 p-4 rounded-md"
      >
        <div class="w-32 h-32"><FaSmile size="12" color="#22c55e" /></div>

        <h1 class="text-slate-100 text-xl text-center">
          Kahpenin Evlatlarını Tanıma Testini Tamamlamış Bulunuyorsun
        </h1>

        <span class="text-sm text-slate-400 text-center">
          Bu testteki başarı oranına göre farklı yorumlar alacaksın
        </span>

        <div class="flex gap-2">
          <span
            class="text-lg flex items-center justify-center bg-slate-800 border border-slate-400/10 p-2 rounded-md"
          >
            {corrects} / {test.length}
          </span>

          <span
            class={`text-xl font-semibold bg-slate-800 p-4 rounded-md ${ratioClass}`}
          >
            Başarı Oranın: %{percent}
          </span>
        </div>

        <div class="p-4 rounded-md bg-slate-800 text-slate-300 w-full mt-2">
          {#if percent >= 70}
            <span>😄 Bu kahpenin evlatlarını iyi tanıdın güven dolu bir hayatın olacak çünkü içgüdülerin bir harika!</span>
          {:else if percent >= 50}
            <span>🙂 Fena değilsin ama aşırı iyi de değilsin bu yüzden kendine dikkat etmelisin!</span>
          {:else}
            <span>😞 İçgüdülerin aşırı zayıf, eğer sokakta şişlenmek istemiyorsan saksıyı çalıştır!</span>
          {/if}
        </div>

        <button
          on:click={finishIt}
          class="mt-2 w-full cursor-pointer inline-flex items-center text-md flex-1 justify-center bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 p-2 rounded-md"
        >
          Sonlandır ve Anasayfaya Dön
        </button>
      </div>
    {/if}
  {/if}
</div>
