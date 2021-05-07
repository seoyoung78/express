const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  //클래스 선언
  class OrderItem extends Model {
    static associate(models) {
      models.OrderItem.belongsTo(models.Order, {foreignKey:"oid", targetKey:"oid"});
      models.OrderItem.belongsTo(models.Product, {foreignKey:"pid", targetKey:"pid"});
    }
  };
  //정적 init() 메소드 선언
  OrderItem.init(
    {
      oid: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      pid: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, 
    {
      sequelize,
      modelName: "OrderItem",
      tableName: "orderitems",
      timestamps: false,  //createdAt과 updatedAt 컬럼을 사용 안함
    }
  );
  //클래스 리턴
  return OrderItem;
};