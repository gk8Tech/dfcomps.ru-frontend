import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsCommentTextComponent } from './news-comment-text.component';

describe('NewsCommentTextComponent', () => {
    let component: NewsCommentTextComponent;
    let fixture: ComponentFixture<NewsCommentTextComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewsCommentTextComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewsCommentTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
