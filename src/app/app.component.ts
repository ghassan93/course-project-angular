import { MessagesService } from './messages/messages.service';
import { LoadingService } from './loading/loading.service';
import { LoadingComponent } from './loading/loading.component';
import {Component, OnInit} from '@angular/core';
import { AuthStore } from './services/auth.store';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements  OnInit {

    constructor(public auth:AuthStore) {

    }

    ngOnInit() {


    }

  logout() {
    this.auth.logOut()
  }

}
