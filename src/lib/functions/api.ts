import variables from "$lib/variables";
import { error } from "@sveltejs/kit";

export function getSystemId() {
    const sid = variables.systemId ? variables.systemId : null;
    if (sid === null) throw error(500, "If you're the owner of this site, please set the 'VITE_SYSTEM_ID' environment variable!");
    
    return sid;
}

export async function fetchApi(url: string) {
    let res: any;
    res = await fetch(url, {
        headers: {
            'origin': 'https://fronters.akarys.me'
            }
    })
    .then(resp => {
        if (resp.status === 404) throw error(404, `System with id ${getSystemId()} not found.`);
        if (resp.status === 403) throw error(403, `Front is currently private.`);
        if (resp.status === 500) throw error(500, "Internal server error. This is on PluralKit's end.");
        if (resp.status === 429) throw error(500, "PluralKit is rate limiting us! Please try again.")
        if (resp.ok) return resp.json();
        throw error(500, "Internal server error. This this site's fault. Please report it to the developers!");
    });

    return await res;
}