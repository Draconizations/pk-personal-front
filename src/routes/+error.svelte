<script lang="ts">
    import GlobalStyle from '$lib/styles/global.scss';
    import { page } from '$app/stores';
</script>

<h1>{$page.status}</h1>
<p>{$page.error && $page.error.message}</p>