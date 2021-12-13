import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../@core/services/authentication.service';

declare const $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  url: string;
  url1;
  activeRoute: string;
  active2Route;
  userteams: number[] = [];
  env = environment;
  admin = false;
  student = false;
  teacher = false;
  constructor(private router: Router, private auth: AuthenticationService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $('.main-wrapper').removeClass('slide-nav');
        $('.sidebar-overlay').removeClass('opened');
        const url = event.url.split('/');
        this.url = url[1];
        this.url1 = url[2];
        this.activeRoute = this.url;
        this.active2Route = this.url1;
      }
    });
  }

  ngOnInit() {
    this.userteams.push(...this.auth.getLoggedValidUserTeamCodes());
    this.getType();
    // Variables declarations

    const $wrapper = $('.main-wrapper');
    const $pageWrapper = $('.page-wrapper');
    const $slimScrolls = $('.slimscroll');

    // Sidebar

    const Sidemenu = function () {
      this.$menuItem = $('#sidebar-menu a');
    };

    function init() {
      const $this = Sidemenu;
      $('#sidebar-menu a').on('click', function (e) {
        if ($(this).parent().hasClass('submenu')) {
          e.preventDefault();
        }
        if (!$(this).hasClass('subdrop')) {
          $('ul', $(this).parents('ul:first')).slideUp(350);
          $('a', $(this).parents('ul:first')).removeClass('subdrop');
          $(this).next('ul').slideDown(350);
          $(this).addClass('subdrop');
        } else if ($(this).hasClass('subdrop')) {
          $(this).removeClass('subdrop');
          $(this).next('ul').slideUp(350);
        }
      });
      $('#sidebar-menu ul li.submenu a.active')
        .parents('li:last')
        .children('a:first')
        .addClass('active')
        .trigger('click');
    }

    // Sidebar Initiate
    init();

    // Mobile menu sidebar overlay

    $('body').append('<div class="sidebar-overlay"></div>');
    $(document).on('click', '#mobile_btn', function () {
      $wrapper.toggleClass('slide-nav');
      $('.sidebar-overlay').toggleClass('opened');
      $('html').addClass('menu-opened');
      return false;
    });

    // Sidebar overlay

    $('.sidebar-overlay').on('click', function () {
      $wrapper.removeClass('slide-nav');
      $('.sidebar-overlay').removeClass('opened');
      $('html').removeClass('menu-opened');
    });

    // Page Content Height

    if ($('.page-wrapper').length > 0) {
      const height = $(window).height();
      $('.page-wrapper').css('min-height', height);
    }

    // Page Content Height Resize

    // tslint:disable-next-line: only-arrow-functions
    $(window).resize(function () {
      if ($('.page-wrapper').length > 0) {
        const height = $(window).height();
        $('.page-wrapper').css('min-height', height);
      }
    });
  }

  setActive() {
    this.activeRoute = this.url;
    this.active2Route = this.url1;

  }

  getType() {
    if (this.userteams.includes(this.env.esylangTeams.admin ) || this.userteams.includes(this.env.esylangTeams.superAdmin)) {
      return this.admin = true;
    } else if (this.userteams.includes(this.env.esylangTeams.teacher)) {
      return this.teacher = true;
    } else if (this.userteams.includes(this.env.esylangTeams.student)) {
      return this.student = true;
    }
  }
}
