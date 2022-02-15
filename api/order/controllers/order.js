"use strict";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  createPaymentIntent: async (ctx) => {
    const { cart } = ctx.request.body;

    const cartGamesIds = await strapi.config.functions.cart.cartGamesId(cart);

    const games = await strapi.config.functions.cart.cartItems(cartGamesIds);

    if (!games.length) {
      ctx.response.status = 404;
      return {
        error: "No valid game found!",
      };
    }

    const total = await strapi.config.functions.cart.total(games);

    if (total === 0) {
      return {
        freeGames: true,
      };
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        payment_method_types: ["card"],
        metadata: { cart: JSON.stringify(cartGamesIds) },
      });
      return paymentIntent;
    } catch (error) {
      return {
        error: error.raw.message,
      };
    }
  },

  create: async (ctx) => {
    const { cart, paymentIntentId, paymentMethod } = ctx.request.body;
    //pegar o token
    const token = await strapi.plugins[
      "users-permissions"
    ].services.jwt.getToken(ctx);
    //pega o id do user
    const userId = token.id;
    //pega as infos do user
    const userInfo = await strapi
      .query("user", "users-permissions")
      .findOne({ id: userId });
    //pegar os jogos
    const cartGamesIds = await strapi.config.functions.cart.cartGamesId(cart);
    const games = await strapi.config.functions.cart.cartItems(cart);
    //pegar o total
    const total_in_cents = await strapi.config.functions.cart.total(games);
    // salvar no banco
    const entry = {
      total_in_cents,
      payment_intent_id: paymentIntentId,
      card_brand: null,
      card_last4: null,
      user: userInfo,
      games,
    };
    const entity = await strapi.services.order.create(entry);

    return sanitizeEntity(entity, { model: strapi.model.order });
  },
};
