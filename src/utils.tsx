export default function makeid() {
  let result = "";

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const { length } = characters;

  for (let index = 0; index < 8; index++) {
    result += characters.charAt(Math.floor(Math.random() * length));
  }

  return result;
}
