const Errors = {
  USER_NOT_FOUND: {
    notFound: 'User is not found'
  }
};

module.exports = {
  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },

  exits: {
    notFound: {
      responseType: 'notFound'
    }
  },

  fn: async function(inputs, exits) {
    let user = await sails.helpers.getUser(inputs.id);

    if (!user) {
      throw Errors.USER_NOT_FOUND;
    }

    user = await sails.helpers.deleteUser(user, this.req);

    if (!user) {
      throw Errors.USER_NOT_FOUND;
    }

    return exits.success({
      item: user
    });
  }
};