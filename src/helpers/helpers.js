
import sanity from "../client"
import imageUrlBuilder from "@sanity/image-url"

const imageBuilder = imageUrlBuilder(sanity)

export function imageUrlFor(source) {
  return imageBuilder.image(source)
}

export function useMeta(content, route) {
  // Sånn passe grisete opplegg for endring av metadata per route
  // ... men det funker.
  // Tar imot enten metaContent fra data() (404-side, forside o.l) eller respons fra API-kall

  const image = content.image ? content.image :
    content.body ? content.body.find(obj => {
    return obj._type === 'image'
  }) : 'undefined'

  const ogTitle = content.ogTitle ? content.ogTitle : content.title

  // update metadata + title
    document.title = content.title
    document.querySelector('#og-title').setAttribute('content', ogTitle)
    document.querySelectorAll('#og-desc, #desc').forEach( 
      elem => elem.setAttribute('content',content.excerpt))   
    document.querySelector('#og-url').setAttribute('content', 'https://skifte.com' + route.fullPath)
    document.querySelector('#og-type').setAttribute('content', content.ogtype ? content.ogtype : 'article') 

    if (image !== 'undefined') {
      // open graph meta for bilde
      document.querySelectorAll('#og-img, #og-img-sec').forEach( 
        elem => elem.setAttribute('content', imageUrlFor(image).width(1200).url()))
      document.querySelector('#og-img-alt').setAttribute('content', image.alt)
      document.querySelector('#og-img-type').setAttribute('content', 'image/jpg')
      document.querySelector('#og-img-w').setAttribute('content', '1200')
      document.querySelector('#og-img-h').setAttribute('content', Math.round(1200 / image.asset.metadata.dimensions.aspectRatio))
    } else {
      document.querySelectorAll('[id^=og-img]').forEach(
        elem => elem.setAttribute('content', '')
      )
    }
  }