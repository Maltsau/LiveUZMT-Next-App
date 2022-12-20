import AddButton from "./AddButton";
import Image from "next/image";

export default function AddPhotoButton() {
  return (
    <AddButton>
      <Image src="/add-photo.png" height={50} width={50} alt="PHOTO" />
    </AddButton>
  );
}
