import { Image } from "react-native";
import LogoImage from "../assets/logo.png";

export default function Logo() {
  return <Image style={{ width: 50, height: 50 }} source={LogoImage} />;
}
