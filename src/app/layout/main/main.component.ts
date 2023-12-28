import { Component } from '@angular/core';
import { Data, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public prepareRoute(outlet: RouterOutlet): Data {
    return outlet && outlet.activatedRouteData;
  }
}
