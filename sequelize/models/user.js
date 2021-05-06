const {Model, Sequelize} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //모델 클래스 선언
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Board, {foreignKey:"bwriter", sourceKey:"userid"});
    }
  }
  //DB 칼럼 데이터 타입에 맞게 모델의 속성 정의
  User.init({
    userid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userpassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userauthority: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userenabled: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize: sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false //createAt과 updateAt 컬럼 사용 안함
  });

  //모델 클래스 리턴
  return User;
};