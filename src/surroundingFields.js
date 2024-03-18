export default function surroundingFields(field) {
  const fieldsArray = [];
  fieldsArray.push([field[0] + 1, field[1]]);
  fieldsArray.push([field[0] - 1, field[1]]);
  fieldsArray.push([field[0], field[1] + 1]);
  fieldsArray.push([field[0], field[1] - 1]);
  return fieldsArray;
}
