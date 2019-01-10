import React, { Component } from 'react';
import { bool, func, shape, string } from 'prop-types';

import classify from 'src/classify';
import defaultClasses from './thumbnail.css';
import { makeProductMediaPath } from 'src/util/makeMediaPath';
import { transparentPlaceholder } from 'src/shared/images';

class Thumbnail extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            active: string
        }),
        isSelected: bool,
        onClick: func
    };

    handleClick = () => {
        const { item, onClick } = this.props;

        if (onClick) {
            onClick(item.position - 1);
        }
    };

    render() {
        const { classes, item } = this.props;
        const src = item.file
            ? makeProductMediaPath(item.file)
            : transparentPlaceholder;

        let className = `${classes.root}`;
        item.isSelected ? (className += ` ${classes.active}`) : className;

        return (
            <button
                className={className}
                onClick={this.handleClick}
                data-selected={item.isSelected}
            >
                <img className={classes.image} src={src} alt={item.label} />
            </button>
        );
    }
}

export default classify(defaultClasses)(Thumbnail);
