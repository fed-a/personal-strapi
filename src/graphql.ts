const likes =
  (strapi: Strapi.Strapi) =>
  ({ nexus }) => ({
    plugins: [],
    types: [
      nexus.extendType({
        type: "Post",
        definition(t) {
          t.field("likes", {
            type: "LikesResponse",
            resolve: async (parent) => {
              const filters = {
                filters: {
                  postSlug: parent.slug,
                },
              };
              const [likes, fires, hearts, tears, angries] = await Promise.all([
                strapi.entityService.findMany(
                  "api::reaction-like.reaction-like",
                  filters
                ),
                strapi.entityService.findMany(
                  "api::reaction-fire.reaction-fire",
                  filters
                ),
                strapi.entityService.findMany(
                  "api::reaction-heart.reaction-heart",
                  filters
                ),
                strapi.entityService.findMany(
                  "api::reaction-tear.reaction-tear",
                  filters
                ),
                strapi.entityService.findMany(
                  "api::reaction-angry.reaction-angry",
                  filters
                ),
              ]);

              return {
                likes: likes.length,
                fires: fires.length,
                hearts: hearts.length,
                tears: tears.length,
                angries: angries.length,
              };
            },
          });
        },
      }),
      nexus.objectType({
        name: "LikesResponse", // this is our custom object type
        definition(t) {
          t.nonNull.int("likes");
          t.nonNull.int("fires");
          t.nonNull.int("hearts");
          t.nonNull.int("tears");
          t.nonNull.int("angries");
        },
      }),
    ],
    resolversConfig: {
      "Query.posts": {
        middlewares: [],
        auth: false,
      },
      "Query.post": {
        middlewares: [],
        auth: false,
      },
    },
    // resolvers: {
    //   Query: {
    //     posts: {
    //       async resolve(parent, args, ctx, info) {
    //         const { toEntityResponseCollection } = strapi.service(
    //           "plugin::graphql.format"
    //         ).returnTypes;
    //         const { transformArgs } = strapi
    //           .plugin("graphql")
    //           .service("builders").utils;

    //         const transformedArgs = transformArgs(args, {
    //           contentType: strapi.contentTypes["api::post.post"],
    //           usePagination: true,
    //         });

    //         console.log(JSON.stringify(transformedArgs, null, 4));

    //         // const data2 = await strapi.services["api::post.post"].find({
    //         //   ...transformedArgs,
    //         // });

    //         // console.log({ data2 });

    //         const data = await strapi.entityService.findMany("api::post.post", {
    //           ...transformedArgs,
    //         });

    //         console.log({ data });

    //         const response = toEntityResponseCollection(data, {
    //           args,
    //           resourceUID: "api::post.post",
    //         });

    //         return response;
    //       },
    //     },
    //   },
    // },
  });

const extensions = [likes];

export default function graphql(strapi: Strapi.Strapi) {
  const extensionService = strapi.plugin("graphql").service("extension");

  extensionService.shadowCRUD("api::about.about").disableMutations();
  extensionService.shadowCRUD("api::blog.blog").disableMutations();
  extensionService.shadowCRUD("api::hero.hero").disableMutations();
  extensionService.shadowCRUD("api::menu.menu").disableMutations();
  extensionService.shadowCRUD("api::post.post").disableMutations();
  extensionService.shadowCRUD("api::project.project").disableMutations();
  extensionService.shadowCRUD("api::tag.tag").disableMutations();

  for (const extension of extensions) {
    extensionService.use(extension(strapi));
  }
}
