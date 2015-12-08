import Radium from 'radium'
import React, {Component} from 'react'

@Radium
export default class EditableField extends Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    editing: React.PropTypes.bool.isRequired,
    label: React.PropTypes.string.isRequired,
    onEditingModeChange: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    children: 'Editable field with value',
    editing: false,
    label: 'Value to show'
  };

  // This enables live functionality of this component in Component Library
  static extendComponentLibraryProps = (props, library) => ({
    ...props,
    onEditingModeChange: value => library.setValue('editing', value)
  });

  render() {
    const {children, label, editing} = this.props

    return (
      <div className="editableWrapper" style={styles.wrapper}>

        {editing ? children : label}

        <div onClick={this.toggleEditingMode.bind(this)}>
          {editing ? <button>ok</button> : <button>edit</button>}
        </div>
      </div>
    );
  };

  toggleEditingMode(event) {
    const {editing, onEditingModeChange} = this.props

    onEditingModeChange(!editing)
  };

};

const styles = {
  wrapper: {
    margin: '10px 0 40px 0',
  },

  label: {
    cursor: 'pointer'
  },

  editableTextFieldWrapper: {
    display: 'block',
  },

  hidden: {
    display: 'none',
  }
};
