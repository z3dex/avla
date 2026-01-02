<script>
  export let title = "Card Title";
  export let description = "This is a description of the card.";
  export let content = "Additional content can go here.";
</script>

<div class="flex flex-1 flex-col bg-slate-800/70 ring-slate-700/60 rounded-lg p-6 shadow-md hover:translate-y-4 transition-all duration-300 hover:shadow-lg">
  <h3 class="text-xl font-semibold mb-2 text-white">{@html title}</h3>
  <p class="text-slate-500 mb-4 text-sm">{@html description}</p>
  <div class="text-slate-400 text-md">{@html content}</div>
</div>
