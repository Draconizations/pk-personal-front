<script lang="ts">
    import GlobalStyle from '$lib/styles/global.scss';
    import Front from '$lib/components/cards/Front.svelte';
    export let data;

    function buildEmbedDesc() {
        let str = "";
        if (data.members && data.members.length > 0) {
            if (data.members.length > 4) {
                str = `${data.members[0].name}, ${data.members[1].name}, ${data.members[2].name} and others are currently fronting!`;
            } else if (data.members.length === 4) {
                str = `${data.members[0].name}, ${data.members[1].name}, ${data.members[2].name} and ${data.members[3].name} are currently fronting!`;
            } else if (data.members.length === 3) {
                str = `${data.members[0].name}, ${data.members[1].name} and ${data.members[2].name} are currently fronting!`
            } else if (data.members.length === 2) {
                str = `${data.members[0].name} and ${data.members[1].name} are both fronting!`
            } else if (data.members.length === 1) {
                str = `${data.members[0].name} is currently fronting!`
            }
        } else {
            str = "We are currently switched out!"
        }
        return str;
    }
</script>

<h2>Currently fronting in PALS...</h2>
<div class="front container">
    {#if data.members}
    {#each data.members as member}
        <Front {member}/>
    {/each}
    {:else}
        <h3>We are currently switched out!</h3>
    {/if}
</div>

<svelte:head>
    <title>Currently fronting in PALS</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content="PALS fronters" />
    <meta property="og:description" content={buildEmbedDesc()} />
    <meta property="og:url" content="https://front.fulmine.xyz" />
    <meta property="og:image" content={data.members && data.members.length > 0 ? data.members[0].avatar_url : ""} />
    <meta name="theme-color" content={data.members && data.members.length > 0 && data.members[0].color ? `#${data.members[0].color}` : "#ffffff"}>
</svelte:head>