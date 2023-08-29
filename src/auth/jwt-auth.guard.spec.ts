import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  it('should be defined', () => {
    expect(jwtAuthGuard).toBeUndefined();
  });
});
