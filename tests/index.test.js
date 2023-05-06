import { helloWorld } from '../src/index.js';

describe('helloWorld', () => {
  it('should log "Hello, world!"', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    helloWorld();
    expect(consoleSpy).toHaveBeenCalledWith('Hello, world!');
    consoleSpy.mockRestore();
  });
});
