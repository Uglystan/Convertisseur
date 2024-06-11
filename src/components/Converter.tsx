import React, { useEffect } from 'react'
import InputField from './InputField'
import {SelectChangeEvent} from '@mui/material/Select'
import ConverterClass from '../utils/ConvertisseurClass'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Dimensions, Need } from '../types/converter_types'
import { unitMap, conversionNeeds } from '../config/convert_config'

function fillNeed (inputUnit : string, outputUnit : string) : Need {
	const key = `${inputUnit} to ${outputUnit}`
	return conversionNeeds[key as keyof typeof conversionNeeds] || { longueur: false, largeur: false, hauteur: false, ratio: false , helper: ''}
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
	const [dimensions, setDimensions] = React.useState<Dimensions>({longueur: '', largeur: '', hauteur: '', ratio : ''})

	// Mise a jour de l'etat asynchrone donc si on print amount juste apres on aura pas la valeur actuel
	function handleInputUnitChange (event : SelectChangeEvent<typeof inputUnit>) {
		const newUnit = event.target.value
		setOutputUnit(unitMap[newUnit][0])
		setInputUnit(newUnit)
		setOutputAmount('')
		setDimensions({...dimensions, longueur : '', largeur : '', hauteur : '', ratio : ''})
	}
	
	function handleInputAmountChange (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setInputAmount(event.target.value)
	}

	function handleOutputUnitChange (event : SelectChangeEvent<typeof outputUnit>) {
		setOutputUnit(event.target.value)
		setOutputAmount('')
		setDimensions({...dimensions, longueur : '', largeur : '', hauteur : '', ratio : ''})
	}
	
	function handleOutputAmountChange (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setOutputAmount(event.target.value)
	}

	useEffect(() => {
		const n : Need = fillNeed(inputUnit, outputUnit)
		const j : Need = {longueur : dimensions.longueur !== '', largeur : dimensions.largeur !== '', hauteur : dimensions.hauteur !== '', ratio : dimensions.ratio !== '', helper : n.helper}

		if(!error && inputAmount !== '' && n.longueur === j.longueur && n.largeur === j.largeur && n.hauteur === j.hauteur && n.ratio === j.ratio) {
			// Setter dans la classe ?
			converter.montant = parseFloat(inputAmount)
			converter.inputUnit = inputUnit
			converter.outputUnit = outputUnit
			converter.dimensions = {longueur : parseFloat(dimensions.longueur), largeur : parseFloat(dimensions.largeur), hauteur : parseFloat(dimensions.hauteur), ratio : parseFloat(dimensions.ratio)}
			setOutputAmount(converter.convert())
		}
	}, [error, inputAmount, inputUnit, outputUnit, dimensions, converter])


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
				handleUnitChange={handleOutputUnitChange}
				handleAmountChange={handleOutputAmountChange}
			/>
		</Stack>
	)
}

export default Converter