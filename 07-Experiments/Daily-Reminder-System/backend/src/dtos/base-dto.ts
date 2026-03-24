export class BaseDTO<T> {
  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }
}
