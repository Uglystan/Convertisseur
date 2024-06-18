type Dimensions = {
	longueur?: number
	largeur?: number
	hauteur?: number
	ratio?: number
    };
    
class ConverterClass {
	private _montant: number
	private _inputUnit: string
	private _outputUnit: string
	private _dimensions: Dimensions
	precision: number = 2
	private _convertTab: { [key: string]: () => string }
    
	constructor() {
		this._montant = 0
		this._inputUnit = ''
		this._outputUnit = ''
		this._dimensions = {}
		this._convertTab = {
			"HM to BARRE": () => this.convertFunction(1 / 100, false, 'longueur'),
			"KG to FLACON de 800G": () => this.convertFunction(0.8, false),
			"KG to SAC de 15KG": () => this.convertFunction(15, false),
			"X50 to U": () => this.convertFunction(1 / 50, false),
			"L to POT de 16L": () => this.convertFunction(16, false),
			"HM to M": () => this.convertFunction(1 / 100, false),
			"ROULEAU to M": () => this.convertFunction(1, false, 'longueur'),
			"M² to LAME": () => this.convertFunction(1, false, 'longueur', 'largeur'),
			"M² to PANNEAU": () => this.convertFunction(1, false, 'longueur', 'largeur'),
			"M² to ROULEAU": () => this.convertFunction(1, false, 'longueur', 'largeur'),
			"M³ to BARRE": () => this.convertFunction(1, false, 'longueur', 'largeur', 'hauteur'),
			"M to BARRE": () => this.convertFunction(1, false, 'longueur'),
			"PALETTE de 15 BARRE to BARRE": () => this.convertFunction(1 / 15, false),
			"X100 to BOITE de 50": () => this.convertFunction(1 / 2, false),
			"HM to U": () => this.convertFunction(1 / 100, false, 'longueur'),
			"KG to M²": () => this.convertFunction(1, false, 'ratio'),
			"L to M²": () => this.convertFunction(1, false, 'ratio'),
			"M² to M³": () => this.convertFunction(1, true, 'hauteur'),
			"M² to M": () => this.convertFunction(1, false, 'largeur'),
			"M³ to M": () => this.convertFunction(1, false, 'largeur', 'hauteur'),
			"M to U": () => this.convertFunction(1, false, 'longueur'),
			"PALETTE de 15 BARRE to M": () => this.convertFunction(1 / 15, false, 'longueur'),
			"ROULEAU to M²": () => this.convertFunction(1, true, 'longueur', 'largeur'),
			"U to M": () => this.convertFunction(1, true, 'longueur'),
			"X50 to M": () => this.convertFunction(1 / 50, true, 'longueur'),
			"SAC de 25KG to M²": () => this.convertFunction(1 / 25, false, 'ratio')
	    	};
	}
    
	public set montant(value: number) {
		if (value < 0) 
			throw new Error("Le montant ne peut pas être égal ou plus petit que 0");
		this._montant = value
	}
    
	public set inputUnit(value: string) {
		this._inputUnit = value
	}
    
	public set outputUnit(value: string) {
		this._outputUnit = value
	}
    
	public set dimensions(value: Dimensions) {
		if ((value.longueur && value.longueur < 0) || (value.largeur && value.largeur < 0) || (value.hauteur && value.hauteur < 0) || (value.ratio && value.ratio < 0))
			throw new Error("Les dimensions ne peuvent pas être égales ou plus petites que 0")
		this._dimensions = value
	}
    
	public convert(): string {
		const key: string = `${this._inputUnit} to ${this._outputUnit}`
		const convertFunction = this._convertTab[key]
	
		if (convertFunction)
			return convertFunction()
		else 
			return "Conversion non supportée"
	}

	// ... operateur de reste dans les arguments de fonction type indefini d'argument
	// ... operateur de spread dans une fonction sur un tableau pour faire une copie superficielle avec la reference qui change
	private convertFunction(factor: number, divide : boolean, ...dimensionKeys: ("longueur" | "largeur" | "hauteur" | "ratio") []): string {
		let resultFactor = factor
		let price 
		for (const key of dimensionKeys) {
			const value = this._dimensions[key]
			if (value !== undefined)
				resultFactor *= value
			else
				throw new Error(`${key} manquant pour la conversion.`)
		}
		if (divide === true)
			price = this._montant / resultFactor
		else
			price = this._montant * resultFactor
		return `${Number(price.toFixed(this.precision)).toLocaleString("fr-FR")}`
	}
}

export default ConverterClass