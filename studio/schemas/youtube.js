// youtube.js
// https://www.sanity.io/guides/portable-text-how-to-add-a-custom-youtube-embed-block
// https://github.com/wobsoriano/vue-lite-youtube-embed i stedet for vue-youtube (ikke kompatibel med vue3)
import React from 'react'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'

const Preview = ({value}) => {
	const { url } = value
	const id = getYouTubeId(url)
	return (<YouTube videoId={id} />)
}
export default {
    name: 'youtube',
    type: 'object',
    title: 'YouTube',
    fields: [
      {
        name: 'url',
        type: 'url',
        title: 'YouTube video URL'
      },
      {
        name: 'title',
        type: 'string',
        title: 'Tittel'
      },
      {
        name: 'caption',
        type: 'text',
        title: 'Beskrivelse (figcaption)'
      }
    ],
    preview: {
        select: {
            url: 'url',
            caption: 'caption'
        },
        component: Preview
    }
  }