import { BlogPage } from './app.po';

describe('blog App', () => {
  let page: BlogPage;

  beforeEach(() => {
    page = new BlogPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
