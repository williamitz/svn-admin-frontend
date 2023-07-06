import { Component, inject } from '@angular/core';
import { IAppState } from './app.state';

//redux
import { Store } from '@ngrx/store';
import * as uiActions from './redux/actions/ui.actions';
import * as segurityActions from './redux/actions/segurity.actions';

import { Subscription } from 'rxjs';
import { StorageService } from './services/storage.service';
import { EThemeMode } from './interfaces/theme.enum';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell-velzon';

  private _uirx$?: Subscription;
  private _segurity$?: Subscription;
  private _menu$?: Subscription;

  private _store = inject<Store<IAppState>>( Store<IAppState> );
  private _st = inject( StorageService );
  private _authsvc = inject( AuthService );

  private _loadMenu = false;

  ngOnInit(): void {

    const screenWidth = document.documentElement.clientWidth;

    const themeMode = this._st.getItem('themeMode') ?? EThemeMode.light;

    this._store.dispatch( uiActions.onResizeScreen( { screenWidth } ) );

    this.onChangeThemeMode( themeMode == EThemeMode.dark ? EThemeMode.dark : EThemeMode.light );

    this.onSetSizeScreen();
    this.onListenResizeScreen();
    this.onListenUiRx();
    this.onListenSegurityRx();

    this.onLoadMenu();
  }

  onLoadMenu() {

    // validar el token
    // listar menú dinámico

    const token = this._st.getItem('token');
    if( token != '' ) {

      this._menu$ = this._authsvc.onFindMenu()
      .subscribe({
        next: (response) => {

          const { allowMenu, data } = response;



          this._store.dispatch( segurityActions.onLoadMenuSystem( { allow: allowMenu } ) );
          // this._store.dispatch( uiActions.onLoadedMenu() );

          console.log('response ::: ', response);

        },
        error: (e) => {
          console.log('error ::: ', e);

        }
      });

    }

  }

  onSetSizeScreen() {
    document.documentElement.setAttribute('data-layout', 'vertical');
    document.documentElement.setAttribute('data-topbar', 'light');
    document.documentElement.setAttribute('data-sidebar', 'dark');
    document.documentElement.setAttribute('data-layout-style', 'default');
    document.documentElement.setAttribute('data-layout-mode', 'light');
    document.documentElement.setAttribute('data-layout-width', 'fluid');
    document.documentElement.setAttribute('data-layout-position', 'fixed');
    document.documentElement.setAttribute('data-sidebar-image', 'none');
    document.documentElement.setAttribute('data-preloader', 'disable');
    document.documentElement.setAttribute('data-sidebar-size', 'sm');
  }

  onListenResizeScreen() {
    window.addEventListener('resize' , () => {

      const screenWidth = document.documentElement.clientWidth;

      if ( screenWidth <= 767) {
        document.documentElement.setAttribute('data-sidebar-size', '');
      }
      else if (screenWidth <= 1024) {
        document.documentElement.setAttribute('data-sidebar-size', 'sm');
      }
      else if (screenWidth >= 1024) {
        document.documentElement.setAttribute('data-sidebar-size', 'lg');
      }

    });
  }

  onListenUiRx() {

    this._uirx$ = this._store.select('ui')
    .subscribe( (state) => {

      const currentSIdebarSize = document.documentElement.getAttribute("data-sidebar-size");
      var windowSize = document.documentElement.clientWidth;

      if (windowSize > 767)
        document.querySelector(".hamburger-icon")?.classList.toggle("open");

      if (document.documentElement.getAttribute("data-layout") === "vertical") {
        if (windowSize < 1025 && windowSize >= 767) {

          document.body.classList.remove("vertical-sidebar-enable");

          currentSIdebarSize == "sm" ?
            document.documentElement.setAttribute("data-sidebar-size", "") :
            document.documentElement.setAttribute("data-sidebar-size", "sm");
        } else if (windowSize > 1025) {

          document.body.classList.remove("vertical-sidebar-enable");

          (currentSIdebarSize == null || currentSIdebarSize == "lg") ?
            document.documentElement.setAttribute("data-sidebar-size", "sm") :
            document.documentElement.setAttribute("data-sidebar-size", "lg");

        } else if (windowSize < 767) {
          document.body.classList.add("vertical-sidebar-enable");
          document.documentElement.setAttribute("data-sidebar-size", "lg");
        }
      }

    });

  }

  onListenSegurityRx() {

    this._segurity$ = this._store.select('segurity')
    .subscribe( (state) => {

      const { loadMenu } = state;



      if( loadMenu && !this._loadMenu ) {
        this._loadMenu = true;
        this.onLoadMenu();
      }

    });

  }

  onChangeThemeMode( themeMode: EThemeMode ) {
    switch (themeMode) {
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._uirx$?.unsubscribe();
    this._menu$?.unsubscribe();
    this._segurity$?.unsubscribe();
  }

}
