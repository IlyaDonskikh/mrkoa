import { validateCurrentUserRouterHelper } from '../../../src/helpers/routers/validateCurrentUser.router.helper';
import type { AuthenticatedContext } from '../../../src/types/koa';
import { UserFactory } from '../../factories/user.factory';

describe('Helpers', () => {
  describe('validateCurrentUser', () => {
    it('success', async () => {
      const user = await UserFactory.create();
      const ctx: AuthenticatedContext = {
        currentUser: user,
      } as unknown as AuthenticatedContext;
      const next: jest.Mock = jest.fn().mockResolvedValue(undefined);

      await validateCurrentUserRouterHelper(ctx, next);

      expect(ctx.currentUser?.uuid).toEqual(user.uuid);
      expect(next).toHaveBeenCalled();
    });

    describe('when current user does not attach', () => {
      it('returns undefined current user', async () => {
        const ctx: AuthenticatedContext = {
          currentUser: undefined,
        } as unknown as AuthenticatedContext;
        const next: jest.Mock = jest.fn().mockResolvedValue(undefined);

        await validateCurrentUserRouterHelper(ctx, next);
        expect(next).not.toHaveBeenCalled();
        expect(ctx.status).toEqual(403);
      });
    });
  });
});
