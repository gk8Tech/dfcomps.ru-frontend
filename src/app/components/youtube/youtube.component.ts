import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-youtube',
    templateUrl: './youtube.component.html',
    styleUrls: ['./youtube.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YoutubeComponent implements OnInit {
    @Input()
    id: string;
    @Input()
    width: number;
    @Input()
    height: number;

    public iframeShown = false;
    public iframeLink: SafeUrl;

    constructor(public domSantizer: DomSanitizer) {}

    ngOnInit(): void {
        this.iframeLink = this.domSantizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.id}/?autoplay=1`);
    }
}
