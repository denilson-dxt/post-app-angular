import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { NavegationComponent } from './components/navegation/navegation.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import {PostService} from "./services/post.service";
import { PostItemComponent } from './components/list-posts/post-item/post-item.component';
import {MatCardModule} from "@angular/material/card";
import { CreatePostComponent } from './components/create-post/create-post.component';
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {EffectsModule} from "@ngrx/effects";
import {PostsEffects} from "./store/effects/post.effects";
import {reducers} from "./store/reducers";
import { PostFormComponent } from './components/post-form/post-form.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegationComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ListPostsComponent,
    PostItemComponent,
    CreatePostComponent,
    PostFormComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([PostsEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    ReactiveFormsModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
