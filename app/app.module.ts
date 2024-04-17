import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ExploreComponent } from './explore/explore.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { DeleteComponent } from './delete/delete.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewComponent } from './view/view.component';

import { NodeUtilityService } from './node-utility.service';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { RouterModule } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ExploreComponent,
    WelcomeComponent,
    ForgetpassComponent,
    DeleteComponent,
    ViewComponent,
    HeaderComponent,
    CartComponent,
    ProductComponent,
    ExampleComponent,
    AdminComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
