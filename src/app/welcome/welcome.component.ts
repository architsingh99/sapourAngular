import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import {AppService} from './../app.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
    @ViewChild('category') categoryKey: ElementRef | undefined;

  categories: any[] = [];

  constructor(public appService: AppService, public cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.appService.getCategories().subscribe((data: any) => {
		  this.categories = data.categories;
      console.log("this.categories :: ", this.categories)
      this.cd.detectChanges();
		});
  }

  startTest() {
    localStorage.setItem("category", this.categoryKey?.nativeElement.value);
  }

}
