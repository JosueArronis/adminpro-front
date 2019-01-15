import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = environment.apiUrl + '/img';
    if (!img) {
      return url + '/usuarios/noimg';
    }
    if (img.indexOf('https') >= 0) {
      return img;
    }
    switch (tipo) {
      case 'usuario':
         url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
         url += '/hospitales/' + img;
        break;
      default:
        console.log('Tipo de imagen no existe');
        url += '/usuarios/noimg';
        break;
    }
    return url;
  }

}
