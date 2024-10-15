import App from '../../src/scripts/app';

describe('src/scripts/app.js', () => {

  test('version format should be x.x.x', () => {
    expect(App.version).toMatch(/\d+\.\d+\.\d+/);
  });
  
});