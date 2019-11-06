import { Component, OnInit, APP_ID } from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  [x: string]: any;

  public areaName: string;
  public nearByRestaurants;
  public restaurantSearch: any;
  constructor(private appService: AppService, private route: Router, private toastr: ToastrService) {
    this.getLocation();
  }

  ngOnInit() { }

  public getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  public showPosition = (position) => {
    let latitude: any = position.coords.latitude;
    let longitude: any = position.coords.longitude;
    this.appService.latitude = latitude;
    this.appService.longitude = longitude;
    this.getCityName();
    this.getNearByRestaurants();
  }

  public showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  }

  public getCityName: any = () => {
    this.appService.geoLocation().subscribe((apiResponse) => {
      this.areaName = apiResponse.location.title;
      this.appService.query = apiResponse.location.title;
      this.appService.locationEntityId = apiResponse.location.entity_id;
      this.appService.locationEntityType = apiResponse.location.entity_type;
    })
  }

  public getNearByRestaurants: any = () => {
    this.appService.geoLocation().subscribe((apiResponse) => {
      this.nearByRestaurants = apiResponse.nearby_restaurants;
    })
  }

  public searchCityResult: any = () => {
    this.appService.query = this.areaName;
    this.appService.searchCity().subscribe((apiResponse) => {
      this.appService.latitude = apiResponse.location_suggestions[0].latitude;
      this.appService.longitude = apiResponse.location_suggestions[0].longitude;
      this.appService.locationEntityId = apiResponse.location_suggestions[0].entity_id;
      this.appService.locationEntityType = apiResponse.location_suggestions[0].entity_type;
      this.getNearByRestaurants();
    })
  }
  public searchRestaurant: any = () => {
    if (this.restaurantSearch) {
      this.appService.restaurantName = this.restaurantSearch;
      this.appService.searchRestaurant().subscribe((apiResponse) => {
        if (apiResponse.results_found == 0) {
          this.toastr.warning("Enter Correct Restaurant Name");
        }
        else {
          this.appService.restaurantEntityId = apiResponse.restaurants[0].restaurant.id;
          this.route.navigate(['detail']); 
        }
      })
    }
    else if (!this.restaurantSearch) {
      this.toastr.warning("Enter Restaurant Name");
    }
  }
}