module.exports = function(sequelize, DataTypes) {
  var Track = sequelize.define("Track", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true

    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },

  });

  Track.associate = function(models) {
    Track.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Track;
};
