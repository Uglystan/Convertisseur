export interface UnitMap {
	[key: string] : string[]
}

export interface Dimensions {
	longueur : string
	largeur : string
	hauteur : string
	ratio : string
}

export interface DimensionsNeed {
	longueur : boolean
	largeur : boolean
	hauteur : boolean
	ratio : boolean
	helper : string
}