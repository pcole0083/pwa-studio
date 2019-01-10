import React, { Component } from 'react';
import { func, number, shape, string } from 'prop-types';

import classify from 'src/classify';
import defaultClasses from './arrow.css';
import Icon from 'src/components/Icon';

class Arrow extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            left: string,
            right: string
        }),
        direction: string.isRequired,
        galleryImageIndex: number.isRequired,
        maxIndex: number.isRequired,
        onClick: func
    };

    handleClick = () => {
        const { direction, onClick, galleryImageIndex, maxIndex } = this.props;

        let newIndex = 0;

        if (direction === 'left') {
            newIndex = galleryImageIndex - 1 <= 0 ? 0 : galleryImageIndex - 1;
        } else if (direction === 'right') {
            newIndex =
                galleryImageIndex + 1 >= maxIndex
                    ? maxIndex
                    : galleryImageIndex + 1;
        }

        if (onClick) {
            onClick(newIndex);
        }
    };

    render() {
        const { classes, direction } = this.props;

        const attrs = {
            width: 40,
            height: 40
        };

        let className = `${classes.root}`;
        className += ` ${classes[direction]}`;

        let iconName = 'chevron-' + direction;

        return (
            <button
                className={className}
                onClick={this.handleClick}
                type="button"
            >
                <Icon name={iconName} attrs={attrs} />
            </button>
        );
    }
}

export default classify(defaultClasses)(Arrow);
