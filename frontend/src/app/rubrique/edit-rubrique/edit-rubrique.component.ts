import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { countries } from '@app/_helpers/countries.const';
import { editorConfigImport } from '@app/_helpers/editor-config.const';
import { Rubrique } from '@app/_models/rubrique';
import { ClientHttpService, AlertService } from '@app/_services';
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
  selector: 'app-edit-rubrique',
  templateUrl: './edit-rubrique.component.html',
  styleUrls: ['./edit-rubrique.component.less']
})
export class EditRubriqueComponent implements OnInit {

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
    const id = this.route.snapshot.params['id'];
    this.clientHttpService.getRubriqueById(id).subscribe((value) => {
      this.rubriqueForm.get("rubrique").setValue(value.name);
      this.rubriqueForm.get("sRubrique").setValue(value.sRubrique);
      this.rubriqueForm.get("pays").setValue(value.pays);
      this.htmlContent = value.data
    })
  }

  get rubrique() {
    return this.rubriqueForm.get("rubrique");
  }

  get dataRubrique() {
    return this.rubriqueForm.get("dataRubrique");
  }

  onFormSubmit() {
    const id = this.route.snapshot.params['id'];
    let rubriqueToSend: Rubrique;
    rubriqueToSend = new Rubrique(this.rubriqueForm.get("rubrique").value, this.htmlContent,
      this.rubriqueForm.get("sRubrique").value, this.rubriqueForm.get("pays").value);
    if (this.rubriqueForm.valid) {
      this.clientHttpService.updateRubrique(id, rubriqueToSend).subscribe(() => {
        this.router.navigate(['/rubrique'], { relativeTo: this.route });
        this.alertService.success("Mise a jour réussi");
      },
        (error) => {
          this.alertService.error(error);
        });
    }
  }
}
