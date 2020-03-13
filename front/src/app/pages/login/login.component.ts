import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'app-login',
  providers: [
    AuthService
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  public verify() {
    this.auth.login(this.username, this.password).then(res => {
      if (res.data.auth) {
        this.auth.persistUser();
        location.href = '/';
      }
    });
  }

}
