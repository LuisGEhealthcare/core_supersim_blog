import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { ReaderForumModule } from './reader-forum/reader-forum.module';
import { HeaderComponent } from './header/header.component';
import { AdminForumModule } from './admin-forum/admin-forum.module';
import { AdminForumCategoryModule } from './admin-forum-category/admin-forum-category.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    CoreModule,
    LoginModule,
    AdminForumModule,
    AdminForumCategoryModule,
    ReaderForumModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
