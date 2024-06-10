import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select'
import OptionField from './OptionField'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

interface Need {
	longueur : boolean
	largeur : boolean
	hauteur : boolean
	ratio : boolean
	helper : string
}

interface Dimensions {
	longueur? : number
	largeur? : number
	hauteur? : number
	ratio? : number
}

interface InputFieldProps {
	unit : string
	amount : string
	errorMessage? : string
	error? : boolean
	disabled: boolean
	dimensions? : Dimensions
	listUnit : Array<string>
	needTab? : Need
	handleUnitChange : (event : SelectChangeEvent<string>) => void
	handleAmountChange : (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	setErrorMessage? : (value : React.SetStateAction<string>) => void
	setDimensions? : (value: Dimensions) => void
}

// Validation des donnes dans la classe ou dans la fonction ?
function InputField({unit, amount, errorMessage = '', error = false, disabled, dimensions = {}, listUnit, needTab = {longueur : false, largeur : false, hauteur : false, ratio : false, helper : ''}, handleUnitChange, handleAmountChange, setErrorMessage = () => {}, setDimensions = () => {}} : InputFieldProps) {

	// parseFloat gere logiquement les cas ".13" et "13."
	// Verifie pas si Number.isNaN(parseFloat(amount)) car impossible avec le regex
	function handleAmountUnitValidate () {
		if (amount === '')
			setErrorMessage('Attention pas de prix saisie')
		else
			setErrorMessage('')
	}

	function handleKeyDown (event : React.KeyboardEvent) {
		if (!/^\d*\.?\d*$/.test(amount + event.key) && !["Backspace", "Tab", "Enter", "Escape", "ArrowLeft", "ArrowRight"].includes(event.key)) {
			event.preventDefault()
			setErrorMessage("Uniquement des nombres et un .")
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
			disabled={disabled}
			sx={{m : 2, minWidth: 120}}
			onChange={handleAmountChange}
			onBlur={handleAmountUnitValidate}
			onKeyDown={handleKeyDown}
			InputProps={{
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
		{/* COndition pouir afficher ? */}
		<OptionField
			dimensions={dimensions}
			needTab={needTab}
			setDimensions={setDimensions}
		/>
		</div>
	)
}

export default InputField