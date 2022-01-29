export function getColorFromName(colorName) {
  var colorValue;

  switch (colorName) {
    case "cyan":
      colorValue = "8be9fd";
      break;
    case "green":
      colorValue = "50fa7b";
      break;
    case "orange":
      colorValue = "ffb86c";
      break;
    case "pink":
      colorValue = "ff79c6";
      break;
    case "purple":
      colorValue = "bd93f9";
      break;
    case "yellow":
      colorValue = "f1fa8c";
      break;
    default:
      colorValue = "bd93f9";
      break;
  }

  return colorValue;
}
