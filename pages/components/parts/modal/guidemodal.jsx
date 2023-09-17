import BaseModal from "./basemodal";

export default function GuideModal({ open, onClose, width, guides, title }) {
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      ariaLabelledBy="modal-modal-title"
      ariaDescribedBy="modal-modal-description"
      width={width}
    >
      <div className="w-full list">
        <h2 className="bkoodak text-4xl text-center mb-5">{title}</h2>
        <ul className="relative ">
          {guides.map((text) => (
            <li className="relative m-5 right-0 text-center bkoodak text-xl hover:text-white cursor-help">
              {text}
            </li>
          ))}
        </ul>
      </div>
    </BaseModal>
  );
}
