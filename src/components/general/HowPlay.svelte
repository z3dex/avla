<script>
  export let call = "hero";
  import Modal from "./Modal.svelte";
  let open = false;
  let className = call === "footer"
    ? "text-sm rounded-lg bg-slate-800/70 ring-1 ring-slate-700/60  px-4 h-11 hover:bg-slate-800 text-slate-200 text-sm  hover:text-slate-300 transition cursor-pointer"
    : "lg:col-span-3 inline-flex items-center justify-center cursor-pointer h-11 px-4 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-200 text-sm font-semibold ring-1 ring-slate-700/60 transition w-full";
</script>

<button
  on:click={() => (open = true)}
  class={className}
>
  Nasıl Oynanır?
</button>

<Modal {open} title="Nasıl Oynanır?" on:close={() => (open = false)}>
  <div class="space-y-3 text-slate-300 text-sm leading-relaxed">
    <p>
      Bu oyunda, karşınıza çıkan kişinin hangi gruba ait olduğunu tahmin etmeye
      çalışırsınız.
    </p>
    <p>
      Tahmin yaparken sakal, bıyık, saç stili, giyim tarzı ve kullanılan
      aksesuarlar gibi görsel ipuçlarına dikkat edin.
    </p>
    <p>
      Verilen seçenekler arasından mantığınıza en uygun olanı seçin. Doğru
      cevaplar puan kazandırır, yanlış cevaplar puan kaybettirir.
    </p>
    <p>
      Dikkatli gözlem yapın, acele etmeyin ve en doğru tahmini yapmaya çalışın.
    </p>
  </div>
</Modal>
