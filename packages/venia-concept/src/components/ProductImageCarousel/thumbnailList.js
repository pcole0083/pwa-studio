import React, { Component } from 'react';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { List } from '@magento/peregrine';

import classify from 'src/classify';
import Thumbnail from './thumbnail';
import defaultClasses from './thumbnailList.css';

class ThumbnailList extends Component {
    static propTypes = {
        classes: shape({
            root: string
        }),
        items: arrayOf(
            shape({
                label: string,
                position: number,
                disabled: bool,
                file: string.isRequired,
                isSelected: bool
            })
        ).isRequired
    };

    render() {
        return <List renderItem={Thumbnail} {...this.props} />;
    }
}

export default classify(defaultClasses)(ThumbnailList);
