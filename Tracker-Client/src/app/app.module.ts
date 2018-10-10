import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';


import {AppComponent} from './app.component';
import {TaskComponent} from './task/task.component';


@NgModule({
    declarations: [
        AppComponent,
        TaskComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgxPaginationModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
