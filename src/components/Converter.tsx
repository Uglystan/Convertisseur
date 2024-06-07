import React from 'react'
import InputField from './InputField'

// Fonction callBack et creation des variables ici pour remonter les infos au parent (lifting state up)?
class Converter extends React.Component {
	
	render() {
		return (
			<div>
				<InputField />
			</div>
		)
	}
}

export default Converter