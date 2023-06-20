import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-segurity-layout',
  templateUrl: './segurity-layout.component.html',
  styleUrls: ['./segurity-layout.component.scss']
})
export class SegurityLayoutComponent implements OnInit {

  isCondensed = false;

  constructor() { }

  ngOnInit(): void {
    document.documentElement.setAttribute('data-layout', 'vertical');
    document.documentElement.setAttribute('data-topbar', 'light');
    document.documentElement.setAttribute('data-sidebar', 'dark');
    document.documentElement.setAttribute('data-layout-style', 'default');
    document.documentElement.setAttribute('data-layout-mode', 'light');
    document.documentElement.setAttribute('data-layout-width', 'fluid');
    document.documentElement.setAttribute('data-layout-position', 'fixed');
    document.documentElement.setAttribute('data-sidebar-image', 'none');
    document.documentElement.setAttribute('data-preloader', 'disable');

    window.addEventListener('resize' , function(){
      if (document.documentElement.clientWidth <= 767) {
        document.documentElement.setAttribute('data-sidebar-size', '');
      }
      else if (document.documentElement.clientWidth <= 1024) {
        document.documentElement.setAttribute('data-sidebar-size', 'sm');
      }
      else if (document.documentElement.clientWidth >= 1024) {
        document.documentElement.setAttribute('data-sidebar-size', 'lg');
      }
    })

  }

  /**
   * On mobile toggle button clicked
   */
  onToggleMobileMenu() {
    console.log('click toggle menú');

    const currentSIdebarSize = document.documentElement.getAttribute("data-sidebar-size");
    var windowSize = document.documentElement.clientWidth;

    // if (windowSize >= 767) {
    //   if (currentSIdebarSize == null) {
    //     (document.documentElement.getAttribute('data-sidebar-size') == null || document.documentElement.getAttribute('data-sidebar-size') == "lg") ? document.documentElement.setAttribute('data-sidebar-size', 'sm') : document.documentElement.setAttribute('data-sidebar-size', 'lg')
    //    } else if (currentSIdebarSize == "md") {
    //      (document.documentElement.getAttribute('data-sidebar-size') == "md") ? document.documentElement.setAttribute('data-sidebar-size', 'sm') : document.documentElement.setAttribute('data-sidebar-size', 'md')
    //    } else {
    //      (document.documentElement.getAttribute('data-sidebar-size') == "sm") ? document.documentElement.setAttribute('data-sidebar-size', 'lg') : document.documentElement.setAttribute('data-sidebar-size', 'sm')
    //    }
    // }

    // if (windowSize <= 767) {
    //   document.body.classList.toggle('vertical-sidebar-enable');
    // }


    if (windowSize > 767)
      document.querySelector(".hamburger-icon")!.classList.toggle("open");

    //For collapse vertical menu
    if (document.documentElement.getAttribute("data-layout") === "vertical") {
      if (windowSize < 1025 && windowSize >= 767) {

        console.log('windowSize < 1025 && windowSize > 767');
        document.body.classList.remove("vertical-sidebar-enable");

        currentSIdebarSize == "sm" ?
          document.documentElement.setAttribute("data-sidebar-size", "") :
          document.documentElement.setAttribute("data-sidebar-size", "sm");
      } else if (windowSize > 1025) {

        console.log('else if (windowSize > 1025)');
        document.body.classList.remove("vertical-sidebar-enable");

        (currentSIdebarSize == null || currentSIdebarSize == "lg") ?
          document.documentElement.setAttribute("data-sidebar-size", "sm") :
          document.documentElement.setAttribute("data-sidebar-size", "lg");

      } else if (windowSize < 767) {
        console.log('else if (windowSize <= 767)');
        document.body.classList.add("vertical-sidebar-enable");
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }
    }



   this.isCondensed = !this.isCondensed;




 }

  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
    const rightBar = document.getElementById('theme-settings-offcanvas');
    if(rightBar != null){
      rightBar.classList.toggle('show');
      rightBar.setAttribute('style',"visibility: visible;");

    }
  }

}
