export class Medico {

    constructor(
        public nombre?: string,
        public img?: string,
        public usuario?: string,
        public hospital?: {'nombre': string, 'img': string, 'usuario': string},
        public hospital_id?: string,
        public _id?: string
    ) { }
}
