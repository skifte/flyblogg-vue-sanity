import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "43mso7au", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: true,
  apiVersion: "2021-03-25"
});