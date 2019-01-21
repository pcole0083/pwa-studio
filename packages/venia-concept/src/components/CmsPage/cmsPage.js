import React, { Component } from 'react';
import { array, func, oneOfType, shape, string } from 'prop-types';
import { Query } from 'react-apollo';
import { loadingIndicator } from 'src/components/LoadingIndicator';
{/* TODO: Switch to RichContent component from Peregrine when merged */}
import { RichText } from 'src/components/RichText';

import classify from 'src/classify';
import defaultClasses from './cmsPage.css';
import getCmsPage from '../../queries/getCmsPage.graphql';

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

    renderData = ({ data, error, loading }) => {
        const { children, classes } = this.props;

        if (error || !data.cmsPage && !loading) {
            return !!error && !!error.message ? <p>{error.message}</p> : <p>Data Fetch Error</p>;
        }

        if (loading) {
            return (
                loadingIndicator
            );
        }

        const { content, content_heading, title } = data.cmsPage;

        return (
            <article>
                <h2 className={classes.heading}>{content_heading}</h2>
                {/* TODO: Switch to RichContent component from Peregrine when merged */}
                <RichText content={content} classes={classes} />
            </article>
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
