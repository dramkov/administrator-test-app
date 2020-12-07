export class User {
  constructor(
    id,
    email,
    password,
    phone,
    name,
    status,
    dateCreate,
    dateUpdate
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.name = name;
    this.status = status;
    this.dateCreate = dateCreate;
    this.dateUpdate = dateUpdate;
  }
}
