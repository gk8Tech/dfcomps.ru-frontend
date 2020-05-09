import { UserInterface } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/user-service/user.service';
import { RegisteredPlayerInterface } from '../../../../interfaces/registered-player.interface';
import { LanguageService } from '../../../../services/language/language.service';
import { Translations } from '../../../../components/translations/translations.component';
import { NewsOnlineAnnounceInterface } from '../../../../services/news-service/interfaces/news-online-announce.interface';
import { Component, Input, OnChanges, SimpleChanges, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { range } from 'lodash';
import { CupRegistrationService } from '../../services/cup-registration/cup-registration.service';
import { filter, withLatestFrom, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-news-online-announce',
    templateUrl: './news-online-announce.component.html',
    styleUrls: ['./news-online-announce.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsOnlineAnnounceComponent extends Translations implements OnInit, OnChanges {
    @Input() news: NewsOnlineAnnounceInterface;

    public range = range;
    public columnCount = 4;
    public rowCount = 10;
    public isRegistered: boolean;
    public registeredPlayers: RegisteredPlayerInterface[];
    public iframeLink1: SafeUrl;
    public iframeLink2: SafeUrl;
    public currentStream = 0;

    constructor(
        protected languageService: LanguageService,
        private cupRegistrationService: CupRegistrationService,
        private userService: UserService,
        private router: Router,
        private domSantizer: DomSanitizer,
    ) {
        super(languageService);
    }

    ngOnInit(): void {
        this.iframeLink1 = this.domSantizer.bypassSecurityTrustResourceUrl(
            `https://player.twitch.tv/?channel=${this.news.twitch1}}&autoplay=false`,
        );

        this.iframeLink2 = this.domSantizer.bypassSecurityTrustResourceUrl(
            `https://player.twitch.tv/?channel=${this.news.twitch2}}&autoplay=false`,
        );

        super.ngOnInit();
    }

    ngOnChanges({ news }: SimpleChanges): void {
        if (news && news.currentValue) {
            this.isRegistered = this.news.isRegistered;
            this.registeredPlayers = this.news.registeredPlayers;
        }
    }

    public toggleRegistration(): void {
        if (this.isRegistered) {
            this.cupRegistrationService
                .cancelRegistrationForCup$(this.news.cupId)
                .pipe(
                    withLatestFrom(this.userService.getCurrentUser$()),
                    filter(([, user]: [void, UserInterface]) => !!user),
                )
                .subscribe(([, user]: [void, UserInterface]) => {
                    this.isRegistered = false;
                    this.registeredPlayers = this.registeredPlayers.filter(
                        ({ id }: RegisteredPlayerInterface) => id !== user.id,
                    );
                });
        } else {
            this.cupRegistrationService
                .registerForCup$(this.news.cupId)
                .pipe(
                    withLatestFrom(this.userService.getCurrentUser$()),
                    filter(([, user]: [void, UserInterface]) => !!user),
                )
                .subscribe(([, { country, id, nick }]: [void, UserInterface]) => {
                    this.isRegistered = true;
                    this.registeredPlayers = [
                        ...this.registeredPlayers,
                        {
                            country,
                            id,
                            nick,
                        },
                    ];
                });
        }
    }

    public openFullTable(): void {
        this.router.navigate(['/cup/online'], { queryParams: { id: this.news.cupId } });
    }

    public changeStream(streamNumber: number): void {
        this.currentStream = streamNumber;
    }
}
