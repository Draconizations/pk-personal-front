import { fetchApi } from '$lib/functions/api';
import { getSystemId } from '$lib/functions/api';

export const prerender = false;

export async function load({ fetch }) {
    return await fetchApi(`https://api.pluralkit.me/v2/systems/${getSystemId()}/fronters`, fetch);
}