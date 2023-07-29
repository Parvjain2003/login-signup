import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitters/emitter';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  message ='';

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/user', { withCredentials : true})
    .subscribe(
      (res: any) => {
        this.message = 'Hi ${res.name}';
        Emitters.authEmitter.emit(true)
      },
      (err) => {
        this.message = "failed"
        Emitters.authEmitter.emit(false)
      }
    );
  }

}
