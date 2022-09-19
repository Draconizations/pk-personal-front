// These are the default functions for handling Pluralkit strings
// these should work on every system, since it doesn't rely on specific formats for names/etc

// if you want strings to be more personalized, take a look at the README in this folder

import twemoji from 'twemoji';
import toHtml from 'discord-markdown';
import emojiRegex from 'emoji-regex';
import moment from 'moment';

import variables from '$lib/variables';
import custom from '$lib/functions/customStrings';
import type { Group, Member } from '$lib/types';

const { toHTML } = toHtml;
const emojiregex = emojiRegex();

const useCustom = variables.customStrings === 'true' ? true : false;

// Converts discord markdown into HTML, and parses twemojis
export function convertToHTML(str: string): string {
    if (useCustom) return custom.convertToHTML(str);

    if (str) return twemoji.parse(toHTML(str, { embed: true }));
    return "";
}

// Gets a system's name from the VITE_SYSTEM_NAME environment variable
export function getSystemName() {
    if (useCustom) return custom.getSystemName();

    if (variables.systemName !== null && typeof variables.systemName === "string") return variables.systemName;
    else return ""; 
}

// Returns a member's description
export function getDescription(member: Member) {
    if (useCustom) return custom.getDescription(member);

    return member.description ? member.description : "";
}

// Returns all the groups a member is in
export function getGroups(groups: Group[]) {
    if (groups.length == 0) return ""

    const listFormatter = new Intl.ListFormat('en', { style: 'long' });
    const groupNames = listFormatter.format(groups.map((e) => e.display_name || e.name))

    return `**Group:${groups.length > 1 ? "s" : ""}** ${groupNames}`
}

// gets all the emojis from the member (display) name
export function getEmojis(member: Member) {
    if (useCustom) return custom.getEmojis(member);

    let memberName = member.display_name ? member.display_name : member.name;
    let str = "";

    let match = memberName.match(emojiregex);
    if (match) {
        match.forEach(emoji => str += emoji)
    }

    return str;
}

// Parses a member's birthday
export function getBirthday(member: Member) {
    if (useCustom) return custom.getBirthday(member);

    if (member.birthday === null) { return "" };

    let str = moment(member.birthday, "YYYY-MM-DD").format("MMM D, YYYY");

    if (str.endsWith(', 0004')) str = str.replace(', 0004', "");

    return str;
}

// Parses a member's pronouns, just returns the pronouns by default.
export function getPronouns(member: Member) {
    if (useCustom) return custom.getPronouns(member);

    return member.pronouns ? member.pronouns : "";
}

// Returns the member's avatar
export function getAvatar(member: Member) {
    if (useCustom) return custom.getAvatar(member);

    return member.avatar_url ? member.avatar_url : "";
}

// Returns the member's banner
export function getBanner(member: Member) {
    if (useCustom) return custom.getBanner(member);

    return member.banner ? member.banner : "";
}

// Gets a member's name
export function getName(member: Member) {
    if (useCustom) return custom.getName(member);

    // Guess the member nickname using the display name
    var nick = member.name
    if (member.display_name) {
        // Remove anything after the first | 
        // usually pronouns 
        nick = member.display_name.split("|")[0].trim()
    }

    if (nick !== member.name) {
        return `${nick} (${member.name})`
    } else {
        return member.name
    }
}

// Gets a member's color, returns emptystring or fallback color
export function getColor(member: Member, fallback = false) {
    if (useCustom) return custom.getColor(member);

    if (member.color) return "#" + member.color;
    if (fallback === true) return "#ffffff";
    return "";
}

// Builds the page title for the current fronters page
export function buildFrontPageTitle(members: Member[]) {
    if (useCustom) return custom.buildFrontPageTitle(members);

    if (variables.systemName) return `Currently fronting in ${variables.systemName}!`
    else return `Currently fronting...`;
}

// Builds the opengraph embed title for the current fronters page
export function buildFrontEmbedTitle(members: Member[]) {
    if (useCustom) return custom.buildFrontEmbedTitle(members);

    return buildFrontPageTitle(members);
}

// Builds the opengraph embed description for the current fronters page
export function buildFrontEmbedDescription(members: Member[]) {
    if (useCustom) return custom.buildFrontEmbedDescription(members);

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
        str = buildSwitchOutText();
    }
    return str;
}

// Builds the page title for a member page
export function buildMemberPageTitle(member: Member) {
    if (useCustom) return custom.buildMemberPageTitle(member);

    return buildMemberEmbedTitle(member)
}

// Builds the opengraph embed title for a member page
export function buildMemberEmbedTitle(member: Member) {
    if (useCustom) return custom.buildMemberPageTitle(member);

    let str = getName(member) + " " + getSystemName();
    return str.trim();
}

// Creates the opengraph embed body for a member page
export function buildMemberEmbedDescription(member: Member) {
    if (useCustom) return custom.buildMemberEmbedDescription(member);

    return `Read some more about ${member.name}!`
}

// Returns the text that shows when switched out
export function buildSwitchOutText() {
    if (useCustom) return custom.buildSwitchOutText();

    return "We are currently switched out!";
}