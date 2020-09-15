import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Category } from '../model/Category';
import { CategoryService } from '../core/api/category.service';
import { MessageTypes } from '../model/MessageTypes';
import { Utils } from '../utils/utils';
declare var bootbox: any;

const FORM_MODEL = {
  SAVE: 'SAVE',
  EDIT: 'EDIT',
}

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

    categoryForm: FormGroup;
    categories: Category[] = [];
    messageTypeError: MessageTypes = MessageTypes.ERROR;
    errorMessage: string = '';
    formModel: string;
    categoryClone: Category = {} as Category;

    constructor( 
        private formBuilder: FormBuilder,
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.createCategoryForm();
        this.getAllCategories();
    }

    createCategoryForm(){
        this.categoryForm = this.formBuilder.group({
            categoryName: new FormControl('', [Validators.required, Validators.minLength(1)]),
        });
    }

    getAllCategories(){
        this.categoryService
            .getAllCategories()
            .subscribe((response) => {
                response.forEach(category => { 
                    category.editting = false
                    this.categories.push(category);
                });
            }, (error) => {

        });
    }

    saveCategory(){
        const categoryName: string = this.categoryForm.get('categoryName').value;

        this.categoryService
            .saveCategory(categoryName)
            .subscribe((response) => {
                this.categories.push(response.body);
                this.resetErrorMessage();
                this.categoryForm.reset();
                bootbox.alert({title: "Category created", message: "Category created successfuly"});
            }, (error) => {
                this.formModel = FORM_MODEL.SAVE;
                this.errorMessage = error.error;
        });
    }

    deleteCategory(category: Category){
        bootbox.confirm(
            `Are you sure you want to delete the category ${category.name}`, 
            (isConfirmed) => {
                if(isConfirmed == false) { return; }
                this.categoryService
                .deleteCategory(category.id)
                .subscribe((reseponse) => {
                    Utils.removeArrayItem(category, this.categories);
                    bootbox.alert({title: "Category removed", message: "Category removed successfuly"});
                }, (error) => {
                  bootbox.alert({title: "ERROR", message: error.error});
            });
        });
    }

    editCategory(oldCategory: Category){
      if(oldCategory.name === this.categoryClone.name){
        oldCategory.editting = false;
        this.resetCategoryClone();
        this.resetErrorMessage()
        return;
      }

      this.categoryService
          .editCategory(this.categoryClone)
          .subscribe((response) => {
              this.resetErrorMessage();
              this.categoryClone.editting = false
              Utils.removeArrayItem(oldCategory, this.categories);
              this.categories.push(this.categoryClone);
              bootbox.alert({title: "Category updated", message: "Category updated successfuly"})
          }, (error) => {
              this.formModel = FORM_MODEL.EDIT;
              this.errorMessage = error.error;
      });
    }

    allowEdittingModel(category: Category){
        if(this.hasCategoryEditting() === true) { return;}
        category.editting = true;
        this.categoryClone = Object.assign({}, category);
    }

    resetCategoryClone(){
        this.categoryClone = {} as Category
    }

    resetErrorMessage(){
        this.errorMessage = '';
        this.formModel = '';
    }

    cancelEdittingModel(category: Category){
        category.editting = false;
        this.resetCategoryClone();
        this.resetErrorMessage();
    }

    hasCategoryEditting(){
        return this.categories.find(category => category.editting === true) ? true: false;
    }

}
