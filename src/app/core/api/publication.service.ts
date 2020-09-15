import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/config';
import { Publication } from 'src/app/model/Publication';

const BK_URL_PUBLICATION = `${Config.BK_URL}/publication`;

@Injectable({providedIn: 'root'})
export class PublicationService {

    constructor(
        private http: HttpClient
    ) { }

    getAllPublication(){
        return this.http
                .get<Publication[]>(`${BK_URL_PUBLICATION}/all`
            );
    }

    getImage(photoKey: string){
        return this.http
            .get(`${BK_URL_PUBLICATION}/photo/${photoKey}`, 
                { responseType: 'blob' }
            );
    }

    savePublication(publication: Publication, file: File){
        let formData = new FormData();

        formData.append("publication", new Blob([JSON.stringify({
                        "title": publication.title,
                        "content": publication.content,
                        "categoryDTO": publication.categoryDTO,
                        "userDTO": publication.userDTO,
        })],{
            type: "application/json"
        }));
        formData.append("file", file);

        return this.http
            .post<Publication>(BK_URL_PUBLICATION, formData);

    }

    deletePublication(id: number){
        return this.http
            .delete(`${BK_URL_PUBLICATION}/${id}`);
    }

    editPublication(publication: Publication, file: File){
        let formData = new FormData();

        if(!file){
            file = null;
        }

        formData.append("publication", new Blob([JSON.stringify({
                        "id":publication.id,
                        "title": publication.title,
                        "content": publication.content,
                        "categoryDTO": publication.categoryDTO,
                        "userDTO": publication.userDTO,
        })],{
            type: "application/json"
        }));
        formData.append("file", file);

        return this.http
            .put<Publication>(BK_URL_PUBLICATION, formData);
    }


}
