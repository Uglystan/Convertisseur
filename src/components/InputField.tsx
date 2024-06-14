import React from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import OptionField from './OptionField'
import { Dimensions, DimensionsNeed } from '../types/converter_types'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
}

interface InputFieldProps {
	unit : string
	amount : string
	readOnly: boolean
	dimensions? : Dimensions
	listUnit : Array<string>
	dimensionsNeeded? : DimensionsNeed
	handleUnitChange : (event : SelectChangeEvent<string>) => void
	handleAmountChange : (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	setDimensions? : (value: Dimensions) => void
}

function InputField({unit, amount, readOnly, dimensions = {longueur : '', largeur : '', hauteur : '', ratio : ''}, listUnit, dimensionsNeeded = {longueur : false, largeur : false, hauteur : false, ratio : false, helper : ''}, handleUnitChange, handleAmountChange, setDimensions = () => {}} : InputFieldProps) {


	console.log("render Input")

	const [errorMessage, setErrorMessage] = React.useState<string>('')

	function handleAmountUnitValidate () {
		if (readOnly === false && amount === '')
			setErrorMessage('Attention pas de prix saisie')
		else
			setErrorMessage('')
	}

	function handleKeyDown (event : React.KeyboardEvent) {
		if (readOnly === false && !/^\d*,?\d*$/.test(amount + event.key) && !["Backspace", "Tab", "Enter", "Escape", "ArrowLeft", "ArrowRight"].includes(event.key)) {
			event.preventDefault()
			setErrorMessage("Uniquement des nombres et une virgule")
		}
		else
			setErrorMessage("")
	}

	return (
		<div>
			<TextField
				error={errorMessage !== '' ? true : false}
				helperText={errorMessage}
				value={amount}
				label="Prix"
				variant="outlined"
				sx={{m : 2, minWidth: 120}}
				onChange={handleAmountChange}
				onBlur={handleAmountUnitValidate}
				onKeyDown={handleKeyDown}
				InputProps={{
					readOnly: readOnly,
					endAdornment: (
						<InputAdornment position="end" onKeyDown={(event) => event.stopPropagation()}>
							<FormControl variant="standard">
								<Select
									sx={{minWidth: 75}}
									value={unit}
									onChange={handleUnitChange}
									inputProps={{ 'aria-label': 'Without label' }}
									MenuProps={MenuProps}
								>
									{listUnit.map((unit) => (
										<MenuItem id="list-unit" key={unit} value={unit}>€/{unit}</MenuItem>
									))}
								</Select>
							</FormControl>
						</InputAdornment>
					),
				}}
			/>
			{readOnly === false &&
			<OptionField
				dimensions={dimensions}
				dimensionsNeeded={dimensionsNeeded}
				setDimensions={setDimensions}
			/>
			}
		</div>
	)
}

// React.memo permet d'eviter les re-rendus inutiles c'est a dire que InputField ne sera rerendu
// que si les props changent c'est utile et pertinent car dans React quand un composant parent
// se rerend les composants enfants font de même or ce n'est pas toujours necessaire donc l'utilisation
// de React.memo sert à ça mais il faut s'assurer que les props passees à notre composant (InputField)
// sont stables donc utilise le hook useCallback pour les fonctions passees en props et egalement
// s'assurer que les tableaux et objets transmis comme props ne sont pas recrees à chaque rendu
// comme listUnit ou unitMap pour ca on les memorise avec useMemo
export default React.memo(InputField)