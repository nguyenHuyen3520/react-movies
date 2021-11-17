import React from 'react'
import PropTypes from 'prop-types'


const Modal = props => {
    const [active, setActive] = React.useState(false)

    React.useEffect(() => {
        setActive(props.active)
    }, [props.active])
    return (
        <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
            {
                props.children
            }
        </div>
    )
}

export const ModalContent = props => {
    const contentRef = React.useRef()
    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active')
        if (props.onClose) props.onClose()
    }
    return (
        <div className="modal__content" ref={contentRef}>
            {
                props.children
            }
            <div className="modal__content__close" onClick={closeModal}>
                <i className="bx bx-x"></i>
            </div>
        </div>
    )
}

ModalContent.propTypes = {
    onClose: PropTypes.func
}
Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string
}

export default Modal
