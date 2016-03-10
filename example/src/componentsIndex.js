/* eslint-disable */
// Generated by component library do not modify
import ExampleComponentsABC from '../../example_components/ABC.js';
import ExampleComponentsButton from '../../example_components/Button.react.js';
import ExampleComponentsCheckbox from '../../example_components/Checkbox.react.js';
import ExampleComponentsCheckboxOnChange from '../../example_components/CheckboxOnChange.js';
import ExampleComponentsEmptyProps from '../../example_components/EmptyProps.react.js';
import ExampleComponentsErrorMessage from '../../example_components/ErrorMessage.react.js';
import ExampleComponentsIcon from '../../example_components/Icon.react.js';
import ExampleComponentsNoProps from '../../example_components/NoProps.react.js';
import ExampleComponentsOnChangeEvent from '../../example_components/OnChangeEvent.js';
import ExampleComponentsOnChangeNameAndValue from '../../example_components/OnChangeNameAndValue.js';
import ExampleComponentsRadioInput from '../../example_components/RadioInput.react.js';
import ExampleComponentsWithExtendProps from '../../example_components/WithExtendProps.react.js';
import ExampleComponentsWithShapePropsWithDefaults from '../../example_components/WithShapePropsWithDefaults.react.js';

export default {
  ExampleComponentsABC: {
    name: 'ExampleComponentsABC',
    menu: 'Example Components ABC',
    file: '../../example_components/ABC.js',
    component: ExampleComponentsABC,
    componentName: 'ABC',
    description: 'Example component description',
    customProps: {},
    propsDefinition: {foo:{type:{name:"bool"},required:false,description:"Example prop description",defaultValue:{value:"true",computed:false}},bar:{defaultValue:{value:"'String'",computed:false}}},
    simpleProps: {foo:true,bar:"String"},
    fullProps: {foo:true,bar:"String"}
  },
  ExampleComponentsButton: {
    name: 'ExampleComponentsButton',
    menu: 'Example Components Button',
    file: '../../example_components/Button.react.js',
    component: ExampleComponentsButton,
    componentName: 'Button',
    description: '',
    customProps: {},
    propsDefinition: {children:{type:{name:"any"},required:true,description:""},disabled:{type:{name:"bool"},required:false,description:""},fullWidth:{type:{name:"bool"},required:false,description:""},inheritedStyle:{type:{name:"object"},required:false,description:""},kind:{type:{name:"enum",value:[{value:"'primary'",computed:false},{value:"'secondary'",computed:false},{value:"'outlined'",computed:false}]},required:true,description:""},onClick:{type:{name:"func"},required:true,description:""},size:{type:{name:"enum",value:[{value:"'small'",computed:false},{value:"'large'",computed:false}]},required:false,description:""},type:{type:{name:"string"},required:false,description:""}},
    simpleProps: {children:"Default ANY",kind:"primary",onClick:function () {
        alert('called function');
      }},
    fullProps: {children:"Default ANY",disabled:true,fullWidth:true,inheritedStyle:null,kind:"primary",onClick:function () {
        alert('called function');
      },size:"small",type:"Default string type"}
  },
  ExampleComponentsCheckbox: {
    name: 'ExampleComponentsCheckbox',
    menu: 'Example Components Checkbox',
    file: '../../example_components/Checkbox.react.js',
    component: ExampleComponentsCheckbox,
    componentName: 'Checkbox',
    description: '',
    customProps: {},
    propsDefinition: {error:{type:{name:"string"},required:false,description:""},label:{type:{name:"string"},required:true,description:""},name:{type:{name:"string"},required:true,description:""},onChange:{type:{name:"func"},required:true,description:""},value:{type:{name:"bool"},required:false,description:""}},
    simpleProps: {label:"Default string label",name:"Default string name",onChange:function () {
        alert('called function');
      }},
    fullProps: {error:"Default string error",label:"Default string label",name:"Default string name",onChange:function () {
        alert('called function');
      },value:true}
  },
  ExampleComponentsCheckboxOnChange: {
    name: 'ExampleComponentsCheckboxOnChange',
    menu: 'Example Components CheckboxOnChange',
    file: '../../example_components/CheckboxOnChange.js',
    component: ExampleComponentsCheckboxOnChange,
    componentName: 'CheckboxOnChange',
    description: '',
    customProps: {},
    propsDefinition: {error:{type:{name:"string"},required:false,description:""},label:{type:{name:"string"},required:true,description:""},name:{type:{name:"string"},required:true,description:""},onChange:{type:{name:"func"},required:true,description:""},value:{type:{name:"bool"},required:false,description:""}},
    simpleProps: {label:"Default string label",name:"Default string name",onChange:function () {
        alert('called function');
      }},
    fullProps: {error:"Default string error",label:"Default string label",name:"Default string name",onChange:function () {
        alert('called function');
      },value:true}
  },
  ExampleComponentsEmptyProps: {
    name: 'ExampleComponentsEmptyProps',
    menu: 'Example Components EmptyProps',
    file: '../../example_components/EmptyProps.react.js',
    component: ExampleComponentsEmptyProps,
    componentName: 'EmptyProps',
    description: '',
    customProps: {},
    propsDefinition: {},
    simpleProps: {},
    fullProps: {}
  },
  ExampleComponentsErrorMessage: {
    name: 'ExampleComponentsErrorMessage',
    menu: 'Example Components ErrorMessage',
    file: '../../example_components/ErrorMessage.react.js',
    component: ExampleComponentsErrorMessage,
    componentName: 'ErrorMessage',
    description: '',
    customProps: {},
    propsDefinition: {children:{type:{name:"any"},required:true,description:""},type:{type:{name:"string"},required:false,description:""}},
    simpleProps: {children:"Default ANY"},
    fullProps: {children:"Default ANY",type:"Default string type"}
  },
  ExampleComponentsIcon: {
    name: 'ExampleComponentsIcon',
    menu: 'Example Components Icon',
    file: '../../example_components/Icon.react.js',
    component: ExampleComponentsIcon,
    componentName: 'Icon',
    description: '',
    customProps: {},
    propsDefinition: {color:{type:{name:"string"},required:false,description:""},display:{type:{name:"string"},required:false,description:""},inheritedStyle:{type:{name:"object"},required:false,description:""},kind:{type:{name:"enum",value:[{value:"'check'",computed:false},{value:"'star'",computed:false}]},required:true,description:""},size:{type:{name:"string"},required:false,description:""}},
    simpleProps: {kind:"check"},
    fullProps: {color:"Default string color",display:"Default string display",inheritedStyle:null,kind:"check",size:"Default string size"}
  },
  ExampleComponentsNoProps: {
    name: 'ExampleComponentsNoProps',
    menu: 'Example Components NoProps',
    file: '../../example_components/NoProps.react.js',
    component: ExampleComponentsNoProps,
    componentName: 'NoProps',
    description: '',
    customProps: {},
    propsDefinition: {},
    simpleProps: {},
    fullProps: {}
  },
  ExampleComponentsOnChangeEvent: {
    name: 'ExampleComponentsOnChangeEvent',
    menu: 'Example Components OnChangeEvent',
    file: '../../example_components/OnChangeEvent.js',
    component: ExampleComponentsOnChangeEvent,
    componentName: 'OnChangeEvent',
    description: '',
    customProps: {},
    propsDefinition: {children:{type:{name:"any"},required:false,description:""},error:{type:{name:"string"},required:false,description:""},icon:{type:{name:"enum",value:[{value:"'star'",computed:false},{value:"'check'",computed:false}]},required:false,description:""},iconSize:{type:{name:"string"},required:false,description:""},label:{type:{name:"string"},required:false,description:""},name:{type:{name:"string"},required:true,description:""},onChange:{type:{name:"func"},required:true,description:""},placeholder:{type:{name:"string"},required:true,description:""},tooltip:{type:{name:"string"},required:false,description:""},type:{type:{name:"string"},required:true,description:"",defaultValue:{value:"'text'",computed:false}},unit:{type:{name:"string"},required:false,description:""},value:{type:{name:"string"},required:false,description:""}},
    simpleProps: {name:"Default string name",onChange:function () {
        alert('called function');
      },placeholder:"Default string placeholder",type:"text"},
    fullProps: {tooltip:"Default string tooltip",unit:"Default string unit",error:"Default string error",name:"Default string name",onChange:function () {
        alert('called function');
      },value:"Default string value",placeholder:"Default string placeholder",label:"Default string label",icon:"star",iconSize:"Default string iconSize",type:"text",children:"Default ANY"}
  },
  ExampleComponentsOnChangeNameAndValue: {
    name: 'ExampleComponentsOnChangeNameAndValue',
    menu: 'Example Components OnChangeNameAndValue',
    file: '../../example_components/OnChangeNameAndValue.js',
    component: ExampleComponentsOnChangeNameAndValue,
    componentName: 'OnChangeNameAndValue',
    description: '',
    customProps: {},
    propsDefinition: {children:{type:{name:"any"},required:false,description:""},error:{type:{name:"string"},required:false,description:""},icon:{type:{name:"string"},required:false,description:""},iconSize:{type:{name:"string"},required:false,description:""},label:{type:{name:"string"},required:false,description:""},name:{type:{name:"string"},required:true,description:""},onChange:{type:{name:"func"},required:true,description:""},placeholder:{type:{name:"string"},required:true,description:""},tooltip:{type:{name:"string"},required:false,description:""},type:{type:{name:"string"},required:true,description:"",defaultValue:{value:"'text'",computed:false}},unit:{type:{name:"string"},required:false,description:""},value:{type:{name:"string"},required:false,description:""}},
    simpleProps: {name:"Default string name",onChange:function () {
        alert('called function');
      },placeholder:"Default string placeholder",type:"text"},
    fullProps: {tooltip:"Default string tooltip",unit:"Default string unit",error:"Default string error",name:"Default string name",onChange:function () {
        alert('called function');
      },value:"Default string value",placeholder:"Default string placeholder",label:"Default string label",icon:"Default string icon",iconSize:"Default string iconSize",type:"text",children:"Default ANY"}
  },
  ExampleComponentsRadioInput: {
    name: 'ExampleComponentsRadioInput',
    menu: 'Example Components RadioInput',
    file: '../../example_components/RadioInput.react.js',
    component: ExampleComponentsRadioInput,
    componentName: 'RadioInput',
    description: '',
    customProps: {},
    propsDefinition: {horizontal:{type:{name:"bool"},required:false,description:""},name:{type:{name:"string"},required:true,description:""},onChange:{type:{name:"func"},required:true,description:""},selected:{type:{name:"bool"},required:true,description:""},text:{type:{name:"string"},required:false,description:""},value:{type:{name:"string"},required:true,description:""}},
    simpleProps: {name:"Default string name",onChange:function () {
        alert('called function');
      },selected:true,value:"Default string value"},
    fullProps: {horizontal:true,name:"Default string name",onChange:function () {
        alert('called function');
      },selected:true,text:"Default string text",value:"Default string value"}
  },
  ExampleComponentsWithExtendProps: {
    name: 'ExampleComponentsWithExtendProps',
    menu: 'Example Components WithExtendProps',
    file: '../../example_components/WithExtendProps.react.js',
    component: ExampleComponentsWithExtendProps,
    componentName: 'WithExtendProps',
    description: '',
    customProps: {},
    propsDefinition: {children:{type:{name:"node"},required:true,description:"",defaultValue:{value:"'Editable field with value'",computed:false}},editing:{type:{name:"bool"},required:true,description:"",defaultValue:{value:"false",computed:false}},label:{type:{name:"string"},required:true,description:"",defaultValue:{value:"'Value to show'",computed:false}},onEditingModeChange:{type:{name:"func"},required:true,description:""}},
    simpleProps: {children:"Editable field with value",editing:false,label:"Value to show",onEditingModeChange:function () {
        alert('called function');
      }},
    fullProps: {children:"Editable field with value",editing:false,label:"Value to show",onEditingModeChange:function () {
        alert('called function');
      }}
  },
  ExampleComponentsWithShapePropsWithDefaults: {
    name: 'ExampleComponentsWithShapePropsWithDefaults',
    menu: 'Example Components WithShapePropsWithDefaults',
    file: '../../example_components/WithShapePropsWithDefaults.react.js',
    component: ExampleComponentsWithShapePropsWithDefaults,
    componentName: 'WithShapePropsWithDefaults',
    description: '',
    customProps: {},
    propsDefinition: {interval:{type:{name:"shape",value:{value:{name:"number",required:true},text:{name:"string",required:true}}},required:true,description:"",defaultValue:{value:"{\n  value: 123,\n  text: 'Foo'\n}",computed:false}}},
    simpleProps: {interval:{value:123,text:"Foo"}},
    fullProps: {interval:{value:123,text:"Foo"}}
  },
}