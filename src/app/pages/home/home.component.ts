import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  HomeData,
  HomeDataNews,
} from 'src/app/api/models/get-home-data.models';
import { HomeDataInfo } from './home.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  carouselOptions: OwlOptions = {
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      960: {
        items: 3,
      },
    },
    rewind: true,
  };

  newsList: Array<HomeDataNews> = [];
  infoList: Array<HomeDataInfo> = [
    {
      count: 0,
      icon: 'group',
      prefix: '已經有',
      suffix: '位申請',
    },
    {
      count: 0,
      icon: 'local_hospital',
      prefix: '已經有',
      suffix: '間健檢中心',
    },
  ];

  constructor(private route: ActivatedRoute) {
    const { homeData } = this.route.snapshot.data as { homeData: HomeData };

    this.newsList = homeData.newsList;
    this.infoList[0].count = homeData.applCount;
    this.infoList[1].count = homeData.hospCount;
  }

  ngOnInit(): void {}
}
