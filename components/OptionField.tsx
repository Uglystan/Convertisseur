import React from 'react'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

interface Dimensions {
	longueur? : number
	largeur? : number
	hauteur? : number
	ratio? : number
}

interface Need {
	longueur : boolean
	largeur : boolean
	hauteur : boolean
	ratio : boolean
	helper : string
}

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

	function handleLongueurChange(event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setDimensions({...dimensions, longueur: parseFloat(event.target.value) })
	}

	function handleLargeurChange(event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setDimensions({...dimensions, largeur: parseFloat(event?.target.value)})
	}

	function handleHauteurChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setDimensions({...dimensions, hauteur: parseFloat(event.target.value)})
	}

	function handleRatioChange(event: React.ChangeEvent< HTMLInputElement | HTMLTextAreaElement>) {
		setDimensions({...dimensions, ratio: parseFloat(event.target.value)})
	}

	return (
		<div>
			{needTab.longueur &&
				<TextField
					helperText="Longueur en M"
					onChange={handleLongueurChange}
					sx={textStyle}
				/>
			}
			{needTab.largeur &&
				<TextField
					helperText="Largeur en M"
					onChange={handleLargeurChange}
					sx={textStyle}
				/>
			}
			{needTab.hauteur &&
				<TextField
					helperText="Hauteur en M"
					onChange={handleHauteurChange}
					sx={textStyle}
				/>
			}
			{needTab.ratio &&
				<TextField
					helperText="Ratio"
					onChange={handleRatioChange}
					sx={textStyle}
				/>
			}
			{(needTab.longueur || needTab.largeur || needTab.hauteur || needTab.ratio) &&
				<Alert severity="info">Information nécessaire : {needTab.helper}</Alert>
				// <p>Information nécessaire : {needTab.helper}</p>
			}
		</div>
	)
}

export default OptionField