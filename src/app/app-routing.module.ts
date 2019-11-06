import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { DetailpageComponent } from './detailpage/detailpage.component';


const routes: Routes = [
  { path: 'home', component: HomepageComponent, pathMatch: 'full' },
  { path: 'detail', component: DetailpageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '*', component: HomepageComponent },
  { path: '**', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
