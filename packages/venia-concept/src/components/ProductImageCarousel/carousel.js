import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { arrayOf, bool, number, objectOf, shape, string } from 'prop-types';
import memoize from 'memoize-one';

import { updateGalleryIndex } from 'src/actions/product';
import classify from 'src/classify';
import Arrow from './arrow';
import ThumbnailList from './thumbnailList';
import defaultClasses from './carousel.css';
import { makeProductMediaPath } from 'src/util/makeMediaPath';
import { transparentPlaceholder } from 'src/shared/images';

class Carousel extends Component {
    static propTypes = {
        classes: objectOf(string),
        images: arrayOf(
            shape({
                label: string,
                position: number,
                disabled: bool,
                file: string.isRequired
            })
        ).isRequired,
        galleryImageIndex: number.isRequired
    };

    // The spec does not guarantee a position parameter,
    // so the rule will be to order items without position last.
    // See https://github.com/magento/graphql-ce/issues/113.
    // Memoize this expensive operation based on reference equality
    // of the `images` array. Apollo cache should return a new array
    // only when it does a new fetch.
    sortAndFilterImages = memoize(items =>
        items
            .filter(i => !i.disabled)
            .sort((a, b) => {
                const aPos = isNaN(a.position) ? 9999 : a.position;
                const bPos = isNaN(b.position) ? 9999 : b.position;
                return aPos - bPos;
            })
    );

    updateCurrentImageIndex = imgSet => {
        const { images, updateGalleryIndex } = this.props;
        const sortedImages = this.sortAndFilterImages(images);
        const imgPath = Array.from(imgSet)[0];

        const selectedIndex = sortedImages.findIndex(image => {
            return image.file === imgPath;
        });

        updateGalleryIndex(selectedIndex);
    };

    render() {
        const { props, sortAndFilterImages, updateCurrentImageIndex } = this;

        const {
            classes,
            images,
            galleryImageIndex,
            updateGalleryIndex
        } = props;

        let sortedImages = sortAndFilterImages(images);

        for (let i = 0; i < sortedImages.length; i++) {
            sortedImages[i].isSelected = galleryImageIndex === i;
        }

        let mainImage = sortedImages[galleryImageIndex] || {};

        mainImage.isSelected = true;

        const src = mainImage.file
            ? makeProductMediaPath(mainImage.file)
            : transparentPlaceholder;
        const alt = mainImage.label || 'product';
        return (
            <div className={classes.root}>
                <img className={classes.currentImage} src={src} alt={alt} />
                <ThumbnailList
                    getItemKey={i => i.file}
                    items={sortedImages}
                    onSelectionChange={updateCurrentImageIndex}
                />
                <Arrow
                    direction="left"
                    galleryImageIndex={galleryImageIndex}
                    maxIndex={sortedImages.length - 1}
                    onClick={updateGalleryIndex}
                />
                <Arrow
                    direction="right"
                    galleryImageIndex={galleryImageIndex}
                    maxIndex={sortedImages.length - 1}
                    onClick={updateGalleryIndex}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const galleryImageIndex = state.product
        ? state.product.galleryImageIndex
        : 0;

    return {
        galleryImageIndex
    };
};

const mapDispatchToProps = { updateGalleryIndex };

export default compose(
    classify(defaultClasses),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Carousel);
