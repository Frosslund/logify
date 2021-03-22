const Button = ({ color, text }) => {
    return <button style={{ backgroundColor: color }}>{text}</button>
}

Button.defaultProps = {
    color: 'black',
    text: 'Button'
}

export default Button
