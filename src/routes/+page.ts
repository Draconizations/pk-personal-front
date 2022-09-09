import { error } from '@sveltejs/kit';

export async function load( {fetch} ) {
    const id = "drake";

    let res: any;
    res = await fetch(`https://api.pluralkit.me/v2/systems/${id}/fronters`, {
        headers: {
            'origin': 'https://front.fulmine.xyz'
            }
    })
    .then(resp => {
        if (resp.status === 404) throw error(404, `System with id ${id} not found.`);
        if (resp.status === 403) throw error(403, `Front is currently private.`);
        if (resp.status === 500) throw error(500, "Internal server error. This is on PluralKit's end.");
        return resp.json();
    });

    return await res;
}