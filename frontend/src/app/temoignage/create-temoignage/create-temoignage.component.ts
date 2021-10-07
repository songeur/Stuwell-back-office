import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { countries } from '@app/_helpers/countries.const';
import { editorConfigImport } from '@app/_helpers/editor-config.const';
import { AlertService, ClientHttpService } from '@app/_services';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-create-temoignage',
  templateUrl: './create-temoignage.component.html',
  styleUrls: ['./create-temoignage.component.less']
})
export class CreateTemoignageComponent implements OnInit {

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

  // temoignageForm: FormGroup = this.formBuilder.group({
  //   rubrique: ['', Validators.required],
  //   sRubrique: [''],
  //   pays: ['', Validators.required]
  // })

  ngOnInit(): void {
  }

  onFormSubmit() {
    let htmlData = this.sanitizer.sanitize(SecurityContext.HTML, this.htmlContent);
    if (this.htmlContent) {
      this.clientHttpService.createTemoignage({ dataTemoignage: this.htmlContent }).subscribe(() => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate(['/temoignage'], { relativeTo: this.route });
      },
        (error) => {
          this.alertService.error(error);
        });
    }
  }


}
