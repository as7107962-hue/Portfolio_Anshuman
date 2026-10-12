type Props = { eyebrow?: string; title: string; description?: string; level?: "h1" | "h2"; };
export function SectionHeading({ eyebrow, title, description, level = "h2" }: Props) {
  const TitleTag = level;
  return <div className="section-heading">{eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}<TitleTag>{title}</TitleTag>{description ? <p>{description}</p> : null}</div>;
}
