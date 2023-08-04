import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL  } from "firebase/storage";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../globals';
import { EUploadModule } from '../interfaces/uploadModule.enum';

const app = initializeApp( firebaseConfig );
const storage = getStorage( app );

@Injectable({providedIn: 'root'})
export class FirebaseService {

  constructor() { }

  async onUploadFirebase( file: File, nameFile: string, module: EUploadModule = EUploadModule.documents ) {

    // console.log('app.name =========== ', app.name);

    const storageRef = ref(storage, `${ module }/${ nameFile }`);

    // 'file' comes from the Blob or File API
    await uploadBytes( storageRef, file );
    return getDownloadURL( storageRef );

  }

  onDeleteFirebase( nameFile: string, module: EUploadModule = EUploadModule.documents ) {
    // Create a reference to the file to delete
    const desertRef = ref(storage, `${ module }/${ nameFile }` );

    // Delete the file
    return deleteObject(desertRef);

  }

}
