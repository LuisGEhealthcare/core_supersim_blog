import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../core/api/publication.service';
import { Publication } from '../model/Publication';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../model/Category';
import { CategoryService } from '../core/api/category.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../core/user/user.service';
import { Utils } from '../utils/utils';
import { MessageTypes } from '../model/MessageTypes';
declare var $:any;
declare var bootbox: any;

@Component({
  templateUrl: './admin-publication.component.html',
  styleUrls: ['./admin-publication.component.css']
})
export class AdminPublicationComponent implements OnInit {

    publicationForm: FormGroup;
    publicationEditForm: FormGroup;
    publications: Publication[] = [];
    publicationClone: Publication;
    categories: Category[] = [];
    selectedFile: File;
    isPublicationFormOpen: boolean = false;
    isPublicationEditFormOpen: boolean = false;
    messageType: MessageTypes = MessageTypes.ERROR;

    constructor(
        private publicationService: PublicationService,
        private activatedRoute: ActivatedRoute,
        private categoryService: CategoryService,
        private formBuilder: FormBuilder,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.publications = this.activatedRoute.snapshot.data['publications'];
        this.loadPublicationWithImage();
        this.getCategories();
        this.createPublicationForm();
        this.createPublicationEditForm();
    }

    createPublicationForm(){
        this.publicationForm = this.formBuilder.group({
            title: new FormControl('', Validators.required),
            content: new FormControl('', Validators.required),
            category: new FormControl('', Validators.required)
        });
    }

    createPublicationEditForm(publication?: Publication, categoryIndex?: number){
        this.publicationEditForm = this.formBuilder.group({
            title: new FormControl(publication?.title, Validators.required),
            content: new FormControl(publication?.content, Validators.required),
            category: new FormControl(this.categories[categoryIndex], Validators.required)
        });
    }

    loadPublicationWithImage(){
        this.publications
            .forEach(publication => {
                this.getImage(publication.photoKey, (photolink) => {
                    if(photolink){
                        publication.photoLink = photolink;
                    }
                });
            });
    }

    getImage(photKey, callback){
        this.publicationService
            .getImage(photKey)
            .subscribe((response) => {
                const blob = new Blob([response], { type:'image/jpeg' });
                const url = window.URL.createObjectURL(blob);
                callback(url);
            }, (error) => {

            });
    }

    getCategories(){
        this.categoryService
            .getAllCategories()
            .subscribe((response) => {
                this.categories = response;
            }, (error) => {

        });
    }

    openPublicationForm(){
        this.isPublicationFormOpen = true;
    }

    hiddenPublicationForm(){
        this.isPublicationFormOpen = false;
        this.resetSelectedFile();
    }

    openPublicationEditForm(){
        this.isPublicationEditFormOpen = true;
    }

    enablePublicationEditForm(id: number){
        this.isPublicationEditFormOpen = true
        let publication = this.publications.find(publication => publication.id === id);
        let categoryIndex = this.categories.findIndex(category => publication.categoryDTO.id === category.id);
        this.createPublicationEditForm(publication, categoryIndex);
        this.openPublicationEditForm();
        this.publicationClone = Object.assign({}, publication);
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    }

    hiddenPublicationEditForm(){
        this.isPublicationEditFormOpen = false;
        this.resetSelectedFile();
    }

    savePublication(){
        const title = this.publicationForm.get('title').value;
        const content = this.publicationForm.get('content').value;
        const category = this.publicationForm.get('category').value;
        const user = this.userService.getUser();

        const publication = this.createPublicationObject(title, content, category, user);

        this.publicationService
            .savePublication(publication, this.selectedFile)
            .subscribe((response) => {
                let publication = response;
                this.getImage(publication.photoKey, (photoLink) => {
                    publication.photoLink = photoLink;
                    this.publications.push(publication);
                    this.hiddenPublicationForm();
                    this.publicationForm.reset();
                    bootbox.alert({title: "Publication created", message: "Publication created successfuly"});
                });
            }, (error) => {
                console.log(error);
            });

    }
    
    deletePublication(id: number){
        this.publicationService
            .deletePublication(id)
            .subscribe((response) => {
                let publication = this.publications.find(publication => publication.id === id);
                Utils.removeArrayItem(publication, this.publications);
                bootbox.alert({title: "Publication deleted", message: "Publication deleted successfuly"});
            }, (error) => {

            });
    }

    saveEditPublication(){

        const title = this.publicationEditForm.get('title').value;
        const content = this.publicationEditForm.get('content').value;
        const category = this.publicationEditForm.get('category').value;
        const user = this.userService.getUser();

        const publication = this.createPublicationObject(title, content, category, user);
        publication.id = this.publicationClone.id;

        this.publicationService
            .editPublication(publication, this.selectedFile)
            .subscribe((response) => {
                let publication = response;
                this.getImage(publication.photoKey, (photoLink) => {
                    Utils.removeArrayItem(this.publicationClone, this.publications);
                    publication.photoLink = photoLink;
                    this.publications.push(publication);
                    this.hiddenPublicationEditForm();
                    this.publicationEditForm.reset();
                    bootbox.alert({title: "Publication updated", message: "Publication updated successfuly"});
                });
            }, (error) => {
                console.log(error);
            });

    }

    selectFile(event) {
        this.selectedFile = event.target.files[0];
    }

    resetSelectedFile(){
        this.selectedFile = null;
    }

    createPublicationObject(title, content, category, user): Publication{
        return {
        title: title,
        content: content,
        categoryDTO: category,
        userDTO: user
        } as Publication
    }
}
