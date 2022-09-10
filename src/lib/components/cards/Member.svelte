<script lang="ts">
    import type { Member } from '$lib/types';
    import toHtml from 'discord-markdown';
    import emojiRegex from 'emoji-regex';
    import twemoji from 'twemoji';
    import moment from 'moment';

    const { toHTML } = toHtml;
    const emojiregex = emojiRegex();

    export let member: Member;

    let desc = `_ _
${buildDescName()}
> - looks like this member's description is either empty or private.
> - sorry about that!`;
    if (member.description) {
        desc = toHTML(member.description, { embed: true });
    } else {
        desc = toHTML(desc, { embed: true });
    }

    desc = twemoji.parse(desc);

    function buildDescName() {
        let str: string = member.name;
        
        let prnFrist: number;
        let prnLast: number;

        if (member.display_name) {
            let match = member.display_name.match(emojiregex);
            let emoji = match ? match[0] : ""

            str = emoji + " › " + member.name;

            if (member.display_name.includes("(") && member.display_name.includes(")")) {
                prnFrist = member.display_name.indexOf("(");
                prnLast = member.display_name.indexOf(")");

                let prns = member.display_name.slice(prnFrist, prnLast + 1);

                str += " " + prns;
            }
        }
        return str;
    }

    function getEmojis() {
        let memberName = member.display_name ? member.display_name : member.name;
        let str = "";

        let match = memberName.match(emojiregex);
        if (match) {
            match.forEach(emoji => str += emoji)
        }

        return twemoji.parse(str);
    }

    function parseBirthday(birthday: string) {
        let str = moment(birthday, "YYYY-MM-DD").format("MMM D, YYYY");

        if (birthday.endsWith(', 0004')) str.replace(', 0004', "");

        return str;
    }
</script>

<div class="container member">
    <section class="side">
        {#if member.avatar_url}
        <img class="avatar" src={member.avatar_url} alt={`${member.name}'s avatar`}>
        {/if}
        <div class="info">
            <h3>{member.name}</h3>
            <hr/>
            {#if getEmojis()}
            <span><b>Emojis:</b> {@html getEmojis()}</span>
            {/if}
            {#if member.birthday}
            <span><b>Birthday:</b> {parseBirthday(member.birthday)}</span>
            {/if}
            {#if member.pronouns}
                <span><b>Pronouns:</b> {@html twemoji.parse(toHTML(member.pronouns, { embed: true}))}</span>
            {/if}
        </div>
    </section>
    <div class="content">
    <main class="desc" style={member.color ? `border-left: 4px solid #${member.color}` : ""}>
            <div>
                {@html desc} 
            </div>
    </main>
    {#if member.banner}
    <div class="banner" style={`background-image: url(${member.banner})`} >
    </div>
    {/if}
    </div>
</div>