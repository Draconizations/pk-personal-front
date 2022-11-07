// the VITE_CUSTOM_STRINGS environment variable has to be set to true for these to be used instead

// like the default string functions, these either return a string, or an empty string. 
// returning an empty string means that any field using the string will not be visible

// IMPORTANT: THESE PROBABLY WILL NOT WORK FOR YOU RIGHT OFF THE BAT
// I can't guarantee stuff won't break if you don't edit anything!!

import toHtml from "discord-markdown";
import emojiRegex from 'emoji-regex';
import moment from 'moment';
import twemoji from "twemoji";

import type { Member } from "$lib/types";
import { buildDefaultDesc } from '$lib/functions/palsStrings';
import variables from "$lib/variables";

const emojiregex = emojiRegex();
const { toHTML } = toHtml;

export default {
    convertToHTML: convertToHTML,
    getDescription: getDescription,
    getEmojis: getEmojis,
    getBirthday: getBirthday,
    getName: getName,
    getPronouns: getPronouns,
    getAvatar: getAvatar,
    getColor: getColor,
    getBanner: getBanner,
    buildFrontPageTitle: buildFrontPageTitle,
    buildFrontEmbedTitle: buildFrontEmbedTitle,
    buildFrontEmbedDescription: buildFrontEmbedDescription,
    buildMemberPageTitle: buildMemberPageTitle,
    buildMemberEmbedDescription: buildMemberEmbedDescription,
    buildMemberEmbedTitle: buildMemberEmbedTitle,
    getSystemName: getSystemName,
    getSystemId: getSystemId,
    buildSwitchOutText: buildSwitchOutText,
}

// Converts discord markdown into HTML, and parses twemojis
function convertToHTML(str: string): string {
    if (str) return twemoji.parse(toHTML(str, { embed: true }));
    return "";
}

// Gets a system's name from the VITE_SYSTEM_NAME environment variable
function getSystemName() {
    if (variables.systemName !== null && typeof variables.systemName === "string") return variables.systemName;
    else return ""; 
}

function getSystemId() {
    if (variables.systemId !== null && typeof variables.systemId === "string") return variables.systemId;
    else return ""; 
}

// Returns a member's description
function getDescription(member: Member) {
    if (member.description) return member.description;
    else return buildDefaultDesc(member);
}

// gets all the emojis from the member (display) name
function getEmojis(member: Member) {
    let memberName = member.display_name ? member.display_name : member.name;
    let str = "";

    let match = memberName.match(emojiregex);
    if (match) {
        match.forEach(emoji => str += emoji)
    }

    return str;
}

// Gets a member's name
export function getName(member: Member) {
    return member.name;
}


// Returns the member's avatar
function getAvatar(member: Member) {
    return member.avatar_url ? member.avatar_url : "";
}

// Gets a member's color, returns emptystring or fallback color
function getColor(member: Member, fallback = false) {
    if (member.color) return "#" + member.color;
    if (fallback === true) return "#ffffff";
    return "";
}

// Returns the member's banner
function getBanner(member: Member) {
    return member.banner ? member.banner : "";
}

// Gets a member's pronouns, just returns the pronouns by default.
function getPronouns(member: Member) {
    return member.pronouns ? member.pronouns : "";
}

// Parses a member's birthday
function getBirthday(member: Member) {
    if (member.birthday) {
    let str = moment(member.birthday, "YYYY-MM-DD").format("MMM D, YYYY");

    if (str.endsWith(', 0004')) str = str.replace(', 0004', "");
    return str;
    }
    else return "";
}

// Builds the page title for the current fronters page
function buildFrontPageTitle(members: Member[]) {
    if (variables.systemName) return `Currently fronting in ${variables.systemName}!`
    else return `Currently fronting...`;
}

// Builds the opengraph embed title for the current fronters page
function buildFrontEmbedTitle(members: Member[]) {
    return buildFrontPageTitle(members);
}

// Builds the opengraph embed description for the current fronters page
function buildFrontEmbedDescription(members: Member[]) {
    let str = "";
    if (members && members.length > 0) {
        if (members.length > 4) {
            str = `${members[0].name}, ${members[1].name}, ${members[2].name} and others are currently fronting.`;
        } else if (members.length === 4) {
            str = `${members[0].name}, ${members[1].name}, ${members[2].name} and ${members[3].name} are currently fronting.`;
        } else if (members.length === 3) {
            str = `${members[0].name}, ${members[1].name} and ${members[2].name} are currently fronting.`
        } else if (members.length === 2) {
            str = `${members[0].name} and ${members[1].name} are both fronting.`
        } else if (members.length === 1) {
            str = `${members[0].name} is currently fronting.`
        }
    } else {
        str = "We are currently switched out!"
    }
    return str;
}

// Builds the page title for a member page
function buildMemberPageTitle(member: Member) {
    return buildMemberEmbedTitle(member)
}

// Builds the opengraph embed title for a member page
function buildMemberEmbedTitle(member: Member) {
    let str: string =  getSystemName() + " › " + member.name;
    
    if (member.display_name && member.display_name.includes("(") && member.display_name.includes(")")) {

        let first: number;
        let last: number;

        let prns: string = "";

        first = member.display_name.indexOf("(");
        last = member.display_name.indexOf(")");

        prns = member.display_name.slice(first, last + 1);

        str += " " + prns;
    }

    return str.trim();
}

// Creates the opengraph embed body for a member page
function buildMemberEmbedDescription(member: Member) {
    return `Read some more about ${member.name}!`
}

// Returns the text that shows when switched out
export function buildSwitchOutText() {
    return "We are currently switched out!";
}