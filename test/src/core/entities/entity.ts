import { UniqueEntityID } from './unique-entity-id'

export class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: any, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }

  public equals(entity?: Entity<Props>) {
    if (this === entity) {
      return true
    }
    if (entity?.id === this._id) {
      return true
    }

    return false
  }
}
