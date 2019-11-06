import { Directive,HostListener } from '@angular/core';
import {HomepageComponent} from './homepage/homepage.component';

@Directive({
  selector: 'p[appResName]'
})
export class ResNameDirective {

  constructor(private homePage:HomepageComponent) { 
  }

  @HostListener('click', ['$event'])
  onClickEvent(event: MouseEvent) {
    let target = event.target || event.srcElement;
    let resName = target['innerText'];
    this.homePage.restaurantSearch = resName;
    this.homePage.searchRestaurant();
  }
}
