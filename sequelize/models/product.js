const {Model, Sequelize} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //클래스 선언
  class Product extends Model {
    static associatie(models) {
      models.Product.hasMany(models.OrderItem, {foreignKey:"pid", sourceKey:"pid"});
    }
  }
  
  //컬럼 정의/모델명/테이블명 설정
  Product.init({
    pid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: false
  });

  //클래스 리턴
  return Product;
};