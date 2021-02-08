'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          masg: "Todo list must have a title"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          masg: "Todo list must have a description"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Todo list must have a status"
        },
        isIn: {
          args: [["Not Started", "In Progress", "Completed"]],
          masg: `Status must be between "Not Started" OR "In Progress" OR "Completed"`
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: {
          args: new Date().toDateString(),
          msg: "Date must be after the current date"
        },
        notEmpty: {
          args: true,
          msg: "Date must not be empty"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};