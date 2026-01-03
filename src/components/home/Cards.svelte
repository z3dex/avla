<script>
  const cardContent = [
    {
      title: "Biz Kimiz?",
      text: "Bu test, görsel ve sezgisel karar verme yeteneğini ölçmek için hazırlandı.",
      color: "from-indigo-500 to-indigo-700",
    },
    {
      title: "Amacımız",
      text: "Kullanıcıların insan tanıma becerilerini eğlenceli şekilde test etmek.",
      color: "from-emerald-500 to-emerald-700",
    },
    {
      title: "Nasıl Çalışır?",
      text: "Her soru rastgele gelir, cevaplar karıştırılır ve ilerleme kaydedilir.",
      color: "from-orange-500 to-orange-700",
    },
    {
      title: "Neden Bu Oyun?",
      text: "Sezgi gücünü geliştirmek için ideal bir oyun olduğu için.",
      color: "from-rose-500 to-rose-700", 
    },
  ];
</script>



<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-6">
  {#each cardContent as card}
    <div
      class={`rounded-xl p-4 text-slate-100 shadow-lg bg-gradient-to-br ${card.color} hover:scale-[1.02] transition-transform duration-300`}
    >
      <h3 class="text-lg font-semibold mb-2">
        {card.title}
      </h3>
      <p class="text-sm opacity-90 leading-relaxed">
        {card.text}
      </p>
    </div>
  {/each}
</div>
