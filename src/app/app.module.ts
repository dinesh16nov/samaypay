import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TopheaderComponent } from './header/topheader/topheader.component';
import { BottomheaderComponent } from './header/bottomheader/bottomheader.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { MenusComponent } from './content/menus/menus.component';
import { PagecontainerComponent } from './content/pagecontainer/pagecontainer.component';
import { MobileComponent } from './content/pagecontainer/mobile/mobile.component';
import { DthComponent } from './content/pagecontainer/dth/dth.component';
import { DatacardComponent } from './content/pagecontainer/datacard/datacard.component';
import { BroadbandComponent } from './content/pagecontainer/broadband/broadband.component';
import { SubscriptionComponent } from './content/pagecontainer/subscription/subscription.component';
import { LandlineComponent } from './content/pagecontainer/landline/landline.component';
import { CabletvComponent } from './content/pagecontainer/cabletv/cabletv.component';
import { ElectricityComponent } from './content/pagecontainer/electricity/electricity.component';
import { MetroComponent } from './content/pagecontainer/metro/metro.component';
import { GasComponent } from './content/pagecontainer/gas/gas.component';
import { WaterComponent } from './content/pagecontainer/water/water.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule   } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PipedgasComponent } from './content/pagecontainer/pipedgas/pipedgas.component';
import { PostpaidComponent } from './content/pagecontainer/postpaid/postpaid.component';
import { InsuranceComponent } from './content/pagecontainer/insurance/insurance.component';
import { Select2Module  } from 'ng2-select2';
import { PageloaderComponent } from './content/pageloader/pageloader.component';
import { LoginComponent } from './content/Auth/login/login.component';
import { RegisterComponent } from './content/Auth/register/register.component';
import { ForgetpassComponent } from './content/Auth/forgetpass/forgetpass.component';
import { OtpComponent } from './content/Auth/otp/otp.component';
import { CookieService } from 'ngx-cookie-service';
import { ActionComponent } from './content/pagecontainer/action/action.component';
import { PaymentsuccessComponent } from './content/pagecontainer/paymentsuccess/paymentsuccess.component';
import { ReportsComponent } from './content/reports/reports.component';
import { WalletComponent } from './content/reports/wallet/wallet.component';
import { TransactionComponent } from './content/reports/transaction/transaction.component';
import { ProfileComponent } from './content/reports/profile/profile.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AddmoneyComponent } from './content/addmoney/addmoney.component';
import { RndComponent } from './rnd/rnd.component';
import { ContactusComponent } from './content/OtherPages/contactus/contactus.component';
import { AboutusComponent } from './content/OtherPages/aboutus/aboutus.component';
import {PrivacypolicyComponent} from './content/OtherPages/privacypolicy/privacypolicy.component';
import { HelpComponent } from './content/OtherPages/help/help.component';
import { TermsconditionsComponent } from './content/OtherPages/termsconditions/termsconditions.component';
import { MobileheaderComponent } from './header/mobileheader/mobileheader.component';
import { DesktopheaderComponent } from './header/desktopheader/desktopheader.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RefundAndCancellationComponent } from './content/OtherPages/refundAndCancellation/refundAndCancellation.component';
import { MembershipUpdateComponent } from './content/reports/membershipUpdate/membershipUpdate.component';
import { HousingSocietyComponent } from './content/pagecontainer/housingSociety/housingSociety.component';
import { MunicipalTaxesComponent } from './content/pagecontainer/municipalTaxes/municipalTaxes.component';
import { HospitalComponent } from './content/pagecontainer/hospital/hospital.component';
import { EducationFessComponent } from './content/pagecontainer/educationFess/educationFess.component';
import { ClubsAndAssociationComponent } from './content/pagecontainer/clubsAndAssociation/clubsAndAssociation.component';
import { BarAssociationFeeComponent } from './content/pagecontainer/barAssociationFee/barAssociationFee.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopheaderComponent,
    BottomheaderComponent,
    FooterComponent,
    ContentComponent,
    MenusComponent,
    PagecontainerComponent,
    MobileComponent,
    DthComponent,
    DatacardComponent,
    BroadbandComponent,
    SubscriptionComponent,
    HousingSocietyComponent,
    MunicipalTaxesComponent,
    HospitalComponent,
    EducationFessComponent,
    ClubsAndAssociationComponent,
    BarAssociationFeeComponent,
    LandlineComponent,
    CabletvComponent,
    ElectricityComponent,
    MetroComponent,
    GasComponent,
    WaterComponent,
    PipedgasComponent,
    PostpaidComponent,
    InsuranceComponent,
    PageloaderComponent,
    LoginComponent,
    RegisterComponent,
    ForgetpassComponent,
    OtpComponent,
    ActionComponent,
    PaymentsuccessComponent,
    ReportsComponent,
    WalletComponent,
    TransactionComponent,
    ProfileComponent,
    AddmoneyComponent,
    RndComponent,
    ContactusComponent,
    AboutusComponent,
    PrivacypolicyComponent,
    RefundAndCancellationComponent,
    HelpComponent,
    TermsconditionsComponent,
    MobileheaderComponent,
    DesktopheaderComponent,
    MembershipUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    Select2Module,
    SlickCarouselModule    
  ],
  providers: [CookieService,{provide:LocationStrategy,useClass:HashLocationStrategy},Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
