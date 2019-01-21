import React, { Component } from 'react';
import CMSpage from 'src/components/CMSpage';
import CategoryList from 'src/components/CategoryList';

export default class CMS extends Component {
    render() {
        return (
            <article>
                <CMSpage id="2"/>
                <CategoryList title="Shop by category" id={2} />
            </article>
        );
    }
}
