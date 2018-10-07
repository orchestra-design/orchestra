/* global tw */
import React, { createRef, Component, Fragment } from 'react'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import { toggleContact, updateCurrent, updateContactMessages } from '../../actions'
import { Description, SquareButton } from '../elements'
import { delay, pick, toRGBA, uuid } from '../../helpers'

import Tail from '../../assets/icon-tail.svg'
import IconClose from '../../assets/icon-close.svg'
import IconCloseBlack from '../../assets/icon-close-black.svg'

const Wrapper = styled('aside')`
  ${tw([
    'bg-black',
    'fixed',
    'flex',
    'flex-col',
    'm-q24',
    'pin-b',
    'pin-r',
    'z-50',
  ])};
  box-shadow: 0 0 12px ${({ theme }) => toRGBA(0.24)(theme.color)};
`

const Bubble = css`
  ${Description};
  ${tw(['bg-white', 'mb-q12', 'px-q24', 'py-q8', 'relative', 'text-black'])};
  border-radius: 20px;
  &::after {
    ${tw(['absolute', 'block', 'bg-no-repeat', 'pin-b'])};
    content: '';
    background-image: url(${Tail});
    height: 7px;
    width: 12px;
  }
  & p {
    ${tw(['m-0'])};
  }
`

const Question = styled('div')`
  ${Bubble};
  ${tw(['mr-q24'])};
  &::after {
    ${tw(['pin-l'])};
  }
`

const Answer = styled('div')`
  ${Bubble};
  ${tw(['ml-q24'])};
  &::after {
    ${tw(['pin-r'])};
    transform: rotateY(180deg);
  }
`

const Button = styled(SquareButton)`
  ${tw([
    'flex',
    'bg-center',
    'bg-no-repeat',
    'hover:bg-white',
    'border',
    'border-solid',
    'border-white',
    'cursor-pointer',
    'rounded-full',
  ])};
  background-image: url(${IconClose});
  border-color: '#ffffff'}
  transition: all 0.2s ease-in-out;
  &:hover {
    background-image: url(${IconCloseBlack});
  }
`

class ContactForm extends Component {
  constructor(props) {
    super(props)
    this.refInput = createRef()
    this.state = {
      done: false,
      value: '',
    }
  }

  changeHandler = () => {
    this.setState({
      value: this.refInput.current.value,
    })
  }

  postHandle = e => {
    if (this.state.value.length > 0) {
      this.props.updateContactMessages({ answer: this.state.value })
      if (this.props.meta.data.query.length > this.props.contactFormCurrent) {
        this.props.updateContactMessages(
          this.props.meta.data.query[this.props.contactFormCurrent]
        )
        this.props.updateCurrent(
          this.props.contactFormCurrent + 1,
        )
      }
      if (this.props.meta.data.query.length - 1 === this.props.contactFormCurrent) {
        this.setState({
          done: true,
        })
        this.props.updateContactMessages('done')
        delay(8000, () => this.props.toggleContact())
      }
      this.setState({
        value: '',
      })
    }
    e.preventDefault()
  }

  componentDidMount() {
    if (this.props.contactFormMessages.some(x => x === 'done')) {
      this.setState({
        done: true,
      })
    } else if (this.props.contactFormMessages.length === 0) {
      this.props.updateContactMessages(this.props.meta.data.query[0])
    }
    this.refInput.current.focus()
  }

  componentDidUpdate(prevProps) {
    if (this.props.contactFormMessages !== prevProps.contactFormMessages) {
      if (this.state.done) {
        fetch(
          `https://9q6r2a5wr5.execute-api.us-east-1.amazonaws.com/dev/contact?answers=${this.props.contactFormMessages
            .filter(message => message.answer && message.answer)
            .map(({ answer }) => answer.replace(',', ''))}`,
          {
            mode: 'no-cors',
          }
        )
          .then(response => console.log('parsed json', response))
          .catch(error => console.log('parsing failed', error))
      }
    }
  }

  render() {
    const { contactFormCurrent, contactFormMessages, toggleContact } = this.props
    const query = this.props.meta.data.query

    return (
      <Wrapper>
        {query && (
          <div
            className={css`
              ${tw(['pb-q12', 'pt-q36', 'px-q36'])};
            `}
          >
            {contactFormMessages.map(({ answer, question }) => (
              <Fragment key={uuid()}>
                {question && (
                  <Question
                    key={uuid()}
                    dangerouslySetInnerHTML={{
                      __html: question.html,
                    }}
                  />
                )}
                {answer && <Answer key={uuid()}>{answer}</Answer>}
              </Fragment>
            ))}
          </div>
        )}
        <form
          className={css`
            ${tw(['flex', 'flex-row', 'flex-1', 'px-q24', 'py-q16'])};
            ${this.state.done && tw(['justify-center'])};
            border-top: 1px solid #ffffff;
          `}
          onSubmit={this.postHandle}
        >
          {!this.state.done && (
            <input
              className={css`
                ${Description};
                ${tw([
                  'bg-black',
                  'border-2',
                  'border-white',
                  'border-solid',
                  'flex-1',
                  'mr-q12',
                  'px-q24',
                  'py-q8',
                  'relative',
                  'text-white',
                ])};
                border-radius: 20px;
                &,
                &:focus,
                &:active {
                  outline: 0;
                }
              `}
              onChange={this.changeHandler}
              placeholder="Напишите..."
              ref={this.refInput}
              type={query[contactFormCurrent - 1].inputtype}
              value={this.state.value}
            />
          )}
          <Button onClick={toggleContact} />
        </form>
      </Wrapper>
    )
  }
}

export default connect(
  pick(['contactFormCurrent', 'contactFormMessages']),
  { toggleContact, updateCurrent, updateContactMessages }
)(ContactForm)
