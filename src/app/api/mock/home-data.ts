import { YN } from '../../shared/enums/yn.enum';
import { HomeData, HomeDataNews } from '../models/get-home-data.models';
import { NEWS_LIST } from './news-list';

export const HOME_DATA: HomeData = {
  newsList: NEWS_LIST.filter((news) => news.pinned === YN.Y).map<HomeDataNews>(
    (news) => {
      const { newsID: newsID, title, date } = news;

      return {
        newsID: newsID,
        title,
        date,
      };
    }
  ),
  applCount: 1234,
  applCountToday: 29,
  hospCount: 12,
};
