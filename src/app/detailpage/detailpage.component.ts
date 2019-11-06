import { Component, OnInit} from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrls: ['./detailpage.component.css']
})

export class DetailpageComponent implements OnInit {
  
  public lat:any;
  public lng:any;
  public restaurantDetail :any;
  public restaurantReviews:any; 
  constructor(private appService: AppService, private route:Router) {
    this.getRestaurantDetail();
  }
  ngOnInit() {
  }
  public getRestaurantDetail: any = () => {
    this.appService.getRestaurantDetail().subscribe((apiResponse) => {
      this.restaurantDetail = apiResponse;
      this.lat = parseFloat(apiResponse.location.latitude);
      this.lng = parseFloat(apiResponse.location.longitude);
      this.restaurantReviews = apiResponse.all_reviews.reviews;
    },(error) =>{
      console.log(error.status);
      this.route.navigate(['home']);
    })
  }
}

