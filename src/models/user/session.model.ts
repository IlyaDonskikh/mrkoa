import * as jwt from 'jsonwebtoken';
import {
  Association,
  BelongsToGetAssociationMixin,
  DataTypes,
  Model,
  Sequelize,
} from 'sequelize';
import { v7 as uuidV7 } from 'uuid';

import { User } from './../user.model';

interface UserSessionAttributes {
  uuid?: string;
  userUUID: string;
  token: string;
  tokenJWT?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class UserSession
  extends Model<UserSessionAttributes>
  implements UserSessionAttributes
{
  public uuid!: string;

  public userUUID!: string;

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
    filterByUserUUID(uuid: string) {
      return {
        include: [
          {
            model: User,
            as: 'user',
            where: { uuid },
          },
        ],
      };
    },
  };

  static initModel(sequelize: Sequelize) {
    const tableName = 'user_sessions';

    UserSession.init(
      {
        uuid: {
          allowNull: false,
          primaryKey: true,
          defaultValue: () => uuidV7(),
          type: DataTypes.UUID,
        },
        token: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        tokenJWT: {
          type: DataTypes.VIRTUAL,
          get() {
            const token = this.getDataValue('token');
            const secret = process.env.NODE_APP_TOKEN as string;

            if (!token) return '';

            return jwt.sign({ sessionToken: token }, secret);
          },
        },
        userUUID: {
          allowNull: false,
          type: DataTypes.UUID,
          references: { model: 'users', key: 'uuid' },
          field: 'user_uuid',
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
      },
      {
        scopes: UserSession.scopes,
        sequelize,
        paranoid: true,
        tableName,
      },
    );
  }

  static setupAssociations() {
    UserSession.belongsTo(User, { as: 'user', foreignKey: 'user_uuid' });
  }
}
