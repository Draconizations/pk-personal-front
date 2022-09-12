// string manipulation that is very specific to our (PALS) system
// please remove any references to

import emojiRegex from 'emoji-regex';
import type { Member } from "$lib/types";

const emojiregex = emojiRegex();

export function buildDefaultDesc(member: Member) {
    return `_ _
${getDescTitle(member)}
> - looks like this member's description is either empty or private.`;
}

function getDescTitle(member: Member) {
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