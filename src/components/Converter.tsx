import React, { useCallback } from 'react'
import InputField from './InputField'
import {SelectChangeEvent} from '@mui/material/Select'
import ConverterClass from '../utils/ConvertisseurClass'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import { Dimensions, DimensionsNeed } from '../types/converter_types'
import { unitMap, conversionNeeds, listInputUnit } from '../config/convert_config'


function dimensionsNeeded (inputUnit : string, outputUnit : string) : DimensionsNeed {
	const key = `${inputUnit} to ${outputUnit}`
	return conversionNeeds[key as keyof typeof conversionNeeds] || { longueur: false, largeur: false, hauteur: false, ratio: false , helper: ''}
}

function convertToNumber(dimensions : Dimensions) {
	return ({
			longueur : parseFloat(dimensions.longueur.replaceAll(',', '.')),
			largeur : parseFloat(dimensions.largeur.replaceAll(',', '.')),
			hauteur : parseFloat(dimensions.hauteur.replaceAll(',', '.')),
			ratio : parseFloat(dimensions.ratio.replaceAll(',', '.'))
		})
}

function checkDimensionMatch(dimensions: Dimensions, dimensionsRequired : DimensionsNeed) : boolean {
	return (
		dimensionsRequired.longueur === (dimensions.longueur !== '') &&
		dimensionsRequired.largeur === (dimensions.largeur !== '') &&
		dimensionsRequired.hauteur === (dimensions.hauteur !== '') &&
		dimensionsRequired.ratio === (dimensions.ratio !== '')
	)
}


function Converter() {
	
	// Hook useState qui permet de declarer un etat local dans un composant
	// ce hook retourne un tableau avec la valeur actuel de l'etat et une fonction pour
	// modifier l'etat
	const [inputUnit, setInputUnit] = React.useState<string>('M')
	const [inputAmount, setInputAmount] = React.useState<string> ('')
	const [outputUnit, setOutputUnit] = React.useState<string>('BARRE')
	const [outputAmount, setOutputAmount] = React.useState<string> ('')

	// Hook useRef qui permet de declarer une reference qui persiste a travers les rendus
	// Cad que converter ne sera pas recreer entre chaque rendu 
	const converter = React.useRef(new ConverterClass()).current
	
	// Les fonctions de mise a jour de l'etat sont deja optimisees par react pour ne pas changer de reference
	// entre les rendus
	const [dimensions, setDimensions] = React.useState<Dimensions>({longueur: '', largeur: '', hauteur: '', ratio : ''})

	// Hook useCallBack qui permet de "memoriser" des fonctions. Si une fonctions est passee comme prop
	// a un composant enfant le fait d'utiliser ce hook permet de ne pas re-rendre la fonction si les
	// dependances de cette fonction (2eme arguments) n'ont pas change. car de base une fonction fait
	// re-rendre un composant
	const onChangeUnit = useCallback((event : SelectChangeEvent<typeof outputUnit>, option : string) => {
		const newValue = event.target.value
		let newRequiredDimensions : DimensionsNeed
		if (option === 'output') {
			setOutputUnit(newValue)
			newRequiredDimensions = dimensionsNeeded(inputUnit, newValue)
		}
		else {
			setOutputUnit(unitMap[newValue][0])
			setInputUnit(newValue)
			newRequiredDimensions = dimensionsNeeded(newValue, unitMap[newValue][0])
		}
		setOutputAmount('')
		const actualRequieredDimensions : DimensionsNeed = dimensionsNeeded(inputUnit, outputUnit)
		// Fonction de mise a jour pour s'assurer de travailler avec le bon etat ceci  ne marche pas
		// for (const key of (Object.keys(dimensions) as (keyof DimensionsNeed)[])) {
		// 	if (c[key] !== t[key]) {
		// 	    setDimensions({...dimensions, [key]: ''})
		// 	    console.log(dimensions[key as (keyof Dimensions)])
		// 	}
		//     }
		// En effet on faisait le modification une a une sans prendre en compte les MAJ
		// precedente car setDImensions est async donc l'etat ne sera pas forcement mis a jour a chaque appel
		// donc si on a au depat {'2', '2', '2', ''} a la fin on aura {'2', '2', '', ''} car les modification
		// ne se seront pas effectue
		// Ici on update tout dimensions en prenant compte des update precedente dans la boucle et on
		// retourne l'objet entier
		setDimensions(prevDimensions => {
			const newDimensions = {...prevDimensions}
			for (const key of (Object.keys(prevDimensions) as (keyof DimensionsNeed)[])) {
				if (actualRequieredDimensions[key] !== newRequiredDimensions[key])
					newDimensions[key as (keyof Dimensions)] = ''
			}
			return newDimensions
		})
	}, [outputUnit, inputUnit])

	// Hook useEffect qui permet de generer des effets de bord en fonction d'une liste de dependance
	// Le code ci dessous sera donc execute si un des elements de la liste de dependance (2eme arg)
	// change
	React.useEffect(() => {
		const dimensionsRequired : DimensionsNeed = dimensionsNeeded(inputUnit, outputUnit)

		console.log(dimensions, dimensionsRequired)
		if(inputAmount !== '' && checkDimensionMatch(dimensions, dimensionsRequired)) {
			converter.montant = parseFloat(inputAmount.replaceAll(',', '.'))
			converter.inputUnit = inputUnit
			converter.outputUnit = outputUnit
			converter.dimensions = convertToNumber(dimensions)
			setOutputAmount(converter.convert())
		}
		if (inputAmount === '' && outputAmount !== '')
			setOutputAmount('')
	}, [inputAmount, inputUnit, outputUnit, dimensions, outputAmount])

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
				readOnly={false}
				dimensions={dimensions}
				listUnit={listInputUnit}
				dimensionsNeeded={dimensionsNeeded(inputUnit, outputUnit)}
				onChangeUnit={onChangeUnit}
				setAmount={setInputAmount}
				setDimensions={setDimensions}
			/>
			<InputField
				unit={outputUnit}
				amount={outputAmount}
				readOnly={true}
				listUnit={unitMap[inputUnit]}
				onChangeUnit={onChangeUnit}
				setAmount={setOutputAmount}
			/>
		</Stack>
	)
}

export default Converter