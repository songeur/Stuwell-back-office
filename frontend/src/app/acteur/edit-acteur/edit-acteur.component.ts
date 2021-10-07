import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { countries } from '@app/_helpers/countries.const';
import { editorConfigImport } from '@app/_helpers/editor-config.const';
import { ClientHttpService, AlertService } from '@app/_services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-acteur',
  templateUrl: './edit-acteur.component.html',
  styleUrls: ['./edit-acteur.component.less']
})
export class EditActeurComponent implements OnInit {

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
    const id = this.route.snapshot.params['id'];
    this.clientHttpService.getActeurById(id).subscribe((value) => {
      this.acteurForm.get("pays").setValue(value.pays);
      this.htmlContent = value.data
    })
  }

  get pays() {
    return this.acteurForm.get("pays");
  }

  onFormSubmit() {
    const id = this.route.snapshot.params['id'];
    let htmlData = this.sanitizer.sanitize(SecurityContext.HTML, this.htmlContent);
    if (this.acteurForm.valid) {
      this.clientHttpService.updateActeur(id, {
        data: this.htmlContent,
        pays: this.acteurForm.get("pays").value
      }).subscribe(() => {
        this.router.navigate(['/acteur'], { relativeTo: this.route });
        this.alertService.success("Mise a jour réussi");
      },
        (error) => {
          this.alertService.error(error);
        });
    }
  }


}
