/**
 * post service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::post.post", ({ strapi }) => ({
  // async find(args) {
  //   const data = await strapi.entityService.findMany("api::post.post", args);
  //   console.log("##");
  //   console.log(data);
  //   return data;
  // },
}));
