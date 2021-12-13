import { PlessonsService } from 'src/app/@core/services/p-lessons/p-lessons.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { Chapter } from 'src/app/@core/models/p-lessons/chapter.model';
import { Faq } from 'src/app/@core/models/p-lessons/faq.model';
import { ChapterService } from 'src/app/@core/services/p-lessons/chapter.service';
import { FaqService } from 'src/app/@core/services/p-lessons/faq.service';

@Component({
  selector: 'app-view-lesson',
  templateUrl: './view-lesson.component.html',
  styleUrls: ['./view-lesson.component.css']
})
export class ViewLessonComponent implements OnInit {
  faq: Faq[];
  modelChapter: Chapter = new Chapter();
  lid: string;
  modelFaq: Faq = new Faq();
  chapter = [];


  constructor(private activatedRoute: ActivatedRoute,
              private toaster: Toaster,
              private Fservice: FaqService,
              private Cservice: ChapterService,
              private sanitizer: DomSanitizer,
              private lessonService: PlessonsService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.lid = param.get('id');
    });
    if (this.lid != null) {
      this.modelFaq.lessonId = this.lid;
      this.getFaqs(this.lid);
      this.getSingleC(this.lid);
      this.getNextFiveLessons(this.lid);
    }

  }


  public getFaqs(e) {
    this.Fservice.getallNp(e).subscribe(res => {
      const data = res;
      if (data.data && data.data.length > 0) {
        this.faq = data.data;
        this.modelFaq.lessonId = this.lid;
      } else {
        this.faq = data.data;
      }
    });
  }


  getSingleC(e) {
    this.Cservice.single(e).subscribe(res => {
      const data = res.data  ;
      if (res.status === 1) {
        this.modelChapter = data;
        this.chapter.push(this.modelChapter);
        this.chapter.forEach( a => {
          a.url = this.sanitizer.bypassSecurityTrustResourceUrl(a.url);
        });
        // const x = this.sanitizer.bypassSecurityTrustResourceUrl(this.modelChapter.url);
        // this.modelChapter.url = x;
      } else if (res.code === 404) {
        this.toaster.open({
          text: res.message,
          caption: 'Warning',
          type: 'warning',
        });
      }
    });
  }

  public getNextFiveLessons(e){
    this.lessonService.getNextFiveLessons(e).subscribe(res => {
      console.log(res);
    });
  }

}
