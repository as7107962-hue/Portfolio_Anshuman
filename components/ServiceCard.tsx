type Props = { title: string; description: string; useCases?: string[]; };
export function ServiceCard({ title, description, useCases }: Props) { return <article className="card"><h3>{title}</h3><p>{description}</p>{useCases ? <ul>{useCases.map((item) => <li key={item}>{item}</li>)}</ul> : null}</article>; }
