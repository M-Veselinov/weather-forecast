import { WeatherForecastPage } from './app.po';

describe('weather-forecast App', () => {
  let page: WeatherForecastPage;

  beforeEach(() => {
    page = new WeatherForecastPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
