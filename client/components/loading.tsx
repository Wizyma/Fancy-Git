import * as React from 'react'
import { LoadingDiv } from '../styles/globals'

interface defaultProps {
  text: string,
  speed: number
}

interface State {
  text: string,
  speed: number
}

export class Loading extends React.Component<defaultProps, State> {
  public static defaultProps: defaultProps = {
    text: 'Loading',
    speed: 300,
  }

  public state: State

  private interval: WindowTimers | any

  constructor(props: defaultProps) {
    super(props)

    this.state = {
      text: props.text,
      speed: props.speed,
    }
  }

  componentDidMount() {
    const stopper = `${this.props.text}...`

    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState({ text: this.props.text })
      }else {
        this.setState((prevState) => {
          return {
            text: `${prevState.text}.`,
          }
        })
      }
    // tslint:disable-next-line:align
    }, this.props.speed)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    return(
      <LoadingDiv>
        <p>{this.state.text}</p>
      </LoadingDiv>
    )
  }
}
