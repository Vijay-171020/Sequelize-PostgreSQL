'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Courses', [
      { name: 'Python', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Java', createdAt: new Date(), updatedAt: new Date() },
      { name: 'C/Cpp', createdAt: new Date(), updatedAt: new Date() },
      { name: '.NET', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Courses', null, {});
  },
};
