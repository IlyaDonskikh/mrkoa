import faker from 'faker';

import { User } from '../../../../src/models/user.model';
import { PanelUserCreateCase } from '../../../../src/usecases/panel/user/create.case';
import { UserFactory } from '../../../factories/user.factory';

interface UserAttrs {
  email: string;
  password: string;
  passwordConfirmation: string;
}

describe('Panel | User Services', () => {
  describe('Create', () => {
    it('success', async () => {
      const userAttrs = await buildUserAttrs();

      const useCase = await useCaseCall(userAttrs);

      expect(useCase.user).toBeInstanceOf(User);
    });

    describe('when email contains capital chars', () => {
      it('downcase email', async () => {
        const emailWithCapitalChars = faker.internet.email().toUpperCase();
        const userAttrs = await buildUserAttrs({
          overrides: { email: emailWithCapitalChars },
        });
        const lowercaseEmail = emailWithCapitalChars.toLowerCase();
        const useCase = await useCaseCall(userAttrs);

        expect(emailWithCapitalChars).not.toEqual(lowercaseEmail);
        expect(useCase.user.email).toEqual(lowercaseEmail);
      });
    });

    describe('when user password too short ', () => {
      it('reject with password presence error', async () => {
        const userAttrs = await buildUserAttrs({
          overrides: { password: 'a' },
        });

        await expect(useCaseCall(userAttrs)).rejects.toMatchObject({
          errors: { password: ['length', 'confirmation'] },
        });
      });
    });

    describe('when password and confirmation password is not same', () => {
      it('reject with password confirmation error', async () => {
        const userAttrs = await buildUserAttrs({
          overrides: {
            password: faker.datatype.uuid(),
            passwordConfirmation: faker.datatype.uuid(),
          },
        });

        await expect(useCaseCall(userAttrs)).rejects.toMatchObject({
          errors: { password: ['confirmation'] },
        });
      });
    });

    describe('when user email has a wrong format', () => {
      test('reject with email format error', async () => {
        const emailWrongFormat = 'wrong_format';
        const userAttrs = await buildUserAttrs({
          overrides: { email: emailWrongFormat },
        });

        await expect(useCaseCall(userAttrs)).rejects.toMatchObject({
          errors: { email: ['format'] },
        });
      });
    });

    describe('when user with same email exists', () => {
      test('reject with email uniq error', async () => {
        const userExisting = await UserFactory.create();
        const userAttrs = await buildUserAttrs({
          overrides: { email: userExisting.email },
        });

        await expect(useCaseCall(userAttrs)).rejects.toMatchObject({
          errors: { email: ['uniq'] },
        });
      });
    });
  });
});

// helpers
async function buildUserAttrs({
  overrides,
}: { overrides?: Partial<User> } = {}) {
  const user = await UserFactory.build({ ...overrides });

  return {
    email: user.email,
    password: user.password,
    passwordConfirmation: user.passwordConfirmation,
  };
}

function useCaseCall(attrs: UserAttrs) {
  return PanelUserCreateCase.call({ user: attrs });
}
