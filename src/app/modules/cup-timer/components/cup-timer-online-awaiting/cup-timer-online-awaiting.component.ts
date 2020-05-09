import { LanguageService } from '../../../../services/language/language.service';
import { Translations } from '../../../../components/translations/translations.component';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-cup-timer-online-awaiting',
    templateUrl: './cup-timer-online-awaiting.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CupTimerOnlineAwaitingComponent extends Translations implements OnInit, OnChanges {
    @Input()
    cupName: string;
    @Input()
    startTime: string;

    @Output()
    finished = new EventEmitter<void>();

    public formattedTime$: Observable<string>;

    private startTime$ = new ReplaySubject<string>(1);

    constructor(protected languageService: LanguageService) {
        super(languageService);
    }

    ngOnInit(): void {
        this.formattedTime$ = this.startTime$.pipe(switchMap((time: string) => this.getFormattedCupTime$(time)));
        super.ngOnInit();
    }

    ngOnChanges({ startTime }: SimpleChanges): void {
        if (startTime && startTime.currentValue) {
            this.startTime$.next(startTime.currentValue);
        }
    }
}
