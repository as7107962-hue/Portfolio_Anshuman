type Props = { name: string; price: string; bestFor: string[]; };
export function PricingCard({ name, price, bestFor }: Props) { return <article className="card"><h3>{name}</h3><div className="price">{price}</div><p className="muted">Best for:</p><ul>{bestFor.map((item) => <li key={item}>{item}</li>)}</ul></article>; }
