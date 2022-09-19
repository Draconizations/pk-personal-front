import { fetchApi } from '$lib/functions/api';

export const prerender = false;

export async function load( {params, fetch} ) {
    const mid = params.slug;

    const member = await fetchApi(`https://api.pluralkit.me/v2/members/${mid}`, fetch)
    const groups = await fetchApi(`https://api.pluralkit.me/v2/members/${mid}/groups`, fetch)

    return {member, groups};
}