import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, ClientHttpService } from '@app/_services';

enum RubriqueEnum {
  ALLER_FRANCE = "Je soushaite aller en France",
  ECOLE_FRANCE = "Les écoles en France",
  VYG = "Voyage",
  LGMT = "Logement",
  AVI = "AVI",
  VISA = "Visas",
  CAMPUS = "Campus France",
  EN_FRANCE = "Je suis en France"
}

@Component({
  selector: 'app-sous-rubrique',
  templateUrl: './sous-rubrique.component.html',
  styleUrls: ['./sous-rubrique.component.less']
})
export class SousRubriqueComponent implements OnInit {

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

  constructor(private clientHttpService: ClientHttpService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  sousRubriqueForm: FormGroup = this.formBuilder.group({
    sRubrique: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  onFormSubmit() {
    this.clientHttpService.createSousRubrique(this.sousRubriqueForm.get("sRubrique").value).subscribe(() => {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigate(['/rubrique'], { relativeTo: this.route });
    },
      (error) => {
        this.alertService.error(error);
      });
  }
}
