import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PaperAirplaneIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { ProfileIcon } from "./component-style";

const Wrapper = styled.div`
  margin-top: 20px;
  width: 500px;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

const TextArea = styled.textarea`
  height: 50px;
  width: 230px;
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const AttachFileButton = styled.label`
  display: flex;
  justify-content: center;
  width: 65px;
  height: 65px;
  border-radius: 20px;
  border: 3px dashed black;
  cursor: pointer;
  svg {
    width: 30px;
  }
  &:hover {
    opacity: 0.2;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitButtonLabel = styled.label`
  width: 30px;
  height: 30px;
  padding: 20px;
  margin: 20px;
  background-color: #d6d6d6;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
`;

const SubmitButton = styled.input`
  display: none;
`;

const UploadedFile = styled.img`
  position: relative;
  top: -5px;
  width: 75px;
  height: 75px;
`;

interface IFormInput {
  tweet: string;
  photo: string;
}

export default function TweetForm() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [file, setFile] = useState<File | null>(null);
  const [prevImage, setPrevImage] = useState("");

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    const user = auth.currentUser;
    const tweetValue = data.tweet;
    if (!user || tweetValue === "" || tweetValue.length > 180) return;
    try {
      const doc = await addDoc(collection(db, "tweets"), {
        tweet: tweetValue,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setFile(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ProfileIcon />

        <TextArea
          {...register("tweet", {
            required: true,
            maxLength: 180,
            minLength: 5,
          })}
          placeholder="방명록을 작성해주세요!"
        />

        <AttachFileButton htmlFor="file">
          {file ? (
            <UploadedFile src={prevImage} alt="choosen" />
          ) : (
            <PhotoIcon />
          )}
        </AttachFileButton>
        <AttachFileInput
          type="file"
          id="file"
          accept="image/*"
          {...register("photo", {
            onChange: (e) => {
              const { files } = e.target;
              console.log(files);
              if (files && files.length === 1) {
                if (files[0].size < 1024 * 1024) {
                  const prevUrl = URL.createObjectURL(files[0]);
                  setPrevImage(prevUrl);
                  setFile(files[0]);
                } else {
                  alert("File size must be less than 10MB");
                }
              }
            },
          })}
        />
        <SubmitButtonLabel htmlFor="submit">
          <PaperAirplaneIcon></PaperAirplaneIcon>
        </SubmitButtonLabel>
        <SubmitButton id="submit" type="submit" value="Submit"></SubmitButton>
      </Form>
    </Wrapper>
  );
}
