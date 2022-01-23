const Sequelize = require('sequelize');
//domain -> domain 등록해서 허가 받기 위해!

module.exports = class Domain extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      host: {
        type: Sequelize.STRING(80), 
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('free', 'premium'), //타입(문자열이긴 하지만 free 또는 premium)
        allowNull: false,
      },
      clientSecret: { //restAPI 키
        type: Sequelize.UUID,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'Domain',
      tableName: 'domains',
    });
  }

  static associate(db) {
    db.Domain.belongsTo(db.User);
  }
};