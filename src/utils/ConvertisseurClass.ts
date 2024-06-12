interface Dimensions {
	longueur? : number
	largeur? : number
	hauteur? : number
	ratio? : number
}

class ConverterClass {

	private _montant : number
	private _inputUnit : string
	private _outputUnit : string
	private _dimensions : Dimensions
	precision : number = 2
	private _convertTab : {[key : string] : () => string}


	constructor() {
		
		this._montant = 0
		this._inputUnit = ''
		this._outputUnit = ''
		this._dimensions = {longueur : 0, largeur : 0, hauteur : 0, ratio : 0}
		this._convertTab = {
			"HM to BARRE" : this.convertHMtoBARRE.bind(this),
			"KG to FLACON de 800G" : this.convertKGtoFLACON800G.bind(this),
			"KG to SAC de 15KG" : this.convertKGtoSAC15KG.bind(this),
			"X50 to U" : this.convertX50toU.bind(this),
			"L to POT de 16L" : this.convertLtoPOT16L.bind(this),
			"HM to M" : this.convertHMtoM.bind(this),
			"ROULEAU to M" : this.convertROULEAUtoM.bind(this),
			"M² to LAME" : this.convertM2toLAMEPANNEAUROULEAU.bind(this),
			"M² to PANNEAU" : this.convertM2toLAMEPANNEAUROULEAU.bind(this),
			"M² to ROULEAU" : this.convertM2toLAMEPANNEAUROULEAU.bind(this),
			"M³ to BARRE" : this.convertM3toBARRE.bind(this),
			"M to BARRE" : this.convertMtoBARRE.bind(this),
			"PALETTE de 15 BARRE to BARRE" : this.convertPALETTE15BARREtoBARRE.bind(this),
			"X100 to BOITE de 50" : this.convertX100toBOITE50.bind(this),
			"HM to U" : this.convertHMtoU.bind(this),
			"KG to M²" : this.convertKGtoM2.bind(this),
			"L to M²" : this.convertLtoM2.bind(this),
			"M² to M³" : this.convertM2toM3.bind(this),
			"M² to M" : this.convertM2toM.bind(this),
			"M³ to M" : this.convertM3toM.bind(this),
			'M to U' : this.convertMtoU.bind(this),
			"PALETTE de 15 BARRE to M" : this.convertPALETTE15BARREtoM.bind(this),
			"ROULEAU to M²" : this.convertROULEAUtoM2.bind(this),
			"U to M" : this.convertUtoM.bind(this),
			"X50 to M" : this.convertX50toM.bind(this),
			"SAC de 25KG to M²" : this.convertSAC25KGtoM2.bind(this),
		}
	}

	public set montant(value : number) {
		if (this._montant < 0)
			throw Error("Le montant ne peut pas etre egale ou plus petit que 0")
		this._montant = value
	}

	public set inputUnit(value : string) {
		this._inputUnit = value
	}

	public set outputUnit(value : string) {
		this._outputUnit = value
	}

	public set dimensions(value : Dimensions) {
		if ((value.longueur && value.longueur < 0) || (value.largeur && value.largeur < 0) || (value.hauteur && value.hauteur < 0) || (value.ratio && value.ratio < 0))
			throw Error("Les dimensions ne peuvent pas etre egales ou plus petites que 0")
		this._dimensions = value
	}

	public convert() : string {
		const key : string = `${this._inputUnit} to ${this._outputUnit}`
		const convertFunction : (() => string) | undefined = this._convertTab[key]

		if (convertFunction)
			return (convertFunction())
		else
			return ("Conversion non supporte")
	}

	private convertSimpleTemplate(factor : number) : string {
		const price = this._montant * factor
		return (`${Number(price.toFixed(this.precision)).toLocaleString('fr-FR')}`)
	}

	private convertHMtoBARRE() : string {
		if (this._dimensions?.longueur === undefined)
			throw Error("Longueur manquante pour la conversion.")
		return this.convertSimpleTemplate(1 / (100 / this._dimensions.longueur))
	}

	private convertKGtoFLACON800G() : string {
		return this.convertSimpleTemplate(0.8)
	}

	private convertKGtoSAC15KG() : string {
		return this.convertSimpleTemplate(15)
	}

	private convertX50toU() : string {
		return this.convertSimpleTemplate(1 / 50)
	}

	private convertLtoPOT16L (): string {
		return this.convertSimpleTemplate(16)
	}

	private convertHMtoM () : string {
		return this.convertSimpleTemplate(1 / 100)
	}

	private convertROULEAUtoM () : string {
		if (this._dimensions?.longueur === undefined)
			throw Error("Longueur manquante pour la conversion.")
		return this.convertSimpleTemplate(1 / this._dimensions.longueur)
	}

	private convertM2toLAMEPANNEAUROULEAU () : string {
		if (this._dimensions?.longueur === undefined || this._dimensions?.largeur === undefined)
			throw Error("Longueur ou largeur manquante pour la conversion.")
		return this.convertSimpleTemplate(this._dimensions.longueur * this._dimensions.largeur)
	}

	private convertM3toBARRE () : string {
		if (this._dimensions?.longueur === undefined || this._dimensions?.largeur === undefined || this._dimensions?.hauteur === undefined)
			throw Error("Longueur ou largeur ou hauteur manquante pour la conversion.")
		return this.convertSimpleTemplate(this._dimensions.hauteur * this._dimensions.largeur * this._dimensions.longueur)
	}

	private convertMtoBARRE () : string {
		if (this._dimensions?.longueur === undefined)
			throw Error("Longueur manquante pour la conversion.")
		return this.convertSimpleTemplate(this._dimensions.longueur)
	}

	private convertPALETTE15BARREtoBARRE () : string {
		return this.convertSimpleTemplate(1 / 15)
	}

	private convertX100toBOITE50 () : string {
		return this.convertSimpleTemplate(1 / 2)
	}

	private convertHMtoU () : string {
		if (this._dimensions?.longueur === undefined)
			throw Error("Longueur manquante pour la conversion.")
		return this.convertSimpleTemplate(1 / (100 / this._dimensions.longueur))
	}

	private convertKGtoM2 () : string {
		if (this._dimensions?.ratio === undefined)
			throw Error("Ratio Kg/M2 manquant pour la conversion")
		return this.convertSimpleTemplate(this._dimensions.ratio)
	}

	private convertLtoM2 () : string {
		if (this._dimensions?.ratio === undefined)
			throw Error("Ratio L/M2 manquant pour la conversion")
		return this.convertSimpleTemplate(this._dimensions.ratio)
	}

	private convertM2toM3 () : string {
		if (this._dimensions?.hauteur === undefined)
			throw Error("Hauteur manquante pour la conversion.")
		return this.convertSimpleTemplate(1 / this._dimensions.hauteur)
	}

	private convertM2toM () : string {
		if (this._dimensions?.largeur === undefined)
			throw Error("Largeur manquante pour la conversion.")
		return this.convertSimpleTemplate(this._dimensions.largeur)
	}

	private convertM3toM () : string {
		if (this._dimensions?.largeur === undefined || this._dimensions?.hauteur === undefined)
			throw Error("Largeur et/ou hauteur manquante pour la conversion")
		return this.convertSimpleTemplate(this._dimensions.largeur * this._dimensions.hauteur)

	}

	private convertMtoU () : string {
		if (this._dimensions?.longueur === undefined)
			throw Error("Ratio M/U manquant pour la conversion")
		return this.convertSimpleTemplate(this._dimensions.longueur)
	}

	private convertPALETTE15BARREtoM () : string {
		if (this._dimensions?.longueur === undefined)
			throw Error("Longueur de une BARRE manquante pour la conversion")
		return this.convertSimpleTemplate(this._dimensions.longueur / 15)
	}

	private convertROULEAUtoM2 () : string {
		if (this._dimensions?.longueur === undefined || this._dimensions?.largeur === undefined)
			throw Error("Longueur et/ou largeur d'un ROULEAU manquante pour la conversion")
		return this.convertSimpleTemplate(1 / (this._dimensions.longueur * this._dimensions.largeur))
	}

	private convertUtoM () : string {
		if (this._dimensions?.longueur === undefined)
			throw Error("Longueur d'une unite manquante pour la conversion")
		return this.convertSimpleTemplate(1 / this._dimensions.longueur)
	}

	private convertX50toM () : string {
		if (this._dimensions?.longueur === undefined)
			throw Error("Longueur d'une unite manquante pour la conversion")
		return this.convertSimpleTemplate(1 / (this._dimensions.longueur * 50))
	}

	private convertSAC25KGtoM2 () : string {
		if (this._dimensions?.ratio === undefined)
			throw Error("Ratio KG/M2 manquant pour la conversion")
		const pricePerM2 = (this.montant / 25) * this._dimensions.ratio
		return (`${pricePerM2.toFixed(this.precision)}€/${this._outputUnit}`)
	}
}

export default ConverterClass