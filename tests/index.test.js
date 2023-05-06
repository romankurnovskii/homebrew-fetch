import { processItemFiles } from 'src/index.js';

describe('processItemFiles', () => {
  it('should process cask files correctly', () => {
    const files = [
      { filename: 'Casks/test-cask-1.rb', status: 'added' },
      { filename: 'Casks/test-cask-2.rb', status: 'modified' },
      { filename: 'Formula/test-formula-1.rb', status: 'added' },
      { filename: 'Casks/test-cask-3.rb', status: 'removed' },
    ];

    const resultItems = {};
    processItemFiles(files, resultItems);

    expect(resultItems.added).toEqual(['test-cask-1']);
    expect(resultItems.modified).toEqual(['test-cask-2']);
    expect(resultItems.removed).toEqual(['test-cask-3']);
  });

  it('should process formula files correctly', () => {
    const files = [
      { filename: 'Formula/test-formula-1.rb', status: 'added' },
      { filename: 'Formula/test-formula-2.rb', status: 'modified' },
      { filename: 'Casks/test-cask-1.rb', status: 'added' },
      { filename: 'Formula/test-formula-3.rb', status: 'removed' },
    ];

    const resultItems = {};
    processItemFiles(files, resultItems, 'Formula');

    expect(resultItems.added).toEqual(['test-formula-1']);
    expect(resultItems.modified).toEqual(['test-formula-2']);
    expect(resultItems.removed).toEqual(['test-formula-3']);
  });
});
