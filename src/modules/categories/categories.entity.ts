export type CategoryProps = {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

export class CategoryEntity {
  constructor(private readonly props: CategoryProps) {}

  toJSON() {
    return {
      ...this.props,
    };
  }

  get id() {
    return this.props.id;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set description(description: string) {
    this.props.description = description;
  }
}
