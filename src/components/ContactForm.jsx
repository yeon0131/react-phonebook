import { useRef, useState } from 'react'
import usePhonebookStore from '../stores/usePhonbookStore'

// 실제 피처폰 키패드처럼 숫자 아래에 영문 문자를 함께 보여주기 위한 데이터입니다.
const KEYPAD = [
  { value: '1', letters: '' },
  { value: '2', letters: 'ABC' },
  { value: '3', letters: 'DEF' },
  { value: '4', letters: 'GHI' },
  { value: '5', letters: 'JKL' },
  { value: '6', letters: 'MNO' },
  { value: '7', letters: 'PQRS' },
  { value: '8', letters: 'TUV' },
  { value: '9', letters: 'WXYZ' },
]

const ContactForm = () => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const phoneInputRef = useRef(null)
  const addContact = usePhonebookStore((state) => state.addContact)

  const handlePhoneChange = (event) => {
    // 키보드로 입력해도 숫자만 저장되게 해 키패드 입력과 같은 형태로 맞춥니다.
    const onlyNumbers = event.target.value.replace(/\D/g, '').slice(0, 11)
    setPhoneNumber(onlyNumbers)
  }

  const handleKeypadClick = (number) => {
    setPhoneNumber((currentNumber) => `${currentNumber}${number}`.slice(0, 11))
    phoneInputRef.current?.focus()
  }

  const handleBackspace = () => {
    setPhoneNumber((currentNumber) => currentNumber.slice(0, -1))
    phoneInputRef.current?.focus()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!name.trim() || !phoneNumber) return

    addContact(name.trim(), phoneNumber)

    // 저장 후 화면을 비워 다음 연락처를 바로 입력할 수 있게 합니다.
    setName('')
    setPhoneNumber('')
  }

  return (
    <article className="pixel-phone pixel-phone--pink" aria-labelledby="form-phone-title">
      <div className="phone-top">
        <div className="phone-speaker" aria-hidden="true" />
        <p className="phone-brand">TINY TALK</p>
        <span className="smile-sticker" aria-hidden="true">☺</span>
      </div>

      <form onSubmit={handleSubmit} className="phone-form">
        <section className="phone-screen phone-screen--form">
          <div className="screen-status" aria-hidden="true">
            <span className="signal-bars"><i /><i /><i /><i /></span>
            <span>NEW CONTACT</span>
            <span className="battery"><i /></span>
          </div>

          <div className="screen-heading">
            <span className="pixel-avatar" aria-hidden="true">♥</span>
            <div>
              <p>ADD A FRIEND</p>
              <h2 id="form-phone-title">연락처 추가</h2>
            </div>
          </div>

          <label className="pixel-field" htmlFor="name">
            <span>NAME_</span>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={12}
              placeholder="이름을 입력하세요"
              autoComplete="name"
              required
            />
          </label>

          <label className="pixel-field" htmlFor="phone-number">
            <span>NUMBER_</span>
            <input
              ref={phoneInputRef}
              id="phone-number"
              type="tel"
              inputMode="numeric"
              value={phoneNumber}
              onChange={handlePhoneChange}
              maxLength={11}
              placeholder="01012345678"
              autoComplete="tel"
              required
            />
          </label>

          <p className="screen-guide">
            키보드 또는 아래 숫자 버튼으로 입력 · {phoneNumber.length}/11
          </p>
        </section>

        <div className="phone-actions">
          <button
            className="call-button call-button--clear"
            type="button"
            onClick={() => setPhoneNumber('')}
            aria-label="전화번호 전체 지우기"
          >
            CLR
          </button>
          <button className="save-button" type="submit">
            <span>SAVE</span>
            저장
          </button>
          <button
            className="call-button call-button--delete"
            type="button"
            onClick={handleBackspace}
            aria-label="전화번호 한 자리 지우기"
          >
            DEL
          </button>
        </div>

        <div className="phone-keypad" aria-label="전화번호 숫자 키패드">
          {KEYPAD.map(({ value, letters }) => (
            <button
              className="keypad-button"
              type="button"
              key={value}
              onClick={() => handleKeypadClick(value)}
              aria-label={`${value} 입력`}
            >
              <strong>{value}</strong>
              <small>{letters}</small>
            </button>
          ))}

          <button
            className="keypad-button keypad-button--symbol"
            type="button"
            onClick={() => setPhoneNumber('')}
            aria-label="전화번호 전체 지우기"
          >
            <strong>×</strong><small>CLR</small>
          </button>
          <button
            className="keypad-button"
            type="button"
            onClick={() => handleKeypadClick('0')}
            aria-label="0 입력"
          >
            <strong>0</strong><small>+</small>
          </button>
          <button
            className="keypad-button keypad-button--symbol"
            type="button"
            onClick={handleBackspace}
            aria-label="전화번호 한 자리 지우기"
          >
            <strong>⌫</strong><small>DEL</small>
          </button>
        </div>
      </form>

      <span className="phone-sparkle phone-sparkle--one" aria-hidden="true">✦</span>
      <span className="phone-sparkle phone-sparkle--two" aria-hidden="true">✦</span>
    </article>
  )
}

export default ContactForm
