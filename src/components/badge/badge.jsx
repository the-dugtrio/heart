/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Badge extends React.Component {
    render() {
        const { children, value, max, isDot } = this.props;

        let content;

        if (isDot) {
            content = null;
        } else if (typeof value === 'number' && typeof max === 'number') {
            content = max < value ? `${max}+` : value;
        } else {
            content = value;
        }

        const className = classNames({
            'h-badge__content': true,
            'is-fixed': !!children,
            'is-dot': !!isDot,
            'is-single': content && `${content}`.length === 1,
        });

        return (
            <div className="h-badge">
                {children}
                <sup className={className}>{content}</sup>
            </div>
        );
    }
}

Badge.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    max: PropTypes.number,
    isDot: PropTypes.bool,
};

Badge.defaultProps = {
    isDot: false,
};
