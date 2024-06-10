import React, { useEffect } from 'react'
import InputField from './InputField'
import {SelectChangeEvent} from '@mui/material/Select'
import ConverterClass from '../utils/ConvertisseurClass'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

interface UnitMap {
	[key: string] : string[]
}

const unitMap: UnitMap = {
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

const conversionNeeds = {
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

interface Need {
	longueur : boolean
	largeur : boolean
	hauteur : boolean
	ratio : boolean
	helper : string
}

function fillNeed (inputUnit : string, outputUnit : string) : Need {
	const key = `${inputUnit} to ${outputUnit}`
	return conversionNeeds[key as keyof typeof conversionNeeds] || { longueur: false, largeur: false, hauteur: false, ratio: false , helper: ''}
}


interface Dimensions {
	longueur? : number
	largeur? : number
	hauteur? : number
	ratio? : number
}

const listInputUnit : Array<string> = ['M', 'M²', 'M³', 'HM', 'L', 'G', 'KG', 'U', 'X50', 'ROULEAU', 'PALETTE de 15 BARRE', 'X100', 'SAC de 25KG'];

// Fonction callBack et creation des variables ici pour remonter les infos au parent (lifting state up)?
function Converter() {
	const [inputUnit, setInputUnit] = React.useState<string>('M')
	const [inputAmount, setInputAmount] = React.useState<string> ('')
	const [outputUnit, setOutputUnit] = React.useState<string>('BARRE')
	const [outputAmount, setOutputAmount] = React.useState<string> ('')
	const [errorMessage, setErrorMessage] = React.useState<string>('')
	const [error, setError] = React.useState<boolean>(false)
	const converter : ConverterClass = new ConverterClass(1, 'M', 'BARRE')

	// OptionField
	const [dimensions, setDimensions] = React.useState<Dimensions>({})

	// Mise a jour de l'etat asynchrone donc si on print amount juste apres on aura pas la valeur actuel
	function handleInputUnitChange (event : SelectChangeEvent<typeof inputUnit>) {
		const newUnit = event.target.value
		setOutputUnit(unitMap[newUnit][0])
		setInputUnit(newUnit)
	}
	
	function handleInputAmountChange (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setInputAmount(event.target.value)
	}

	function handleOutputUnitChange (event : SelectChangeEvent<typeof outputUnit>) {
		setOutputUnit(event.target.value)
	}
	
	function handleOutputAmountChange (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setOutputAmount(event.target.value)
	}

	useEffect(() => {
		if(!error && inputAmount !== '') {
			// Setter dans la classe ?
			converter.montant = parseFloat(inputAmount)
			converter.inputUnit = inputUnit
			converter.outputUnit = outputUnit
			setOutputAmount(converter.convert())
		}
	}, [error, inputAmount, inputUnit, outputUnit])


	// Hook qui permet d'executer des effet de bord. CAD quand on donne une fonction a exec quand le deuxieme argument change
	useEffect(() => {
		if (errorMessage === '')
			setError(false)
		else
			setError(true)
	}, [errorMessage])


	return(
		<Stack
			direction='row'
			divider={<Divider orientation="vertical" flexItem />}
			justifyContent='center'
			alignItems='flex-start'
		>
			<InputField
				unit={inputUnit}
				amount={inputAmount}
				errorMessage={errorMessage}
				error={error}
				disabled={false}
				dimensions={dimensions}
				listUnit={listInputUnit}
				needTab={fillNeed(inputUnit, outputUnit)}
				handleUnitChange={handleInputUnitChange}
				handleAmountChange={handleInputAmountChange}
				setErrorMessage={setErrorMessage}
				setDimensions={setDimensions}
			/>
			<InputField
				unit={outputUnit}
				amount={outputAmount}
				disabled={true}
				listUnit={unitMap[inputUnit]}
				// needTab={fillNeed(inputUnit, outputUnit)}
				handleUnitChange={handleOutputUnitChange}
				handleAmountChange={handleOutputAmountChange}
			/>
		</Stack>
	)
}

export default Converter