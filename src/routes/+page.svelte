<script>
    import Header from '../components/header/index.svelte';

    import Home from '../components/home/index.svelte';
    import Footer from '../components/footer/index.svelte';
  import HomeLayout from '@layouts/HomeLayout.svelte';
</script>

<HomeLayout>
    <Header slot="header"/>
    <Home slot="home"/>
    <Footer slot="footer"/>
</HomeLayout>