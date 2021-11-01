import { isVisible, setIsVisible } from "./HouseHoldsView";


export default function ShowSettings() {
  function toggleEnableSetup() {
    setIsVisible(!isVisible);
  }
  return toggleEnableSetup;
}
