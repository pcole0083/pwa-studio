import React, { Component } from 'react';
import { func, shape, string } from 'prop-types';
import { Query } from 'react-apollo';
import { loadingIndicator } from '../LoadingIndicator';
import { Link } from 'react-router-dom';

import classify from 'src/classify';
import defaultClasses from './cmsPage.css';
import getCmsPage from '../../queries/getCmsPage.graphql';

import Interweave from 'interweave';

const makeLink = function(node, children) {
    if (node.tagName.toLowerCase() === 'a') {
        return <Link to={node.getAttribute('href')}>{children}</Link>;
    }
};

class CmsPage extends Component {
    static propTypes = {
        children: func,
        classes: shape({
            content: string,
            heading: string,
            root: string
        }),
        id: string.isRequired
    };

    processHTML = htmlData => {
        return <Interweave content={htmlData} transform={makeLink} />;
    };

    renderData = ({ data, error, loading }) => {
        const { processHTML, props } = this;
        const { classes } = props;

        if (loading) {
            return loadingIndicator;
        }

        if (error) {
            return !!error.message ? (
                <p>{error.message}</p>
            ) : (
                <p>Data Fetch Error</p>
            );
        }

        const { content, content_heading } = data.cmsPage;
        console.log(content);
        return (
            <section>
                <h2 className={classes.heading}>{content_heading}</h2>
                <div className={classes.content}>{processHTML(content)}</div>
            </section>
        );
    };

    render() {
        const { props, renderData } = this;
        const { classes, id } = props;

        return id ? (
            <div className={classes.root}>
                <Query query={getCmsPage} variables={{ id }}>
                    {renderData}
                </Query>
            </div>
        ) : (
            <div>Please specifiy a CmsPage ID</div>
        );
    }
}

export default classify(defaultClasses)(CmsPage);
