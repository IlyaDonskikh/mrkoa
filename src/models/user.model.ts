import {
  Association,
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  Sequelize,
} from 'sequelize';
import { UserSession } from './user/session.model';

export class User extends Model {
  public id!: number;

  public email!: string;

  public password!: string;

  public passwordConfirmation: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  // relations
  public getSessions!: HasManyGetAssociationsMixin<UserSession>;

  public readonly sessions?: UserSession[];

  public static associations: {
    sessions: Association<User, UserSession>;
  };

  static initModel(sequelize: Sequelize) {
    const tableName = 'users';

    User.init(
      {
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
      },
      {
        sequelize,
        tableName,
      },
    );
  }

  static setupAssociations() {
    User.hasMany(UserSession, { as: 'sessions', foreignKey: 'user_id' });
  }
}
