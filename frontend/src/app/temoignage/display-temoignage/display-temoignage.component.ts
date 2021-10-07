import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, ClientHttpService } from '@app/_services';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-display-temoignage',
  templateUrl: './display-temoignage.component.html',
  styleUrls: ['./display-temoignage.component.less']
})
export class DisplayTemoignageComponent implements OnInit {

  temoignage$: Observable<any>;
  temoignages: any[] = [];
  temoignage = null;
  isDeleting: boolean = true;

  constructor(private clientHttpService: ClientHttpService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.temoignage$ = this.clientHttpService.getAllTemoignage();
    this.clientHttpService.getAllTemoignage().subscribe((values) => {
      this.temoignages = values;
    })
  }

  deleteTemoignage(id: string) {
    this.isDeleting = true;
    this.clientHttpService.deleteTemoignage(id)
      .pipe(first())
      .subscribe(() => {
        this.temoignage = this.temoignages.filter(x => x.id !== id);
        this.isDeleting = false;
        this.ngOnInit();
        this.alertService.success("Suppression réussi");
      },
        (error) => {
          this.alertService.error(error);
        });
  }

}
