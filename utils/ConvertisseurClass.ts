const precision : number = 3

// Dimensions en metre (Amelioration permettre la selection de l'unite)
interface Dimensions {
	longueur? : number
	largeur? : number
	hauteur? : number
}

class ConverterClass {

	precision : number = 3
	montant : number
	inputUnit : string
	outputUnit : string
	dimensions? : Dimensions
	ratio? : number
	convertTab : {[key : string] : () => string}


	constructor(montant : number, inputUnit : string, outputUnit : string, dimensions? : Dimensions, ratio? : number) {
		
		if (montant <= 0)
			throw Error("Le montant ne peut pas etre egale ou plus petit que 0")
		if (dimensions?.longueur !== undefined && dimensions.longueur <= 0)
			throw Error("La longueur ne peut pas etre egale ou plus petite que 0")
		if (dimensions?.largeur !== undefined && dimensions.largeur <= 0)
			throw Error("La largeur ne peut pas etre egale ou plus petite que 0")
		if (dimensions?.hauteur !== undefined && dimensions.hauteur <= 0)
			throw Error("La hauteur ne peut pas etre egale ou plus petite que 0")
		if (ratio && ratio <= 0)
			throw Error("Le ratio de conversion ne peut pas etre egale ou plus petit que 0")
		
		this.montant = montant
		this.inputUnit = inputUnit
		this.outputUnit = outputUnit
		this.dimensions = dimensions
		this.ratio = ratio
		this.convertTab = {
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

	public convert() : string {
		const key : string = `${this.inputUnit} to ${this.outputUnit}`
		const convertFunction : (() => string) | undefined = this.convertTab[key]

		if (convertFunction)
			return (convertFunction())
		else
			return ("Conversion non supporte")
	}

	private convertSimpleTemplate(factor : number) : string {
		const price = this.montant * factor
		return (`${price.toFixed(this.precision)}`)
	}

	// Demander a l'utilisateur l'unite car pas exprime ici donc on utilise dimensions
	private convertHMtoBARRE() : string {
		if (!this.dimensions?.longueur)
			throw Error("Longueur manquante pour la conversion.")
		return this.convertSimpleTemplate(1 / (100 / this.dimensions.longueur))
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

	// Demander a l'utilisateur l'unite car pas exprime ici donc on utilise dimensions
	private convertROULEAUtoM () : string {
		if (!this.dimensions?.longueur)
			throw Error("Longueur manquante pour la conversion.")
		return this.convertSimpleTemplate(1 / this.dimensions.longueur)
	}

	// Demander a l'utilisateur l'unite car pas exprime ici donc on utilise dimensions
	private convertM2toLAMEPANNEAUROULEAU () : string {
		if (!this.dimensions?.longueur || !this.dimensions?.largeur)
			throw Error("Longueur ou largeur manquante pour la conversion.")
		return this.convertSimpleTemplate(this.dimensions.longueur * this.dimensions.largeur)
	}

	// Demander a l'utilisateur l'unite car pas exprime ici donc on utilise dimensions
	private convertM3toBARRE () : string {
		if (!this.dimensions?.hauteur || !this.dimensions?.longueur || !this.dimensions?.largeur)
			throw Error("Longueur ou largeur ou hauteur manquante pour la conversion.")
		return this.convertSimpleTemplate(this.dimensions.hauteur * this.dimensions.largeur * this.dimensions.longueur)
	}

	// Demander a l'utilisateur l'unite car pas exprime ici donc on utilise dimensions
	private convertMtoBARRE () : string {
		if (!this.dimensions?.longueur)
			throw Error("Longueur manquante pour la conversion.")
		return this.convertSimpleTemplate(this.dimensions.longueur)
	}

	private convertPALETTE15BARREtoBARRE () : string {
		return this.convertSimpleTemplate(1 / 15)
	}

	private convertX100toBOITE50 () : string {
		return this.convertSimpleTemplate(1 / 2)
	}

	// Demander a l'utilisateur l'unite car pas exprime ici donc on utilise dimensions
	private convertHMtoU () : string {
		if (!this.dimensions?.longueur)
			throw Error("Longueur manquante pour la conversion.")
		return this.convertSimpleTemplate(1 / (100 / this.dimensions.longueur))
	}

	// Demander un ratio (Masse d'un metre carre kg/m2)
	private convertKGtoM2 () : string {
		if (!this.ratio)
			throw Error("Ratio Kg/M2 manquant pour la conversion")
		return this.convertSimpleTemplate(this.ratio)
	}

	// Demander un ratio (Litre pour un metre carre L/m2)
	private convertLtoM2 () : string {
		if (!this.ratio)
			throw Error("Ratio L/M2 manquant pour la conversion")
		return this.convertSimpleTemplate(this.ratio)
	}

	// Demander la hauteur
	private convertM2toM3 () : string {
		if (!this.dimensions?.hauteur)
			throw Error("Hauteur manquante pour la conversion.")
		return this.convertSimpleTemplate(1 / this.dimensions.hauteur)
	}

	// Demander la largeur pour pouvoir basculer de E/M2 => M ((E/M2)*largeur = E/M)
	private convertM2toM () : string {
		if (!this.dimensions?.largeur)
			throw Error("Largeur manquante pour la conversion.")
		return this.convertSimpleTemplate(this.dimensions.largeur)
	}

	// Demander la largeur et la hauteur E/M3 => M ((E/M3) * largeur * hauteur = E/M)
	private convertM3toM () : string {
		if (!this.dimensions?.largeur || !this.dimensions.hauteur)
			throw Error("Largeur et/ou hauteur manquante pour la conversion")
		return this.convertSimpleTemplate(this.dimensions.largeur * this.dimensions.hauteur)

	}

	// Demander un ratio (Metre pour une unite M/U)
	private convertMtoU () : string {
		if (!this.ratio)
			throw Error("Ratio M/U manquant pour la conversion")
		return this.convertSimpleTemplate(this.ratio)
	}

	// Demander la longueur de 1 BARRE
	private convertPALETTE15BARREtoM () : string {
		if (!this.dimensions?.longueur)
			throw Error("Longueur de une BARRE manquante pour la conversion")
		return this.convertSimpleTemplate(this.dimensions.longueur / 15)
	}

	// Demander la longueur et largeur de 1 ROULEAU
	private convertROULEAUtoM2 () : string {
		if (!this.dimensions?.longueur || !this.dimensions?.largeur)
			throw Error("Longueur et/ou largeur d'un ROULEAU manquante pour la conversion")
		return this.convertSimpleTemplate(1 / (this.dimensions.longueur * this.dimensions.largeur))
	}

	// Demander la longeur d'une unite
	private convertUtoM () : string {
		if (!this.dimensions?.longueur)
			throw Error("Longueur d'une unite manquante pour la conversion")
		return this.convertSimpleTemplate(1 / this.dimensions.longueur)
	}

	// Demander la longeur d'une unite
	private convertX50toM () : string {
		if (!this.dimensions?.longueur)
			throw Error("Longueur d'une unite manquante pour la conversion")
		return this.convertSimpleTemplate(1 / (this.dimensions.longueur * 50))
	}

	// Demander le ratio (Cb de Kg pour un M2)
	private convertSAC25KGtoM2 () : string {
		if (!this.ratio)
			throw Error("Ratio KG/M2 manquant pour la conversion")
		const pricePerM2 = (this.montant / 25) * this.ratio
		return (`${pricePerM2.toFixed(precision)}€/${this.outputUnit}`)
	}
}

export default ConverterClass

// let dimension : Dimensions = {
// 	longueur : 13,
// 	largeur : 0.12,
// 	hauteur : 0.12,
// }

// try {
// 	let test : Converter = new Converter(319, 'M2', 'M3', dimension)
// 	console.log(test.convert())
// }
// catch (error) {
// 	console.log(error.message)
// }

// Amelioration API pour recuperer le prix
// Amelioration Input en plus pour demander le nbr d'elem (outputPrice * N.elem)
// Amelioration Error class