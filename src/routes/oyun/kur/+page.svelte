<script>
    import Header from '@components/header/index.svelte';
    import Game from '@components/game/Setup.svelte';
    import Footer from '@components/footer/index.svelte';
  import GameLayout from '@layouts/GameLayout.svelte';
</script>

<GameLayout>
    <Header slot="header"/>
    <Game slot="game"/>
    <Footer slot="footer"/>
</GameLayout>