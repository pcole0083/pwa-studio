import React, { Component } from 'react';
import { number } from 'prop-types';
import CMSpage from 'src/components/CMSpage';
import CategoryList from 'src/components/CategoryList';

export default class CMS extends Component {
    static propTypes = {
      id: number.isRequired
    }

    static defaultProps = {
      id: 2
    };

    render() {
        const { id } = this.props;

        return (
            <article>
                <CMSpage id={id} />
                <CategoryList title="Shop by category" id={2} />
            </article>
        );
    }
}
