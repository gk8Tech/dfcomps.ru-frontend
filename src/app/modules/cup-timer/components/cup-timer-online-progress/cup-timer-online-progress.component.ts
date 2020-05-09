import { LanguageService } from '../../../../services/language/language.service';
import { Translations } from '../../../../components/translations/translations.component';
import { Component, OnInit, OnChanges, Input, EventEmitter, Output, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-cup-timer-online-progress',
    templateUrl: './cup-timer-online-progress.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CupTimerOnlineProgressComponent extends Translations implements OnInit, OnChanges {
    @Input()
    cupName: string;
    @Input()
    newsId: string;
    @Input()
    endTime: string;
    @Input()
    server: string;

    @Output()
    finished = new EventEmitter<void>();

    public formattedTime$: Observable<string>;

    private endTime$ = new ReplaySubject<string>(1);

    constructor(protected languageService: LanguageService) {
        super(languageService);
    }

    ngOnInit(): void {
        this.formattedTime$ = this.endTime$.pipe(switchMap((time: string) => this.getFormattedCupTime$(time)));
        super.ngOnInit();
    }

    ngOnChanges({ endTime }: SimpleChanges): void {
        if (endTime && endTime.currentValue) {
            this.endTime$.next(endTime.currentValue);
        }
    }
}
