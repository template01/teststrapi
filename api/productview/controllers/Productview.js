'use strict';

/**
 * Productview.js controller
 *
 * @description: A set of functions called "actions" for managing `Productview`.
 */

module.exports = {

  /**
   * Retrieve productview records.
   *
   * @return {Object|Array}
   */

  find: async(ctx) => {
    return strapi.services.productview.fetchAll(ctx.query);
  },

  /**
   * Retrieve a productview record.
   *
   * @return {Object}
   */

  findOne: async(ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.productview.fetch(ctx.params);
  },

  /**
   * Create a/an productview record.
   *
   * @return {Object}
   */

  // create: async (ctx) => {
  //   return strapi.services.productview.add(ctx.request.body);
  // },

  create: async(ctx) => {
    // find any item with 'name' from request name.
    let itemExist = await Productview.findOne({
      viewingid: ctx.request.body.viewingid
    });
    // if this does NOT exist add to db and emit socket
    if (!itemExist) {
      itemExist = await strapi.services.productview.add(ctx.request.body);
      strapi.emitToAllUsers([ctx.request.body.viewingid, ctx.request.body.viewing]);
    }
    ctx.body = itemExist;
  },

  /**
   * Update a/an productview record.
   *
   * @return {Object}
   */

  update: async(ctx, next) => {
    let findWalletId = await Productview.findOne({
      '_id': ctx.params._id
    });
    strapi.emitToAllUsers([findWalletId.viewingid, ctx.request.body.viewing]);
    console.log(ctx.params)
    return strapi.services.productview.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an productview record.
   *
   * @return {Object}
   */

  destroy: async(ctx, next) => {
    return strapi.services.productview.remove(ctx.params);
  },

};
