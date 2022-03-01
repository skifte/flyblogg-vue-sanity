<template>
  <div class="container">
    <div class="text-center" v-if="loading">
      <div class="spinner">Laster...</div>
    </div>

    <Error v-if="error" :error="error"/>

    <article v-if="post" class="blogpost">
      <h1 class="post-title">{{ post.title }}</h1>
      <Meta :post="post" />
      <SanityBlocks :blocks="blocks" :serializers="serializers" />
      <hr/>
      <h2>Skriblerier</h2>
      <p>Fra tid til annen skriver og prater jeg om faglige ting som opptar meg. Her er et knippe bloggposter jeg har skrevet 👇</p>
      <ul>
        <li>
          <a href="https://www.linkedin.com/pulse/hvordan-vet-man-om-produktet-lager-skaper-verdi-anders-skifte/">
            Hvordan vet man om produktet man lager skaper verdi</a>, Linkedin 2021
        </li>
        <li>
          <a href="https://www.linkedin.com/pulse/digital-produktutvikling-og-kunsten-%C3%A5-l%C3%A6re-hva-man-skal-anders-skifte/">
            Digital produktutvikling er kunsten å lære hva man skal lage mens man lager det</a>
          – tildels basert på Inspired, Linkedin 2021
        </li>
        <li>
          <a href="https://medium.com/smidigalliansen/oppsummering-av-team-topologies-5a5ab0bef926">
            Oppsummering av Team Topologies</a>, Smidigalliansen 2019
        </li>
        <li>
          <a href="https://medium.com/smidigalliansen/oppsummering-av-accelerate-the-science-of-lean-software-and-devops-c575cabbbb38">
            Oppsummering av Accelerate</a>, Smidigalliansen 2019
        </li>
        <li>
          <a
            href="https://blogg.bekk.no/universell-utforming-er-ikke-kakepynt-d95841b4ee8">
            Universell utforming er ikke kakepynt</a>, Bekks fagblogg 2017
        </li>
        <li>
          <a
            href="https://radar.bekk.no/tech2017/frontend-og-mobil/progressive-enhancement">
            Progressive enhancement</a>, Bekks teknologiradar 2017
        </li>
        <li>
          <a href="https://radar.bekk.no/tech2017/prosess-og-kvalitet/universell-utforming-som-tverrfaglig-prosess">
            Universell utforming som tverrfaglig prosess</a>, Bekks teknologiradar 2017
        </li>
        <li>
          <a href="https://blogg.bekk.no/h%C3%B8ydepunkter-fra-csun-assistive-technology-conference-2017-f79add637cf6">Høydepunkter fra CSUN Assistive Technology Conference</a>, Bekks fagblogg 2017
        </li>
        <li>
          <a href="https://blogg.bekk.no/hvordan-tester-man-universell-utforming-d327f71dcb82">Hvordan tester man universell utforming</a >, Bekks fagblogg 2016
        </li>
        <li>
          <a href="https://blogg.bekk.no/slik-jobber-vi-med-universell-utforming-hos-nav-4e4b7d0802a7">
            Slik jobber vi med universell utforming hos NAV</a>, Bekks fagblogg 2015
        </li>
        <li>
          <a href="https://blogg.bekk.no/tilgjengelighet-p%C3%A5-beta-nav-no-e1e7c4a6b1d5">
          Tilgjengelighet på beta.nav.no</a>, Bekks fagblogg 2014
        </li>
      </ul>
      <hr />
      <h2>Kontakt</h2>
      <p>
        Jeg er ikke alt for vanskelig å komme i kontakt med. Du finner meg blant
        annet på:
      </p>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/skifte/">Linkedin</a>
        </li>
        <li>
          <a href="https://medium.com/@skifte">Medium</a>
          </li>
        <li>
          <a href="https://github.com/skifte">Github</a>
          </li>
        <li>
          <a href="https://www.youtube.com/c/andersskifte">Youtube</a>
        </li>
        <li><a href="https://twitter.com/skifte">Twitter</a></li>
      </ul>
    </article>
  </div>
</template>

<script>
import { SanityBlocks } from "sanity-blocks-vue-component"
import sanity from "../client"
import {useMeta} from '@/helpers/helpers.js'
import Image from "@/components/Image.vue"
import Error from "@/components/Error.vue"

const query = `*[slug.current == $slug] {
  _id,
  title,
  slug,
   "body": body[] {
    ...select(
      _type == "image" => {
        ...,
        "asset": asset-> {
          _id,
          url,
          metadata
        }
      } 
    )
    }
}[0]`;

export default {
  name: "SingleArticle",
  components: {
    SanityBlocks,
    Error
  },
  data() {
    return {
      loading: true,
      post: [],
      error: null,
      blocks: [],
      serializers: {
        types: {
          image: Image,
        },
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = this.post = null
      this.loading = true

      sanity.fetch(query, { slug: this.$route.path.substring(1) }).then(
        (post) => {
          this.loading = false
          if (post !== null) {
            this.post = post
            this.blocks = post.body
            // document.title = post.title
            useMeta(this.post, this.$route)
          } else {
            // Fant ikke data som matchet slug
            // vis 404-siden uten å endre url
            this.$router.push({
              name: "404",
              // preserve current path and remove the first char to avoid the target URL starting with `//`
              params: {
                pathMatch: this.$route.path.substring(1).split("/"),
                trigger: "no-data",
              },
              // preserve existing query and hash if any
              query: this.$route.query,
              hash: this.$route.hash,
            });
          } // else
        },
        (error) => {
          this.error = error
          this.loading = false
        }
      );
    },
  },
};
</script>
