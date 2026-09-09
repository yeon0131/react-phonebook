import usePhonebookStore from '../stores/usePhonbookStore'

const formatPhoneNumber = (phoneNumber) => {
  // 입력 길이에 맞춰 한국 전화번호에서 자주 쓰는 묶음으로 표시합니다.
  if (phoneNumber.length === 11) {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  }

  if (phoneNumber.length === 10) {
    return phoneNumber.startsWith('02')
      ? phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3')
      : phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  }

  return phoneNumber
}

const ContactList = () => {
  const phoneBook = usePhonebookStore((state) => state.phoneBook)
  // 원본 배열은 건드리지 않고 복사한 뒤 뒤집어, 최근 연락처가 위에 보이게 합니다.
  const latestContacts = [...phoneBook].reverse()

  return (
    <article className="pixel-phone pixel-phone--blue" aria-labelledby="list-phone-title">
      <div className="phone-top">
        <div className="phone-speaker" aria-hidden="true" />
        <p className="phone-brand">TINY TALK</p>
        <span className="heart-sticker" aria-hidden="true">♥</span>
      </div>

      <section className="phone-screen phone-screen--list">
        <div className="screen-status">
          <span className="signal-bars" aria-hidden="true"><i /><i /><i /><i /></span>
          <span id="list-phone-title">PHONE BOOK</span>
          <span className="battery" aria-hidden="true"><i /></span>
        </div>

        <div className="list-heading">
          <div>
            <p>MY FRIENDS</p>
            <h2>저장된 연락처</h2>
          </div>
          <span className="contact-count" aria-label={`연락처 ${phoneBook.length}개`}>
            {String(phoneBook.length).padStart(2, '0')}
          </span>
        </div>

        <div className="contact-list" aria-live="polite">
          {latestContacts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-face" aria-hidden="true">•ᴗ•</div>
              <strong>NO CONTACTS YET!</strong>
              <p>왼쪽 폰에서<br />첫 연락처를 저장해 보세요.</p>
              <span aria-hidden="true">↓</span>
            </div>
          ) : (
            latestContacts.map((item, index) => (
              <div className="contact-item" key={item.id}>
                <div className={`contact-avatar contact-avatar--${(index % 3) + 1}`} aria-hidden="true">
                  {item.name.slice(0, 1).toUpperCase()}
                </div>
                <div className="contact-info">
                  <p className="name">{item.name}</p>
                  <p className="phone-number">{formatPhoneNumber(item.phoneNumber)}</p>
                </div>
                <span className="contact-heart" aria-hidden="true">♥</span>
              </div>
            ))
          )}
        </div>

        <div className="screen-footer" aria-hidden="true">
          <span>SELECT</span><span>✦</span><span>BACK</span>
        </div>
      </section>

      <div className="list-phone-controls" aria-hidden="true">
        <span className="round-control">☎</span>
        <span className="direction-pad"><i>▲</i><b>OK</b><i>▼</i></span>
        <span className="round-control round-control--pink">×</span>
      </div>

      <div className="decorative-keypad" aria-hidden="true">
        {['1', '2 ABC', '3 DEF', '4 GHI', '5 JKL', '6 MNO', '7 PQRS', '8 TUV', '9 WXYZ', '＊', '0 ＋', '＃'].map((key) => (
          <span key={key}>{key}</span>
        ))}
      </div>

      <span className="phone-sparkle phone-sparkle--one" aria-hidden="true">✦</span>
      <span className="phone-sparkle phone-sparkle--two" aria-hidden="true">✦</span>
    </article>
  )
}

export default ContactList
