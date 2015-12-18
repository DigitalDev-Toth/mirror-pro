import React from "react";

/**
 * 
 */
export class SelectComponent extends React.Component {

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<select id={ this.props.id } className={ `form-control ${ this.props.class }` } onChange={ this.props.handleChange }>
				{ this.props.options.map(( optionParent, i ) => {
					if ( typeof optionParent === "object" ) {
						return (
							<optgroup key={ `option_parent_${ i }` } label={ optionParent.label }>
								{ optionParent.options.map(( optionChild, j ) => {
									return (
										<option key={ `option_child_${ j }` } value={ optionChild.value }>{ optionChild.text }</option>
									);
								}) }
							</optgroup>
						);
					} else {
						return (
							<option key={ `option_parent_${ i }` }>{ optionParent }</option>
						);
					}					
				}) }		
			</select>
		);
	}
}