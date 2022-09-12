import { error } from '@sveltejs/kit';
import variables from '$lib/variables';

export async function load( {fetch} ) {
    const sid = variables.systemId ? variables.systemId : null;
    if (sid === null)  throw error(500, "If you're the owner of this site, please set the 'VITE_SYSTEM_ID' environment variable!");

    let res: any;
    res = await fetch(`https://api.pluralkit.me/v2/systems/${sid}/fronters`, {
        headers: {
            'origin': 'https://front.fulmine.xyz'
            }
    })
    .then(resp => {
        if (resp.status === 404) throw error(404, `System with id ${sid} not found.`);
        if (resp.status === 403) throw error(403, `Front is currently private.`);
        if (resp.status === 500) throw error(500, "Internal server error. This is on PluralKit's end.");
        return resp.json();
    });

    return await res;
}