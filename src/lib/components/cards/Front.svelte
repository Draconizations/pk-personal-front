<script lang="ts">
    import { goto } from "$app/navigation";
    import type { Member } from "src/lib/types";
    import toHtml from "discord-markdown";
    import twemoji from "twemoji";

    export let member: Member;

    const { toHTML } = toHtml;

    let name = toHTML(member.name, { embed: true });
    let prns = "";
    if (member.pronouns) {
        prns = toHTML(member.pronouns, { embed: true });
    }

    name = twemoji.parse(name);
    prns = twemoji.parse(prns);

</script>

<div class="card front" style={`border-bottom: 4px solid #${member.color};`} tabindex={0} on:keydown={e => e.key === 'Enter' && goto(`/m/${member.id}`)} on:click={() => goto(`/m/${member.id}`)}>
    <img class="avatar" src={member.avatar_url} alt={`${member.name}'s avatar`}>
    <div class="desc">
        <h3 class="name">{@html name}</h3>
        <span class="pronouns">{@html prns}</span>
    </div>
</div>