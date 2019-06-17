import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main.page';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material';
import { NewsOnlineResultsComponent } from './components/news-online-results/news-online-results.component';
import { NewsOnlineAnnounceComponent } from './components/news-online-announce/news-online-announce.component';
import { NewsOfflineResultsComponent } from './components/news-offline-results/news-offline-results.component';
import { NewsOfflineStartComponent } from './components/news-offline-start/news-offline-start.component';
import { NewsSimpleComponent } from './components/news-simple/news-simple.component';
import { NewsMulticupResultsComponent } from './components/news-multicup-results/news-multicup-results.component';
import { NewsService } from '../../services/news-service/news.service';
import { HtmlNewsComponent } from './components/html-news/html-news.component';

const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
    },
];

@NgModule({
    declarations: [
        MainPageComponent,
        NewsOnlineResultsComponent,
        NewsOnlineAnnounceComponent,
        NewsOfflineResultsComponent,
        NewsOfflineStartComponent,
        NewsSimpleComponent,
        NewsMulticupResultsComponent,
        HtmlNewsComponent,
    ],
    imports: [CommonModule, RouterModule.forChild(routes), MatProgressSpinnerModule],
    providers: [NewsService],
})
export class MainPageModule {}
