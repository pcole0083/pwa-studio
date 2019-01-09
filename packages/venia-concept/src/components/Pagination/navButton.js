import React, { Component } from 'react';
import classify from 'src/classify';
import defaultClasses from './navButton.css';
import Icon from '../Icon';
import Rewind from 'react-feather/dist/icons/rewind';
import ChevronLeft from 'react-feather/dist/icons/chevron-left';
import ChevronRight from 'react-feather/dist/icons/chevron-right';
import FastForward from 'react-feather/dist/icons/fast-forward';

const NavIcons = {
    Rewind,
    ChevronLeft,
    ChevronRight,
    FastForward
};

const defaultSkipAttributes = {
    width: '1.2rem',
    height: '1.2rem'
};

const activeFill = {
    fill: '#000'
};

const inactiveFill = {
    fill: '#999'
};

class NavButton extends Component {
    static defaultProps = {
        buttonLabel: 'move to another page'
    };

    render() {
        const { classes, name, active, onClick, buttonLabel } = this.props;
        let attrs;
        // The chevron icon does not have a fill or any sizing issues that
        // need to be handled with attributes in props
        if (name.includes('Chevron')) {
            attrs = {};
        } else {
            attrs = active
                ? { ...defaultSkipAttributes, ...activeFill }
                : { ...defaultSkipAttributes, ...inactiveFill };
        }

        const className = active ? classes.buttonArrow : classes.buttonInactive;

        return (
            <button
                className={className}
                aria-label={buttonLabel}
                onClick={onClick}
            >
                <Icon src={NavIcons[name]} attrs={attrs} />
            </button>
        );
    }
}

export default classify(defaultClasses)(NavButton);
