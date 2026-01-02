<script>
  import FaGamepad from "svelte-icons/fa/FaGamepad.svelte";
  export let iconSize = 32;
</script>

<a
  href="/oyun"
  class="
    inline-flex items-center justify-center gap-2
    h-10 px-4 rounded-md
    bg-indigo-600 hover:bg-indigo-500
    text-white text-md font-semibold
    transition-all duration-200
    hover:shadow-md hover:scale-[1.03]
    whitespace-nowrap
  "
>
  <span
    class="inline-flex items-center justify-center shrink-0"
    style="width:{iconSize}px; height:{iconSize}px;"
  >
    <FaGamepad style="width:100%; height:100%; display:block;" />
  </span>

  <span class="leading-none">Hadi Oyna</span>
</a>
