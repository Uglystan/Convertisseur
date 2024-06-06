const precision : number = 3

// Dimensions en metre (Amelioration permettre la selection de l'unite)
interface Dimensions {
	longueur? : number
	largeur? : number
	hauteur? : number
}

class Converter {

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
		
		this.montant = montant
		this.inputUnit = inputUnit
		this.outputUnit = outputUnit
		this.dimensions = dimensions
		this.convertTab = {
			"HM to BARRE" : this.convertHMtoBARRE.bind(this),
			"KG to FLACON de 800G" : this.convertKGtoFLACON800G.bind(this),
			"KG to SAC de 15KG" : this.convertKGtoSAC15KG.bind(this),
			"X50 to U" : this.convertX50toU.bind(this),
			"L to POT de 16L" : this.convertLtoPOT16L.bind(this),
			"HM to M" : this.convertHMtoM.bind(this),
			"ROULEAU to M" : this.convertROULEAUtoM.bind(this),
			"M2 to LAME" : this.convertM2toLAMEPANNEAUROULEAU.bind(this),
			"M2 to PANNEAU" : this.convertM2toLAMEPANNEAUROULEAU.bind(this),
			"M2 to ROULEAU" : this.convertM2toLAMEPANNEAUROULEAU.bind(this),
			"M3 to BARRE" : this.convertM3toBARRE.bind(this),
			"M to BARRE" : this.convertMtoBARRE.bind(this),
			"PALETTE de 15 BARRE to BARRE" : this.convertPALETTE15BARREtoBARRE.bind(this),
			"X100 to BOITE de 50" : this.convertX100toBOITE50.bind(this),
			"HM to U" : this.convertHMtoU.bind(this),
			"KG to M2" : this.convertKGtoM2.bind(this),

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

	convertSimpleTemplate(factor : number) : string {
		const price = this.montant * factor
		return (`${price.toFixed(this.precision)}€/${this.outputUnit}`)
	}

	// Demander a l'utilisateur l'unite car pas exprime ici donc on utilise dimensions
	private convertHMtoBARRE() : string {
		if (!this.dimensions?.longueur)
			throw Error("Longueur manquante pour la conversion.")
		const pricePerBarre = (this.montant / 100) * this.dimensions.longueur
		return (`${pricePerBarre.toFixed(precision)}€/${this.outputUnit}`)
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
		const pricePerM = this.montant / this.dimensions.longueur
		return (`${pricePerM.toFixed(precision)}€/${this.outputUnit}`)
	}

	// Demander a l'utilisateur l'unite car pas exprime ici donc on utilise dimensions
	private convertM2toLAMEPANNEAUROULEAU () : string {
		if (!this.dimensions?.longueur || !this.dimensions?.largeur)
			throw Error("Longueur ou largeur manquante pour la conversion.")
		const pricePerLame = (this.dimensions.longueur * this.dimensions.largeur) * this.montant
		return (`${pricePerLame}€/${this.outputUnit}`)
	}

	// Demander a l'utilisateur l'unite car pas exprime ici donc on utilise dimensions
	private convertM3toBARRE () : string {
		if (!this.dimensions?.hauteur || !this.dimensions?.longueur || !this.dimensions?.largeur)
			throw Error("Longueur ou largeur ou hauteur manquante pour la conversion.")
		const pricePerBarre = (this.dimensions.hauteur * this.dimensions.largeur * this.dimensions.longueur) * this.montant
		return (`${pricePerBarre}€/${this.outputUnit}`)
	}

	// Demander a l'utilisateur l'unite car pas exprime ici donc on utilise dimensions
	private convertMtoBARRE () : string {
		if (!this.dimensions?.longueur)
			throw Error("Longueur manquante pour la conversion.")
		const pricePerBarre = this.dimensions.longueur * this.montant
		return (`${pricePerBarre}€/${this.outputUnit}`)
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
		const pricePerU = (this.montant / 100) * this.dimensions.longueur
		return (`${pricePerU}€/${this.outputUnit}`)
	}

	private convertKGtoM2 () : string {
		return "test"
	}
}

let dimension : Dimensions = {
	longueur : 10,
	largeur : 10,
	hauteur : undefined,
}

try {
	let test : Converter = new Converter(100, 'X100', 'BOITE de 50', dimension)
	console.log(test.convert())
}
catch (error) {
	console.log(error.message)
}

// Amelioration API pour recuperer le prix
// Amelioration Input en plus pour demander le nbr d'elem (outputPrice * N.elem)
// Amelioration Error class
// Amelioration plus de template