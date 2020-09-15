import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReaderBlogComponent } from './reader-blog/reader-blog.component';
import { AdminPublicationComponent } from './admin-publication/admin-publication.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminPublicationResolver } from './admin-publication/admin-publication.resolver';
import { Guard } from './core/guard/guard';

const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'admin',
      component: AdminPublicationComponent,
      resolve: {
        publications: AdminPublicationResolver
      },
      canActivate: [Guard]
    },
    {
      path: 'admin/category',
      component: AdminCategoryComponent,
      canActivate: [Guard]

    },
    {
      path: '',
      component: ReaderBlogComponent,
      resolve: {
        publications: AdminPublicationResolver
      }
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
