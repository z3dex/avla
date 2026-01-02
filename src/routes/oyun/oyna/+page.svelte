<script>
    import Header from '@components/header/index.svelte';
    import Game from '@components/game/index.svelte';
    import Footer from '@components/footer/index.svelte';
    import PlayLayout from '@layouts/PlayLayout.svelte';
</script>

<PlayLayout>
    <Header slot="header"/>
    <Play slot="play"/>
    <Footer slot="footer"/>
</PlayLayout>