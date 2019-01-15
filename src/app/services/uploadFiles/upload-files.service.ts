import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor() { }

  uploadFile(file: File, tipo: string, id: string) {
    return new Promise((resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('imagen', file, file.name);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Img uploaded');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Upload fail');
            reject(xhr.response);
          }
        }
      };
      const url = environment.apiUrl + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
