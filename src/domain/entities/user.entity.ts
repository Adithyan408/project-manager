import { randomUUID } from "node:crypto";

export class User {
  constructor(
    private readonly _id: string,
    private _fullName: string,
    private _email: string,
    private _passwordHash: string,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {
    this.validateEmail(this._email);
    this.validateFullName(this._fullName);
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error(`Invalid Email format: ${email}`);
    }
  }

  private validateFullName(fullName: string): void {
    if (!fullName || fullName.trim().length === 0) {
      throw new Error("Full name cannot be Empty");
    }
    if (fullName.length > 100) {
      throw new Error("Full name cannot exceed more than 100 characters");
    }
  }

  get id(): string {
    return this._id;
  }

  get fullName(): string {
    return this._fullName;
  }

  get email(): string {
    return this._email;
  }

  get passwordHashValue(): string {
    return this._passwordHash;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static create(data: {
    fullName: string;
    email: string;
    passwordHash: string;
  }): User{
    const now = new Date()
    return new User(
        randomUUID(),
        data.fullName,
        data.email,
        data.passwordHash,
        now,
        now
    );
  }
  
  toPrimitives(){
    return {
        id: this._id,
        fullName: this._fullName,
        email: this._email,
        createdAt: this._createdAt,
        updatedAt: this._updatedAt,

    }
  }
}


export type UserDTO = ReturnType<typeof User.prototype.toPrimitives>;