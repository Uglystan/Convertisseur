import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { Dimensions, Need } from '../types/converter_types'

interface OptionFieldProps {
	dimensions : Dimensions
	needTab : Need
	setDimensions : (value : Dimensions) => void
}

const textStyle = {
	m: 2,
	'& .MuiOutlinedInput-root': {
		height: '35px',
		width: '85px',
	},
	'& .MuiFormHelperText-root': {
		marginLeft: '0px',
		marginRight: '0px',
	}
}

//Disabled pour les champs non necessaire ou pas afficher
function OptionField({dimensions, needTab, setDimensions} : OptionFieldProps) {

	const [errorMessage, setErrorMessage] = React.useState<string>('')
	const [error, setError] = React.useState<boolean>(false)

	function handleKeyDown (event : React.KeyboardEvent, option : string | undefined) {
		if (!/^\d*\.?\d*$/.test(option + event.key) && !["Backspace", "Tab", "Enter", "Escape", "ArrowLeft", "ArrowRight"].includes(event.key)) {
			event.preventDefault()
		}
		else {}
	}

	function handleDimensionsChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, option: string) {
		if (option === 'longueur')
			setDimensions({...dimensions, longueur: event.target.value})
		else if (option === 'largeur')
			setDimensions({...dimensions, largeur: event.target.value})
		else if (option === 'hauteur')
			setDimensions({...dimensions, hauteur: event.target.value})
		else if (option === 'ratio')
			setDimensions({...dimensions, ratio: event.target.value})
	}

	useEffect(() => {
		if (errorMessage !== '')
			setError(true)
		else
			setError(false)
	}, [errorMessage])

	// Pour chaque case
	function handleOnBlur() {
		if (dimensions.longueur === '' )
			setErrorMessage("Longueur en M non renseigne")
		else
		setErrorMessage('')
	}

	return (
		<div>
			{needTab.longueur &&
				<TextField
					value={dimensions.longueur}
					helperText={errorMessage !== '' ? errorMessage : 'Longueur en M'}
					error={error}
					onChange={(event) => handleDimensionsChange(event, 'longueur')}
					onKeyDown={(event) => handleKeyDown(event, dimensions.longueur)}
					onBlur={handleOnBlur}
					sx={textStyle}
				/>
			}
			{needTab.largeur &&
				<TextField
					value={dimensions.largeur}
					helperText={errorMessage !== '' ? errorMessage : 'Largeur en M'}
					error={error}
					onChange={(event) => handleDimensionsChange(event, 'largeur')}
					onKeyDown={(event) => handleKeyDown(event, dimensions.largeur)}
					sx={textStyle}
				/>
			}
			{needTab.hauteur &&
				<TextField
					value={dimensions.hauteur}
					helperText="Hauteur en M"
					onChange={(event) => handleDimensionsChange(event, 'hauteur')}
					onKeyDown={(event) => handleKeyDown(event, dimensions.hauteur)}
					sx={textStyle}
				/>
			}
			{needTab.ratio &&
				<TextField
					value={dimensions.ratio}
					helperText="Ratio"
					onChange={(event) => handleDimensionsChange(event, 'ratio')}
					onKeyDown={(event) => handleKeyDown(event, dimensions.ratio)}
					sx={textStyle}
				/>
			}
			{(needTab.longueur || needTab.largeur || needTab.hauteur || needTab.ratio) &&
				<Alert severity="info">Information nécessaire : {needTab.helper}</Alert>
			}
		</div>
	)
}

export default OptionField