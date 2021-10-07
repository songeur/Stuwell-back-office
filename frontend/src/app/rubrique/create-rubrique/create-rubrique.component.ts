import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { editorConfigImport } from '@app/_helpers/editor-config.const';
import { Rubrique } from '@app/_models/rubrique';
import { AlertService, ClientHttpService } from '@app/_services';
import { countries } from '@app/_helpers/countries.const';
import { Observable } from 'rxjs';

enum RubriqueEnum {
  ALLER_FRANCE = "Je souhaite aller en France",
  ECOLE_FRANCE = "Les écoles en France",
  VYG = "Voyage",
  LGMT = "Logement",
  AVI = "AVI",
  VISA = "Visas",
  CAMPUS = "Campus France",
  EN_FRANCE = "Je suis en France"
}

@Component({
  selector: 'app-create-rubrique',
  templateUrl: './create-rubrique.component.html',
  styleUrls: ['./create-rubrique.component.less']
})
export class CreateRubriqueComponent implements OnInit {

  htmlContent: any = "";
  rubriqueEnum = RubriqueEnum;
  editorConfig = editorConfigImport;

  readonly rubriqueList: string[] = [
    RubriqueEnum.ALLER_FRANCE,
    RubriqueEnum.AVI,
    RubriqueEnum.CAMPUS,
    RubriqueEnum.ECOLE_FRANCE,
    RubriqueEnum.EN_FRANCE,
    RubriqueEnum.LGMT,
    RubriqueEnum.VISA,
    RubriqueEnum.VYG
  ]

  countryList = countries.map(val => { return val.name });
  sRubrique$: Observable<any>;
  chosenCountry: string = "";

  constructor(private clientHttpService: ClientHttpService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder) { }

  rubriqueForm: FormGroup = this.formBuilder.group({
    rubrique: ['', Validators.required],
    sRubrique: [''],
    pays: ['', Validators.required]
  })

  ngOnInit(): void {
    this.sRubrique$ = this.clientHttpService.getAllSousRubrique();
  }

  get rubrique() {
    return this.rubriqueForm.get("rubrique");
  }

  get dataRubrique() {
    return this.rubriqueForm.get("dataRubrique");
  }

  onFormSubmit() {
    let htmlData = this.sanitizer.sanitize(SecurityContext.HTML, this.htmlContent);
    let rubriqueToSend: Rubrique;
    rubriqueToSend = new Rubrique(this.rubriqueForm.get("rubrique").value, this.htmlContent,
      this.rubriqueForm.get("sRubrique").value, this.rubriqueForm.get("pays").value);
    if (this.rubriqueForm.valid) {
      this.clientHttpService.createRubrique(rubriqueToSend).subscribe(() => {
        this.router.navigate(['/rubrique'], { relativeTo: this.route });
      },
        (error) => {
          this.alertService.error(error);
        });
    }
  }

}
