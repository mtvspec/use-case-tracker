import { UctFrontendPage } from './app.po';

describe('uct-frontend App', () => {
  let page: UctFrontendPage;

  beforeEach(() => {
    page = new UctFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
