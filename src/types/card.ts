export interface CardType {
  id: React.Key;

  name?: string;
  title?: string;

  slug: { current: string };
}
