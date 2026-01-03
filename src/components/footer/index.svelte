<script>
  import HowPlay from "../general/HowPlay.svelte";
  import Card from "./Card.svelte";

</script>

<footer class="w-full p-4 rounded-md bg-slate-800/10 mt-4 border border-slate-400/10 shadow-md min-h-80">
    <div class="p-5 flex flex-col gap-1 items-center border-b border-slate-400/10 w-full bg-slate-800/10 rounded-md">
      <p class="text-lg font-semibold tracking-wide text-slate-300/80">AVLA</p>
      <p class="text-sm font-semibold tracking-wide text-slate-500/80">Basit, kolay , eğlenceli bir arayüz</p>
    </div>
    
    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
      <div class="h-full">
        <Card
          title="Neden Avla?"
          description="Bu oyun bir şey vaat etmez; tamamen eğlence ve pratik amaçlı Svelte ile yapılmıştır."
          content="Kimin neyin üyesi olduğunu tahmin edin, verilen ipuçlarıyla mantığınızı kullanın ve en doğru cevabı seçin."
        />
      </div>

      <div class="h-full">
        <Card
          title="İletişim"
          description="Bize ulaşmak için aşağıdaki bilgileri kullanın."
          content="<div class='space-y-1'><p><span class='opacity-80'>Email:</span> interpol@egm.gov.tr</p><p><span class='opacity-80'>Telefon:</span> +90 312 466 90 21</p></div>"
        />
      </div>
    </div>

    <div class="foot mt-7 border-t border-slate-400/10 pt-4 flex justify-between items-center flex-col gap-4 md:flex-row">
        <p class="text-sm text-slate-400/80 text-center">© 2024 AVLA. Tüm hakları saklıdır.</p>
        <HowPlay call="footer" />
    </div>
</footer>