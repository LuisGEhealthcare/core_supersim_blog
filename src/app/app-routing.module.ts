import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReaderForumComponent } from './reader-forum/reader-forum.component';
import { AdminForumComponent } from './admin-forum/admin-forum.component';
import { AdminForumCategoryComponent } from './admin-forum-category/admin-forum-category.component';

const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'admin',
      component: AdminForumComponent
    },
    {
      path: 'admin/category',
      component: AdminForumCategoryComponent
    },
    {
      path: '',
      component: ReaderForumComponent
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
