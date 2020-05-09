import { RUSSIAN_TRANSLATIONS } from '../../translations/ru.translations';
import { ENGLISH_TRANSLATIONS } from '../../translations/en.translations';
import { Languages } from '../../enums/languages.enum';
import { LanguageService } from '../../services/language/language.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { formatCupTime } from '../../modules/cup-timer/helpers/cup-time-format.helpers';

export class Translations implements OnInit, OnDestroy {
    // TODO Перевести на поток
    public translations: Record<string, string> = {};
    public lang: Languages;

    private languageOnDestroy$ = new Subject<void>();

    constructor(protected languageService: LanguageService) {}

    ngOnInit(): void {
        this.initLanguageSubscription();
    }

    ngOnDestroy(): void {
        this.languageOnDestroy$.next();
        this.languageOnDestroy$.complete();
    }

    public setLanguage(language: Languages): void {
        this.languageService.setLanguage(language);
    }

    public getFormattedCupTime$(dateTime: string): Observable<string> {
        return this.languageService
            .getLanguage$()
            .pipe(map((language: Languages) => formatCupTime(dateTime, language)));
    }

    private initLanguageSubscription(): void {
        this.languageService
            .getLanguage$()
            .pipe(takeUntil(this.languageOnDestroy$))
            .subscribe((language: Languages) => {
                this.translations = language === Languages.EN ? ENGLISH_TRANSLATIONS : RUSSIAN_TRANSLATIONS;
                this.lang = language;
            });
    }
}
