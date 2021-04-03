module.exports = {
  email: {
    presence: 'fill in the field',
    find: '{{ email }} not found',
    active: 'deactivated',
  },
  password: {
    valid: "doesn't valid or match email",
    presence: 'fill in the field',
  },
};
