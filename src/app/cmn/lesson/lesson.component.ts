import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@HostListener('window: resize', ['$event'])
@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  public innerHeight: any;

  constructor(private ngZone: NgZone, private router: Router) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  ngOnInit() {
    // Page Content Height

    if ($('.page-wrapper').length > 0) {
      const height = $(window).height();
      $('.page-wrapper').css('min-height', height);
    }

    // Page Content Height Resize

    // tslint:disable-next-line: only-arrow-functions
    $(window).resize(function() {
      if ($('.page-wrapper').length > 0) {
        const height = $(window).height();
        $('.page-wrapper').css('min-height', height);
      }
    });
  }
  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
  }

}
