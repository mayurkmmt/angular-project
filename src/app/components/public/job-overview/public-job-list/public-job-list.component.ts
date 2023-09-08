import { Component, Input, OnInit } from '@angular/core';
import { LanguageModel } from "../../../../models/language.model";
import { JobService } from "../../../../services/job.service";
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../../../environments/environment";
import { Observable } from 'rxjs';
import { share, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-public-job-list',
  templateUrl: './public-job-list.component.html',
  styleUrls: ['./public-job-list.component.scss']
})
export class PublicJobListComponent implements OnInit {

  jobList: any;
  nextPage =  1;
  @Input('jobId') jobId: number;
  public news: Array<any> = [];
  private currentPage = 1;
  private request$: Observable<any>;
  isSpinner = true;

  constructor(private jobService: JobService,private http: HttpClient) {
  }

  removeDuplicates(array, key) {
    return array.reduce((accumulator, element) => {
      if (!accumulator.find(el => el[key] === element[key])) {
        accumulator.push(element);
      }
      return accumulator;
    }, []);
  }

  ngOnInit() {
    let param = (this.jobId > 0) ? '?page=1&jobId=' + this.jobId : '';
    this.jobService.publicGetAllJob(param).subscribe(resData => {
      this.jobList = resData;
      let employees = this.jobList?.results;
      employees =  this.removeDuplicates(employees, 'id')
      this.jobList.results = employees;
      this.currentPage++;
      this.isSpinner = false;
      this.news = this.news.concat(employees);
    }, error => {
      console.log("error occurred");
      console.log(error);
    });

    // this.getNews(this.currentPage)
    //   .pipe(finalize(() => this.onFinalize()))
    //   .subscribe((news) => {
    //     this.currentPage++;
    //     this.news = this.news.concat(news);
    //   });

  }

  getTours(tours: [string]) {
    let translatedTours = [];
    tours.forEach(tour => {
      if (tour == "local") {
        translatedTours.push('Nahverkehr');
      } else if (tour == "national") {
        translatedTours.push("Fernverkehr (national)");
      } else if (tour == "international") {
        translatedTours.push("Fernverkehr (international)");
      } else {
        translatedTours.push("Not available");
      }
    });
    return translatedTours.join(', ');
  }

  getShifts(shifts: [string]) {
    let translatedShifts = [];
    shifts.forEach(shift => {
      if (shift == "day") {
        translatedShifts.push('Tagesschicht');
      } else if (shift == "night") {
        translatedShifts.push("Nachtschicht");
      } else if (shift == "weekend") {
        translatedShifts.push("Wochenende");
      } else if (shift == "all") {
        translatedShifts.push("Wechselschicht");
      } else {
        translatedShifts.push("Not available");
      }
    });
    return translatedShifts.join(', ');
  }

  // getNext(url: string) {
  //   let parts = url.split("/");
  //   let param = parts[parts.length - 1];
  //   this.getWithParams(param);
  // }
  //
  // getPrevious(url: string) {
  //   let parts = url.split("/");
  //   let param = parts[parts.length - 1];
  //   this.getWithParams(param);
  // }

  getWithParams(url) {
    let parts = url.split("/");
    let param = parts[parts.length - 1];
    this.jobService.publicGetAllJob(param).subscribe(resData => {
      this.jobList = resData;
      let employees = this.jobList?.results;
      employees =  this.removeDuplicates(employees, 'id')
      this.jobList.results = employees;
    }, error => {
      console.log("error occurred");
      console.log(error);
    });
  }

  onScrollUp(): void {
    if(!this.nextPage){
      return
    }
    this.getNews(this.currentPage)
      .pipe(finalize(() => this.onFinalize()))
      .subscribe((news) => {
        // this.currentPage++;
        // this.news = news.concat(this.news);
      },error => {
        console.log("error occurred");
        console.log(error);
      });
  }

 onScrollDown(): void {
    if(!this.nextPage){
      return
    }
    this.getNews(this.currentPage)
      .pipe(finalize(() => this.onFinalize()))
      .subscribe((news) => {
        this.nextPage = news.next;
        // this.currentPage = news.next;
        this.news = this.news.concat(news.results);
      }, error => {
          console.log("error occurred");
          console.log(error);
        });
  }

  // Prevent duplicate requests on scroll.
  // More: https://stackoverflow.com/a/50865911/6441494
  private getNews(page: any = 1): Observable<any> {
    if (this.request$) {
      return this.request$;
    } else {
      this.currentPage++;
      this.request$ = this.http.get(environment.BASE_URL + `jobs/all-job-json/?page=${page}`).pipe(share());
      return this.request$;
    }
  }

  private onFinalize(): void {
    this.request$ = null;
  }

}
