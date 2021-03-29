const Button = ({ color, text, onClick }) => {
	return <button style={{ backgroundColor: color }} onClick={onClick}>{text}</button>
}

Button.defaultProps = {
	color: 'black',
	text: 'Button'
}

export default Button
