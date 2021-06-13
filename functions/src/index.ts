import algoliasearch from "algoliasearch";
import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const client = algoliasearch(
    functions.config().algolia.appid,
    functions.config().algolia.key
);
const memberIndex = client.initIndex("members");

exports.searchMembers = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    return {message: "Authentication Required!", code: 401};
  }

  const {query}: { query: string } = data;
  const {hits} = await memberIndex.search(query);
  return hits;
});
