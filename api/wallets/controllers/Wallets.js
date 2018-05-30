'use strict';

/**
 * Wallets.js controller
 *
 * @description: A set of functions called "actions" for managing `Wallets`.
 */

module.exports = {

  /**
   * Retrieve wallets records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.wallets.fetchAll(ctx.query);
  },

  /**
   * Retrieve a wallets record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.wallets.fetch(ctx.params);
  },

  /**
   * Create a/an wallets record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.wallets.add(ctx.request.body);
  },

  /**
   * Update a/an wallets record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.wallets.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an wallets record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.wallets.remove(ctx.params);
  }
};
