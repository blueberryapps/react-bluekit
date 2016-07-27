import PureComponent from 'react-pure-render/component';
import React, {PropTypes as RPT} from 'react';
import SourceCode from './SourceCode.react';
import Variants from './Variants.react';
import AtomPreview from './AtomPreview.react';
import styles from '../styles/Sources';
import headingStyles from '../styles/Headings';
import * as colors from '../styles/Colors';
import Radium from 'radium';
import transformPropNodes from '../../helpers/transformPropNodes';

@Radium
export default class Preview extends PureComponent {

  static propTypes = {
    Component: RPT.func.isRequired,
    componentName: RPT.string,
    componentProps: RPT.object,
    componentPropsDefinition: RPT.object,
    headingColor: RPT.string,
    name: RPT.string,
  }

  render() {
    const {Component, componentName, componentPropsDefinition, componentProps, headingColor} = this.props

    return (
      <div style={styles.wrapper}>
        <div style={[styles.panel, styles.panel.first]}>
          <h2
            id={`${componentName}-preview`}
            style={[
              headingStyles,
              headingStyles.preview,
              {color: headingColor}
            ]}
          >
            Preview of {componentName}
          </h2>
          <div style={styles.atomWrapper}>
            <AtomPreview
              Component={Component}
              componentProps={componentProps}
              componentPropsDefinition={componentPropsDefinition}
            />
          </div>
          <SourceCode
            componentName={componentName}
            componentProps={componentProps}
            componentPropsDefinition={componentPropsDefinition}
            name={`sourceCodeOf${componentName}`}
          />
        </div>
        <Variants
          Component={Component}
          componentName={componentName}
          componentProps={componentProps}
          componentPropsDefinition={componentPropsDefinition}
          headingColor={headingColor}
         />
      </div>
    )
  }
}
