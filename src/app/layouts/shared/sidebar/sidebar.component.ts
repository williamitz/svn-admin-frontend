import { Component, OnInit, ViewChild, Output, ElementRef, EventEmitter, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from '../../../interfaces/sidebar.interfaces';
import { MENU } from './menu';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.state';
import { Allow, IUserData } from 'src/app/interfaces/auth.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private _segurity$?: Subscription;
  private _store = inject<Store<IAppState>>( Store<IAppState> );
  private _st = inject( StorageService );

  menu: any;
  toggle: any = true;

  private _loadedMenu = false;
  private _userData?: IUserData;

  // menuItems: MenuItem[] = MENU;
  menuItems: Allow[] = [];
  @ViewChild('sideMenu') sideMenu!: ElementRef;
  @Output() mobileMenuButtonClicked = new EventEmitter();


  get userRoles() { return this._userData?.roles.map( (r) => r.name ).join(' - ') ?? 'sin rol'; }
  get fullname() { return this._userData?.fullname ?? 'undefined'; }
  get companyLogo() { return this._userData?.organization.logoUrl ?? '/assets/images/logo-color.png'; }

  constructor(
    private router: Router,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {

    this.onListenRx();


  }

  onListenRx() {
    this._segurity$ = this._store.select('segurity')
    .subscribe( (state) => {

      const { menuSystem, userData } = state;

      if( !this._loadedMenu && menuSystem.length > 0 ) {

        this._loadedMenu = true;

        this.menuItems = menuSystem;
        this._userData = userData;

        setTimeout(() => {
          const id = this._st.getItem('a-id');
          if( id != '' ) {

            const isCurrentMenuId = document.getElementById(id);


            let isMenu = isCurrentMenuId?.nextElementSibling as any;
            if (isMenu.classList.contains("show")) {
              isMenu.classList.remove("show");
              isCurrentMenuId?.setAttribute("aria-expanded", "false");
            } else {
              let dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
              dropDowns.forEach((node: any) => {
                node.classList.remove('show');
              });
              (isMenu) ? isMenu.classList.add('show') : null;
              const ul = document.getElementById("navbar-nav");
              if (ul) {
                const iconItems = Array.from(ul.getElementsByTagName("a"));
                let activeIconItems = iconItems.filter((x: any) => x.classList.contains("active"));
                activeIconItems.forEach((item: any) => {
                  item.setAttribute('aria-expanded', "false")
                  item.classList.remove("active");
                });
              }
              isCurrentMenuId?.setAttribute("aria-expanded", "true");
              if (isCurrentMenuId) {
                this.activateParentDropdown(isCurrentMenuId);
              }
            }
          }
        }, 10);

        // this._segurity$?.unsubscribe();
      }


      console.log('menuSystem ::: ', menuSystem);

    });
  }

  /***
   * Activate droup down set
   */
  ngAfterViewInit() {
    this.initActiveMenu();
  }

  removeActivation(items: any) {
    items.forEach((item: any) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        (item.nextElementSibling) ? item.nextElementSibling.classList.remove("show") : null;
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  }

  toggleSubItem(event: any) {
    let isCurrentMenuId = event.target.closest('a.nav-link');
    let isMenu = isCurrentMenuId.nextElementSibling as any;
    let dropDowns = Array.from(document.querySelectorAll('.sub-menu'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });

    let subDropDowns = Array.from(document.querySelectorAll('.menu-dropdown .nav-link'));
    subDropDowns.forEach((submenu: any) => {
      submenu.setAttribute('aria-expanded',"false");
    });

    if (event.target && event.target.nextElementSibling){
      isCurrentMenuId.setAttribute("aria-expanded", "true");
      event.target.nextElementSibling.classList.toggle("show");
    }
  };

  toggleExtraSubItem(event: any) {
    let isCurrentMenuId = event.target.closest('a.nav-link');

    // console.log('isCurrentMenuId ::: ', isCurrentMenuId);

    let isMenu = isCurrentMenuId.nextElementSibling as any;
    let dropDowns = Array.from(document.querySelectorAll('.extra-sub-menu'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });

    let subDropDowns = Array.from(document.querySelectorAll('.menu-dropdown .nav-link'));
    subDropDowns.forEach((submenu: any) => {
      submenu.setAttribute('aria-expanded',"false");
    });

    if (event.target && event.target.nextElementSibling){
      isCurrentMenuId.setAttribute("aria-expanded", "true");
      event.target.nextElementSibling.classList.toggle("show");
    }
  };

  // Click wise Parent active class add
  toggleParentItem(event: any) {
    let isCurrentMenuId = event.target.closest('a.nav-link');

    this._st.setItem( 'a-id', '' );
    // console.log('isCurrentMenuId ::: ', isCurrentMenuId);

    let dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const iconItems = Array.from(ul.getElementsByTagName("a"));
      let activeIconItems = iconItems.filter((x: any) => x.classList.contains("active"));
      activeIconItems.forEach((item: any) => {
        item.setAttribute('aria-expanded', "false")
        item.classList.remove("active");
      });
    }
    isCurrentMenuId.setAttribute("aria-expanded", "true");
    if (isCurrentMenuId) {
      this.activateParentDropdown(isCurrentMenuId);
    }
  }

  toggleItem(event: any, id: string) {
    let isCurrentMenuId = event.target.closest('a.nav-link');

    console.log('isCurrentMenuId ::: ', isCurrentMenuId);
    this._st.setItem( 'a-id', `a-${ id }` );

    let isMenu = isCurrentMenuId.nextElementSibling as any;
    if (isMenu.classList.contains("show")) {
      isMenu.classList.remove("show");
      isCurrentMenuId.setAttribute("aria-expanded", "false");
    } else {
      let dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
      dropDowns.forEach((node: any) => {
        node.classList.remove('show');
      });
      (isMenu) ? isMenu.classList.add('show') : null;
      const ul = document.getElementById("navbar-nav");
      if (ul) {
        const iconItems = Array.from(ul.getElementsByTagName("a"));
        let activeIconItems = iconItems.filter((x: any) => x.classList.contains("active"));
        activeIconItems.forEach((item: any) => {
          item.setAttribute('aria-expanded', "false")
          item.classList.remove("active");
        });
      }
      isCurrentMenuId.setAttribute("aria-expanded", "true");
      if (isCurrentMenuId) {
        this.activateParentDropdown(isCurrentMenuId);
      }
    }
  }

  activateParentDropdown(item:any) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
        // to set aria expand true remaining
        parentCollapseDiv.classList.add("show");
        parentCollapseDiv.parentElement.children[0].classList.add("active");
        parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
        if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
            parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
            if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
                parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
            if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse")) {
                parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").classList.add("show");
                parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").previousElementSibling.classList.add("active");
            }
        }
        return false;
    }
    return false;
  }

  updateActive(event: any) {
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const items = Array.from(ul.querySelectorAll("a.nav-link"));
      this.removeActivation(items);
    }
    this.activateParentDropdown(event.target);
  }

  initActiveMenu() {
    const pathName = window.location.pathname;
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const items = Array.from(ul.querySelectorAll("a.nav-link"));
      let activeItems = items.filter((x: any) => x.classList.contains("active"));
      this.removeActivation(activeItems);

      let matchingMenuItem = items.find((x: any) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        this.activateParentDropdown(matchingMenuItem);
      }
    }
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item Allow
   */
  hasItems(item: Allow) {
    return item.children !== undefined ? item.children.length > 0 : false;
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    var sidebarsize = document.documentElement.getAttribute("data-sidebar-size");
    if (sidebarsize == 'sm-hover-active') {
      document.documentElement.setAttribute("data-sidebar-size", 'sm-hover')
    } else {
      document.documentElement.setAttribute("data-sidebar-size", 'sm-hover-active')
    }
  }

  /**
   * SidebarHide modal
   * @param content modal content
   */
   SidebarHide() {
    document.body.classList.remove('vertical-sidebar-enable');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._segurity$?.unsubscribe();
  }

}
