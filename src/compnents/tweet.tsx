import { useState } from "react";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import styled from "styled-components";
import EditModal from "./edit-modal";
import { ProfileIcon } from "./component-style";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const Wrapper = styled.div``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const IconWithName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const Username = styled.span`
  background-color: white;
  border-radius: 5px;
  padding: 2px;
`;

const Payload = styled.p`
  flex-grow: 1;
  resize: horizontal;
  width: 255px;
`;

const HandleButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  margin-left: 20px;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  height: 30px;
  width: 30px;
  border: none;
  border-radius: 10px;
  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
`;

const EditButton = styled.button`
  height: 30px;
  width: 30px;
  border: none;
  border-radius: 10px;
  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  console.log(tweet);
  const [isOpen, setIsOpen] = useState(false);
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    if (user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  /*   const props = {
    isOpen: isOpen,
    Id: id,
    user: user,
    tweet: tweet,
    photo: photo,
  }; */

  return (
    <Wrapper>
      <Row>
        <IconWithName>
          <ProfileIcon />
          <Username>{username}</Username>
        </IconWithName>
        <Payload>{tweet}</Payload>
        {photo ? <Photo src={photo} /> : null}
        {user?.uid === userId ? (
          <HandleButtons>
            <DeleteButton onClick={onDelete}>
              <TrashIcon />
            </DeleteButton>
            <EditButton onClick={() => setIsOpen(!isOpen)}>
              <PencilIcon />
            </EditButton>
            {isOpen ? <EditModal /> : null}
          </HandleButtons>
        ) : null}
      </Row>
    </Wrapper>
  );
}
