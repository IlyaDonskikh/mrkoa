'use strict';
module.exports = (sequelize, DataTypes) => {
  const DeviceEvent = sequelize.define('DeviceEvent', {
    name: DataTypes.STRING
  }, {});
  DeviceEvent.associate = function(models) {
    // associations can be defined here
  };
  return DeviceEvent;
};