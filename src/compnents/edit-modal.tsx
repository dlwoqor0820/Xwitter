import ReactModal from "react-modal";

/* interface IModal {
    isOpen: boolean;
    Id: string;
    user: User | null;
    tweet: string;
    photo: string;
  } */

export default function EditModal() {
  return (
    <ReactModal isOpen={true}>
      <h1>Modal</h1>
    </ReactModal>
  );
}
