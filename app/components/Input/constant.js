/**
 * size common input
 */
const sizes = Object.freeze({
    small: 'input--sm',
    middle: '',
    large: 'input--lg',
})

/**
 * get border error
 * @param {String} messageRequire
 */
const getBorderColor = (messageRequire) => {
    if (messageRequire) {
        return 'border__color--red'
    }
    return ''
}

export {
    sizes,
    getBorderColor
}