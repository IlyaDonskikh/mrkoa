/* eslint import/no-cycle: off */

import * as jwt from 'jsonwebtoken';
import {
  Association, BelongsToGetAssociationMixin, DataTypes, Model, Sequelize,
} from 'sequelize';
import { User } from '../user.model';

export class UserSession extends Model {
  public id!: number;

  public userId!: number;

  public token!: string;

  public tokenJWT: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt: Date;

  // relations
  public getUser!: BelongsToGetAssociationMixin<User>;

  public readonly user!: User;

  public static associations: {
    user: Association<UserSession, User>;
  };

  // Scopes
  public static scopes = {
    filterByUserId(id: number) {
      return {
        include: [
          {
            model: User,
            as: 'user',
            where: {
              id,
            },
          },
        ],
      };
    },
  };
}

export const initModel = (sequelize: Sequelize) => {
  const tableName: string = 'user_sessions';

  UserSession.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    tokenJWT: {
      type: DataTypes.VIRTUAL,
      get() {
        const token = this.getDataValue('token');
        const secret = process.env.NODE_APP_TOKEN;

        if (!token) return '';

        return jwt.sign({ sessionToken: token }, secret);
      },
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' },
      field: 'user_id',
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
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at',
    },
  }, {
    scopes: UserSession.scopes,
    sequelize,
    paranoid: true,
    tableName,
  });
};

export const setupAssociations = () => {
  UserSession.belongsTo(User, { as: 'company', foreignKey: 'user_id' });
};
