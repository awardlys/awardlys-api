export type GameProps = {
  id: string;
  title: string;
  description: string;
  platform: keyof typeof GamePlatform;
  image_url: string;
  createdAt?: string;
  updatedAt?: string;
};

export enum GamePlatform {
  windows,
  mac,
  linux,
}

export enum GameStatus {
  draft,
  active,
  expired,
}

export class GameEntity {
  constructor(private readonly props: GameProps) {}

  toJSON() {
    return {
      ...this.props,
    };
  }

  get id() {
    return this.props.id;
  }

  set title(title: string) {
    this.props.title = title;
  }

  set platform(platform: keyof typeof GamePlatform) {
    this.props.platform = platform;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set image_url(url: string) {
    this.props.image_url = url;
  }
}
