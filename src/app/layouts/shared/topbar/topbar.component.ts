import { Component, OnInit, Output, EventEmitter, Inject, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


import { LanguageService } from '../../../services/language.service';
import { EventService } from '../../../services/event.service';
import { CookieService } from 'ngx-cookie-service';

//redux
import { Store } from '@ngrx/store';
import * as uiActions from '../../../redux/actions/ui.actions';
import * as segurityActions from '../../../redux/actions/segurity.actions';
import { IAppState } from 'src/app/app.state';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserData } from 'src/app/interfaces/auth.interface';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  element: any;
  mode: string | undefined;
  // @Output() mobileMenuButtonClicked = new EventEmitter();



  flagvalue = 'assets/images/flags/spain.svg';
  valueset: any;
  countryName: any;
  cookieValue: any;


   /***
   * Language Listing
   */
   listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Española', flag: 'assets/images/flags/spain.svg', lang: 'es' },
    { text: 'Deutsche', flag: 'assets/images/flags/germany.svg', lang: 'de' },
    { text: 'Italiana', flag: 'assets/images/flags/italy.svg', lang: 'it' },
    { text: 'русский', flag: 'assets/images/flags/russia.svg', lang: 'ru' },
    { text: '中国人', flag: 'assets/images/flags/china.svg', lang: 'ch' },
    { text: 'français', flag: 'assets/images/flags/french.svg', lang: 'fr' },
    { text: 'Arabic', flag: 'assets/images/flags/ar.svg', lang: 'ar' },
  ];


  public languageService = inject( LanguageService );
  private  eventService = inject(EventService );
  private _cookiesService = inject( CookieService );
  private _st = inject( StorageService );
  private _store = inject( Store<IAppState> );
  private _router = inject( Router );

  private _segurity$?: Subscription;

  private _loadedUser = false;

  private _userData?: IUserData;

  constructor(@Inject(DOCUMENT) private document: any){}

  ngOnInit(): void {
    this.element = document.documentElement;

    this.cookieValue = this._cookiesService.get('lang');

    this.onListenRx();
  }

  get userRoles() { return this._userData?.roles.map( (r) => r.name ).join(' - ') ?? 'sin rol'; }
  get fullname() { return this._userData?.fullname ?? 'undefined'; }

  /***
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');

    // !this.element?.mozFullScreenElement &&
    if (
      !document.fullscreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }


  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this._store.dispatch( uiActions.onToggle() );

  }

  // Search Topbar
  Search() {
    var searchOptions = document.getElementById("search-close-options") as HTMLAreaElement;
    var dropdown = document.getElementById("search-dropdown") as HTMLAreaElement;
    var input: any, filter: any, ul: any, li: any, a: any | undefined, i: any, txtValue: any;
    input = document.getElementById("search-options") as HTMLAreaElement;
    filter = input.value.toUpperCase();
    var inputLength = filter.length;

    if (inputLength > 0) {
      dropdown.classList.add("show");
      searchOptions.classList.remove("d-none");
      var inputVal = input.value.toUpperCase();
      var notifyItem = document.getElementsByClassName("notify-item");

      Array.from(notifyItem).forEach(function (element: any) {
        var notifiTxt = ''
        if (element.querySelector("h6")) {
          var spantext = element.getElementsByTagName("span")[0].innerText.toLowerCase()
          var name = element.querySelector("h6").innerText.toLowerCase()
          if (name.includes(inputVal)) {
            notifiTxt = name
          } else {
            notifiTxt = spantext
          }
        } else if (element.getElementsByTagName("span")) {
          notifiTxt = element.getElementsByTagName("span")[0].innerText.toLowerCase()
        }
        if (notifiTxt)
          element.style.display = notifiTxt.includes(inputVal) ? "block" : "none";

      });
    } else {
      dropdown.classList.remove("show");
      searchOptions.classList.add("d-none");
    }
  }


  onListenRx() {
    this._segurity$ = this._store.select('segurity')
    .subscribe( (state) => {

      const { userData } = state;

      if( !this._loadedUser && userData ) {

        this._loadedUser = true;

        this._userData = userData;

        // this._segurity$?.unsubscribe();
      }



    });
  }

  /**
   * Search Close Btn
   */
  closeBtn() {
    var searchOptions = document.getElementById("search-close-options") as HTMLAreaElement;
    var dropdown = document.getElementById("search-dropdown") as HTMLAreaElement;
    var searchInputReponsive = document.getElementById("search-options") as HTMLInputElement;
    dropdown.classList.remove("show");
    searchOptions.classList.add("d-none");
    searchInputReponsive.value = "";
  }

  /**
  * Topbar Light-Dark Mode Change
  */
  changeMode(mode: string) {
    this.mode = mode;

    this._st.setItem( 'themeMode', mode );
    this.eventService.broadcast('changeMode', mode);

    switch (mode) {
      case 'light':
        document.body.setAttribute('data-layout-mode', "light");
        document.body.setAttribute('data-sidebar', "light");

        break;
      case 'dark':
        document.body.setAttribute('data-layout-mode', "dark");
        document.body.setAttribute('data-sidebar', "dark");
        break;
      default:
        document.body.setAttribute('data-layout-mode', "light");
        break;
    }
  }

  windowScroll() {
    try {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        (document.getElementById('back-to-top') as HTMLElement).style.display = "block";
      } else {
        (document.getElementById('back-to-top') as HTMLElement).style.display = "none";
      }
    } catch (error) {
      console.warn('Error to windowScroll', error);
    }
  }

  logout() {

    this._st.setItem('token', '');
    this._st.onClearStorage();

    this._store.dispatch( segurityActions.onClear() );

    this._router.navigateByUrl('/auth');

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._segurity$?.unsubscribe();

  }

}
