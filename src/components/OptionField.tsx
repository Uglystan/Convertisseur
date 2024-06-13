import React from 'react'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { Dimensions, DimensionsNeed } from '../types/converter_types'

interface OptionFieldProps {
	dimensions : Dimensions
	dimensionsNeeded : DimensionsNeed
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

function OptionField({dimensions, dimensionsNeeded, setDimensions} : OptionFieldProps) {

	console.log("render Option")

	const [error, setError] = React.useState<"info" | "error" | "success" | "warning">('info')

	function handleKeyDown (event : React.KeyboardEvent, option : string | undefined) {
		if (!/^\d*,?\d*$/.test(option + event.key) && !["Backspace", "Tab", "Enter", "Escape", "ArrowLeft", "ArrowRight"].includes(event.key)) {
			event.preventDefault()
		}
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

	function handleOnBlur(option : string) {
		if (
			(option === 'longueur' && dimensions.longueur === '') ||
			(option === 'largeur' && dimensions.largeur === '') ||
			(option === 'hauteur' && dimensions.hauteur === '') ||
			(option === 'ratio' && dimensions.ratio === '')
		)
			setError("error")
		else
			setError("info")
	}

	return (
		<div>
			{dimensionsNeeded.longueur &&
				<TextField
					value={dimensions.longueur}
					helperText='Longueur en M'
					onChange={(event) => handleDimensionsChange(event, 'longueur')}
					onKeyDown={(event) => handleKeyDown(event, dimensions.longueur)}
					onBlur={() => handleOnBlur('longueur')}
					sx={textStyle}
				/>
			}
			{dimensionsNeeded.largeur &&
				<TextField
					value={dimensions.largeur}
					helperText='Largeur en M'
					onChange={(event) => handleDimensionsChange(event, 'largeur')}
					onKeyDown={(event) => handleKeyDown(event, dimensions.largeur)}
					onBlur={() => handleOnBlur('largeur')}
					sx={textStyle}
				/>
			}
			{dimensionsNeeded.hauteur &&
				<TextField
					value={dimensions.hauteur}
					helperText="Hauteur en M"
					onChange={(event) => handleDimensionsChange(event, 'hauteur')}
					onKeyDown={(event) => handleKeyDown(event, dimensions.hauteur)}
					onBlur={() => handleOnBlur('hauteur')}
					sx={textStyle}
				/>
			}
			{dimensionsNeeded.ratio &&
				<TextField
					value={dimensions.ratio}
					helperText="Ratio"
					onChange={(event) => handleDimensionsChange(event, 'ratio')}
					onKeyDown={(event) => handleKeyDown(event, dimensions.ratio)}
					onBlur={() => handleOnBlur('ratio')}
					sx={textStyle}
				/>
			}
			{(dimensionsNeeded.helper) && <Alert severity={error}>Information complémentaire nécessaire : {dimensionsNeeded.helper}</Alert>}
		</div>
	)
}

// Memo pertinent dans le cas ou si on a InputField qui se recharge on a pas forcement change les options
// Donc on a pas besoins de re-rendre.
export default React.memo(OptionField)