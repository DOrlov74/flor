export const moveInLeft = {
        '0%': {
            opacity: 0,
            transform: 'translateX(-10rem)'
        },
        '80%': {
            transform: 'translateX(1rem)'
        },
        '100%': {
            opacity: 1,
            transform: 'translate(0)'
        }
}
export const moveInRight = {
        '0%': {
            opacity: 0,
            transform: 'translateX(10rem)'
        },
        '80%': {
            transform: 'translateX(-1rem)'
        },
        '100%': {
            opacity: 1,
            transform: 'translate(0)'
        }
}
export const moveInBottom = {
        '0%': {
            opacity: 0,
            transform: 'translateY(10rem)'
        },
        '80%': {
            transform: 'translateY(-1rem)'
        },
        '100%': {
            opacity: 1,
            transform: 'translate(0)'
        }
}
export const moveOutBottom = {
    '0%': {
        opacity: 1,
        transform: 'translate(0)'
    },
    '80%': {
        transform: 'translateY(-1rem)'
    },
    '100%': {
        opacity: 1,
        transform: 'translateY(10rem)'
    }
}