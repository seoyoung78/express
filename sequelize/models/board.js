const {Model, Sequelize} = require("sequelize");

module.exports = (sequelize, DataTypes) => {    //함수 형태로 저장
  //모델 클래스 선언
  class Board extends Model {
    static associate(models) {
      models.Board.belongsTo(models.User, {foreignKey:"bwriter", targetKey:"userid"});
    }
  }
  //DB 칼럼 데이터 타입에 맞게 모델의 속성 정의
  Board.init({
    bno: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    btitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bcontent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bwriter: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    bhitcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    battachoname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    battachsname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    battachtype: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize: sequelize,
    modelName: "Board",
    tableName: "boards",
    timestamps: false //createAt과 updateAt 컬럼 사용 안함
  });

  //모델 클래스 리턴
  return Board;
};