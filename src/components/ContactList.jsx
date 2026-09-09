import { useState } from 'react'
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
  const updateContact = usePhonebookStore((state) => state.updateContact)
  const deleteContact = usePhonebookStore((state) => state.deleteContact)
  const [editingId, setEditingId] = useState(null)
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editPhoneNumber, setEditPhoneNumber] = useState('')

  // 원본 배열은 건드리지 않고 복사한 뒤 뒤집어, 최근 연락처가 위에 보이게 합니다.
  const latestContacts = [...phoneBook].reverse()

  const startEditing = (contact) => {
    // 수정 버튼을 누른 연락처의 현재 값을 편집 입력창에 먼저 복사합니다.
    setEditingId(contact.id)
    setEditName(contact.name)
    setEditPhoneNumber(contact.phoneNumber)
    setDeleteTargetId(null)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditName('')
    setEditPhoneNumber('')
  }

  const handleEditPhoneChange = (event) => {
    const onlyNumbers = event.target.value.replace(/\D/g, '').slice(0, 11)
    setEditPhoneNumber(onlyNumbers)
  }

  const handleUpdate = (event, id) => {
    event.preventDefault()

    if (!editName.trim() || !editPhoneNumber) return

    updateContact(id, editName.trim(), editPhoneNumber)
    cancelEditing()
  }

  const confirmDelete = (id) => {
    deleteContact(id)
    setDeleteTargetId(null)
  }

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
                {editingId === item.id ? (
                  <form className="contact-edit-form" onSubmit={(event) => handleUpdate(event, item.id)}>
                    <p className="edit-title">EDIT CONTACT_</p>

                    <label className="contact-edit-field">
                      <span>NAME</span>
                      <input
                        value={editName}
                        onChange={(event) => setEditName(event.target.value)}
                        maxLength={12}
                        aria-label="수정할 이름"
                        required
                      />
                    </label>

                    <label className="contact-edit-field">
                      <span>NUMBER</span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        value={editPhoneNumber}
                        onChange={handleEditPhoneChange}
                        maxLength={11}
                        aria-label="수정할 전화번호"
                        required
                      />
                    </label>

                    <div className="contact-editor-actions">
                      <button type="submit">SAVE</button>
                      <button type="button" onClick={cancelEditing}>CANCEL</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="contact-item-main">
                      <div className={`contact-avatar contact-avatar--${(index % 3) + 1}`} aria-hidden="true">
                        {item.name.slice(0, 1).toUpperCase()}
                      </div>
                      <div className="contact-info">
                        <p className="name">{item.name}</p>
                        <p className="phone-number">{formatPhoneNumber(item.phoneNumber)}</p>
                      </div>
                      <span className="contact-heart" aria-hidden="true">♥</span>
                    </div>

                    {deleteTargetId === item.id ? (
                      <div className="delete-confirm" role="alert">
                        <p><strong>{item.name}</strong> 연락처를 삭제할까요?</p>
                        <div>
                          <button type="button" onClick={() => confirmDelete(item.id)}>YES</button>
                          <button type="button" onClick={() => setDeleteTargetId(null)}>NO</button>
                        </div>
                      </div>
                    ) : (
                      <div className="contact-item-actions">
                        <button
                          type="button"
                          onClick={() => startEditing(item)}
                          aria-label={`${item.name} 연락처 수정`}
                        >
                          <span>EDIT</span><small>수정</small>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTargetId(item.id)}
                          aria-label={`${item.name} 연락처 삭제`}
                        >
                          <span>DEL</span><small>삭제</small>
                        </button>
                      </div>
                    )}
                  </>
                )}
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
