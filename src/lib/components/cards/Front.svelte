<script lang="ts">
    import type { Member } from "$lib/types";
    import { getName, getPronouns, convertToHTML, getAvatar, getColor } from '$lib/functions/strings'

    export let member: Member;

</script>
<a class="front link" href={`/m/${member.id}`} >
    <div class="card front" style={getColor(member) ? `border-bottom: 4px solid ${getColor(member)};` : ""}>
        {#if getAvatar(member)}
        <img class="avatar" src={getAvatar(member)} alt={`${member.name}'s avatar`}>
        {/if}
        <div class="desc">
            {#if getName(member)}
            <h3 class="name">{@html convertToHTML(getName(member))}</h3>
            {/if}
            {#if getPronouns(member)}
            <span class="pronouns">{@html convertToHTML(getPronouns(member))}</span>
            {/if}
        </div>
    </div>
</a>
