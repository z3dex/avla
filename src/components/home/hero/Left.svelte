<script>
  import HowPlay from "../../general/HowPlay.svelte";
  import Actions from "../../header/actions.svelte";

</script>

<div class="relative hero-text bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 shadow-xl shadow-black/30 min-h-80 w-full rounded-2xl overflow-hidden p-5 sm:p-6 lg:p-10">
  <div class="pointer-events-none absolute -top-24 -left-24 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-indigo-600/20 blur-3xl"></div>
  <div class="pointer-events-none absolute -bottom-24 -right-24 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-blue-500/20 blur-3xl"></div>

  <div class="relative grid gap-4">
    <p class="inline-flex w-fit items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1 text-xs font-semibold text-slate-200 ring-1 ring-slate-700/60">🧠 Mantık + İpucu</p>

    <div class="space-y-2">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-50">Kim Neyin Üyesi</h1>
      <p class="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">Kimin neyin üyesi olduğunu tahmin edin, verilen ipuçlarıyla mantığınızı kullanın ve en doğru cevabı seçin.</p>
    </div>

    <div class="w-full max-w-xs sm:max-w-sm">
      <Actions bg="bg-blue-800" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
        <HowPlay />

      <div class="lg:col-span-9 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 w-full">
        <a href="/" class="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-slate-800/70 hover:bg-slate-800 text-slate-200 text-sm font-semibold ring-1 ring-slate-700/60 px-3 py-2 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-black/30 hover:-translate-y-1">
          🗓️ <span class="whitespace-nowrap">Günlük Görevler</span>
        </a>

        <span class="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-slate-800/70 text-slate-200 text-sm font-medium ring-1 ring-slate-700/60 px-3 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1">
          <span class="opacity-80 whitespace-nowrap">👥 Toplam Oyuncu:</span>
          <span class="font-semibold text-white">1,234</span>
        </span>
      </div>
    </div>
  </div>
</div>
