import { create } from "zustand"

const usePhonebookStore = create((set) => ({
    phoneBook: [],
    addContact: (name, phoneNumber) =>
        set((state) => ({
            // 기존 배열을 직접 바꾸지 않고 새 배열을 만들어 Zustand가 변경을 감지하게 합니다.
            phoneBook: [...state.phoneBook, { id: Date.now(), name, phoneNumber }]
        })),
    updateContact: (id, name, phoneNumber) =>
        set((state) => ({
            // 선택한 id와 일치하는 연락처만 새 정보로 교체합니다.
            phoneBook: state.phoneBook.map((contact) =>
                contact.id === id ? { ...contact, name, phoneNumber } : contact
            )
        })),
    deleteContact: (id) =>
        set((state) => ({
            // 삭제할 연락처를 제외한 새 배열을 store에 저장합니다.
            phoneBook: state.phoneBook.filter((contact) => contact.id !== id)
        })),
}))

export default usePhonebookStore
