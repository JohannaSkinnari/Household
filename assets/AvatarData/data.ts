// interface Avatar {
//   icon: any;
//   id: number;
//   color: keyof ReactNativePaper.ThemeColors;
// }

import { IAvatar } from "../../interfaces/IAvatar";

export const avatars: IAvatar[] = [
  { icon: require("../images/chicken.png"), id: 1, color: "yellow" },
  { icon: require("../images/dolphin.png"), id: 2, color: "blue" },
  { icon: require("../images/fox.png"), id: 3, color: "orange" },
  { icon: require("../images/frog.png"), id: 4, color: "green" },
  { icon: require("../images/octopus.png"), id: 5, color: "darkPink" },
  { icon: require("../images/owl.png"), id: 6, color: "brown" },
  { icon: require("../images/pig.png"), id: 7, color: "pink" },
  { icon: require("../images/unicorn.png"), id: 8, color: "purple" },
];
