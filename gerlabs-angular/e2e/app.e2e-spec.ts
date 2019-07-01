import { GerlabsFrontendPage } from './app.po';

describe('gerlabs-frontend App', () => {
  let page: GerlabsFrontendPage;

  beforeEach(() => {
    page = new GerlabsFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
