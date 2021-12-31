import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from '../app/content/content.component';
import { MobileComponent } from  './content/pagecontainer/mobile/mobile.component';
import { DthComponent } from  './content/pagecontainer/dth/dth.component';
import { DatacardComponent } from  './content/pagecontainer/datacard/datacard.component';
import { BroadbandComponent } from  './content/pagecontainer/broadband/broadband.component';
import { LandlineComponent } from  './content/pagecontainer/landline/landline.component';
import { CabletvComponent } from  './content/pagecontainer/cabletv/cabletv.component';
import { ElectricityComponent } from  './content/pagecontainer/electricity/electricity.component';
import { MetroComponent } from  './content/pagecontainer/metro/metro.component';
import { GasComponent } from  './content/pagecontainer/gas/gas.component';
import { WaterComponent } from  './content/pagecontainer/water/water.component';
import { PostpaidComponent } from  './content/pagecontainer/postpaid/postpaid.component';
import { PipedgasComponent } from  './content/pagecontainer/pipedgas/pipedgas.component';
import { InsuranceComponent } from  './content/pagecontainer/insurance/insurance.component';
import { LoginComponent } from './content/Auth/login/login.component'
import { RegisterComponent } from './content/Auth/register/register.component'
import { ForgetpassComponent } from './content/Auth/forgetpass/forgetpass.component'
import { OtpComponent } from './content/Auth/otp/otp.component'
import { AuthguardService as AuthGuard} from './services/authguard.service'
import { ActionComponent } from './content/pagecontainer/action/action.component';
import { PaymentsuccessComponent } from './content/pagecontainer/paymentsuccess/paymentsuccess.component';
import { ReportsComponent } from './content/reports/reports.component';
import { WalletComponent } from './content/reports/wallet/wallet.component';
import { TransactionComponent } from './content/reports/transaction/transaction.component';
import { ProfileComponent } from './content/reports/profile/profile.component';
import { RndComponent } from './rnd/rnd.component';
import { ContactusComponent } from './content/OtherPages/contactus/contactus.component';
import { AboutusComponent } from './content/OtherPages/aboutus/aboutus.component';
import { HelpComponent } from './content/OtherPages/help/help.component';
import { TermsconditionsComponent } from './content/OtherPages/termsconditions/termsconditions.component';
import { HeaderComponent } from './header/header.component';
import { PrivacypolicyComponent } from './content/OtherPages/privacypolicy/privacypolicy.component';
import { RefundAndCancellationComponent } from './content/OtherPages/refundAndCancellation/refundAndCancellation.component';
import { MembershipUpdateComponent } from './content/reports/membershipUpdate/membershipUpdate.component';
import { SubscriptionComponent } from './content/pagecontainer/subscription/subscription.component';
import { HousingSocietyComponent } from './content/pagecontainer/housingSociety/housingSociety.component';
import { MunicipalTaxesComponent } from './content/pagecontainer/municipalTaxes/municipalTaxes.component';
import { HospitalComponent } from './content/pagecontainer/hospital/hospital.component';
import { EducationFessComponent } from './content/pagecontainer/educationFess/educationFess.component';
import { ClubsAndAssociationComponent } from './content/pagecontainer/clubsAndAssociation/clubsAndAssociation.component';
import { BarAssociationFeeComponent } from './content/pagecontainer/barAssociationFee/barAssociationFee.component';
const routes: Routes = [
  { path: '', redirectTo: '/prepaid.html', pathMatch: 'full' },
  { path: 'user', component:ReportsComponent,
    children:[
      {path:'',redirectTo:'/user',pathMatch:'full'},
      {path:'wallet.html',component:WalletComponent, canActivate:[AuthGuard]},
      {path:'transaction.html',component:TransactionComponent, canActivate:[AuthGuard]},
      {path:'profile.html',component:ProfileComponent, canActivate:[AuthGuard]},
      {path:'membershipUpdate.html',component:MembershipUpdateComponent,canActivate:[AuthGuard]}
    ]
  },
  { 
    path: '', component: ContentComponent,

    children:[
      {path:'prepaid.html', component:MobileComponent},
      {path:'postpaid.html', component:PostpaidComponent},
      {path:'dth.html', component:DthComponent},
      {path:'datacard.html', component:DatacardComponent},
      {path:'broadband.html', component:BroadbandComponent},
      {path:'landline.html', component:LandlineComponent},
      {path:'subscription.html',component:SubscriptionComponent},
      {path:'housingSociety.html',component:HousingSocietyComponent},
      {path:'municipalTaxes.html',component:MunicipalTaxesComponent},
      {path:'hospital.html',component:HospitalComponent},
      {path:'educationFees.html',component:EducationFessComponent},
      {path:'clubsAndAssociation.html',component:ClubsAndAssociationComponent},
      {path:'barAssociationFee.html',component:BarAssociationFeeComponent},
      {path:'cabletv.html', component:CabletvComponent},
      {path:'electricity.html', component:ElectricityComponent},
      {path:'metro.html', component:MetroComponent},
      {path:'gas.html', component:GasComponent},
      {path:'water.html', component:WaterComponent},
      {path:'pipedgas.html', component:PipedgasComponent},
      {path:'insurance.html', component:InsuranceComponent},
      { path: 'login.html', component: LoginComponent, },
      { path: 'signup.html', component: RegisterComponent},
      { path: 'otp.html', component: OtpComponent},
      { path: 'redirecttoaction.html', component: ActionComponent, canActivate:[AuthGuard]},
      { path: 'paymentsuccess.html', component: PaymentsuccessComponent, canActivate:[AuthGuard]},
      { path: 'forgetpass.html', component: ForgetpassComponent },
      { path:'contactus.html', component:ContactusComponent},
      { path:'aboutus.html', component:AboutusComponent},
      { path:'help.html', component:HelpComponent},
      { path:'termsconditions.html', component:TermsconditionsComponent},
      {path:'privacypolicy.html',component:PrivacypolicyComponent},
      {path:'refundAndCancellation.html',component:RefundAndCancellationComponent}
    ] 
  },
  { path:'rnd',component:RndComponent},

  { path: '**', redirectTo: '/prepaid.html', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
