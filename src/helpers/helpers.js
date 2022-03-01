
import sanity from "../client"
import imageUrlBuilder from "@sanity/image-url"

const imageBuilder = imageUrlBuilder(sanity)

export function imageUrlFor(source) {
  return imageBuilder.image(source)
}

export function useMeta(content, route) {
  // Grisete opplegg for endring av metadata per route
  // ... men det funker.
    document.title = content.title
    document.querySelector('#og-title').setAttribute('content', content.title)
    document.querySelectorAll('#og-desc, #desc').forEach( 
      elem => elem.setAttribute('content',content.excerpt))   
    document.querySelector('#og-url').setAttribute('content', 'https://skifte.com' + route.fullPath)
    document.querySelector('#og-type').setAttribute('content', 'article')   
    document.querySelectorAll('#og-img, #og-img-sec').forEach( 
      elem => elem.setAttribute('content', imageUrlFor(content.image).width(1200).url()))
    document.querySelector('#og-img-alt').setAttribute('content', content.image.alt)
    document.querySelector('#og-img-type').setAttribute('content', 'image/jpg')
    document.querySelector('#og-img-w').setAttribute('content', '1200')
    document.querySelector('#og-img-h').setAttribute('content', Math.round(1200 / content.image.asset.metadata.dimensions.aspectRatio))
  }