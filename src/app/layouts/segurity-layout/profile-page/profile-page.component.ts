import { Component, OnInit, QueryList, ViewChildren, ViewChild, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { projectListModel, documentModel } from '../../../interfaces/profile.interfaces';

import { NgbdProfileSortableHeader, SortEvent } from './profile-sortable.directive';

// import Swiper core and required modules
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from "swiper/angular";

// Swiper Slider
// import { SwiperComponent, SwiperDirective } from 'swiper';
import { StorageService } from '../../../services/storage.service';
import { Subscription } from 'rxjs';
import { AgencyService } from 'src/app/services/admin-services/agency.service';
import { RoleService } from 'src/app/services/segurity-services/role.service';
import { IRole } from '../../../interfaces/segurity-interfaces/role.interface';
import { emailPatt, fullTextPatt } from '../../../utils';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.state';
import { UserService } from 'src/app/services/segurity-services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  projectList!: projectListModel[];
  document!: documentModel[];
  userData:any;

  private _usersvc   = inject( UserService );

  private _segurity$?: Subscription;
  private _userFind$?: Subscription;

  /**
   * Swiper setting
   */
  config: SwiperOptions = {
    slidesPerView: 1,
    initialSlide: 0,
    spaceBetween: 25,
    breakpoints:{
      768:{
        slidesPerView: 2,
      },
      1200:{
        slidesPerView: 3,
      }
    }
  };

  // @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
  // @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  // Table data
  ListJsList : projectListModel[] = [
    {
      title: 'Lorem ipsum',
      updatedTime: new Date(),
      badgeText: 'Hello Wordl',
      member: [
        {
          name: 'Lorem ipsum',
          img: '',
          text: 'Lorem ipsum',
          variant: ''
        }
      ]
    }
  ];
  total = 1;

  @ViewChildren(NgbdProfileSortableHeader) headers!: QueryList<NgbdProfileSortableHeader>;

  get userRoles() { return this.userData?.roles?.map( (r: any) => r.name )?.join(' - ') ?? 'sin rol'; }
  get fullname() { return this.userData?.fullname ?? 'undefined'; }
  get user() {
    return this.userData
  }

  private _store = inject( Store<IAppState> );

  constructor(
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private _st : StorageService,
    // public service: ProfileService
  ) {

    // this.ListJsList = service.countries$;
    // this.total = service.total$;
  }

  ngOnInit(): void {

    this._segurity$ = this._store.select('segurity')
    .subscribe( (state) => {
      const { userData } = state;
      if( userData ) this.userData = userData;
      /*
      if(userData.id){
        this._userFind$ = this._usersvc.onFindById( userData.id )
        .subscribe({
          next: (response) => {
            const { data } = response;
            this.userData = data;
            this._userFind$?.unsubscribe();
          },
          error: (e) => {
            console.error(e);
            this._userFind$?.unsubscribe();
          }
        });
      }*/

    });

    this.fetchData();

  }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.document = document as any;
  }


  nextSlideComp(){
    this.swiper?.swiperRef.slideNext(100);
  }
  previousSlideComp(){
    this.swiper?.swiperRef.slidePrev(100);
  }

  /**
   * Confirmation mail model
   */
  deleteId: any;
  confirm(content:any,id:any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  // Delete Data
  deleteData(id:any) {
    // document.getElementById('')
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._segurity$?.unsubscribe();
    this._userFind$?.unsubscribe();
  }

}
