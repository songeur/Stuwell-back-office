import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { countries } from '@app/_helpers/countries.const';
import { editorConfigImport } from '@app/_helpers/editor-config.const';
import { AlertService, ClientHttpService } from '@app/_services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-acteur',
  templateUrl: './create-acteur.component.html',
  styleUrls: ['./create-acteur.component.less']
})
export class CreateActeurComponent implements OnInit {

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

  acteurForm: FormGroup = this.formBuilder.group({
    pays: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  get pays() {
    return this.acteurForm.get("pays");
  }

  onFormSubmit() {
    let htmlData = this.sanitizer.sanitize(SecurityContext.HTML, this.htmlContent);
    if (this.acteurForm.valid) {
      this.clientHttpService.createActeur({
        dataActeur: this.htmlContent,
        paysActeur: this.acteurForm.get("pays").value
      }).subscribe(() => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate(['/acteur'], { relativeTo: this.route });
      },
        (error) => {
          this.alertService.error(error);
        });
    }
  }


}
