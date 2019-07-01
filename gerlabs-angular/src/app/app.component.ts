import { Component } from '@angular/core';

import { TokenService } from './shared/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Gerenciador de Tarefas';

  public constructor(private tokenService: TokenService){
    this.tokenService.init({
      apiBase: 'http://38aeaa16.ngrok.io',
      // apiBase: 'https://gerlab-api.herokuapp.com/',
      // apiBase: 'http://0.0.0.0:3000',
      globalOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.gerlabs.v2'
        }
      }
    })
  }
}
