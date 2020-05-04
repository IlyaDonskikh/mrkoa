import { Sequelize, Model, DataTypes } from 'sequelize';

export class User extends Model {
  public id!: number;

  public email!: string;

  public password!: string;

  public passwordConfirmation: string;

  public token!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export const initModel = (sequelize: Sequelize) => {
  const tableName: string = 'users';

  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    passwordConfirmation: {
      type: DataTypes.VIRTUAL,
    },
    token: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    sequelize,
    tableName,
  });
};

export const setupAssociations = () => {};
