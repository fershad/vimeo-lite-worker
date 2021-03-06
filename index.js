import * as cheerio from 'cheerio';

const idRegex = /(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;

function getID(url) {
  var match = url.match(idRegex);
  return (match && match[5]) ? match[5] : false;
}

async function findIframes(req) {
  const html = await req.text()
  try {
    const $ = cheerio.load(html)

    const iframes = $('iframe[src*="player.vimeo.com"]')
    for (const iframe of $(iframes)) {
      let src = $(iframe).attr('src')
      const id = await getID(src)
      const className = $(iframe).attr('class')

      if (id) {
        const lite = `<lite-vimeo class="${className || ''}" videoid="${id}"'> </lite-vimeo>`
        $(iframe).replaceWith(lite)
      }
    }

    return $.html()
  } catch {
    console.log('Error parsing html')
    return html
  }
}

class addJS {
  async element(element) {
    element.append(`<script type="module" src="https://cdn.jsdelivr.net/npm/@slightlyoff/lite-vimeo@0.1.1/lite-vimeo.js"></script>`, {
      html: true,
    })
  }
}

async function handleRequest(req) {
  const acceptHeader = req.headers.get('accept');
  
  if (acceptHeader && acceptHeader.indexOf('text/html') >= 0) {
    const url = new URL(request.url);
    const res = await fetch(url)
    const html = await findIframes(res);
    const newRes = new Response(html, {
      headers: {
        'Content-Type': 'text/html',
      }
    });


    const rewritter = new HTMLRewriter().on('body', new addJS())

    return rewritter.transform(newRes)
  }

  return fetch(req.url, req)
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})