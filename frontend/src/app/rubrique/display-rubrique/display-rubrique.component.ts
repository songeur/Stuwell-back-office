import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rubrique } from '@app/_models/rubrique';
import { AlertService, ClientHttpService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-display-rubrique',
  templateUrl: './display-rubrique.component.html',
  styleUrls: ['./display-rubrique.component.less']
})
export class DisplayRubriqueComponent implements OnInit {
  rubriques: any[] = [];
  rubrique = null;
  isDeleting: boolean = true;

  constructor(private clientHttpService: ClientHttpService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.clientHttpService.getAllRubrique().subscribe((values) => {
      this.rubriques = values;
    })
  }
  deleteTemoignage(id: string) {
    this.isDeleting = true;
    this.clientHttpService.deleteRubrique(id)
      .subscribe(() => {
        this.rubrique = this.rubriques.filter(x => x.id !== id);
        this.isDeleting = false;
        this.ngOnInit();
        this.alertService.success("Suppression réussi");
      },
        (error) => {
          this.alertService.error(error);
        });
  }


}
