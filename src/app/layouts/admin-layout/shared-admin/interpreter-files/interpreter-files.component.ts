import { Component, inject, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EIconAlert } from 'src/app/interfaces/alertIcon.enum';
import { IFileInterpreter } from 'src/app/interfaces/files.interface';
import { IPager } from 'src/app/interfaces/pager.interface';
import { FileService } from 'src/app/services/file.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PagerService } from 'src/app/services/pager.service';
import { UiService } from 'src/app/services/ui.service';
import { v4 as UUID } from 'uuid';

@Component({
  selector: 'app-interpreter-files',
  templateUrl: './interpreter-files.component.html',
  styleUrls: ['./interpreter-files.component.scss']
})
export class InterpreterFilesComponent {

  @Input() id?: string;

  private _update$?: Subscription;
  private _delete$?: Subscription;
  private _get$?: Subscription;

  private _files: File[] = [];
  private _filesInterpreter: IFileInterpreter[] = [];
  frmFile!: UntypedFormGroup;

  private _frmBuilder = inject( UntypedFormBuilder );
  private _firesvc = inject( FirebaseService );
  private _fileSvc = inject( FileService );
  private _pagersvc = inject( PagerService );
  private _uisvc = inject( UiService );

  private _saving = false;
  private _total = 0;
  paginate: IPager = {
    currentPage: 0,
    endPage: 1,
    pages: [],
    startPage: 1,
    totalPages: 0
  };

  get controls() { return this.frmFile.controls; }
  touched( field: string ) { return this.frmFile.get( field )?.touched; }

  get invalid() { return this.frmFile.invalid; }
  get total() { return this._total; }
  get saving() { return this._saving; }
  get values() { return this.frmFile.value; }
  get filesInterpreter() { return this._filesInterpreter; }
  get files() { return this._files; }
  get currentPage() { return this.paginate.currentPage; }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.frmFile = this._frmBuilder.group({
      description: [ '', [ Validators.required ] ],
      name:         [ '', [ ] ],
      nameFirebase:         [ '', [ ] ],

      url:         [ '', [ ] ],
      type:        [ '', [ ] ],

    });

    this.getListFiles();

  }

  getListFiles( page = 1 ) {

    this._get$ = this._fileSvc.findAll( page, 5, this.id )
    .subscribe({
      next: (response) => {

        const { data, total } = response;

        this._filesInterpreter = data;
        this._total = total;

        this.paginate = this._pagersvc.getPager( total, page, 5 );

        console.log('response ::: ', response);

        this._get$?.unsubscribe();
      },
      error: (e) => {

        this._get$?.unsubscribe();
      }
    })

  }

  onSelect(event: any) {
    console.log(event);
    this._files = [];
    this._files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    // console.log(event);
    this._files.splice(this._files.indexOf(event), 1);
  }

  async onSubmit() {

    if( this.invalid || this._saving ) return;

    this._saving = true;

    const file = this._files[0];

    const nameFile = file.name.replaceAll(' ', '_');

    const nameFileFinal = `${ UUID() }-${nameFile}`;
    this._uisvc.onShowLoading();

    const url = await this._firesvc.onUploadFirebase( file, nameFileFinal );

    this.frmFile.get('url')?.setValue( url );
    this.frmFile.get('name')?.setValue( file.name );
    this.frmFile.get('type')?.setValue( file.type );
    this.frmFile.get('nameFirebase')?.setValue( nameFileFinal );


    this._update$ = this._fileSvc.uploadInterpreter( this.values, this.id )
    .subscribe({
      next: (response) => {

        console.log('response ::: ', response);

        this._saving = false;
        this.frmFile.reset();
        this._files = [];
        this._uisvc.onClose();
        this.getListFiles();
        this._update$?.unsubscribe();
      },
      error: (e) => {

        this._saving = false;
        this._uisvc.onClose();
        this._update$?.unsubscribe();
      }
    });

  }

  onConfirm( record: IFileInterpreter ) {
    const { id, name, nameFirebase } = record;

    this._uisvc.onShowConfirm(`¿Está seguro de eliminar documento: "${ name }" ?`)
    .then( (result) => {

      if( result.isConfirmed ) {
        this.onDeleteRole( id, nameFirebase );
      }

    } );
  }

  async onDeleteRole( id: string, firebaseName: string ) {

    this._uisvc.onShowLoading();

    await this._firesvc.onDeleteFirebase( firebaseName );

    this._delete$ = this._fileSvc.onDelete( id )
    .subscribe({
      next: (response) => {

        this.getListFiles( this.currentPage );

        this._uisvc.onClose();
        this._uisvc.onShowAlert(`Documento eliminado exitosamente`, EIconAlert.success);

        this._delete$?.unsubscribe();
      },
      error: (e) => {
        this._delete$?.unsubscribe();
      }
    })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this._delete$?.unsubscribe();
    this._get$?.unsubscribe();
    this._update$?.unsubscribe();
  }

}
