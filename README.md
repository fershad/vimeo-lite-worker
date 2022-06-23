# Lite Vimeo Worker 👷

A Cloudflare Worker that looks for Vimeo embeds on a page, and replaces them with the Lite Vimeo Embed facade.

## Why would you want to do this?

- It's better for performance 🚀
- It makes your page greener 🌏️

### Better performance

Rather than loading the Vimeo player, and all the JavaScript that comes with it. This Worker replaces it with a facade. Vimeo's JS code gets downloaded when the user wants to use the player.

### Better for the planet

By default the Vimeo player downloads just around 250kB of data when it is loaded on a page. Using this Worker can reduce the initial size of your page by about 200kB per video (about 0.050 grams of CO2).

## Options

This Worker uses [slightlyoff/lite-vimeo](https://github.com/slightlyoff/lite-vimeo). You can adjust the script to use any of options available in that web component.

## Try it out

You can test this worker locally using [Wrangler](https://developers.cloudflare.com/workers/wrangler/get-started/).

1. Checkout the `demo` branch.
1. Run the `wrangler dev` command.
1. Open your browser and navigate the running local server.
1. Using an extension like [ModHeader in Chrome](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj), set a new Request header `x-demo: <the URL you want to test>`.