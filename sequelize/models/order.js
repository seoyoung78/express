const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  //클래스 선언
  class Order extends Model {
    static associate(models) {
      models.Order.belongsTo(models.User, {foreignKey:"userid", targetKey:"userid"});
      models.Order.hasMany(models.OrderItem, {foreignKey:"oid", sourceKey:"oid"});
    }
  };
  //정적 init() 메소드 선언
  Order.init(
    {
      oid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: DataTypes.STRING,
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      giftwrap: DataTypes.INTEGER,
      date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, 
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      timestamps: false,  //createdAt과 updatedAt 컬럼을 사용 안함
    }
  );
  //클래스 리턴
  return Order;
};
