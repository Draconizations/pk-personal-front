import { error } from '@sveltejs/kit';

export async function load( {params, fetch} ) {
    const sid = "drake";
    const mid = params.slug;

    let res: any;
    res = await fetch(`https://api.pluralkit.me/v2/members/${mid}`, {
        headers: {
            'origin': 'https://front.fulmine.xyz'
            }
    })
    .then(resp => {
        if (resp.status === 404) throw error(404, `Member with id ${mid} does not exist in our system.`);
        if (resp.status === 500) throw error(500, "Internal server error. This is on PluralKit's end.");
        return resp.json();
    });

    if (res.system !== "drake") throw error(404, `Member with id ${mid} does not exist in our system.`)

    return await res;
}