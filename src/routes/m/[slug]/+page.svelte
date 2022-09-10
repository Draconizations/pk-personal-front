<script lang="ts">
    import Member from '$lib/components/cards/Member.svelte';

    export let data;

    function buildEmbedTitle() {
        let str: string = "PALS › " + data.name;
        
        if (data.display_name && data.display_name.includes("(") && data.display_name.includes(")")) {

            let first: number;
            let last: number;

            let prns: string = "";

            first = data.display_name.indexOf("(");
            last = data.display_name.indexOf(")");

            prns = data.display_name.slice(first, last + 1);

            str += " " + prns;
        } else {
            str = data.name + " PALS";
        }

        return str;
    }
</script>

<Member member={data} />

<svelte:head>
    <title>{buildEmbedTitle()}</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content={buildEmbedTitle()} />
    <meta property="og:description" content={`Read some more about ${data.name}!`} />
    <meta property="og:url" content={`https://front.fulmine.xyz/m/${data.id}`} />
    <meta property="og:image" content={data.avatar_url ? data.avatar_url : ""} />
    <meta name="theme-color" content={data.color ? `#${data.color}` : "#ffffff"}>
</svelte:head>