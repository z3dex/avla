<script>
  import { createEventDispatcher, onDestroy } from "svelte";

  export let open = false;
  export let title = "Modal";
  export let closeOnOverlay = true;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close");
  }

  function onKeydown(e) {
    if (!open) return;
    if (e.key === "Escape") close();
  }

  if (typeof window !== "undefined") window.addEventListener("keydown", onKeydown);
  onDestroy(() => {
    if (typeof window !== "undefined") window.removeEventListener("keydown", onKeydown);
  });
</script>

{#if open}
  <div class="fixed inset-0 z-50">
    <button
      type="button"
      class="absolute inset-0 w-full h-full bg-black/60"
      aria-label="Kapat"
      on:click={() => closeOnOverlay && close()}
    />
    <div class="absolute inset-0 flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        class="w-full max-w-lg rounded-2xl bg-slate-900 text-slate-100 ring-1 ring-slate-700/60 shadow-xl"
        on:click|stopPropagation
      >
        <div class="flex items-center justify-between p-4 border-b border-slate-800">
          <h2 class="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            class="rounded-lg px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            on:click={close}
          >
            ✕
          </button>
        </div>

        <div class="p-4">
          <slot />
        </div>

        <div class="flex justify-end gap-2 p-4 border-t border-slate-800">
          <button
            type="button"
            class="h-10 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            on:click={close}
          >
            Kapat
          </button>
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
{/if}
