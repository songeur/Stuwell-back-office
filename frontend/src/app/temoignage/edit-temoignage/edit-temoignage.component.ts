import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { countries } from '@app/_helpers/countries.const';
import { editorConfigImport } from '@app/_helpers/editor-config.const';
import { ClientHttpService, AlertService } from '@app/_services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-temoignage',
  templateUrl: './edit-temoignage.component.html',
  styleUrls: ['./edit-temoignage.component.less']
})
export class EditTemoignageComponent implements OnInit {

  htmlContent: any = "";
  editorConfig = editorConfigImport;

  countryList = countries.map(val => { return val.name });
  sRubrique$: Observable<any>;
  chosenCountry: string = "";

  constructor(private clientHttpService: ClientHttpService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.clientHttpService.getTemoignageById(id).subscribe((value) => {
      this.htmlContent = value.data
    })
  }

  onFormSubmit() {
    const id = this.route.snapshot.params['id'];
    if (this.htmlContent) {
      this.clientHttpService.updateTemoignage(id, {
        data: this.htmlContent
      }).subscribe(() => {
        this.router.navigate(['/temoignage'], { relativeTo: this.route });
        this.alertService.success("Mise a jour réussi");
      },
        (error) => {
          this.alertService.error(error);
        });
    }
  }

}