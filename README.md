# PK-Personal-Front
A simple little website built using Sveltekit that displays your PluralKit system's current front, as well as the system's members' information. A demo using our own system is available at https://front.fulmine.xyz

## Usage
This project uses pnpm instead of yarn or npm. I'd recommend using pnpm as well, but another package manager should be fine.

To run a dev server, use `pnpm dev`. To build the site, run `pnpm build`. To preview the built site, run `pnpm preview`.

### Adapters
This project currently uses `adapter-node`, and only is tested using that adapter. `adapter-vercel` and `adapter-netlify` *should* work, but please submit an issue or a PR if you find something that's broken.

I am not sure if `adapter-static` works. Feel free to submit a PR for it if you want to, but I probably won't maintain it myself.

## Steps to deploy:
1. Clone this repository
2. Create a `.env` file with the `VITE_SYSTEM_ID` key and set it to your PluralKit system id
3. (Optional) add the `VITE_SYSTEM_NAME` variable to the `.env` file
4. (Optional) set `VITE_CUSTOM_STRINGS` to `true` in your .env file, and *edit the [customStrings.ts](/src/lib/functions/customStrings.ts) file to match your needs*. More info in [this README](/src/lib/functions/README.md)
5. run `pnpm dev` and check if everything is working correctly!
6. If deploying to Vercel or Netlify, swap out `adapter-node` in [svelte.config.js](/svelte.config.js) for the one for your platform. (Make sure to `pnpm install` that adapter as well!)
7. Deploy your site either using a nodejs server hosted wherever, or on Vercel/Netlify. If you need help, feel free to create an issue or let me know on discord.
8. Enjoy a silly little fronting site!

## Psst. Give me money
If you'd like to support my work here and help me ~~fund my growing domain name addiction~~ make more things, feel free to donate to my ko-fi! The link is over at https://ko-fi.com/draconizations