import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel';
import '../styles/InputField.css'

const listInputUnit : Array<string> = ['M', 'M²', 'M³', 'HM', 'L', 'G', 'KG', 'U', 'X50', 'ROULEAU', 'PALETTE de 15 BARRE', 'X100', 'SAC de 25KG'];
const listOutputUnit : Array<string> = ['M', 'M²', 'M³', 'U', 'BARRE', 'FLACON de 800G', 'SAC de 15KG', 'POT de 16L', 'LAME', 'PANNEAU', 'ROULEAU', 'BOITE de 50']


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

// Validation des donnes dans la classe ou dans la fonction ?
function InputField() {

	const [unit, setUnit] = React.useState<string>('')
	const [amount, setAmount] = React.useState<string>('')
	const [error, setError] = React.useState<boolean>(false)
	const [errorMessage, setErrorMessage] = React.useState<string>('')

	function handleUnitChange (event : SelectChangeEvent<typeof unit>) {
		setUnit(event.target.value)
	}

	function handleAmountChange (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setAmount(event.target.value)
	}

	// parseFloat gere logiquement les cas ".13" et "13."
	// Verifie pas si Number.isNaN(parseFloat(amount)) car impossible avec le regex
	function handleAmountValidate () {
		if (unit === '') {
			setError(true)
			setErrorMessage('Attention pas d\'unite saisie')
		}
		else {
			setError(false)
			setErrorMessage('')
		}
	}

	function handleKeyDown (event : React.KeyboardEvent) {
		if (!/^\d*\.?\d*$/.test(amount + event.key) && !["Backspace", "Tab", "Enter", "Escape", "ArrowLeft", "ArrowRight"].includes(event.key)) {
			event.preventDefault()
			setError(true)
			setErrorMessage("Uniquement des nombres et un .")
		}
		else {
			setErrorMessage("")
			setError(false)
		}
	}

	return (
		<TextField
			error={error}
			helperText={errorMessage}
			value={amount}
			label="Prix"
			variant="outlined"
			sx={{m : 2, minWidth: 120}}
			onChange={handleAmountChange}
			onBlur={handleAmountValidate}
			onKeyDown={handleKeyDown}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end" onKeyDown={(event) => event.stopPropagation()}>
						<FormControl variant="standard">
							<InputLabel id="standard-label">€/Unité</InputLabel>
							<Select
								sx={{minWidth: 75}}
								labelId="standard-label"
								label="€/Unité"
								value={unit}
								onChange={handleUnitChange}
								onBlur={handleAmountValidate}
								inputProps={{ 'aria-label': 'Without label' }}
								MenuProps={MenuProps}
							>
								{listInputUnit.map((unit) => (
									<MenuItem id="list-unit" key={unit} value={unit}>€/{unit}</MenuItem>
								))}
							</Select>
						</FormControl>
					</InputAdornment>
				),
			}}
		/>
	)
}

export default InputField