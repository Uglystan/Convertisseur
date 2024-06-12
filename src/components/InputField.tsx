import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select'
import OptionField from './OptionField'
import { Dimensions, DimensionsNeed } from '../types/converter_types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

interface InputFieldProps {
	unit : string
	amount : string
	errorMessage? : string
	error? : boolean
	readOnly: boolean
	dimensions? : Dimensions
	listUnit : Array<string>
	dimensionsNeeded? : DimensionsNeed
	handleUnitChange : (event : SelectChangeEvent<string>) => void
	handleAmountChange : (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	setErrorMessage? : (value : React.SetStateAction<string>) => void
	setDimensions? : (value: Dimensions) => void
}

function InputField({unit, amount, errorMessage = '', error = false, readOnly, dimensions = {longueur : '', largeur : '', hauteur : '', ratio : ''}, listUnit, dimensionsNeeded = {longueur : false, largeur : false, hauteur : false, ratio : false, helper : ''}, handleUnitChange, handleAmountChange, setErrorMessage = () => {}, setDimensions = () => {}} : InputFieldProps) {

	function handleAmountUnitValidate () {
		if (amount === '')
			setErrorMessage('Attention pas de prix saisie')
		else
			setErrorMessage('')
	}

	function handleKeyDown (event : React.KeyboardEvent) {
		if (!/^\d*,?\d*$/.test(amount + event.key) && !["Backspace", "Tab", "Enter", "Escape", "ArrowLeft", "ArrowRight"].includes(event.key)) {
			event.preventDefault()
			setErrorMessage("Uniquement des nombres et une virgule")
		}
		else
			setErrorMessage("")
	}

	return (
		<div>
			<TextField
				error={error}
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
			<OptionField
				dimensions={dimensions}
				dimensionsNeeded={dimensionsNeeded}
				setDimensions={setDimensions}
			/>
		</div>
	)
}

// React.memo permet evite les re-rendus inutiles. C'est a dire que InputField ne sera re rendu
// que si les props changent. C'est utile est pertinent car dans react quand un composant parent
// se "re-rend" les composant enfant font de meme or ce n'est pas toujours necessaire donc l'utilisation
// de react.memo sert a ca. Mais il faut s'assurer que les props passser a notre composant (InputFild)
// sont stable donc utilise le hook useCallBack pour les fonctions passe en props et egalement
// s'assurer que les tableau et objets transmis comme props ne sont pas recrees a chaque rendu
// comme listUnit ou unitMap. pour ca on les memorisera avec useMemo.
export default React.memo(InputField)