import React, { useCallback } from 'react'
import InputField from './InputField'
import {SelectChangeEvent} from '@mui/material/Select'
import ConverterClass from '../utils/ConvertisseurClass'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Dimensions, DimensionsNeed } from '../types/converter_types'
import { unitMap, conversionNeeds, listInputUnit } from '../config/convert_config'



function DimensionsNeeded (inputUnit : string, outputUnit : string) : DimensionsNeed {
	const key = `${inputUnit} to ${outputUnit}`
	return conversionNeeds[key as keyof typeof conversionNeeds] || { longueur: false, largeur: false, hauteur: false, ratio: false , helper: ''}
}

function Converter() {

	console.log("Render convert")
	// Hook useState qui permet de declarer un etat local dans un composant
	// ce hook retourne un tableau avec la valeur actuel de l'etat et une fonction pour
	// modifier l'etat
	const [inputUnit, setInputUnit] = React.useState<string>('M')
	const [inputAmount, setInputAmount] = React.useState<string> ('')
	const [outputUnit, setOutputUnit] = React.useState<string>('BARRE')
	const [outputAmount, setOutputAmount] = React.useState<string> ('')
	const converter : ConverterClass = new ConverterClass()

	// Les fonctions de mise a jour de l'etat sont deja optimisees par react pour ne pas changer de reference
	// entre les rendus
	const [dimensions, setDimensions] = React.useState<Dimensions>({longueur: '', largeur: '', hauteur: '', ratio : ''})

	const handleInputUnitChange = useCallback((event : SelectChangeEvent<typeof inputUnit>) => {
		const newUnit = event.target.value
		setOutputUnit(unitMap[newUnit][0])
		setInputUnit(newUnit)
		setOutputAmount('')
		setDimensions({...dimensions, longueur : '', largeur : '', hauteur : '', ratio : ''})
	}, [])
	
	// Hook useCallBack qui permet de "memoriser" des fonctions. Si une fonctions est passee comme prop
	// a un composant enfant le fait d'utiliser ce hook permet de ne pas re-rendre la fonction si les
	// dependances de cette fonction (2eme arguments) n'ont pas change. car de base une fonction fait
	// re-rendre un composant
	const handleInputAmountChange = useCallback((event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setInputAmount(event.target.value)
	}, [])

	// Ici inclue pas dimensions dans les dependances car on remet juste dimensions a 0
	const handleOutputUnitChange = useCallback ((event : SelectChangeEvent<typeof outputUnit>) => {
		setOutputUnit(event.target.value)
		setOutputAmount('')
		setDimensions({...dimensions, longueur : '', largeur : '', hauteur : '', ratio : ''})
	}, [])
	
	const handleOutputAmountChange = useCallback((event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setOutputAmount(event.target.value)
	}, [])

	// Hook useEffect qui permet de generer des effets de bord en fonction d'une liste de dependance
	// Le code ci dessous sera donc execute si un des elements de la liste de dependance (2eme arg)
	// change
	React.useEffect(() => {
		const dimensionsRequired : DimensionsNeed = DimensionsNeeded(inputUnit, outputUnit)
		const dimensionsActual : DimensionsNeed = {longueur : dimensions.longueur !== '', largeur : dimensions.largeur !== '', hauteur : dimensions.hauteur !== '', ratio : dimensions.ratio !== '', helper : dimensionsRequired.helper}

		if(inputAmount !== '' && dimensionsRequired.longueur === dimensionsActual.longueur && dimensionsRequired.largeur === dimensionsActual.largeur && dimensionsRequired.hauteur === dimensionsActual.hauteur && dimensionsRequired.ratio === dimensionsActual.ratio) {
			converter.montant = parseFloat(inputAmount.replaceAll(',', '.'))
			converter.inputUnit = inputUnit
			converter.outputUnit = outputUnit
			converter.dimensions = {
				longueur : parseFloat(dimensions.longueur.replaceAll(',', '.')),
				largeur : parseFloat(dimensions.largeur.replaceAll(',', '.')),
				hauteur : parseFloat(dimensions.hauteur.replaceAll(',', '.')),
				ratio : parseFloat(dimensions.ratio.replaceAll(',', '.'))
			}
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
				dimensionsNeeded={DimensionsNeeded(inputUnit, outputUnit)}
				handleUnitChange={handleInputUnitChange}
				handleAmountChange={handleInputAmountChange}
				setDimensions={setDimensions}
			/>
			<InputField
				unit={outputUnit}
				amount={outputAmount}
				readOnly={true}
				listUnit={unitMap[inputUnit]}
				handleUnitChange={handleOutputUnitChange}
				handleAmountChange={handleOutputAmountChange}
			/>
		</Stack>
	)
}

export default Converter