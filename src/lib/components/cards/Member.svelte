<script lang="ts">
    import type { Member, Group } from '$lib/types';
    import toHtml from 'discord-markdown';
    import twemoji from 'twemoji';
    import moment from 'moment';
    import { getEmojis, getBirthday, getPronouns, getDescription, getGroups, getAvatar, getColor, getBanner, getName, convertToHTML } from '$lib/functions/strings';

    const { toHTML } = toHtml;

    export let member: Member;
    export let groups: Group[];
</script>

<div class="container member">
    <section class="side">
        {#if member.avatar_url}
        <img class="avatar" src={member.avatar_url} alt={`${member.name}'s avatar`}>
        {/if}
        <div class="info">
            {#if getName(member)}
            <h3>{getName(member)}</h3>
            <hr/>
            {/if}
            {#if getEmojis(member)}
            <span><b>Emojis:</b> {@html convertToHTML(getEmojis(member))}</span>
            {/if}
            {#if getBirthday(member)}
            <span><b>Birthday:</b> {convertToHTML(getBirthday(member))}</span>
            {/if}
            {#if getPronouns(member)}
                <span><b>Pronouns:</b> {@html convertToHTML(getPronouns(member))}</span>
            {/if}
        </div>
        <a class="back" href="/"><b>Back</b></a>
    </section>
    <div class="content">
    {#if getDescription(member)}
    <main class="desc" style={getBanner(member) && getColor(member) ? `border-left: 4px solid ${getColor(member)}` : ""}>
            <div>
                {@html convertToHTML(getDescription(member))} 
            </div>
    </main>
    {/if}
    {#if getGroups(groups)}
    <main class="desc" style={getBanner(member) && getColor(member) ? `border-left: 4px solid ${getColor(member)}` : ""}>
            <div>
                {@html convertToHTML(getGroups(groups))} 
            </div>
    </main>
    {/if}
    {#if getBanner(member)}
    <div class="banner">
        <img src={getBanner(member)} alt={`${member.name}'s banner`}/>
    </div>
    {:else if getColor(member)}
    <div class="banner small" style={`background-color: ${getColor(member)}`}></div>
    {/if}
    </div>
</div>