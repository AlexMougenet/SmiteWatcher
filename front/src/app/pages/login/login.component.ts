import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

  public verify() {
    // localStorage.setItem('analytics', 'true');
    location.href = '/';

  }

}
