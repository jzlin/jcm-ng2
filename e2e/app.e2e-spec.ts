import { JcmNg2Page } from './app.po';

describe('jcm-ng2 App', function() {
  let page: JcmNg2Page;

  beforeEach(() => {
    page = new JcmNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
