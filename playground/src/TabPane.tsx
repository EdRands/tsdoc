import * as React from 'react';

export interface ITabDefinition {
  title: string;
  render: () => React.ReactNode;
}

export interface ITabPaneProps {
  tabs: ITabDefinition[];
  style: React.CSSProperties;
  buttonRowStyle?: React.CSSProperties;
  contentDivStyle?: React.CSSProperties;
}

export interface ITabPaneState {
  selectedTabIndex: number;
}

export class TabPane extends React.Component<ITabPaneProps, ITabPaneState>  {
  constructor(props: ITabPaneProps, context?: any) { // tslint:disable-line:no-any
    super(props, context);

    this.state = {
      selectedTabIndex: 0
    };
  }

  public render(): React.ReactNode {
    const buttons: React.ReactNode[] = [];

    let selectedTabDefinition: ITabDefinition | undefined = undefined;

    for (let i: number = 0; i < this.props.tabs.length; ++i) {
      const tabDefinition: ITabDefinition  = this.props.tabs[i];

      const style: React.CSSProperties = {
        padding: '8px',
        marginLeft: '1px',
        marginRight: '1px'
      };

      if (i === this.state.selectedTabIndex) {
        selectedTabDefinition = tabDefinition;

        const selectedStyle: React.CSSProperties = {
          ...style,
          borderStyle: 'solid',
          borderBottomStyle: 'none',
          borderColor: '#c0c0c0',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px'
        };

        buttons.push(
          <div key={`tab_${i}`} style={ selectedStyle }>
            {tabDefinition.title}
          </div>
        );

      } else {

        buttons.push(
          <div key={`tab_${i}`} style={ style }>
            <a href='#'
               style={ { textDecorationLine: 'none' } }
               onClick={this._onClickTab.bind(this, i)}>
              {tabDefinition.title}
            </a>
          </div>
        );

      }
    }

    const contentDivStyle: React.CSSProperties = {
      display: 'flex',
      ...this.props.contentDivStyle,
      borderStyle: 'solid',
      borderColor: '#c0c0c0',
      flexBasis: '100%'
    };

    return (
      <div style={ { ...this.props.style, display: 'flex', flexDirection: 'column' } }>
        <div style={ { ...this.props.buttonRowStyle, display: 'flex', flexDirection: 'row' } }>
          { buttons }
        </div>
        <div style={ contentDivStyle }>
          { selectedTabDefinition !== undefined ? selectedTabDefinition.render() : '' }
        </div>
      </div>
    );
  }

  private _onClickTab(tabIndex: number, event: MouseEvent): void {
    this.setState({ selectedTabIndex: tabIndex });
  }

}
