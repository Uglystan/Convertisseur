import { UnitMap } from '../types/converter_types'

export const unitMap: UnitMap = {
	'M' : ['BARRE', 'U'],
	'M²' : ['LAME', 'PANNEAU', 'ROULEAU', 'M³', 'M'],
	'M³' : ['BARRE', 'M'],
	'HM' : ['BARRE', 'M', 'U'],
	'L' : ['POT de 16L', 'M²'],
	'KG' : ['FLACON de 800G', 'SAC de 15KG', 'M²'],
	'U' : ['M'],
	'X50' : ['U', 'M'],
	'ROULEAU' : ['M', 'M²'],
	'PALETTE de 15 BARRE' : ['BARRE', 'M'],
	'X100' : ['BOITE de 50'],
	'SAC de 25KG' : ['M²'],
}

export const conversionNeeds = {
	"HM to BARRE" : { longueur: true, largeur: false, hauteur: false, ratio: false, helper: 'Longueur d\'une barre' },
	"KG to FLACON de 800G" : { longueur: false, largeur: false, hauteur: false, ratio: false, helper: '' },
	"KG to SAC de 15KG" : { longueur: false, largeur: false, hauteur: false, ratio: false, helper: '' },
	"X50 to U" : { longueur: false, largeur: false, hauteur: false, ratio: false, helper: '' },
	"L to POT de 16L" : { longueur: false, largeur: false, hauteur: false, ratio: false, helper: '' },
	"HM to M" : { longueur: false, largeur: false, hauteur: false, ratio: false, helper: '' },
	"ROULEAU to M" : { longueur: true, largeur: false, hauteur: false, ratio: false, helper: 'Longueur d\'un rouleau' },
	"M² to LAME" : { longueur: true, largeur: true, hauteur: false, ratio: false, helper: 'Longueur et largeur d\'une lame' },
	"M² to PANNEAU" : { longueur: true, largeur: true, hauteur: false, ratio: false, helper: 'Longueur et largeur d\'un panneau' },
	"M² to ROULEAU" : { longueur: true, largeur: true, hauteur: false, ratio: false, helper: 'Longueur et largeur d\'une roulea' },
	"M³ to BARRE" : { longueur: true, largeur: true, hauteur: true, ratio: false, helper: 'Longueur, largeur et hauteur d\'une barre' },
	"M to BARRE" : { longueur: true, largeur: false, hauteur: false, ratio: false, helper: 'Longueur d\'une barre' },
	"PALETTE de 15 BARRE to BARRE" : { longueur: false, largeur: false, hauteur: false, ratio: false, helper: '' },
	"X100 to BOITE de 50" : { longueur: false, largeur: false, hauteur: false, ratio: false, helper: '' },
	"HM to U" : { longueur: true, largeur: false, hauteur: false, ratio: false, helper: 'Longueur d\'une unité' },
	"KG to M²" : { longueur: false, largeur: false, hauteur: false, ratio: true, helper: 'Masse d\'un mètre carré en Kg' },
	"L to M²" : { longueur: false, largeur: false, hauteur: false, ratio: true, helper: 'Litre pour un mètre carré en L' },
	"M² to M³" : { longueur: false, largeur: false, hauteur: true, ratio: false, helper: 'Hauteur' },
	"M² to M" : { longueur: false, largeur: true, hauteur: false, ratio: false, helper: 'Largeur' },
	"M³ to M" : { longueur: false, largeur: true, hauteur: true, ratio: false, helper: 'Largeur et hauteur' },
	'M to U' : {longueur : true, largeur : false, hauteur : false, ratio : false, helper: 'Longueur d\'une unité'  },
	"PALETTE de 15 BARRE to M" : { longueur: true, largeur: false, hauteur: false, ratio: false, helper: 'Longueur d\'une barre' },
	"ROULEAU to M²" : { longueur: true, largeur: true, hauteur: false, ratio: false, helper: 'Longueur et hauteur d\'un rouleau' },
	"U to M" : { longueur: true, largeur: false, hauteur: false, ratio: false, helper: 'Longueur d\'une unité' },
	"X50 to M" : { longueur: true, largeur: false, hauteur: false, ratio: false, helper: 'Longueur d\'une unité' },
	"SAC de 25KG to M²" : { longueur: false, largeur: false, hauteur: false, ratio: true, helper: '' },
}

export const listInputUnit : Array<string> = ['M', 'M²', 'M³', 'HM', 'L', 'KG', 'U', 'X50', 'ROULEAU', 'PALETTE de 15 BARRE', 'X100', 'SAC de 25KG'];