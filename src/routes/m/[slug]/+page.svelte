<script lang="ts">
    import { onMount } from 'svelte';

    import GlobalStyle from '$lib/styles/global.scss';
    import Member from '$lib/components/cards/Member.svelte';
    import { buildMemberPageTitle, buildMemberEmbedTitle, buildMemberEmbedDescription, getAvatar, getColor } from '$lib/functions/strings';

    export let data;

    let url = "";
    onMount(() => url = window.location.href);
</script>

<Member member={data} />

<svelte:head>
    <title>{buildMemberPageTitle(data)}</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content={buildMemberEmbedTitle(data)} />
    <meta property="og:description" content={buildMemberEmbedDescription(data)} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={getAvatar(data)} />
    <meta name="theme-color" content={getColor(data, true)}>
</svelte:head>