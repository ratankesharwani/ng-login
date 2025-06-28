import {Component} from '@angular/core';
import {ApiService} from '../service/api.service';
import {TableComponent} from '../table/table.component';
import {QueryParams} from '../data/query-params';
import {tableHeader} from '../service/params.service';

@Component({
  selector: 'app-actor',
  imports: [
    TableComponent
  ],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css'
})
export class ActorComponent {
  constructor(private apiService: ApiService) {
  }

  actors: any;
  headerActor: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;
  queryParams: any = {}

  ngOnInit() {
    this.queryParams = new QueryParams(
      {
        // firstName: 'ON',
        // lastName: 'GUINESS',
        // country: 'USA'
      },
      0,
      10,
      0,
      'lastName',
      'desc'
    );
    this.fetchActors(this.queryParams);
  }
  fetchActors(queryParams:QueryParams) {
    this.isLoading = true;
    this.queryParams = queryParams;
    this.apiService.getActor(this.queryParams).subscribe({
      next: (data: any) => {
        this.actors = data;
        this.actors.content = this.actors.content.map((item, i) => ({ ...item, index: i + 1 }));
        this.queryParams.totalElements = this.actors.totalElements;
        this.headerActor = tableHeader(data);
        console.log(this.headerActor);
        this.errorMessage = '';
      },
      error: err => {
        this.errorMessage = 'Failed to load actor data. Please try again later.';
        this.actors = [];
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
