'use strict';

/**
 * flowers-list service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::flowers-list.flowers-list');
