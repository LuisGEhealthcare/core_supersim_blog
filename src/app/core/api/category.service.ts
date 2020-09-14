import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../model/Category';
import { Config } from '../../config';


const BK_URL_CATEGORY = `${Config.BK_URL}/category`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCategories(){
    return this.http
      .get<Category[]>(
        `${BK_URL_CATEGORY}/all`
    );
  }

  saveCategory(name: string){
    
    const category: Category = {
      id: null,
      name: name,
      editting: false
    }

    return this.http
      .post<Category>(
        BK_URL_CATEGORY, 
        category, 
        { observe: 'response'}
    );
  }

  deleteCategory(id: number){
    return this.http
      .delete(`${BK_URL_CATEGORY}/${id}`);
  }

  editCategory(category: Category){
    return this.http
      .put<Category>(
        `${BK_URL_CATEGORY}`, 
        category,
        { observe: 'response'}
      );
  }


}
