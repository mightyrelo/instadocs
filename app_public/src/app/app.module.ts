import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MListComponent } from './m-list/m-list.component';
import { AppendSPipe } from './append-s.pipe';
import { FrameworkComponent } from './framework/framework.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MPageComponent } from './m-page/m-page.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { MDetailsPageComponent } from './m-details-page/m-details-page.component';
import { MDetailsContentComponent } from './m-details-content/m-details-content.component';
import { MostRecentFirstPipe } from './most-recent-first.pipe';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { ViewProductsContentComponent } from './view-products-content/view-products-content.component';
import { ViewBarComponent } from './view-bar/view-bar.component';
import { ViewHeaderComponent } from './view-header/view-header.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { ViewCustomersContentComponent } from './view-customers-content/view-customers-content.component';
import { ContactPipe } from './contact.pipe';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewCustomerContentComponent } from './view-customer-content/view-customer-content.component';
import { ViewCompaniesComponent } from './view-companies/view-companies.component';
import { ViewCompaniesContentComponent } from './view-companies-content/view-companies-content.component';
import { ViewPrintComponent } from './view-print/view-print.component';
import { CompanyTagComponent } from './company-tag/company-tag.component';
import { CompanyContactComponent } from './company-contact/company-contact.component';
import { CustomerContactsComponent } from './customer-contacts/customer-contacts.component';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { QuoteItemsComponent } from './quote-items/quote-items.component';
import { BankingComponent } from './banking/banking.component';
import { ViewPrintInvoiceComponent } from './view-print-invoice/view-print-invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceItemsComponent } from './invoice-items/invoice-items.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewProductContentComponent } from './view-product-content/view-product-content.component';
import { ProdNavBarComponent } from './prod-nav-bar/prod-nav-bar.component';
import { ViewPrintPoComponent } from './view-print-po/view-print-po.component';
import { ViewPrintPoContentComponent } from './view-print-po-content/view-print-po-content.component';
import { PoItemsComponent } from './po-items/po-items.component';
import { PoDetailsComponent } from './po-details/po-details.component';
import { TransferDbComponent } from './transfer-db/transfer-db.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { QuoteFormSpComponent } from './quote-form-sp/quote-form-sp.component';
import { QoutePvComponent } from './qoute-pv/qoute-pv.component';
import { QouteAcComponent } from './qoute-ac/qoute-ac.component';
import { QouteBatComponent } from './qoute-bat/qoute-bat.component';
import { QouteOtherComponent } from './qoute-other/qoute-other.component';
import { QuotePvWireComponent } from './quote-pv-wire/quote-pv-wire.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ViewUsersContentComponent } from './view-users-content/view-users-content.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewUserContentComponent } from './view-user-content/view-user-content.component';
import { TermsComponent } from './terms/terms.component';
import { QuoteItemsSpComponent } from './quote-items-sp/quote-items-sp.component';
import { InvoiceItemsSpComponent } from './invoice-items-sp/invoice-items-sp.component';
import { PoItemsSpComponent } from './po-items-sp/po-items-sp.component';



@NgModule({
  declarations: [
    MListComponent,
    AppendSPipe,
    FrameworkComponent,
    NavBarComponent,
    FooterComponent,
    HomePageComponent,
    MPageComponent,
    HomeContentComponent,
    MDetailsPageComponent,
    MDetailsContentComponent,
    MostRecentFirstPipe,
    RegisterPageComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ViewProductsComponent,
    ViewProductsContentComponent,
    ViewBarComponent,
    ViewHeaderComponent,
    ViewCustomersComponent,
    ViewCustomersContentComponent,
    ContactPipe,
    ViewCustomerComponent,
    ViewCustomerContentComponent,
    ViewCompaniesComponent,
    ViewCompaniesContentComponent,
    ViewPrintComponent,
    CompanyTagComponent,
    CompanyContactComponent,
    CustomerContactsComponent,
    QuoteDetailsComponent,
    QuoteItemsComponent,
    BankingComponent,
    ViewPrintInvoiceComponent,
    InvoiceDetailsComponent,
    InvoiceItemsComponent,
    ViewProductComponent,
    ViewProductContentComponent,
    ProdNavBarComponent,
    ViewPrintPoComponent,
    ViewPrintPoContentComponent,
    PoItemsComponent,
    PoDetailsComponent,
    TransferDbComponent,
    QuoteFormComponent,
    QuoteFormSpComponent,
    QoutePvComponent,
    QouteAcComponent,
    QouteBatComponent,
    QouteOtherComponent,
    QuotePvWireComponent,
    ViewUsersComponent,
    ViewUsersContentComponent,
    ViewUserComponent,
    ViewUserContentComponent,
    TermsComponent,
    QuoteItemsSpComponent,
    InvoiceItemsSpComponent,
    PoItemsSpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
