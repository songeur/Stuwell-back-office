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

export class Rubrique {
    id: string;
    pays: string;
    data: any;
    name: string;
    sRubrique: string;
    constructor(rubriqueEnum: string, data: any, sRubrique: string, pays: string) {
        this.data = data;
        this.name = rubriqueEnum;
        this.sRubrique = sRubrique;
        this.pays = pays;
    }

}
